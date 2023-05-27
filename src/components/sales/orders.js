import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Table } from "react-bootstrap";

function formatDate(date) {
  const currentMonth = date.getMonth();
  const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
  const currentDate = date.getDate();
  const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
  return `${date.getFullYear()}-${monthString}-${currentDate}`;
}

const Orders = () => {
  const [wallet, setWallet] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/orders/wallet/all")
      .then((res) => res.json())
      .then((data) => setWallet(data));
  }, []);
  console.log("wallet", wallet);

  const newWallet = wallet.map((item) => {
    return { ...item.products[0] };
  });

  console.log(newWallet, "newwww");

  return (
    <Fragment>
      <Breadcrumb title="Orders" parent="Sales" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Manage Order</h5>
              </CardHeader>
              <CardBody className="order-datatable">
                {/* <Datatable
                  multiSelectOption={"wallet"}
                  myData={newWallet}
                  pageSize={10}
                  pagination={true}
                  class="-striped -highlight"
                /> */}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      {/* <th>Type</th> */}
                      <th>Price</th>
                      <th>Category</th>
                      <th>Store</th>
                      <th>Seller</th>
                      <th>Date</th>
                      {/* <th>Status</th> */}
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {newWallet &&
                      newWallet.length > 0 &&
                      newWallet.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item?.title}</td>
                          {/* <td>{item?.type}</td> */}
                          <td>${item?.price}</td>
                          <td>{item?.parent}</td>
                          <td>{item?.store}</td>
                          <td>{item?.seller}</td>
                          <td>
                            {item?.createdAt
                              ? formatDate(new Date(item?.createdAt))
                              : "---"}
                          </td>

                          {/* <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <>
                                <button
                                className="btn  btn-secondary btn-sm"
                                // onClick={() => handleMakeSeller(item._id)}
                              >
                                Make Seller
                              </button>

                                <button
                                  className="btn btn-primary btn-sm"
                                  // onClick={() => handleDelete(item._id)}
                                >
                                  Delete
                                </button>
                              </>
                            </div>
                          </td> */}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Orders;
