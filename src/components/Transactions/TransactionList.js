import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Button, Dropdown, Table } from "react-bootstrap";
import { AuthContext } from "../../ContextAPI/AuthProvider";
import moment from "moment";

const TransactionList = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const fetchDeposits = async (page) => {
    const filterConditions =
      (filter === "Pending" && false) || (filter === "Approved" && true);
    const ready = `&approved=${filterConditions}`;
    const typeReady = `&type=${typeFilter}`;
    try {
      const response = await fetch(
        `http://localhost:5000/api/transaction?page=${page}${
          filter !== "All" ? ready : ""
        }${typeFilter !== "All" ? typeReady : ""}`
      );
      const data = await response.json();

      setTransactions(data.data);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDeposits(currentPage);
  }, [currentPage, filter, typeFilter]);

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

  // const handleUpdateStatus = (id, status) => {
  //   if (user?.role === "admin") {
  //     fetch(`http://localhost:5000/api/transaction/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({ approved: status }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data?.success) {
  //           fetchDeposits();
  //         }
  //       });
  //   } else {
  //     return;
  //   }
  // };

  return (
    <Fragment>
      <Container className="pt-4" fluid={true}>
        <Card>
          <CardHeader className="py-2">
            <div className="d-flex justify-items-center">
              <select
                style={{ width: "200px" }}
                onClick={(e) => setFilter(e.target.value)}
                class="form-select me-4"
                aria-label="Default select example"
                placeholder="Select Store"
                required={true}
                name="storeId"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </select>
              <select
                style={{ width: "200px" }}
                onClick={(e) => setTypeFilter(e.target.value)}
                class="form-select"
                aria-label="Default select example"
                placeholder="Select Store"
                required={true}
                name="storeId"
              >
                <option value="All">All</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdraw">Withdraw</option>
              </select>
            </div>
          </CardHeader>
          <CardBody className="pt-2">
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              <Table striped bordered hover responsive>
                <thead className="bg-info">
                  <tr>
                    <th>Bank</th>
                    <th>Branch</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Sender</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions?.length > 0 &&
                    transactions.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item?.bank}</td>
                        <td>{item?.branch}</td>
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
                          <Dropdown>
                            <Dropdown.Toggle
                              variant={item?.approved ? "success" : "info"}
                              id="dropdown-basic"
                              size="sm"
                              className="py-1"
                            >
                              {item?.approved ? "Approved" : "Pending"}
                            </Dropdown.Toggle>

                            {/* <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  handleUpdateStatus(item?._id, true)
                                }
                              >
                                Approved
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleUpdateStatus(item?._id, false)
                                }
                              >
                                Pending
                              </Dropdown.Item>
                            </Dropdown.Menu> */}
                          </Dropdown>
                        </td>
                        <td>
                          <img
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                            }}
                            src={
                              item?.user?.image
                                ? item?.user?.image
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt=""
                          />
                        </td>
                        <td>
                          {moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </td>
                        <td>
                          <div>
                            <Link to={`/transactions/${item?._id}`}>
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

export default TransactionList;
