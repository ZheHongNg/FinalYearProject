import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../components/state';
import axios from 'axios';
import {
 Box,
 Divider,
 IconButton,
 Typography,
 useTheme,
 Button,
} from '@material-ui/core';
import {
 ChatBubbleOutlineOutlined,
 FavoriteBorderOutlined,
 FavoriteOutlined,
 ShareOutlined,
 DeleteOutlined,
} from '@material-ui/icons';
import FlexBetween from '../components/FlexBetween';
import WidgetWrapper from '../components/WidgetWrapper';
import { 
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogContent, 
    AlertDialogOverlay 
} from '@chakra-ui/react';



const EditPostPage = ({ userId, isProfile = false }) => {
 const dispatch = useDispatch();
 const posts = useSelector((state) => state.posts);
 const token = useSelector((state) => state.token);
 const [loading, setLoading] = useState(true);
 const [isOpen, setIsOpen] = useState(false);
 const loggedInUserId = useSelector((state) => state.user._id);
 const cancelRef = React.useRef();


 const getUserPosts = async () => {
   const response = await axios.get(
     `api/posts/${userId}/posts`,
     {
       headers: { Authorization: `Bearer ${token}` },
     }
   );
   dispatch(setPosts({ posts: response.data }));
   setLoading(false);
 };

 useEffect(() => {
     getUserPosts();
 }, []); // eslint-disable-line react-hooks/exhaustive-deps

 const handleDelete = async (postId) => {
   const response = await axios.delete(`api/posts/${postId}`, {
     headers: {
       Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json',
     },
   });
   if (response.status === 200) {
     // Refresh the posts list
   }
   setIsOpen(false);
 };

 if (loading) {
   return <div>Loading...</div>;
 }

 return (
   <>
     {Array.isArray(posts) &&
       posts.filter((post) => !post.isSuspend).map(
         ({
           _id,
           userId,
           name,
           description,
           location,
           picturePath,
           userPicturePath,
         }) => (
           <WidgetWrapper m="2rem 0" key={_id}>
             <Typography style={{ color: '#858585' }} sx={{ mt: '3rem' }}>
               {name}
             </Typography>
             <Typography style={{ color: '#858585' }} sx={{ mt: '2rem' }}>
               {description}
             </Typography>
             <FlexBetween mt="0.25rem">
               <FlexBetween gap="1rem">
                <IconButton onClick={() => setIsOpen(true)}>
                  <DeleteOutlined />
                </IconButton>
               </FlexBetween>
             </FlexBetween>
             <AlertDialog
               isOpen={isOpen}
               leastDestructiveRef={cancelRef}
               onClose={() => setIsOpen(false)}
             >
               <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Post
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure you want to delete this post?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={() => handleDelete(_id)} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
               </AlertDialogOverlay>
             </AlertDialog>
           </WidgetWrapper>
         )
       )}
   </>
 );
};

export default EditPostPage;
