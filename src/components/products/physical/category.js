import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { data } from "../../../assets/data/category";
import Datatable from "../../common/datatable";
import {
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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [producetName, setProductName] = useState("");
  const [producetPrice, setProductPrice] = useState("");
  const [fetchData, setFetchData] = useState([]);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const handlesubmit = () => {
    const parent = categoryName;
    const slug = categoryName.toLocaleLowerCase();
    // const symbolPrice =

    const category = {
      category: categoryName,
      slug,
      // product_name: producetName,
      // price: `$${producetPrice}`,
    };
    fetch("http://localhost:5000/api/category/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setOpen(false);
          window.location.reload(true);
        }
      });
  };

  const handleCategoryDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      fetch(`http://localhost:5000/api/category/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            toast.success("Category Deleted Successfully!");
            window.location.reload(true);
          }
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/category/")
      .then((res) => res.json())
      .then((data) => setFetchData(data));
  }, [fetchData]);

  return (
    <Fragment>
      <Breadcrumb title="Category" parent="Physical" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Category</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button
                    type="button"
                    color="primary"
                    onClick={onOpenModal}
                    data-toggle="modal"
                    data-original-title="test"
                    data-target="#exampleModal"
                  >
                    Add Category
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Physical Product
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Category Name :
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            onChange={(e) => setCategoryName(e.target.value)}
                          />
                        </FormGroup>
                        {/* <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Product Name :
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </FormGroup> */}
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
                            onChange={(e) => setProductPrice(e.target.value)}
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
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="button"
                        color="primary"
                        onClick={
                          // () => onCloseModal("VaryingMdo")
                          handlesubmit
                        }
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => onCloseModal("VaryingMdo")}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <div className="clearfix"></div>

                {fetchData.length > 0 && (
                  <div id="basicScenario" className="product-physical">
                    <Datatable
                      myData={fetchData}
                      multiSelectOption={false}
                      pageSize={10}
                      pagination={true}
                      class="-striped -highlight"
                      handleCategoryDelete={handleCategoryDelete}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Category;
