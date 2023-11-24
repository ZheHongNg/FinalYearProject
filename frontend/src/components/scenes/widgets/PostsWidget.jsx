import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import axios from 'axios';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(true);
  const getPosts = async () => {
    const response = await axios.get("api/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts({ posts: response.data }));
    setLoading(false);
  };

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
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
   return <div>Loading...</div>;
  }
  return (
    <>
      {Array.isArray(posts) && posts.filter(post=> !post.isSuspend).map(
        ({
          _id,
          userId,
          name,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${name}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
      
    </>
  );
};

export default PostsWidget;
