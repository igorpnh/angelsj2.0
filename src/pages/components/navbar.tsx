import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import theme from "../../theme";
import { BsSun, BsMoon, BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="fixed" top="0" w="100%">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 0, md: 1 }}
          justify={{ base: "center", md: "start" }}
        >
          <Text
            as={"a"}
            href="/"
            whiteSpace="nowrap"
            fontFamily={theme.fonts.logo}
            fontSize="24px"
            color={useColorModeValue("gray.800", "white")}
          >
            Angel SemiJoias
          </Text>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={8}
        >
          <Stack direction={"row"}>
            <Button
              as={"a"}
              target="_blank"
              href="https://www.instagram.com/semijoiass.angel/"
            >
              <BsInstagram size={14} />
            </Button>
            <Button
              as={"a"}
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5514996408058&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20as%20semijoias"
            >
              <BsWhatsapp size={14} />
            </Button>
          </Stack>

          <Button
            display="inline-flex"
            color="white"
            bg={"pink.400"}
            onClick={toggleColorMode}
            _hover={{
              bg: "pink.300",
            }}
          >
            {colorMode === "light" ? <BsMoon size={14} /> : <BsSun size={14} />}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
