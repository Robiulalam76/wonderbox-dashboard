import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Table } from "react-bootstrap";

const Orders = () => {
  const [store, setStore] = useState([]);

  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "seller") {
          fetch("http://localhost:5000/api/card/orders/6462723333057f3bb6fea4aa")
            .then((res) => res.json())
            .then((allstores) => setStore(allstores));
        } else {
          fetch(`http://localhost:5000/api/store/${usr}`)
            .then((res) => res.json())
            .then((sellerStores) => setStore(sellerStores));
        }
      });

  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Orders List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between">
              <h5>Orders</h5>
              {/* <Link to="/cards/addcard" className="btn btn-secondary">
                Add Card
              </Link> */}
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
                  {store &&
                    store.map((item, idx) => (
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