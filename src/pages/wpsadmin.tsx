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
import { BsGoogle } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login();
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")}>
      <Container m="0 auto" maxW={"6xl"}>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
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
                onClick={handleLogin}
              >
                Entre com Google
              </Button>
            </Box>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
