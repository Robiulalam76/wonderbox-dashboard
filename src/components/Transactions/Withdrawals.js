import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../ContextAPI/AuthProvider";
import { useContext } from "react";
import { Button, Card, Table } from "react-bootstrap";
import moment from "moment";
import { Container } from "reactstrap";

const headerItems = ["Bank", "Amount", "Status", "Date", "Action"];

const Withdrawals = () => {
  const { user } = useContext(AuthContext);

  const [withdrawals, setWithdrawals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("All");

  const fetchWithdraw = async (page) => {
    const filterConditions =
      (filter === "Pending" && false) || (filter === "Approved" && true);
    const ready = `&approved=${filterConditions}`;
    try {
      const response = await fetch(
        `http://localhost:5000/api/transaction/Withdraw/${
          user?._id
        }?page=${page}${filter !== "All" && ready}`
      );
      const data = await response.json();

      setWithdrawals(data.data);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(withdrawals);

  useEffect(() => {
    fetchWithdraw(currentPage);
  }, [currentPage, filter]);

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

  return (
    <Container fluid={true} className="pt-4">
      <Card className="p-2">
        <div className="mb-2">
          <select
            style={{ width: "200px" }}
            onClick={(e) => setFilter(e.target.value)}
            class="form-select"
            aria-label="Default select example"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        <Table striped bordered hover responsive className="w-full text-left">
          <thead>
            <tr className="bg-info">
              {headerItems?.map((item, i) => (
                <th key={i}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-scroll px-0">
            {withdrawals?.length > 0 &&
              withdrawals.map((item, idx) => (
                <tr key={idx}>
                  <td>{item?.bank}</td>
                  <td>{item?.amount}</td>

                  <td>
                    <span
                      class={`text-white badge rounded-pill ${
                        item?.approved ? "text-bg-success" : "text-bg-warning"
                      }`}
                    >
                      {item?.approved ? "Approved" : "Pending"}
                    </span>
                  </td>

                  <td>
                    {moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td>
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
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Card.Footer className="d-flex align-items-center justify-content-between border-top border-blue-gray-50 p-4">
          <h5 variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </h5>
          <div className="d-flex gap-2">
            <Button
              variant="outline-blue-gray"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline-blue-gray"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Withdrawals;
