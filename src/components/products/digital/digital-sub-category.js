import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/digital-sub-category";
import Datatable from "../../common/datatable";
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

const Digital_sub_category = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const [user, setUser] = useState("");
  const [userData, setUserData] = useState("");

  const [sellerName, setSellerName] = useState("");
  const [amount, setAmount] = useState("");
  const [allWithDraw, setAllWithDraw] = useState([]);

  const handleWithDrawSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log("hello");
    const name = form.sellerName.value;
    const amount = parseInt(form.amount.value);

    const data = {
      name,
      amount,
    };

    fetch(`http://localhost:5000/api/withdraw/add/${user}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.location.reload(true);
        } else {
          alert(data.message);
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/withdraw/${user}`)
      .then((res) => res.json())
      .then((data) => setAllWithDraw(data));
  }, [user]);

  useEffect(() => {
    const userId = localStorage.getItem("user-id");
    setUser(userId);

    fetch(`http://localhost:5000/api/user/${userId}`).then((res) =>
      res.json().then((data) => setUserData(data))
    );

    fetch(`http://localhost:5000/api/withdraw/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllWithDraw(data));
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Withdraw Request" parent="Digital" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid="true">
        <Row>
          <Card>
            <CardBody>
              <Form onSubmit={handleWithDrawSubmit}>
                <FormGroup>
                  <Label htmlFor="recipient-name" className="col-form-label">
                    Name:
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    name="sellerName"
                  // onChange={(e) => setSellerName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="recipient-name" className="col-form-label">
                    Withdraw Ammount:
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    name="amount"
                  // onChange={(e) => setAmount(e.target.value)}
                  />
                </FormGroup>
                {/* <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Price :
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            // onChange={(e) => setProductPrice(e.target.value)}
                          />
                        </FormGroup> */}
                {/* <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Category Image :
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="file"
                            onChange={(e) => setCategoryImage(e.target.value)}
                          />
                        </FormGroup> */}
                <button type="submit" className="btn btn-secondary">
                  Request Withdraw
                </button>
              </Form>
            </CardBody>
          </Card>
        </Row>
        <div>
          <ul className="row">
            {allWithDraw &&
              allWithDraw.map((ticket) => (
                <div className="d-flex flex-column border p-3 col-3">
                  <li>
                    Name:{" "}
                    <span
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      {ticket.name}
                    </span>
                  </li>
                  <li>
                    Amount:{" "}
                    <span className="text-warning">${ticket.amount}</span>
                  </li>
                  <li className="text-secondary">
                    Date:{" "}
                    {ticket.createdAt
                      ? formatDate(new Date(ticket.createdAt))
                      : "---"}
                  </li>
                  <li className="text-secondary">
                    Status:{" "}
                    <span
                      className={`border px-2 py-1 rounded ${ticket.status === true && "bg-success"
                        } ${ticket.rejected === true && "bg-danger"} ${ticket.status === false &&
                        ticket.rejected === false &&
                        "bg-warning"
                        } text-light`}
                    >
                      {ticket.status === true && "Accpted"}
                      {ticket.rejected === true && "Rejected"}
                      {ticket.status === false &&
                        ticket.rejected === false &&
                        "Pending"}
                    </span>
                  </li>
                </div>
              ))}
          </ul>
        </div>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Digital_sub_category;
