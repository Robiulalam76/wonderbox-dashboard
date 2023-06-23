import moment from "moment";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../ContextAPI/AuthProvider";

const WithdrawRequest = () => {
  const { openToast, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const date = moment(Date.now()).format("DD/MMM/YYYY");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (user && user?.role !== "seller") {
      openToast("error", `Withdraw Request Can Only Seller`);
      setIsLoading(false);
      return;
    }
    if (data?.amount > user.wallet) {
      openToast(
        "error",
        `You cannot withdraw more than your ${user?.wallet} wallet balance!`
      );
      setIsLoading(false);
      return;
    }
    data["user"] = user?._id;

    if (data) {
      fetch(`http://localhost:5000/api/transaction/withdraw`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const message = data.success ? "success" : "error";
            openToast(message, data?.success ? data?.message : data?.message);
          }
          reset();
          setIsLoading(false);
        });
    }
  };
  return (
    <section className="max-w-primary mx-auto px-4">
      <Container className="max-w-[800px] mx-auto p-4 bg-white rounded-md">
        <div className="d-flex flex-column justify-content-center align-items-center gap-1">
          {/* <img className="w-16 mx-auto rounded-full" src={logo} alt="" /> */}
          <h2 className="text-gray-800 font-bold">Wonderbox</h2>
        </div>
        <h6 className="text-sm text-gray-800">Date: {date}</h6>
        <hr className="my-3 border-8 border-primary" />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  {...register("bank", { required: true })}
                  size="lg"
                  className="rounded"
                  type="text"
                  name="bank"
                  isInvalid={!!errors.bank}
                />
                {errors.bank && (
                  <Form.Control.Feedback type="invalid">
                    Bank Name is required
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  {...register("accountNo", { required: true })}
                  size="lg"
                  className="rounded"
                  type="number"
                  name="accountNo"
                  isInvalid={!!errors.accountNo}
                />
                {errors.accountNo && (
                  <Form.Control.Feedback type="invalid">
                    Account Number is required
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  {...register("amount", { required: true })}
                  size="lg"
                  className="rounded"
                  type="number"
                  name="amount"
                  isInvalid={!!errors.amount}
                />
                {errors.amount && (
                  <Form.Control.Feedback type="invalid">
                    Amount is required
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="">
            <Col>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  {...register("description", { required: true })}
                  maxLength={300}
                  as="textarea"
                  size="lg"
                  className="rounded"
                  name="description"
                  isInvalid={!!errors.description}
                />
                {errors.description && (
                  <Form.Control.Feedback type="invalid">
                    Description is required
                  </Form.Control.Feedback>
                )}
                <Form.Text className="text-xs text-gray-500">
                  Max Characters 300
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            {isLoading ? (
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default WithdrawRequest;
