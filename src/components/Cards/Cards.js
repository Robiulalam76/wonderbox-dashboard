import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Table } from "react-bootstrap";
import { AuthContext } from "../../ContextAPI/AuthProvider";

const Cards = () => {
  const { stores } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [storeId, setStoreId] = useState("");

  const getCards = (id) => {
    fetch(`http://localhost:5000/api/storecard/getcards/${id}`)
      .then((res) => res.json())
      .then((data) => setCards(data.data));
  };

  useEffect(() => {
    getCards(stores[0]?._id);
  }, [stores]);

  const handleSetStoreId = (id) => {
    setStoreId(id);
    getCards(id);
  };

  return (
    <Fragment>
      <Breadcrumb title="card List" parent="Users" />
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
                <thead className="bg-info">
                  <tr>
                    <th>No</th>
                    <th>title</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cards &&
                    cards.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item?.title}</td>
                        <td>{item?.price}</td>
                        <td>{item?.amount}</td>
                        <td>
                          <span
                            class={`text-white badge rounded-pill ${
                              item.type === "Wallet"
                                ? "text-bg-info"
                                : "text-bg-success"
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
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
                        <td>
                          <div>
                            <Link to={`/cards/${item?._id}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                style={{ width: "30px", height: "30px" }}
                                className="text-primary bg-light"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </Link>
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

export default Cards;
