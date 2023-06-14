import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Card, CardBody, Container } from "reactstrap";

const ProductReview = () => {
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const { id } = useParams();

  const getProducts = () => {
    fetch(`http://localhost:5000/api/review/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data?.reviews);
      });
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  const handleUpdate = (e) => {
    setIsloading(true);
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      comment: e.target.comment.value,
    };
    fetch(`http://localhost:5000/api/review/update/${show?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        getProducts();
        setIsloading(false);
        setShow(null);
      });
  };

  const handleDelete = (reviewId) => {
    fetch(`http://localhost:5000/api/review/delete/${reviewId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        getProducts();
      });
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <Card>
          <CardBody>
            {reviews.length > 0 ? (
              <table className="table table-responsive">
                <thead
                  className="py-2"
                  style={{ backgroundColor: "lightgrey" }}
                >
                  <tr>
                    <th>Reviewer</th>
                    <th>Title</th>
                    <th>Commant</th>
                    <th>Rating</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr
                      key={review._id}
                      className={
                        review?.isPositive ? "bg-success" : "bg-primary"
                      }
                    >
                      <td>
                        <img
                          style={{ width: "25px", height: "25px" }}
                          src={review.reviewerId?.image}
                          alt="review"
                        />
                      </td>
                      <td>{review.title}</td>
                      <td>{review.comment}</td>
                      <td>
                        <div className="d-flex justify-items-center">
                          {review.rating}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            style={{ width: "16px" }}
                            class="text-warning"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </td>
                      <td>
                        {new Date(
                          review.createdAt && review.createdAt
                        ).toLocaleDateString("en-GB")}
                      </td>

                      <td>
                        <button
                          className="btn-sm btn-danger me-2"
                          onClick={() => handleDelete(review._id)}
                        >
                          X
                        </button>
                        <button
                          className="btn-sm btn-danger"
                          onClick={() => setShow(review)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="d-flex justify-content-center">
                <img
                  className="w-25"
                  src="https://nagadhat.com.bd/public/images/no-product-found.png"
                  alt=""
                />
              </div>
            )}
          </CardBody>
        </Card>
      </Container>

      <Modal show={show?._id ? true : false} onHide={() => setShow(null)}>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={show?.title}
                required={true}
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                defaultValue={show?.comment}
                required={true}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => setShow(null)}
            >
              Close
            </Button>

            {isloading ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            ) : (
              <Button type="submit" variant="primary">
                Save
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default ProductReview;
