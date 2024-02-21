import React from 'react';
import { Grid } from '@material-ui/core';
import Post from './Post';
import * as actions from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import { postsStates$ } from '../../redux/selectors';

export default function PostList(){
    const dispath = useDispatch(); 
    const posts = useSelector(postsStates$);
    console.log('[PostList - posts]', posts);
    React.useEffect(()=>{
        dispath(actions.getPosts.getPostsRequest());
    }, [dispath]);

    return <Grid container spacing={2} alignItems='stretch'>
        {posts && posts.map(post => 
        <Grid item sx={12} sm={6}>
            <Post key={post._id}post={post}/>
        </Grid>)}
    </Grid>;
}