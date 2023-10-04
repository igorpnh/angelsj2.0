import ProductCard from "@/components/ProductCard";
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
  FormControl,
  FormLabel,
  Switch,
  useToast,
  Center,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineEdit,
  AiOutlineClose,
  AiOutlineEye,
  AiOutlinePlus,
} from "react-icons/ai";
import { db, storage } from "./api/main";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  infinite: true,
  slidesToShow: 5, // Define quantos slides serão mostrados ao mesmo tempo
  slidesToScroll: 1,
  // Outras opções de personalização, como autoplay, podem ser adicionadas aqui
};

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

  const [promotion, setPromotion] = useState(false);
  const toast = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [imagesUrl, setImagesUrl] = useState<null | string>(null);

  const handleUpdate = async (e: any) => {
    const product = {
      isPromotion: e.target.isPromotion.checked,
      imageURL: "",
      name: e.target.name.value,
      description: e.target.description.value,
      price: Number(e.target.price.value),
      promotionPrice: Number(e.target.promotionPrice.value),
    };
    let fieldToEdit = doc(db, "notes", selectedProduct.id);
    await updateDoc(fieldToEdit, product)
      .then(() => {
        toast({
          title: `Nota editada com sucesso!`,
          position: "top-right",
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: `Erro ao editar a nota :(`,
          position: "top-right",
          status: "error",
          isClosable: true,
        });
      });
    onClose();
  };

  let imagesUrlArray: string[] = [];

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const product = {
      isPromotion: e.target.isPromotion.checked,
      imageURL: imagesUrlArray,
      name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value,
      promotionPrice: promotion ? e.target.promotionPrice.value : "",
    };

    try {
      const docRef = await addDoc(collection(db, "products"), product);
      handleUpload();
      onClose();
      return docRef.id;
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      throw error;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target?.files;
    if (selectedFiles) {
      const newImages: File[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        newImages.push(selectedFiles[i]);
      }
      setImages([...images, ...newImages]);
    }
  };

  const handleUpload = async () => {
    try {
      if (images.length === 0) {
        toast({
          title: "Nenhuma imagem selecionada",
          status: "error",
          duration: 3000,
        });
        return;
      }

      for (const image of images) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);

        // Obter a URL de download da imagem
        const downloadUrl = await getDownloadURL(storageRef);

        imagesUrlArray.push(downloadUrl);

        // Aqui, você pode salvar a URL de download junto com o produto

        toast({
          title: "Upload concluído",
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      toast({
        title: "Erro ao fazer upload da imagem",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Modal isCentered size={"6xl"} isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={selectedProduct !== null ? handleUpdate : handleAdd}>
        <ModalContent>
          <ModalHeader>
            {selectedProduct ? "Editar Produto" : "Adicionar Produto"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={5}>
              <Flex direction={"column"}>
                <FormControl>
                  <FormLabel>Título</FormLabel>
                  <Input name="name" defaultValue={selectedProduct?.name} />
                </FormControl>
                <FormControl>
                  <FormLabel>Descrição</FormLabel>
                  <Input
                    name="description"
                    defaultValue={selectedProduct?.description}
                  />
                </FormControl>
                <Flex gap={5}>
                  <FormControl>
                    <FormLabel>Preço</FormLabel>
                    <Input name="price" defaultValue={selectedProduct?.price} />
                  </FormControl>
                  {promotion ? (
                    <FormControl>
                      <FormLabel>Preço promocional</FormLabel>
                      <Input
                        name="promotionPrice"
                        defaultValue={selectedProduct?.promotionPrice}
                      />
                    </FormControl>
                  ) : null}
                </Flex>

                <FormControl>
                  <FormLabel>Promoção?</FormLabel>
                  <Switch
                    name="isPromotion"
                    defaultValue={selectedProduct?.isPromotion}
                    onChange={() => setPromotion(!promotion)}
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel>Imagens</FormLabel>
                <Input
                  name="imageURL"
                  type="file"
                  accept="image/*"
                  multiple
                  defaultValue={selectedProduct?.imageURL}
                  onChange={handleImageChange}
                />
                <Flex h={"full"} justify={"center"} width={"full"}>
                  <Slider {...settings}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    ))}
                  </Slider>
                </Flex>
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant="ghost" type="submit">
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

const AdminPanel = () => {
  const { logout } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [products, setProducts] = useState<Array<any>>([]);

  const handleOpenProductModal = (product: any) => {
    setOpenModal(!openModal);
    setSelectedProduct(product);
  };

  useEffect(() => {
    if (!currentUser) {
      setProducts([]);
    }
    const getData = async () => {
      await getDocs(collection(db, "products")).then((response) => {
        return setProducts(
          response.docs
            .map((data) => {
              return { ...data.data(), id: data.id };
            })
            .filter((note: any) => {
              return note.userId === currentUser?.uid;
            })
        );
      });
    };
    getData();
  }, [openModal, currentUser]);

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
        {products.map((product, i) => (
          <ProductCard key={i} data={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdminPanel;
