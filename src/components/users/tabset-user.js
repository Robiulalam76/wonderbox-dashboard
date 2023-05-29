import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const TabsetUser = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState("seller")

  const [isLoading, setIsLoading] = useState(false)
  const [emailResult, setEmailResult] = useState("")
  const [passwordResult, setPasswordResult] = useState("")
  console.log(passwordResult);

  const addUser = (e) => {
    setPasswordResult("")
    setIsLoading(true)
    e.preventDefault()
    const form = e.target

    const password = form.password.value
    const confirmPassword = form.confirmPassword.value

    if (password !== confirmPassword) {
      setIsLoading(false)
      setPasswordResult("Password Not Matched")
      return;
    }

    const newUser = {
      name: form.firstName.value + ' ' + form.lastName.value,
      country: form.country.value,
      email: form.email.value,
      phone: form.phone.value,
      password: password,
      role: role,
    }


    fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          form.reset()
          setIsLoading(false)
          navigate("/users/list-user")
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      });
  };
  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Account</Tab>
        </TabList>
        <TabPanel>
          <Form onSubmit={addUser} className="needs-validation user-add" noValidate="">
            <h4>Account Details</h4>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> First Name
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom0"
                  type="text"
                  required={true}
                  name="firstName"
                />
              </div>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Last Name
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom1"
                  type="text"
                  required={true}
                  name="lastName"
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
                  id="validationCustom2"
                  type="text"
                  required={true}
                  name="email"
                />
              </div>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Password
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="password"
                  required={true}
                  name="password"
                />
              </div>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Confirm Password
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="password"
                  required={true}
                  name="confirmPassword"
                />
              </div>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Country
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="text"
                  required={true}
                  name="country"
                />
              </div>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Phone Number
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="text"
                  required={true}
                  name="phone"
                />
              </div>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Role
              </Label>
              <div className="col-xl-8 col-md-7 d-flex gap-4 ">
                <div onClick={() => setRole("seller")} class="form-check">
                  <input class="form-check-input"
                    type="radio"
                    name="flexRadioDefault" id="flexRadioDefault1"
                    checked={role === "seller" ? true : false} />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Seller
                  </label>
                </div>
                <div onClick={() => setRole("buyer")} class="form-check">
                  <input class="form-check-input"
                    type="radio"
                    name="flexRadioDefault" id="flexRadioDefault2"
                    checked={role === "buyer" ? true : false} />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Buyer
                  </label>
                </div>
              </div>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span></span>
              </Label>
              <div className="col-xl-8 col-md-7">
                <div className="pull-right">

                  {
                    isLoading ? <button class="btn btn-primary" type="button" disabled>
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"> </span>
                      Loading...
                    </button>
                      :
                      <Button type="submit" color="primary">
                        Save
                      </Button>
                  }
                </div>
              </div>
            </FormGroup>



          </Form>
        </TabPanel>
        {/* <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <div className="permission-block">
              <div className="attribute-blocks">
                <h5 className="f-w-600 mb-3">Product Related Permission </h5>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="form-label">Add Product</Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani1"
                          type="radio"
                          name="rdo-ani"
                        />
                        Allow
                      </Label>
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani2"
                          type="radio"
                          name="rdo-ani"
                          defaultChecked
                        />
                        Deny
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="form-label">Update Product</Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani3"
                          type="radio"
                          name="rdo-ani1"
                          defaultChecked
                        />
                        Allow
                      </Label>
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani4"
                          type="radio"
                          name="rdo-ani1"
                        />
                        Deny
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="form-label">Delete Product</Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className=" m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani5"
                          type="radio"
                          name="rdo-ani2"
                        />
                        Allow
                      </Label>
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani6"
                          type="radio"
                          name="rdo-ani2"
                          defaultChecked
                        />
                        Deny
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="mb-0 sm-label-radio">
                      Apply Discount
                    </Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated pb-0">
                      <Label className="d-block mb-0">
                        <Input
                          className="radio_animated"
                          id="edo-ani7"
                          type="radio"
                          name="rdo-ani3"
                        />
                        Allow
                      </Label>
                      <Label className="d-block mb-0">
                        <Input
                          className="radio_animated"
                          id="edo-ani8"
                          type="radio"
                          name="rdo-ani3"
                          defaultChecked
                        />
                        Deny
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div className="attribute-blocks">
                <h5 className="f-w-600 mb-3">Category Related Permission </h5>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="form-label">Add Category</Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani9"
                          type="radio"
                          name="rdo-ani4"
                        />
                        Allow
                      </Label>
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani10"
                          type="radio"
                          name="rdo-ani4"
                          defaultChecked
                        />
                        Deny
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="form-label">Update Category</Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani11"
                          type="radio"
                          name="rdo-ani5"
                        />
                        Allow
                      </Label>
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani12"
                          type="radio"
                          name="rdo-ani5"
                          defaultChecked
                        />
                        Deny
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="form-label">Delete Category</Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani13"
                          type="radio"
                          name="rdo-ani6"
                        />
                        Allow
                      </Label>
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani14"
                          type="radio"
                          name="rdo-ani6"
                          defaultChecked
                        />
                        Deny
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="mb-0 sm-label-radio">
                      Apply Discount
                    </Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                      <Label className="d-block mb-0">
                        <Input
                          className="radio_animated"
                          id="edo-ani15"
                          type="radio"
                          name="rdo-ani7"
                        />
                        Allow
                      </Label>
                      <Label className="d-block mb-0">
                        <Input
                          className="radio_animated"
                          id="edo-ani16"
                          type="radio"
                          name="rdo-ani7"
                          defaultChecked
                        />
                        Deny
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
        </TabPanel> */}
      </Tabs>

    </Fragment>
  );
};

export default TabsetUser;
