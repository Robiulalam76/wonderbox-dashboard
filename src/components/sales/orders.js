import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Button, Table } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../ContextAPI/AuthProvider";

const Orders = () => {
  const { stores } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [storeId, setStoreId] = useState("");

  const handleGetOrders = (id) => {
    fetch(`http://localhost:5000/api/card/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  const handleSetStoreId = (id) => {
    setStoreId(id);
    handleGetOrders(id);
  };

  useEffect(() => {
    handleGetOrders(stores[0]?._id);
  }, [stores]);

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
                  <option value={store?._id}>{store.name}</option>
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
                    <th>#</th>
                    <th>title</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Security</th>
                    <th>Number</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders &&
                    orders.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item?.title}</td>
                        <td>{item?.amount}</td>
                        <td>{item?.type}</td>
                        <td>
                          {(item?.state === "Enable" && (
                            <span class="badge text-bg-warning">Sold</span>
                          )) ||
                            (item?.state === "Disable" && (
                              <span class="badge text-bg-success text-white">
                                Sell
                              </span>
                            )) ||
                            (item?.state === "Used" && (
                              <span class="badge text-bg-info text-white">
                                Used
                              </span>
                            )) ||
                            (item?.state === "Expired" && (
                              <span class="badge text-bg-warning text-white">
                                Expired
                              </span>
                            ))}
                        </td>
                        <td>{item?.securityCode}</td>
                        <td>{item?.checkNumber}</td>
                        <td>
                          <Button variant="primary" size="sm">
                            Invoice
                          </Button>
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

export default Orders;
