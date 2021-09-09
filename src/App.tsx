import React, { useEffect, useState } from 'react';
import MyBlogDashboard from 'components/MyBlogDashboard';
import EditPost from 'components/EditPost';
import {  BlogItem } from "models/blog";
import { 
  getBlogAsync,
  deleteBlogAsync,
  postBlogAsync
} from 'api/api';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const App = () => {
  const [blogData, setBlogData] = useState<BlogItem[]>([]);

  const getBlog = () => {
    getBlogAsync().then((resp) => {
        const res: BlogItem[] = resp.data.map((data: any) => {
            return {
                id: data.id,
                text: data.text,
                timestamp: new Date(data.timestamp),
                title: data.title
            }
        });

        // Sort data array order by desc by time stamp
        res.sort((a: BlogItem, b: BlogItem) => {
            const aTime = a.timestamp.getTime();
            const bTime = b.timestamp.getTime();
            if (aTime > bTime) {
                return -1;
            } else if (aTime < bTime) {
                return 1;
            }
            return 0;
        });

        // Set data array to state
        // setState({
        //     ...state,
        //     blogData
        // });
        setBlogData(res);
    }).catch((error) => {
        // Handle Error
    });
}

    // Getting blogs
    useEffect(() => {
      getBlog();
  }, []);


  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <MyBlogDashboard  blogData={blogData}  />
            </Route>
            <Route path="/detail/:id">
              <EditPost blogData={blogData} />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
