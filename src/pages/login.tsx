import {
  Container,
  Text,
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Navbar from "./components/navbar";
import theme from "@/theme";
import { BsGoogle } from "react-icons/bs";
import { auth } from "@/services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function Login() {
  const toast = useToast();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user
        console.log(user.displayName)

    });
    toast({
      title: "Login com sucesso",
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>

        <Navbar />
        <Container fontFamily={theme.fonts.body} m="0 auto" maxW={"6xl"}>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Entre na sua conta</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  para inserir e gerenciar catálogos ✌️
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Button
                  leftIcon={<BsGoogle />}
                  w="100%"
                  bg={"pink.400"}
                  color={"white"}
                  _hover={{
                    bg: "pink.300",
                  }}
                  onClick={handleGoogleLogin}
                >
                  Entre com Google
                </Button>
              </Box>
            </Stack>
          </Flex>
        </Container>
    </>
  );
}
