import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { auth } from "@/services/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import ErrorPage from "@/pages/components/ErrorPage";

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();
  const UID_ANGEL = "jKAhbmXafieIov2lxlkM1s24wOx1";

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const { uid, displayName, photoURL, email } = result.user;
        setCurrentUser({
          id: uid,
          name: displayName,
          email: email,
          photoUrl: photoURL,
        });
        console.log(currentUser, currentUser.id);

        if (currentUser.id !== UID_ANGEL) {
          setCurrentUser(null);
          toast({
            title: "Entrada não permitida!",
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
          return <></>;
        }

        router.push("/admin");

        toast({
          title: "Login com sucesso",
          status: "success",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Erro ao efetuar login",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        toast({
          title: "Desconectado",
          status: "error",
          duration: 2000,
          position: "top-right",
          isClosable: true,
        });
        router.push("/login");
      })
      .catch((err) => console.log("Error: ", err));
  };

  useEffect(() => {
    auth.onAuthStateChanged((data) => {
      if (data) {
        const { uid, displayName, photoURL, email } = data;

        if (!displayName || !photoURL)
          throw new Error("Usuário não tem photoURL ou displayName");
        if (uid === UID_ANGEL) {
          setCurrentUser({
            id: uid,
            name: displayName,
            email: email,
            photoUrl: photoURL,
          });
        }
      }
    });
  }, [setCurrentUser]);

  return (
    <AuthContext.Provider
      value={{ setCurrentUser, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
