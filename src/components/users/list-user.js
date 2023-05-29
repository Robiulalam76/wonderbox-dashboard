import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Table } from "react-bootstrap";

const List_user = () => {
  const [user, setUser] = useState([]);


  const getUsers = () => {
    fetch("http://localhost:5000/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }

  const handleDelete = (id) => {
    const usr = localStorage.getItem("user-id");
    if (window.confirm("Are you really want to delete this user?")) {
      fetch(`http://localhost:5000/api/user/${id}/${usr}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          getUsers()
        });
    }
  };

  const handleVerifyUser = (id) => {
    if (window.confirm("Are you really want him to make Verified?")) {
      fetch(`http://localhost:5000/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ verified: "true" })
      })
        .then((res) => res.json())
        .then((data) => {
          getUsers()
        });
    }
  };

  const handleMakeSeller = (id) => {
    if (window.confirm("Are you really want him to make seller?")) {
      fetch(`http://localhost:5000/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ role: "seller" })
      })
        .then((res) => res.json())
        .then((data) => {
          getUsers()
        });
    }
  };

  const handleMakeBuyer = (id) => {
    if (window.confirm("Are you really want him to make buyer?")) {
      fetch(`http://localhost:5000/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ role: "buyer" })
      })
        .then((res) => res.json())
        .then((data) => {
          getUsers()
        });
    }
  };

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader className="d-flex justify-content-between py-2">
            <h5>User Details</h5>
            <Link to="/users/create-user" className="btn btn-secondary py-1 px-1">
              Create User
            </Link>
          </CardHeader>
          <CardBody className="py-2">

            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              {/* <Datatable
                multiSelectOption={"user"}
                myData={user}
                pageSize={10}
                pagination={true}
                class="-striped -highlight"
              /> */}
              <Table striped bordered hover>
                <thead className="bg-info" >
                  <tr>
                    <th  >#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Wallet</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user &&
                    user.map((item, idx) => (
                      <tr key={idx}>
                        <td >{idx + 1}</td>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>$ {item?.wallet}</td>
                        {/* <td>
                          <div className="">
                            <img
                              src={item?.image}
                              alt=""
                              height={70}
                              className=""
                            />
                          </div>
                        </td> */}
                        <td>{item?.role}</td>
                        <td style={{ width: "100px" }}>
                          {
                            item?.verified === "true" ? (
                              <button
                                className="btn btn-success btn-sm px-1 py-0"
                              >
                                Verified
                              </button>
                            )
                              :
                              <button
                                className="btn btn-warning btn-sm px-1 py-0"
                                onClick={() => handleVerifyUser(item._id)}
                              >
                                Unverifed
                              </button>
                          }
                        </td>
                        {/* <td>
                          <span
                            className={`border px-2 py-1 rounded ${
                              item.status === true && "bg-success"
                            } ${item.rejected === true && "bg-danger"} ${
                              item.status === false &&
                              item.rejected === false &&
                              "bg-warning"
                            } text-light`}
                          >
                            {item?.status === true && "Accepted"}
                            {item?.rejected === true && "Rejected"}
                            {item?.status === false &&
                              item?.rejected === false &&
                              "Pending"}
                          </span>
                        </td> */}
                        <td style={{ width: "180px" }}>
                          <div className="d-flex gap-2 justify-content-center" >
                            {
                              item?.role === "seller" && <button
                                className="btn btn-secondary btn-sm px-1 py-0"
                                onClick={() => handleMakeBuyer(item._id)}
                              >
                                Make Buyer
                              </button>
                            }
                            {
                              item?.role === "buyer" && <button
                                className="btn  btn-secondary btn-sm px-1 py-0"
                                onClick={() => handleMakeSeller(item._id)} >
                                Make Seller
                              </button>
                            }

                            {item?.role !== "admin" && (
                              <button
                                className="btn btn-primary btn-sm px-1 py-0"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default List_user;
