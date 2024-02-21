import { INIT_STATE } from "../../constans";
import { createPost, getPosts, getType, updatePost, deletePost, getPost } from "../actions";

export default function postReducers(state = INIT_STATE.posts, action){
    switch(action.type){
        case getType(getPosts.getPostsRequest):
            return{
                ...state,
                isLoading :true,
            }
        case getType(getPosts.getPostsSuccess):
            return{
            ...state,
            isLoading :false,
            data: action.payload
        }
        case getType(getPosts.getPostsFailure):
            return{
            ...state,
            isLoading :false,
        }
        case getType(getPost.getPostRequest):
            return{
                ...state,
                isLoading :true,
            }
        case getType(getPost.getPostSuccess):
            return{
            ...state,
            isLoading :false,
            data: [ action.payload]
        }
        case getType(getPost.getPostFailure):
            return{
            ...state,
            isLoading :false,
        }
        case getType(createPost.createPostSuccess):
            return{
            ...state,
            data: [...state.data, action.payload],
        }
        case getType(updatePost.updatePostSuccess):
            return{
            ...state,
            data: state.data.map(post => 
            post._id === action.payload._id ? action.payload : post
            ),
        }
        // case getType(deletePost.deletePostSuccess):
        //     return{
        //         ...state,
        //     isLoading: false,
        //     data: state.data.filter((post) => post._id !== action.payload._id),
        // }
        case getType(deletePost.deletePostRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(deletePost.deletePostSuccess):
            return {
                ...state,
                isLoading: false,
                data: state.data.filter(post => post._id !== action.payload._id),
            };
        case getType(deletePost.deletePostFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}