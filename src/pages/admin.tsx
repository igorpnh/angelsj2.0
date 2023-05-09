import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Center,
  Text,
  Button,
  Box,
  IconButton,
  HStack,
  VStack,
  Avatar,
  Heading,
  Flex,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/navbar";
import { AiOutlineUserAdd } from "react-icons/ai";
import ProductModal from "./components/ProductModal";

const Admin = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpenProductModal = () => {
    setOpen(!open);
  };

  const bg = useColorModeValue("gray.200", "gray.900");
  useEffect(() => {
    if (!currentUser) {
      console.log("Sem usuário");
      router.push("/login");
    }
  }, []);

  if (currentUser) {
    return (
      <>
        <Navbar />
        <ProductModal open={open} setOpen={setOpen} />
        <Flex h={"full"} mt={"4rem"}>
          <Flex align={"start"} justify={"flex-start"} h={"85vh"} w={"full"}>
            <Flex w={"full"} gap={8} direction={"column"} m={"6rem"}>
              <Button leftIcon={<AiOutlineUserAdd fontSize={20}/>} onClick={() => handleOpenProductModal()}>Adicionar Produto</Button>
              <Table w={"full"}>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>NOME</Th>
                    <Th>CATEGORIA</Th>
                    <Th>PREÇO</Th>
                  </Tr>
                </Thead>
              </Table>
            </Flex>
          </Flex>
          <Flex justify={"center"} h={"85vh"} w={"full"}>
            <Center>
              <VStack spacing={4} p={6} bg={bg} rounded={"lg"}>
                <Avatar size={'xl'} src={currentUser.photoUrl} />
                <Heading>{currentUser.name}</Heading>
                <Text>{currentUser.email}</Text>
                <Button onClick={() => logout()}>Sair</Button>
              </VStack>
            </Center>
          </Flex>
        </Flex>
      </>
    );
  }
  return <ErrorPage />;
};

export default Admin;
