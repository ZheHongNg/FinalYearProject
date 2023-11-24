import {
  Box,
  Button,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';

const Sidebar = () => {
    const history = useHistory();
    const bg = useColorModeValue("white", "gray.800");

    return (
      <Box
        as="nav"
        aria-label="Main Navigation"
        pos="sticky"
        sx={{ overscrollBehavior: 'contain' }}
        top="0"
        w="280px"
        h="calc(((100vh - 1.5rem) * 100) / 100)"
        overflowY="auto"
        className="sidebar-content"
        flexShrink={0}
        bg={bg}
        mr={10}
      >
        <VStack spacing="1" align="stretch">
          <Button onClick={() => history.push('/chats')} colorScheme="teal" variant="ghost">Chat Page</Button>
          <Button onClick={() => history.push('/forum')} colorScheme="teal" variant="ghost">Forum Page</Button>
        </VStack>
      </Box>
    );
  };

  export default Sidebar;
