import React, { useEffect, useState } from "react";
import man from "../../../assets/images/dashboard/man.png";

const UserPanel = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  return (
    <div className="sidebar-user text-center">
      <div></div>
      <h6 className="mt-3 f-14">{user.name}</h6>
      <p>{user.role}</p>
      {/* <p>Wallet: ${user?.wallet}</p> */}
    </div>
  );
};

export default UserPanel;
