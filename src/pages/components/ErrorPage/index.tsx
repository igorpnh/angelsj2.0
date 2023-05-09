import { Center, Flex, VStack } from "@chakra-ui/react";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <Flex justify={"center"} h={"100vh"}>
      <Center>
        <VStack>
          <Image width="400" height="400" src="/404-Error.svg" alt="Error" />
        </VStack>
      </Center>
    </Flex>
  );
};

export default ErrorPage;
