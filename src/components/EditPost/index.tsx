import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { BlogItem } from "models/blog";
import {
    TextField, 
    Button
} from '@material-ui/core';

import { postBlogAsync, updateBlogAsync } from 'api/api';

require("components/MyBlogDashboard/style.scss");

interface PEditPost {
    blogData: BlogItem[];
}

const EditPost = (props: PEditPost) => {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const { blogData } = props;


    useEffect(() => {
        const id = params['id'];
        if (id !== '0') {
            const blog = blogData.find((item: BlogItem) => item.id == id);
            if (blog) {
                setTitle(blog.title);
                setText(blog.text);
            }
        }
    }, []);

    const handleSubmit = (): void => {
        const data = {title , text};
        if (params['id'] == 0) {
            postBlogAsync(data).then((resp) => {
                // Handle success
                alert(resp.statusText);
                console.log(resp)
            }).then((error) => {
                // Handle error
                console.log(error)
            });
        } else {
            updateBlogAsync(params['id'], data).then((resp) => {
                // Handle success
                alert(resp.statusText);
                console.log(resp)
            }).then((error) => {
                // Handle error
                console.log(error)
            });
        }
       
    }

    return (
        <div className="myblog-page">
            <div className="myblog-title"><h1> Blog </h1></div>
            <hr className="myblog-divider" />
            <div className="myblog-detail-wrapper">
                <h2>{params['id'] === '0' ? `New` : 'Edit'} Post</h2>

                <p>Title</p>
                <TextField
                    required
                    label="Required"
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(event.target.value)}
                />

                <br />
                <p>Text</p>
                <TextField
                    label="Multiline"
                    multiline
                    value={text}
                    rows={4}
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
                />
            </div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
            <Link to="/">
                Home
            </Link>
        </div >
    );
}

export default EditPost;