import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listPages";
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

const ListPages = () => {
  const [ticket, setTicket] = useState([]);

  const [user, setUser] = useState("");

  const handleAccept = (id) => {
    if (window.confirm("Are you sure you wish to Accept this item?")) {
      fetch(`http://localhost:5000/api/ticket/status/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.location.reload(true);
          }
        });
    }
  };

  const handleRejected = (id) => {
    if (window.confirm("Are you sure you wish to Reject this item?")) {
      fetch(`http://localhost:5000/api/ticket/status/rejected/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
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
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/ticket/")
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, []);

  console.log(ticket, "tickeet");
  return (
    <Fragment>
      <Breadcrumb title="Ticket Pages" parent="Ticket" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Ticket List</h5>
                <h4 className="mt-2">Admin Wallet: $ {user?.wallet}</h4>
              </CardHeader>
              <CardBody>
                <div
                  id="batchDelete"
                  className="category-table order-table coupon-list-delete"
                >
                  {/* <Datatable
                    // multiSelectOption={false}
                    listPage={true}
                    myData={ticket}
                    pageSize={7}
                    pagination={false}
                    class="-striped -highlight"
                  /> */}
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Payment Image</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticket &&
                      ticket.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item?.name}</td>
                          <td>$ {item?.amount}</td>
                          <td>
                            <div className="">
                              <img
                                src={item?.image}
                                alt=""
                                height={70}
                                className=""
                              />
                            </div>
                          </td>
                          <td>
                            {item?.createdAt
                              ? formatDate(new Date(item?.createdAt))
                              : "---"}
                          </td>
                          <td>
                            <span
                              className={`border px-2 py-1 rounded ${item.status === true && "bg-success"
                                } ${item.rejected === true && "bg-danger"} ${item.status === false &&
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
                          </td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              {item?.status === true ||
                                item?.rejected === true ? (
                                ""
                              ) : (
                                <>
                                  <button
                                    className="btn  btn-secondary btn-sm"
                                    onClick={() => handleAccept(item._id)}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleRejected(item._id)}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
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

export default ListPages;
