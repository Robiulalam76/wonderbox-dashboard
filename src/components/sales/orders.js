import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Table } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [stores, setStores] = useState([])
  const [storeId, setStoreId] = useState("")


  const handleGetOrders = (id) => {
    fetch(`http://localhost:5000/api/card/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }

  const handleSetStoreId = (id) => {
    setStoreId(id)
    handleGetOrders(id)
  }


  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
      .then((res) => res.json())
      .then((data) => {
        setStores(data)
        handleGetOrders(data[0]?._id)
      });
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Orders List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between">
              <select style={{ width: "400px" }}
                onClick={(e) => handleSetStoreId(e.target.value)}
                class="form-select"
                aria-label="Default select example"
                placeholder="Selete Store"
                required={true}
                name="storeId">
                {
                  stores?.map(store => <option value={store?._id}>{store.name}</option>)
                }
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
                          {
                            item?.active === "true" ? <span class="badge text-bg-warning">Sold</span> : <span class="badge text-bg-primary">Sell</span>
                          }
                        </td>
                        <td>{item?.securityCode}</td>
                        <td>{item?.checkNumber}</td>
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