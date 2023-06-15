import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
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
import { useContext } from "react";
import { AuthContext } from "../../ContextAPI/AuthProvider";

const AddProduct = () => {
  const { user, categories } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [parent, setParent] = useState("");
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("Wallet");
  const [imageFiles, setImageFiles] = useState([]);

  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  const handleSubCategory = (id) => {
    const category = categories?.find((cate) => cate?._id === id);
    setChildren(category.children);
    setParent(category?.parent);
  };

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

  const uploadImagesToImageBB = async (files) => {
    let images = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      images.push(data?.data?.url);
    }
    return images;
  };

  const calculatePercentage = (originalPrice, sellPrice) => {
    const discount = originalPrice - sellPrice;
    const percentage = (discount / originalPrice) * 100;
    return parseInt(percentage.toFixed(0)); // Limit decimal places to 2
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;

    const originalPrice = form.originalPrice.value;
    const price = form.price.value;
    const discount = calculatePercentage(originalPrice, price);

    if (imageFiles?.length > 0) {
      const images = await uploadImagesToImageBB(imageFiles);

      if (images.length > 0) {
        const data = {
          title: form.title.value,
          images: images,
          type: form.type.value,
          originalPrice: originalPrice,
          price: price,
          parent: parent,
          children: form.children.value,
          smallDescription: form.smallDescription.value,
          longDescription: form.longDescription.value,
          storeId: form.storeId.value,
          address: form.address.value,
          discount: discount,
          numberPerson: form.numberPerson.value,
        };
        if (type === "Package") {
          data["features"] = features;
        }
        if (type === "Wallet") {
          data["walletDiscountAmount"] = form.walletDiscountAmount.value;
        }

        fetch(`http://localhost:5000/api/product/add`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            setIsLoading(false);
            navigate("/products/all");
            form.reset();
          });
      }
    }
  };

  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
      .then((res) => res.json())
      .then((data) => setStores(data));
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Create Product" parent="products" />
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
                      <span></span>
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      {imageFiles &&
                        imageFiles?.map((file) => (
                          <img
                            className="pe-2"
                            style={{ width: "70px" }}
                            src={URL.createObjectURL(file)}
                            alt=""
                          />
                        ))}
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Images
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <div class="input-group">
                        <input
                          onChange={(e) =>
                            setImageFiles([...imageFiles, e.target.files[0]])
                          }
                          type="file"
                          class="form-control"
                          id="inputGroupFile02"
                          required={true}
                        />
                      </div>
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Title
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        required={true}
                        name="title"
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
                      <>
                        <FormGroup className="row">
                          <Label className="col-xl-3 col-md-4">
                            <span></span>
                          </Label>
                          <div className="col-xl-8 col-md-7">
                            <div class="d-flex justify-items-center flex-wrap ">
                              {features.map((feature, index) => (
                                <div
                                  class="border d-flex me-2 mb-2"
                                  key={index}
                                >
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
                          placeholder="Wallet Discount Amount"
                          required={true}
                          name="walletDiscountAmount"
                        />
                      </div>
                    </FormGroup>
                  )}

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
                        name="originalPrice"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Selling Price
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="number"
                        placeholder="Sell Price"
                        required={true}
                        name="price"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Parent
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <select
                        onChange={(e) => handleSubCategory(e.target.value)}
                        class="form-select"
                        placeholder="Select Category"
                        required={true}
                      >
                        {categories.length > 0 &&
                          categories.map((cate, i) => (
                            <option key={i} value={cate?._id}>
                              {cate?.parent}
                            </option>
                          ))}
                      </select>
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Children
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        placeholder="Select Type"
                        required={true}
                        name="children"
                      >
                        {children?.length > 0 &&
                          children.map((child, i) => (
                            <option key={i} value={child}>
                              {child}
                            </option>
                          ))}
                      </select>
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Store
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <select
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

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span>Small Description
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <textarea
                        aria-label="With textarea"
                        className="form-control"
                        id="validationCustom1"
                        type="text"
                        required={true}
                        placeholder="description"
                        name="smallDescription"
                      ></textarea>
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span>Long Description
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <textarea
                        aria-label="With textarea"
                        className="form-control"
                        id="validationCustom1"
                        type="text"
                        required={true}
                        placeholder="description"
                        name="longDescription"
                      ></textarea>
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Address
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <textarea
                        aria-label="With textarea"
                        className="form-control"
                        id="validationCustom1"
                        type="text"
                        required={true}
                        placeholder="Address"
                        name="address"
                      ></textarea>
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Number Person
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <textarea
                        aria-label="With textarea"
                        className="form-control"
                        id="validationCustom1"
                        type="number"
                        required={true}
                        placeholder="Number Person"
                        name="numberPerson"
                      ></textarea>
                    </div>
                  </FormGroup>

                  <div className="row">
                    <div className="col-xl-3 col-md-4"></div>
                    <div className="col-xl-8 col-md-7">
                      <div className="pull-right">
                        {isLoading ? (
                          <button
                            class="btn btn-primary"
                            type="button"
                            disabled
                          >
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
                          <Button type="submit" color="primary">
                            Add Product
                          </Button>
                        )}
                      </div>
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

export default AddProduct;
