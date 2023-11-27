import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined
} from "@material-ui/icons";
import { Box, Divider, IconButton, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";
import FlexBetween from "../../FlexBetween";
import WidgetWrapper from "../../WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import axios from 'axios';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,

}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/posts/${postId}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setPosts({ posts: response.data }));
      handleClose();
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WidgetWrapper m="2rem 2rem">
      <Typography style={{color: '#858585' }} sx={{ mt: "3rem" }}>
        {name}
      </Typography>
      <Typography style={{color: '#858585' }} sx={{ mt: "2rem" }}>
        {description}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleOpen}>
              <DeleteOutlined />
            </IconButton>
            <Typography>Delete</Typography>
          </FlexBetween>
        </FlexBetween>

      </FlexBetween>
      <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
     >
       <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
       <DialogContent>
         <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete this post?
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleClose} color="primary">
           Cancel
         </Button>
         <Button onClick={handleDelete} color="primary" autoFocus>
           Delete
         </Button>
       </DialogActions>
     </Dialog>
    </WidgetWrapper>
  );
};

export default PostWidget;
