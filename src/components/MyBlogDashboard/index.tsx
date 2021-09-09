import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button
} from '@material-ui/core';

import {
    deleteBlogAsync,
    deleteAllBlogAsync
} from 'api/api';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import { BlogItem } from "models/blog";

import Axios from "axios";

require("./style.scss");

interface PMyBlogDashboard {
    blogData: BlogItem[];
}


const MyBlogDashboard = (props: PMyBlogDashboard) => {

    const { blogData } = props;

    const handleDelete = (blog: BlogItem): void => {
        deleteBlogAsync(blog.id).then((resp) => {
            alert(resp.statusText);
            console.log(resp);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleDeleteAll = () => {
        deleteAllBlogAsync().then((resp) => {
            alert(resp.statusText);
            console.log(resp);
        }).catch((error) => {
            console.log(error);
        });
    }


    const generateBlogContent = () => {
        if (!blogData || blogData.length == 0) {
            return (
                <div>Empty</div>
            );
        }

        return (
            <div className="myblog-table-content">
                {blogData.map((blog: BlogItem) => {
                    return (
                        <div className="myblog-item">
                            <div className="myblog-item-title">
                                <h3>{blog.title}</h3>
                                <h3>{blog.timestamp.toLocaleDateString()}</h3>
                            </div>
                            <div className="myblog-item-content">
                                <p>{blog.text}</p>
                            </div>
                            <div className="myblog-item-button">
                                <Link to={`/detail/${blog.id}`}>Edit</Link>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(blog)}>
                                    Delete
                                </Button>
                            </div>

                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="myblog-page">
            <div className="myblog-title"><h1>My Blog</h1></div>
            <hr className="myblog-divider" />
            <div className="myblog-table">
                <div className="myblog-table-filter">
                    <h3>Past post</h3>
                    <div className="account-name-filter">
                        <List dense={true}>
                            {blogData.map((blog: BlogItem) => {
                                const date = new Date(blog.timestamp).toLocaleDateString();
                                return (
                                    <ListItem key={blog.id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={blog.title}
                                            secondary={date}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                    {/* <Button variant="contained" color="primary" onClick={}>
                        Primary
                    </Button> */}
                    <Link to={`/detail/${0}`}>New Post</Link>
                    <Button variant="contained" color="secondary" onClick={handleDeleteAll}>
                        Delete ALL
                    </Button>
                </div>
                {generateBlogContent()}

            </div>
        </div>
    );
}

export default MyBlogDashboard;