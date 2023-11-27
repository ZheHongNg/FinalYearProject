import { Box, useMediaQuery } from "@material-ui/core";
import { useSelector } from "react-redux";
import PostsWidget from "../widgets/PostsWidget";
import Sidebar from "../../sidenav";
import SideDrawer from "../../miscellaneous/SideDrawer";
import { ChatState } from "../../../Context/ChatProvider";
const EditPostPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { user } = ChatState();

  
    return (  
        
    <Box width="100%">
      {user && <SideDrawer />}
      <Box
        width="100%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        
        <Sidebar 
          position="sticky"
           top={0}
          height="100vh"/>
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default EditPostPage;
