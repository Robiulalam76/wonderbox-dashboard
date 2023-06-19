import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState([]);
  const { id } = useParams();

  const getTransaction = () => {
    fetch(`http://localhost:5000/api/transaction/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data?.data);
      });
  };

  console.log(transaction);

  useEffect(() => {
    getTransaction();
  }, [id]);
  return (
    <section className="container mx-auto px-4">
      <div className="max-w-800 mx-auto p-4 bg-white rounded-md">
        <div className="d-flex flex-column justify-content-center align-items-center gap-1">
          {/* <img className="w-16 mx-auto rounded-circle" src="" alt="" /> */}
          <h2 className="text-gray-800 font-weight-bold">Wonderbox</h2>
        </div>
        <h4 className="text-sm text-gray-800">
          Date: {moment("2023-01-10").format("DD/MMM/YYYY")}
        </h4>
        <hr className="my-3 border-8 border-primary" />

        <div>
          <h5>Bank: {transaction?.bank}</h5>
          <h5>Branch: {transaction?.branch}</h5>

          <h5>Account Number: {transaction?.accountNo}</h5>
          <h5>
            ${transaction?.type} Amount: {transaction?.amount}
          </h5>

          <h5>transaction: {transaction?.txnId}</h5>

          <h5>
            description: {transaction?.description && transaction?.description}
          </h5>

          <div>
            <h4 className="text-sm text-gray-800 mb-1">Add Payment Proof</h4>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {transaction?.images?.length > 0 &&
                transaction.images?.map((file) => (
                  <img
                    className="w-32 h-24 object-fit-cover"
                    src={file}
                    alt=""
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionDetails;
