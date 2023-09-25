import React, { useState, createContext } from "react";
import { useRouter } from "next/router";
import { auth, provider } from "../pages/api/main";
import { useToast } from "@chakra-ui/react";
import { signInWithPopup, signOut } from "firebase/auth";
import Cokkies from "js-cookie";
import "dotenv/config";

const AuthContext = createContext<any>(null);
const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const login = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const { uid, displayName, photoURL, email } = res.user;
      console.log(process.env.EMAIL);
      if (process.env.EMAIL === email) {
        const token = await res.user.getIdToken();
        Cokkies.set("token", token, { expires: 1 });
        setCurrentUser({
          id: uid,
          name: displayName,
          email: email,
          avatar: photoURL,
        });
        router.push("/admin-panel");
        setLoading(false);
      } else {
        router.push("/wpsadmin");
        setCurrentUser({});
        toast({
          title: "E-mail não autorizado",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Erro ao efetuar login",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      setCurrentUser({});
      Cokkies.remove("token");
      router.push("/wpsadmin");
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
