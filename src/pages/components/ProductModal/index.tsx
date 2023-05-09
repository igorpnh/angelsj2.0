import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";

interface ProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProductModal = ({ open, setOpen }: ProductModalProps) => {
  const { isOpen, onClose } = useDisclosure({
    isOpen: open,
    onClose() {
      setOpen(!open);
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Heading pt={4} textAlign={"center"} fontSize={"xx-large"}>
              Deseja realmente excluir esse contato?
            </Heading>
          </ModalHeader>

          <ModalBody>
            <Text textAlign={"center"} fontSize={"xs"}>
              Esta ação não poderá ser revertida e todas as conversas serão
              perdidas
            </Text>
          </ModalBody>

          <ModalFooter>
            <Center w="100%" gap={2}>
              <Button
                
                colorScheme="gray"
                w="full"
                onClick={onClose}
              >
                Fechar
              </Button>
              <Button
                w="full"
                bg="blue.500"
                colorScheme="blue"
/*                 onClick={() => handleDeleteContact(selectedContact)}
 */              >
                Deletar
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
