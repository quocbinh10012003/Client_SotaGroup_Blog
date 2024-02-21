import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField, TextareaAutosize } from "@material-ui/core";
import React, {useState} from 'react';
import {useSelector, useDispatch} from  'react-redux';
import { modalUpdateState$, postsStates$ } from "../../redux/selectors";
import useStyles from './styles';
import FileBase64 from 'react-file-base64';
import { updatePost, hideModalUpdate} from "../../redux/actions";

// import Post from './Post';
// import { postsStates$ } from '../../redux/selectors';
// import * as actions from '../../redux/actions';

export default function UpdatePostModal( {post}){
    const post2 = useSelector(postsStates$)
    console.log(post2);
    // console.log("post content: ", post.content)
    // const dispathpost = useDispatch(); 
    // const posts = useSelector(postsStates$);
    // console.log('[PostList - posts]', posts);

    
    const {isShowUpdate} = useSelector(modalUpdateState$);
    const classes = useStyles();
    const dispath = useDispatch();
    const dispathUpdate = useDispatch();
    const [data, setData] = React.useState({
        title: '',
        content: '',
        attachment: '',
    });
    const onClose = React.useCallback(()=>{
        dispath(hideModalUpdate());
        setData({
            title: '',
            content: '',
            attachment: '',
        })
    }, [dispath]);
    const onSubmit =React.useCallback(()=>{
        const updatedAttachment = data.attachment ? data.attachment : post2[0].attachment;
        const updatedTitle = data.title ? data.title : post2[0].title;
        const updatedContent = data.content ? data.content : post2[0].content;

        dispathUpdate(updatePost.updatePostRequest({_id: post2[0]._id, // Chắc chắn truyền vào _id để xác định post cần cập nhật
        title: updatedTitle,
        content: updatedContent,
        attachment: updatedAttachment}))
        // dispath(hideModalUpdate());
        setDeleteSuccessModalOpen(true);
    },[dispath, dispathUpdate, post2, data]);

    // Hien thi thong bao sua thanh công
    const [isDeleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);

    const handleCloseDeleteSuccessModal = (() => {
        setDeleteSuccessModalOpen(false);
        dispath(hideModalUpdate());
        // hideModalUpdate();
    });

    // Modal sua thanh cong
    const DeleteSuccessModal = ({ open, onClose }) => {
        return (
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Sửa thành công</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bài viết đã được sửa thành công.
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
    const body =(
        <div className={classes.paper} id="simple-modal-title">
            <h2>Update Post</h2>
            <form noValidate autoComplete="off" className={classes.form}>
                <TextField 
                className={classes.title} 
                required label="Title" 
                value={data.title || post2[0].title} 
                onChange={(e) => setData({...data, title: e.target.value})}/>
                <TextareaAutosize 
                className={classes.textarea} 
                minRows={10} maxRows={15} 
                placeholder='content' 
                value={data.content || post2[0].content}
                onChange={(e) => setData({...data, content: e.target.value})}/>
                <img className={classes.imageUpdate} src={post2[0].attachment}/>
                <FileBase64 
                accept="image/*" 
                multiple={false} 
                type='file'
                value ={data.attachment}
                onDone ={({base64}) => setData({...data, attachment: base64})}/>
                
                <div className={classes.footer}>
                    <Button 
                    variant='contained' 
                    color='primary' 
                    component='span' 
                    fullWidth
                    onClick={onSubmit}
                    >Update</Button>
                </div>
                <DeleteSuccessModal
                open={isDeleteSuccessModalOpen}
                onClose={handleCloseDeleteSuccessModal}
                />
            </form>
        </div>
    )
    return (<div>
        <Modal open={isShowUpdate} onClose={onClose}>
            {body}
        </Modal>
    </div>
    );
}