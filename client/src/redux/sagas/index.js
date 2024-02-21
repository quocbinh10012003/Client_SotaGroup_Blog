import { takeLatest, call, put} from "redux-saga/effects";
import * as actions from '../actions';
import * as api from '../../api';


function* fetchPostsSaga(action){
    try {
        const posts = yield call(api.fetchPosts);
        // console.log('[posts]', posts);
        yield put(actions.getPosts.getPostsSuccess(posts.data));
    } catch (err) {
        console.log(err);
        yield put(actions.getPosts.getPostsFailure(err));
    }
}

function* createPostSaga(action){
    try {
        const post = yield call(api.createPost, action.payload);
        console.log('[create-posts]', post);
        yield put(actions.createPost.createPostSuccess(post));
    } catch (err) {
        console.log(err);
        yield put(actions.createPost.createPostFailure(err));
    }
}

function* updatePostSaga(action){
    try {
        const updatedPost = yield call(api.updatePost, action.payload);
        console.log('[dang update post]', updatedPost);

        yield put(actions.updatePost.updatePostSuccess(updatedPost.data));
        console.log("update sa ga thanh cong roi ne", updatedPost.data);
    } catch (err) {
        console.log(err);
        yield put(actions.updatePost.updatePostFailure(err));
    }
}
function* getPostSaga(action){
    try {
        const posts = yield call(api.getPost, action.payload.payload);
        console.log('[posts]', posts);
        yield put(actions.getPost.getPostSuccess(posts.data));
    } catch (err) {
        console.log(err);
        yield put(actions.getPost.getPostFailure(err));
    }
}

function* deletePostSaga(action) {
    try {
        const { postId } = action.payload;
        const deletedPost = yield call(api.deletePost, postId);
        // co lay dc id
        yield put(actions.deletePost.deletePostSuccess(deletedPost.data));
        console.log("delete sa ga thanh cong roi ne", deletedPost.data);
    } catch (err) {
        console.log(err);
        yield put(actions.deletePost.deletePostFailure(err));
    }
}

function* mySaga(){
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
    yield takeLatest(actions.getPost.getPostRequest, getPostSaga);
    yield takeLatest(actions.deletePost.deletePostRequest, deletePostSaga);
}
//generator function ES6
export default mySaga;