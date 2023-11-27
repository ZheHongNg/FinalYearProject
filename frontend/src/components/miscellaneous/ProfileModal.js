import { ViewIcon } from "@chakra-ui/icons";
import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalFooter,
 ModalBody,
 ModalCloseButton,
 Button,
 useDisclosure,
 IconButton,
 Text,
 Image,
 FormControl,
 Input,
 FormLabel,
} from "@chakra-ui/react";
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

const ProfileModal = ({ user, children }) => {
 const { isOpen, onOpen, onClose } = useDisclosure();
 const [username, setUsername] = useState(user.name);
 const [isEditable, setIsEditable] = useState(false);
 const { _id } = useSelector((state) => state.user);
 const dispatch = useDispatch();

 const handleUsernameChange = (event) => {
   setUsername(event.target.value);
 };

 const updateUsername = async (id, newUsername) => {
   try {
     const response = await axios.put(`/api/user/${id}/username`, { username: newUsername });
     return response.data;
   } catch (error) {
     console.error('Failed to update username:', error);
   }
 };

 return (
   <>
     {children ? (
       <span onClick={onOpen}>{children}</span>
     ) : (
       <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
     )}
     <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
       <ModalOverlay />
       <ModalContent h="410px">
         <ModalHeader
           fontSize="40px"
           fontFamily="Work sans"
           d="flex"
           justifyContent="center"
         >
           <FormControl>
             <FormLabel onClick={() => setIsEditable(true)}>{user.name}</FormLabel>
             <Input 
               value={isEditable ? username : undefined} 
               onChange={isEditable ? handleUsernameChange : undefined} 
             />
           </FormControl>
         </ModalHeader>
         <ModalCloseButton />
         <ModalBody
           d="flex"
           flexDir="column"
           alignItems="center"
           justifyContent="space-between"
         >
           <Image
             borderRadius="full"
             boxSize="150px"
             src={user.pic}
             alt={user.name}
           />
           <Text
             fontSize={{ base: "28px", md: "30px" }}
             fontFamily="Work sans"
           >
             Email: {user.email}
           </Text>
         </ModalBody>
         <ModalFooter>
         <Button mr={3}
            onClick={() => {
            updateUsername(_id, {username}).then(() => {
            setIsEditable(false);
            });
          }}>Update
          </Button>

           <Button onClick={onClose}>Close</Button>
         </ModalFooter>
       </ModalContent>
     </Modal>
   </>
 );
};

export default ProfileModal;