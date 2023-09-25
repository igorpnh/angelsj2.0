import { AuthContext } from "@/context/AuthContext";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  VStack,
  Image,
  ButtonGroup,
  HStack,
  IconButton,
  Tooltip,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineEdit,
  AiOutlineClose,
  AiOutlineEye,
  AiOutlinePlus,
} from "react-icons/ai";

interface ProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedProduct: any;
}

const AddProductModal = ({
  open,
  setOpen,
  selectedProduct,
}: ProductModalProps) => {
  const { isOpen, onClose } = useDisclosure({
    isOpen: open,
    onClose() {
      setOpen(!open);
    },
  });
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button variant="ghost">Adicionar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const AdminPanel = () => {
  const { logout } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenProductModal = (product: any) => {
    setOpenModal(!open);
    setSelectedProduct(product);
  };

  return (
    <Box p={4} w={"full"} h={"100vh"}>
      <AddProductModal
        open={openModal}
        selectedProduct={selectedProduct}
        setOpen={setOpenModal}
      />
      <Flex px={5} alignItems={"center"} justify={"space-between"}>
        <Box h={"fit-content"}>
          <Heading size={"2xl"} color={"pink.400"}>
            Produtos
          </Heading>
        </Box>
        <Flex direction={"row"} mt={6} gap={4}>
          <InputGroup maxW={"md"}>
            <Input
              placeholder="Digite para buscar..."
              w={"100%"}
              type="search"
              //   onChange={(e) => setSearch(e.target.value)}
              //   value={search}
            />
            <InputRightElement>
              <AiOutlineSearch />
            </InputRightElement>
          </InputGroup>
          <Button
            bg="pink.400"
            _hover={{ background: "pink.200" }}
            w={"70%"}
            leftIcon={<AiOutlinePlus fontSize={"20"} />}
            onClick={() => handleOpenProductModal(null)}
          >
            Adicionar produto
          </Button>
          <Button
            bg="pink.400"
            _hover={{ background: "pink.200" }}
            w={"20%"}
            // leftIcon={<AiOutlinePlus fontSize={"20"} />}
            onClick={() => logout()}
          >
            Sair
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid mt={20} columns={4}>
        <Box borderRadius="20px" p={2} pb={4} bg="blackAlpha.400">
          <VStack>
            <Heading py={2} size={"md"}>
              Título do produto
            </Heading>
            <Image
              maxW={"300px"}
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
            <Flex w="100%" justify={"space-between"} px={2}>
              <Tooltip label="Visualizar">
                <IconButton
                  aria-label="Visualizar"
                  icon={<AiOutlineEye fontSize={"20"} />}
                />
              </Tooltip>
              <HStack>
                <Tooltip label="Editar">
                  <IconButton
                    aria-label="Editar"
                    icon={<AiOutlineEdit fontSize={"20"} />}
                  />
                </Tooltip>
                <Tooltip label="Remover">
                  <IconButton
                    aria-label="Remover"
                    icon={<AiOutlineClose fontSize={"20"} />}
                  />
                </Tooltip>
              </HStack>
            </Flex>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AdminPanel;
