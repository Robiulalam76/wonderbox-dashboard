import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("");
  const [isloading, setIsloading] = useState(false);

  const getTransaction = () => {
    fetch(`http://localhost:5000/api/transaction/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data?.data);
      });
  };

  useEffect(() => {
    getTransaction();
  }, [id]);

  const handleApprove = (id) => {
    setIsloading(true);
    setOpen(false);
    fetch(`http://localhost:5000/api/transaction/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ approved: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          getTransaction();
        }
        setIsloading(false);
      });
  };

  console.log(transaction);

  return (
    <section className="container mx-auto px-4 ">
      <div className="max-w-800 mx-auto p-4 bg-white rounded-md">
        <div className="d-flex flex-column justify-content-center align-items-center gap-1">
          {/* <img className="w-16 mx-auto rounded-circle" src="" alt="" /> */}
          <h2 className="text-gray-800 font-weight-bold">Wonderbox</h2>
        </div>
        <h4 className="text-sm text-gray-800">
          Date: {moment(transaction?.createdAt).format("DD/MMM/YYYY")}
        </h4>
        <hr className="my-3 border-8 border-primary" />

        <Table striped bordered>
          <tbody>
            <tr>
              <td style={{ width: "200px" }}>Bank</td>
              <td>{transaction.bank}</td>
            </tr>
            {transaction?.branch && (
              <tr>
                <td style={{ width: "200px" }}>Branch</td>
                <td>{transaction.branch}</td>
              </tr>
            )}
            <tr>
              <td style={{ width: "200px" }}>Account Number</td>
              <td>{transaction.accountNo}</td>
            </tr>
            <tr>
              <td style={{ width: "200px" }}>{transaction?.type} Amount</td>
              <td>{transaction.amount}</td>
            </tr>
            <tr>
              <td style={{ width: "200px" }}>Name</td>
              <td>{transaction.user?.name}</td>
            </tr>
            <tr>
              <td style={{ width: "200px" }}>Email Address</td>
              <td>{transaction.user?.email}</td>
            </tr>
            {transaction?.user?.phone && (
              <tr>
                <td style={{ width: "200px" }}>Phone Number</td>
                <td>{transaction.user?.phone}</td>
              </tr>
            )}
            {transaction?.txnId && (
              <tr>
                <td style={{ width: "200px" }}>Transaction</td>
                <td>{transaction.txnId}</td>
              </tr>
            )}
            <tr>
              {transaction?.description && (
                <td colSpan={2}>{transaction.description}</td>
              )}
            </tr>
            <tr>
              {transaction?.images?.length > 0 && (
                <td colSpan={2} className="">
                  <div>
                    <h6 className="display-block">Payment proof</h6>
                    {transaction?.images?.map((img, i) => (
                      <img
                        onClick={() => setView(img)}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                        src={img}
                        alt=""
                      />
                    ))}
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
          {isloading ? (
            <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              >
                {" "}
              </span>
              Loading...
            </button>
          ) : (
            <Button
              onClick={() => setOpen(true)}
              variant="primary"
              disabled={transaction?.approved}
            >
              {transaction?.approved ? "Accepted Request" : "Accept Request"}
            </Button>
          )}
        </div>
      </div>

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={() => handleApprove(transaction?._id)}>Yes</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={view ? true : false}
        onHide={() => setView("")}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div
            className="d-flex justify-content-center justify-items-center"
            style={{ maxWidth: "700px" }}
          >
            <img
              className="w-full"
              style={{ maxWidth: "700px" }}
              src={view}
              alt=""
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setView("")}>Close</Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default TransactionDetails;
