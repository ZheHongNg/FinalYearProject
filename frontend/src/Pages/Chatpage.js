import { Box } from "@chakra-ui/layout";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import Sidebar from "../components/sidenav";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const location = useLocation();
  const { user } = ChatState();
  
  useEffect(() => {
    setFetchAgain(true);
  }, [location]);
 
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
      
      <Sidebar />
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
