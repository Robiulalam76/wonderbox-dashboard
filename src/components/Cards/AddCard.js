import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const [stores, setStores] = useState([]);
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  function generateUniqueRandomNumber(numDigits) {
    let digits = [...Array(numDigits).keys()];
    let randomNum = "";
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    for (let i = 0; i < numDigits; i++) {
      randomNum += digits[i];
    }
    return randomNum;
  }
  const checkNumber = generateUniqueRandomNumber(12);

  const handleInputChange = (event) => {
    setNewFeature(event.target.value);
  };

  const handleAddFeature = () => {
    if (newFeature) {
      setFeatures((prevFeatures) => [...prevFeatures, newFeature]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures((prevFeatures) => {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures.splice(index, 1);
      return updatedFeatures;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const newCard = {
      productId: form.productId.value,
      storeId: form.storeId.value,
      price: form.price.value,
      type: form.type.value,
      securityCode: form.securityCode.value,
      checkNumber: checkNumber,
    };

    if (form.type.value === "Wallet") {
      newCard["amount"] = form.amount.value;
    } else {
      newCard["features"] = features;
    }

    fetch(`http://localhost:5000/api/storecard`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCard),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/dashboard/cards/all");
        form.reset();
      });
  };

  const [products, setProducts] = useState([]);

  const handleGetProduct = (id) => {
    fetch(`http://localhost:5000/api/product/store/${id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        handleGetProduct(data[0]._id);
      });
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Create Card" parent="cards" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form
                  className="needs-validation user-add"
                  noValidate=""
                  onSubmit={handleSubmit}
                >
                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Price
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="number"
                        placeholder="Price"
                        required={true}
                        name="price"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Type
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <select
                        onChange={(e) => setType(e.target.value)}
                        class="form-select"
                        aria-label="Default select example"
                        placeholder="Select Type"
                        required={true}
                        name="type"
                      >
                        <option selected value="Wallet">
                          Wallet
                        </option>
                        <option value="Package">Package</option>
                      </select>
                    </div>
                  </FormGroup>

                  {type === "Package" ? (
                    <>
                      <FormGroup className="row">
                        <Label className="col-xl-3 col-md-4">
                          <span></span>
                        </Label>
                        <div className="col-xl-8 col-md-7">
                          <div class="d-flex justify-items-center flex-wrap ">
                            {features.map((feature, index) => (
                              <div class="border d-flex me-2 mb-2" key={index}>
                                <span className="px-1">{feature}</span>
                                <div
                                  onClick={() => handleRemoveFeature(index)}
                                  className="btn-sm px-2 btn-danger ms-2"
                                >
                                  X
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-xl-3 col-md-4">
                          <span>*</span> Features
                        </Label>
                        <div className="col-xl-8 col-md-7 d-flex justify-content-between">
                          <input
                            type="text"
                            value={newFeature}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                          <div
                            disabled={newFeature ? true : false}
                            onClick={handleAddFeature}
                            className="btn btn-primary pull-right"
                          >
                            Add
                          </div>
                        </div>
                      </FormGroup>
                    </>
                  ) : (
                    <FormGroup className="row">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span> Wallet Amount
                      </Label>
                      <div className="col-xl-8 col-md-7">
                        <Input
                          className="form-control"
                          id="validationCustom1"
                          type="number"
                          placeholder="Amount"
                          required={true}
                          name="amount"
                        />
                      </div>
                    </FormGroup>
                  )}

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Security Code
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="number"
                        placeholder="Security Code"
                        required={true}
                        name="securityCode"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Store
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <select
                        onChange={(e) => handleGetProduct(e.target.value)}
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
                  </FormGroup>

                  {products.length > 0 && (
                    <FormGroup className="row">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span> Product
                      </Label>
                      <div className="col-xl-8 col-md-7">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          placeholder="Select product"
                          required={true}
                          name="productId"
                        >
                          {products &&
                            products.map((product) => (
                              <option value={product?._id}>
                                {product?.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    </FormGroup>
                  )}

                  <div className="row">
                    <div className="col-xl-3 col-md-4"></div>
                    <div className="col-xl-8 col-md-7">
                      <button
                        className="btn btn-primary pull-right"
                        type="submit"
                        color="primary"
                      >
                        Add Card
                      </button>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddCard;
