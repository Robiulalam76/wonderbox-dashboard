import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/sales-transactions";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Table } from "react-bootstrap";

const Transactions_sales = () => {
  const [allNotification, setAllnotification] = useState([]);
  const [deletenotification, setDeletenotification] = useState(false);

  const [user, setUser] = useState("");
  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "admin") {
          fetch("http://localhost:5000/api/notification/")
            .then((res) => res.json())
            .then((notData) => setAllnotification(notData));
        } else {
          fetch("http://localhost:5000/api/notification/")
            .then((res) => res.json())
            .then((sellerNot) => {
              const noti = sellerNot.filter((n) => n.title === "Order");
              setAllnotification(noti);
            });
        }
      });
  }, [deletenotification]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/notification/${id}`, {
      method: "DELETE",
    }).then((res) =>
      res.json().then((data) => setDeletenotification(!deletenotification))
    );
  };

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/notification/")
  //     .then((res) => res.json())
  //     .then((data) => setAllnotification(data));
  // }, [deletenotification]);
  return (
    <Fragment>
      <Breadcrumb title="Transactions" parent="Sales" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>All Notification</h5>
              </CardHeader>
              <div id="batchDelete" className="transactions">
                {/* <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table> */}
                {/* <Datatable
                  listPage={true}
                  myData={ticket}
                  pageSize={10}
                  pagination={true}
                  class="-striped -highlight"
                /> */}

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tilte</th>
                      <th>userName</th>
                      <th>amount</th>
                      <th>productName</th>
                      {/* <th>Status</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allNotification &&
                      allNotification.length > 0 &&
                      allNotification.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item?.title}</td>
                          <td>{item?.userName}</td>
                          <td>${item?.amount}</td>
                          <td>{item?.productName}</td>

                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <>
                                {/* <button
                                className="btn  btn-secondary btn-sm"
                                // onClick={() => handleMakeSeller(item._id)}
                              >
                                Make Seller
                              </button> */}

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
                    {allNotification.length === 0 && <div>no notification</div>}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Transactions_sales;
