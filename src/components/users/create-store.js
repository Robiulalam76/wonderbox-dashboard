import React, { Fragment, useContext, useState } from "react";
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
  Row,
} from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { AuthContext } from "../../ContextAPI/AuthProvider";
import { useNavigate } from "react-router-dom";

const Create_Store = () => {
  const { user, refetchStores } = useContext(AuthContext);
  const navigate = useNavigate();

  const [logoFile, setLogoFile] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;

    const logo = await uploadImagesToImageBB(logoFile);
    const images = await uploadImagesToImageBB(imageFiles);

    if (logo) {
      const data = {
        name: form.name.value,
        username: form.name.value,
        address: form.address.value,
        email: form.email.value,
        phone: form.phone.value,
        description: form.description.value,
        seller: user?._id,
        logo: logo.length > 0 && logo[0],
        images: images,
        verified: true,
      };

      // console.log(data);
      fetch(`http://localhost:5000/api/store/add/${user?._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          refetchStores();
          navigate("/store/list-store");
        });
    }
  };

  return (
    <Fragment>
      <Breadcrumb title="Create User" parent="Users" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5> Add Store</h5>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation user-add"
                  noValidate=""
                  onSubmit={handleSubmit}
                >
                  <h4>Store Details</h4>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Name
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        placeholder="Title"
                        required={true}
                        name="name"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Address
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        placeholder="Address"
                        required={true}
                        name="address"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Email
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="email"
                        placeholder="Email Address"
                        required={true}
                        name="email"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Phone
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="number"
                        placeholder="Phone number"
                        required={true}
                        name="phone"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Description
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <textarea
                        aria-label="With textarea"
                        className="form-control"
                        id="validationCustom1"
                        type="text"
                        required={true}
                        placeholder="description"
                        name="description"
                      ></textarea>
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span></span>
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      {logoFile &&
                        logoFile?.map((file) => (
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
                      <span>*</span> Logo
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <div class="input-group">
                        <input
                          onChange={(e) => setLogoFile([e.target.files[0]])}
                          type="file"
                          name="logo"
                          class="form-control"
                          required={true}
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                  </FormGroup>

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
                        />
                      </div>
                    </div>
                  </FormGroup>

                  <div className="row">
                    <div className="col-xl-3 col-md-4"></div>
                    <div className="col-xl-8 col-md-7 d-flex justify-content-end">
                      {loading ? (
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
                        <Button type="submit" color="primary">
                          Add Store
                        </Button>
                      )}
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

export default Create_Store;
