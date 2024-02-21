import React, {useState} from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Button, IconButton, Typography, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions  } from '@material-ui/core';
// import {MoreVertIcon} from '@material-ui/icons/MoreVert';
import MoreVertIcon from '@material-ui/icons/MoreVert'; 
// import {FavoriteIcon} from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, deletePost, getPost } from '../../../redux/actions';
import sotaLogo from './sota-logo1.jpg';
import UpdatePostModal from '../../UpdatePostModal';
import * as actions from '../../../redux/actions';

import { showModalUpdate } from '../../../redux/actions';
import { postsStates$ } from '../../../redux/selectors';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// export default MyCard;
export default function Post( {post} ){
    
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [renderContentPost, setRenderContentPost] = useState()
    const [isDeleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    // Không xóa nữa No
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };
    // Bấm xóa
    const handleDelete = () => {
        setDeleteModalOpen(true);
    };


    
    // Tiếp tục xóa Yes
    const handleDeleteConfirmed = () => { 
        console.log("ID de xoa la:", post._id);
        setDeleteSuccessModalOpen(true);
        dispatch(deletePost.deletePostRequest(post._id));
    };
    // Bấm Update
    const dispathUp = useDispatch();
    const openUpdatePostModal = React.useCallback(()=> {
        dispathUp(showModalUpdate());
        dispatch(getPost.getPostRequest(post._id));
    }, [dispathUp, dispatch]);

    // Bấm Like
    const classes = useStyles();
    const onLikeBtnClick = React.useCallback(()=>{
        dispatch(updatePost.updatePostRequest({...post, likeCount: post.likeCount + 1}))
    }, [dispatch, post]);

    // Modal xoa thanh cong
    const DeleteSuccessModal = ({ open, onClose }) => {
        return (
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xóa thành công</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bài viết đã được xóa thành công.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        );
    };
    const handleCloseDeleteSuccessModal = () => {
        setDeleteSuccessModalOpen(false);
    };
    // Modal xác nhận xóa
    const DeleteConfirmationModal = ({ open, onClose, onDeleteConfirmed, post }) => {
        const handleConfirm = () => {
          onDeleteConfirmed(post._id);
          onClose();
        };
        return (
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bạn có chắc chắn muốn xóa bài viết này không?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Không</Button>
              <Button onClick={handleConfirm} autoFocus>
                Có
              </Button>
            </DialogActions>
          </Dialog>
        );
    };
    return <Card>
        <CardHeader avatar={<Avatar src={sotaLogo}></Avatar>}
        title= {post.author}
        subheader={moment(post.updatedAt).format('HH:MM MM DD, YYYY')}
        action={<IconButton onClick={handleClick}>
            <MoreVertIcon />
        </IconButton>}/>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            {/* Modal xác nhận xóa */}
            <DeleteConfirmationModal
                open={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onDeleteConfirmed={handleDeleteConfirmed}
                post={post}
            />
            <DeleteSuccessModal
                open={isDeleteSuccessModalOpen}
                onClose={handleCloseDeleteSuccessModal}
            />
            <MenuItem onClick={openUpdatePostModal}>Update</MenuItem>
        </Menu>
        
        <CardMedia image={post.attachment} title="Title" className={classes.media}/>
        <CardContent>
            <Typography variant='h5' color='textPrimary'>{post.title}</Typography>
            <Typography variant='body2' component="p" color='textSecondary'>{post.content}</Typography>
        </CardContent>
        <CardActions>
            <IconButton onClick={onLikeBtnClick}>
                <FavoriteIcon/>
                {/* style={{ color: isFavorite ? 'red' : 'black' }} */}
            </IconButton>
                <Typography component="span" color='textSecondary'>{post.likeCount}</Typography>
        </CardActions>
        <UpdatePostModal post={renderContentPost}/>
    </Card>;
}

