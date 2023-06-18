import React, { createContext, useEffect, useState } from "react";

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

  const authInfo = {
    user,
    userRefetch,
    setUser,
    categories,
    stores,
    refetchStores,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
