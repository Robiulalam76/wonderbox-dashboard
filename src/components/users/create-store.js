import TextArea from "@uiw/react-md-editor/lib/components/TextArea";
import React, { Fragment, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
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
import TabsetUser from "./tabset-user";

const Create_Store = () => {
  const [seller, setSeller] = useState("");
  const [allSeller, setAllSeller] = useState([]);

  const [logoFile, setLogoFile] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [logo, setLogo] = useState("")
  const [images, setImages] = useState([])


  const uploadImagesToImageBB = async (files, action) => {
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch('https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (action === "images") {
          setImages([...images, data?.data?.url])
        }
        if (action === "logo") {
          setLogo(data?.data?.url)
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (imageFiles?.length > 0) {
      uploadImagesToImageBB(imageFiles, "images")
    }

    if (logoFile) {
      uploadImagesToImageBB(logoFile, "logo")
    }

    if (logo) {

      const data = {
        name: form.name.value,
        username: form.name.value,
        street: form.street.value,
        city: form.city.value,
        country: form.country.value,
        postalCode: form.postalCode.value,
        email: form.email.value,
        description: form.description.value,
        userId: seller?._id,
        logo: logo,
        images: images,
        verified: true
      };
      console.log(data);
      fetch(`http://localhost:5000/api/store/add/${seller?._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload(true);
          console.log(data);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/user/")
      .then((res) => res.json())
      .then((data) => {
        const seller = data.filter((item) => item.role === "seller");
        setAllSeller(seller);
      });
  }, []);

  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => setSeller(data));
  }, []);

  // console.log(allSeller);
  // console.log(seller);
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
                        // onChange={(e) => setFirstName(e.target.value)}
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        required={true}
                        name="name"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Address
                    </Label>
                    <div className="d-flex justify-content-between w-full gap-4 col-md-8">
                      <Input
                        // onChange={(e) => setLastName(e.target.value)}
                        className="form-control w-full"
                        id="validationCustom1"
                        type="text"
                        required={true}
                        placeholder="street"
                        name="street"
                      />
                      <Input
                        // onChange={(e) => setLastName(e.target.value)}
                        className="form-control w-full"
                        id="validationCustom1"
                        type="text"
                        required={true}
                        placeholder="city"
                        name="city"
                      />
                      <Input
                        // onChange={(e) => setLastName(e.target.value)}
                        className="form-control w-full"
                        id="validationCustom1"
                        type="text"
                        required={true}
                        placeholder="country"
                        name="country"
                      />
                      <Input
                        // onChange={(e) => setLastName(e.target.value)}
                        className="form-control w-full"
                        id="validationCustom1"
                        type="text"
                        required={true}
                        placeholder="postal Code"
                        name="postalCode"
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
                        type="text"
                        placeholder="Email Address"
                        required={true}
                        name="email"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Description
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <textarea aria-label="With textarea"
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
                      {
                        logoFile && logoFile?.map(file => (
                          <img className="pe-2" style={{ width: "70px" }} src={URL.createObjectURL(file)} alt="" />
                        ))
                      }
                    </div>
                  </FormGroup>


                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Logo
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <div class="input-group">
                        <input onChange={(e) => setLogoFile([e.target.files[0]])} type="file" name="logo" class="form-control" required={true} id="inputGroupFile02" />
                      </div>
                    </div>
                  </FormGroup>




                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span></span>
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      {
                        imageFiles && imageFiles?.map(file => (
                          <img className="pe-2" style={{ width: "70px" }} src={URL.createObjectURL(file)} alt="" />
                        ))
                      }
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Images
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <div class="input-group">
                        <input onChange={(e) => setImageFiles([...imageFiles, e.target.files[0]])} type="file" class="form-control" id="inputGroupFile02" />
                      </div>
                    </div>
                  </FormGroup>

                  <div className="row">
                    <div className="col-xl-3 col-md-4"></div>
                    <div className="col-xl-8 col-md-7">
                      <button
                        className="btn btn-warning pull-right"
                        type="submit"
                        color="primary"
                      >
                        Add Store
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

export default Create_Store;
