import Axios from "axios";

import { BlogItem } from "models/blog";


export const getBlogAsync = async () => await Axios.get("https://restedblog.herokuapp.com/justinfei/api/");

export const postBlogAsync = async (blog: any) => await Axios.post("https://restedblog.herokuapp.com/justinfei/api/", blog);

export const deleteBlogAsync = async (id: number) => await Axios.delete(`https://restedblog.herokuapp.com/justinfei/api/${id}`);

export const deleteAllBlogAsync = async () => await Axios.delete(`https://restedblog.herokuapp.com/justinfei/api/`);

export const updateBlogAsync = async (id: any, blog: any) => await Axios.post(`https://restedblog.herokuapp.com/justinfei/api/${id}`, blog);
