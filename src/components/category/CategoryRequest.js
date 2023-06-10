import React, { Fragment, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardBody, CardHeader } from "reactstrap";
import AddCategory from "./AddCategory";

const CategoryRequest = () => {
  const usr = localStorage.getItem("user-id");
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [storeId, setStoreId] = useState("");

  const getCategories = (id) => {
    fetch(`http://localhost:5000/api/category/request/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        body: JSON.stringify({ approved: status }),
      })
        .then((res) => res.json())
        .then((data) => {
          getCategories(storeId);
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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

  const handleSetStoreId = (id) => {
    setStoreId(id);
    getCategories(id);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [usr]);

  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
      .then((res) => res.json())
      .then((data) => {
        getCategories(data[0]._id);
        setStores(data);
      });
  }, [usr]);

  return (
    <Fragment>
      {!category && (
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <select
                  style={{ width: "400px" }}
                  onClick={(e) => handleSetStoreId(e.target.value)}
                  class="form-select"
                  aria-label="Default select example"
                  placeholder="Selete Store"
                  required={true}
                  name="storeId"
                >
                  {stores?.map((store) => (
                    <option value={store?._id}>{store.name}</option>
                  ))}
                </select>
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
                      <th>Request</th>
                      <th>Approved</th>
                      <th>Date</th>
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
                          <div className="flex justify-items-center">
                            <img
                              style={{ width: "25px", height: "25px" }}
                              src={category.store?.logo}
                              alt="storelogo"
                            />
                            <span className="ms-2">
                              {category?.store?.name}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div
                            onClick={() =>
                              handleUpdateStatus(
                                category?._id,
                                category.approved === true ? false : true
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
                                category.approved === true ? true : false
                              }
                            />
                          </div>
                        </td>
                        <td>
                          {new Date(
                            category.timestamps && category.timestamps
                          ).toLocaleDateString("en-GB")}
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

export default CategoryRequest;
