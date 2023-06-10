import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumb, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardBody, CardHeader } from "reactstrap";
import AddCategory from "./AddCategory";

const AllCategory = () => {
  const usr = localStorage.getItem("user-id");
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const getCategories = () => {
    fetch(`http://localhost:5000/api/category/getAllCategories/byRole/${usr}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  const handleUpdateStatus = (id, status) => {
    if (user?.role === "admin") {
      fetch(`http://localhost:5000/api/category/status/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      })
        .then((res) => res.json())
        .then((data) => {
          getCategories();
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleDelete = (id) => {
    const agree = window.confirm("Are you Sure!");
    if (agree && user?.role === "admin") {
      fetch(`http://localhost:5000/api/category/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getCategories();
        });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [usr]);
  return (
    <Fragment>
      {!category && (
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <Link to="/category/add" className="">
                  <button className="btn btn-primary">
                    {user?.role === "seller"
                      ? "Category Request"
                      : "Create Category"}
                  </button>
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              {categories.length > 0 ? (
                <table className="table table-responsive">
                  <thead
                    className="py-2"
                    style={{ backgroundColor: "lightgrey" }}
                  >
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Children</th>
                      <th>Type</th>
                      <th>Status</th>
                      {user?.role === "admin" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category._id}>
                        <td>
                          <img
                            style={{ width: "25px", height: "25px" }}
                            src={category.image}
                            alt="category"
                          />
                        </td>
                        <td>{category.parent}</td>
                        <td>{category.children?.length}</td>
                        <td>{category.type}</td>
                        <td>
                          <div
                            onClick={() =>
                              handleUpdateStatus(
                                category?._id,
                                category.status === "Show" ? "Hide" : "Show"
                              )
                            }
                            class="form-check form-switch"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckChecked"
                              checked={
                                category.status === "Show" ? true : false
                              }
                            />
                          </div>
                        </td>
                        {user?.role === "admin" && (
                          <td>
                            <button
                              className="btn-sm btn-danger me-2"
                              onClick={() => handleDelete(category._id)}
                            >
                              X
                            </button>
                            <button
                              type="button"
                              className="btn-sm btn-primary"
                              onClick={() => setCategory(category)}
                              data-toggle="modal"
                              data-target=".bd-example-modal-lg"
                            >
                              edit
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="d-flex justify-content-center">
                  <img
                    className="w-25"
                    src="https://nagadhat.com.bd/public/images/no-product-found.png"
                    alt=""
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </Container>
      )}

      {category && (
        <AddCategory
          category={category}
          setCategory={setCategory}
          refetch={getCategories}
        />
      )}
    </Fragment>
  );
};

export default AllCategory;
