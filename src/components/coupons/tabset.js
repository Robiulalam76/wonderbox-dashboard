import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

const Tabset = () => {
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const handleStartDate = (date) => {
    setstartDate(date);
  };

  const handleEndDate = (date) => {
    setendDate(date);
  };

  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const logo = form.logo.value;
    const couponCode = form.coupon.value;
    const endTime = form.endTime.value;
    const discountPercentage = form.discountPercentage.value;
    const minimumAmount = form.minimumAmount.value;
    const productType = form.productType.value;

    const couponData = {
      title,
      logo,
      couponCode,
      endTime,
      discountPercentage,
      minimumAmount,
      productType,
    };

    fetch("http://localhost:5000/api/coupon/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(couponData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          form.reset();
          window.location.reload(true);
        }
      });
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link" onClick={(e) => clickActive(e)}>
            General
          </Tab>
          {/* <Tab className="nav-link" onClick={(e) => clickActive(e)}>
            Restriction
          </Tab>
          <Tab className="nav-link" onClick={(e) => clickActive(e)}>
            Usage
          </Tab> */}
        </TabList>

        <TabPanel>
          <div className="tab-pane fade active show">
            <Form
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit}
            >
              <h4>General</h4>
              <Row>
                <Col sm="12">
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Title
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        required=""
                        name="title"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Logo
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        required=""
                        name="logo"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Coupon Code
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="text"
                        required=""
                        name="coupon"
                      />
                    </div>
                    <div className="valid-feedback">
                      Please Provide a Valid Coupon Code.
                    </div>
                  </div>
                  {/* <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Start Date</Label>
                    <div className="col-md-7">
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDate}
                      />
                    </div>
                  </div> */}
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">End Time</Label>
                    <div className="col-md-7">
                      {/* <DatePicker
                        selected={endDate}
                        endDate={endDate}
                        onChange={handleEndDate}
                      /> */}
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="date"
                        required=""
                        name="endTime"
                      />
                    </div>
                  </div>
                  {/* <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Free Shipping</Label>
                    <div className="col-md-7">
                      <Label className="d-block">
                        <Input
                          className="checkbox_animated"
                          id="chk-ani2"
                          type="checkbox"
                        />
                        Allow Free Shipping
                      </Label>
                    </div>
                  </div> */}
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      Discount Percentage
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        type="number"
                        required=""
                        name="discountPercentage"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Minimum Amount</Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        type="number"
                        required=""
                        name="minimumAmount"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Product Type</Label>
                    <div className="col-md-7">
                      <select
                        className="form-select"
                        required=""
                        name="productType"
                      >
                        <option value="">--Select--</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                        <option value="2">C</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Status</Label>
                    <div className="col-md-7">
                      <Label className="d-block">
                        <Input
                          className="checkbox_animated"
                          id="chk-ani2"
                          type="checkbox"
                        />
                        Enable the Coupon
                      </Label>
                    </div>
                  </div> */}
                </Col>
              </Row>
              <div className="pull-right">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </Form>
          </div>
        </TabPanel>
        {/* <TabPanel>
          <Form className="needs-validation" noValidate="">
            <h4>Restriction</h4>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Products</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="text"
                  required=""
                />
              </div>
              <div className="valid-feedback">
                Please Provide a Product Name.
              </div>
            </div>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Category</Label>
              <div className="col-md-7">
                <select className="form-select" required="">
                  <option value="">--Select--</option>
                  <option value="1">Electronics</option>
                  <option value="2">Clothes</option>
                  <option value="2">Shoes</option>
                  <option value="2">Digital</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Minimum Spend</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="number"
                />
              </div>
            </div>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Maximum Spend</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom5"
                  type="number"
                />
              </div>
            </div>
          </Form>
        </TabPanel>
        <TabPanel>
          <Form className="needs-validation" noValidate="">
            <h4>Usage Limits</h4>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Per Limit</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom6"
                  type="number"
                />
              </div>
            </div>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Per Customer</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom7"
                  type="number"
                />
              </div>
            </div>
          </Form>
        </TabPanel> */}
      </Tabs>
    </Fragment>
  );
};

export default Tabset;
