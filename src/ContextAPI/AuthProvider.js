import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import errSound from "../assets/audios/error.mp3";

export const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user-id");

  // console.log(user);
  const userRefetch = () => {
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  const refetchStores = () => {
    fetch(`http://localhost:5000/api/store/getAllStores/byrole/${userId}`)
      .then((res) => res.json())
      .then((data) => setStores(data));
  };

  useEffect(() => {
    userRefetch();
    refetchStores();
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/category/show`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const openToast = (status, message) => {
    var audio = new Audio(errSound);
    if (status === "warning" || status === "error") {
      audio.play();
    }
    const notify =
      (status === "success" && toast.success) ||
      (status === "error" && toast.error) ||
      (status === "warning" && toast.warning);
    notify(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const authInfo = {
    user,
    userRefetch,
    setUser,
    loading,
    categories,
    stores,
    refetchStores,
    openToast,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
