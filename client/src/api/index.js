import axios from 'axios';

const URL = "http://localhost:5000";

export const fetchPosts = () => axios.get(`${URL}/posts`)
export const createPost = (payload) => axios.post(`${URL}/posts/create`, payload);
export const updatePost = (payload) => axios.post(`${URL}/posts/update`, payload);
export const getPost = (payload) => axios.post(`${URL}/posts/post/${payload}`);

// export const deletePost = (payload) => axios.post(`${URL}/posts/delete`, payload);
export const deletePost = (postId) => axios.post(`${URL}/posts/delete/${postId}`);