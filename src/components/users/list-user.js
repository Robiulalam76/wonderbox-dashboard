import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Table } from "react-bootstrap";

const List_user = () => {
  const [user, setUser] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm("Are you really want to delete this user?")) {
      fetch(`http://localhost:5000/api/user/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            window.location.reload(true);
          }
        });
    }
  };

  const handleMakeSeller = (id) => {
    if (window.confirm("Are you really want him to make seller?")) {
      fetch(`http://localhost:5000/api/user/seller/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.location.reload(true);
          }
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>User Details</h5>
          </CardHeader>
          <CardBody>
            <div className="btn-popup pull-right">
              <Link to="/users/create-user" className="btn btn-secondary">
                Create User
              </Link>
            </div>
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
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Wallet</th>
                    <th>Role</th>
                    {/* <th>Status</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user &&
                    user.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
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
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <>
                              {item?.role === "admin" ||
                                item?.role === "seller" ? (
                                ""
                              ) : (
                                <button
                                  className="btn  btn-secondary btn-sm"
                                  onClick={() => handleMakeSeller(item._id)}
                                >
                                  Make Seller
                                </button>
                              )}
                              {item?.role === "admin" ? (
                                ""
                              ) : (
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  Delete
                                </button>
                              )}
                            </>
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
