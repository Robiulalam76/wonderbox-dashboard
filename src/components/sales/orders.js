import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Button, Dropdown, Table } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../ContextAPI/AuthProvider";
import moment from "moment";

const Orders = () => {
  const { stores } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [storeId, setStoreId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleGetOrders = (id) => {
    fetch(`http://localhost:5000/api/card/orders/${id}?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      });
  };

  const handleSetStoreId = (id) => {
    setStoreId(id);
    handleGetOrders(id);
  };

  useEffect(() => {
    handleGetOrders(stores[0]?._id);
  }, [stores, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log(orders);

  const handleUpdateStatus = (id, status) => {
    fetch(`http://localhost:5000/api/card/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ state: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          handleGetOrders(id);
        }
      });
  };

  return (
    <Fragment>
      <Breadcrumb title="Orders List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between">
              <select
                style={{ width: "400px" }}
                onClick={(e) => handleSetStoreId(e.target.value)}
                class="form-select"
                aria-label="Default select example"
                placeholder="Select Store"
                required={true}
                name="storeId"
              >
                {stores?.map((store) => (
                  <option value={store?._id} selected={store?._id === storeId}>
                    {store.name}
                  </option>
                ))}
              </select>
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
                    <th>Image</th>
                    <th>title</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Method</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders &&
                    orders.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ width: "30px" }}>
                          <img
                            style={{ width: "25px", height: "25px" }}
                            src={item?.productId?.images[0]}
                            alt=""
                          />
                        </td>
                        <td>{item?.title}</td>
                        <td>₹ {item?.price}</td>
                        <td>{item?.type}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant={
                                (item?.state === "Enable" && "success") ||
                                item?.state === "danger"
                              }
                              id="dropdown-basic"
                              size="sm"
                              className="py-1"
                            >
                              {item?.state}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  handleUpdateStatus(item?._id, "Enable")
                                }
                              >
                                Enable
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleUpdateStatus(item?._id, "Used")
                                }
                              >
                                Used
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>
                          {item?.payment ? item?.payment?.method : "Offline"}
                        </td>
                        <td>{item?.address?.mobileNumber}</td>
                        <td>{moment(item?.createdAt).format("DD/MMM/YYYY")}</td>
                        <td>
                          <Button variant="primary" size="sm" className="py-1">
                            Invoice
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
          <div className="d-flex justify-content-end justify-items-center p-4">
            <Button
              variant="primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Orders;
