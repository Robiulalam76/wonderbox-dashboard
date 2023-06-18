import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Table } from "react-bootstrap";
import { AuthContext } from "../../ContextAPI/AuthProvider";

const List_store = () => {
  const { stores, refetchStores } = useContext(AuthContext);
  // console.log(stores);

  const handleDelete = (id) => {
    if (window.confirm("Are you really want to delete this user?")) {
      fetch(`http://localhost:5000/api/store/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            refetchStores();
          }
        });
    }
  };

  const handleUpdateStatus = (id, status) => {
    fetch(`http://localhost:5000/api/store/update/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetchStores();
      });
  };

  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between">
              <h5>List_store</h5>
              <Link to="/store/create-store" className="btn btn-secondary">
                List_store
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Icon</th>
                    <th>Store Name</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Owner Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stores &&
                    stores.map((item, idx) => (
                      <tr key={idx}>
                        <td className="w-fit">{idx + 1}</td>
                        <td className="w-fit">
                          <img
                            style={{ width: "30px", height: "30px" }}
                            src={item?.logo}
                            alt=""
                          />
                        </td>
                        <td>{item?.name}</td>
                        <td>{item?.address}</td>
                        <td>{item?.description.slice(0, 100) + "..."}</td>

                        <td>{item?.seller?.name}</td>
                        <td>
                          <div
                            onClick={() =>
                              handleUpdateStatus(
                                item?._id,
                                item.status === "Show" ? "Hide" : "Show"
                              )
                            }
                            class="form-check form-switch"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckChecked"
                              checked={item.status === "Show" ? true : false}
                            />
                          </div>
                        </td>

                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
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

export default List_store;
