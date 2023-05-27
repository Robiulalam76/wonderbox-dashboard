import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/digital-category";
import Datatable from "../../common/datatable";
// import Modal from "react-responsive-modal";
import { Table } from "react-bootstrap";
import {
  Modal,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

function formatDate(date) {
  const currentMonth = date.getMonth();
  const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
  const currentDate = date.getDate();
  const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
  return `${date.getFullYear()}-${monthString}-${currentDate}`;
}

const Digital_category = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const [ticket, setTicket] = useState([]);

  const handleAccept = (id) => {
    if (window.confirm("Are you sure you wish to Accept this item?")) {
      fetch(`http://localhost:5000/api/withdraw/status/${id}`, {
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
      fetch(`http://localhost:5000/api/withdraw/status/rejected/${id}`, {
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
    fetch("http://localhost:5000/api/withdraw/")
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, []);
  return (
    <Fragment>
      <Breadcrumb title="Category" parent="Digital" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Wallet Balance Withdraw</h5>
              </CardHeader>
              <CardBody>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  {/* <Datatable
                    multiSelectOption={false}
                    myData={data}
                    pageSize={5}
                    pagination={false}
                    class="-striped -highlight"
                  /> */}

                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Amount</th>
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Digital_category;
