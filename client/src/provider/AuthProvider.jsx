import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/Firebase.init";
import UseAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = UseAxiosPublic();
  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    setLoading(false);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };


  const saveUser = async (user) => {
    const currentUser = {
      name: user?.displayName,
      email: user?.email,
      image_url: user?.photoURL,
      role: "user",
      status: "Verified",
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/users`,
      currentUser
    );
    console.log(data);
    setLoading(false);
    return data;
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      saveUser(currentUser);
      if (currentUser) {
        
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            
            setLoading(false);
          }
        });
      } else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
