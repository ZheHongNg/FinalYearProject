import * as React from "react";
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Container, useMediaQuery} from "@chakra-ui/react";
import UsersTable from "../components/miscellaneous/UsersTable";
import PostsTable from "../components/miscellaneous/PostsTable";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import Sidebar from "../components/sidenav";

function AdminPage() {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return (
        <Box width="100%">
            <SideDrawer />
            <Box width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >

            
            <Sidebar 
                position="sticky"
                top={0}
                right="-50px"
                height="100%"
                width="100%"
           />
            <Box 
                width="100%"
                padding="2rem 6%"
                
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between">
            <Tabs isFitted variant="enclosed" width="100%" backgroundColor="white">
            <TabList mb="1em">
                <Tab>Users</Tab>
                <Tab>Posts</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <UsersTable />
                </TabPanel>
                <TabPanel>
                <PostsTable />
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
        </Box>
        </Box>
      
    );
  }

export default AdminPage;
