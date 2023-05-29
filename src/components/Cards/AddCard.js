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
    const navigate = useNavigate()


    const [features, setFeatures] = useState([]);
    const [newFeature, setNewFeature] = useState('');

    const handleInputChange = (event) => {
        setNewFeature(event.target.value);
    };

    const handleAddFeature = () => {
        if (newFeature) {
            setFeatures((prevFeatures) => [...prevFeatures, newFeature]);
            setNewFeature('');
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

        const data = {
            title: form.title.value,
            productId: form.productId.value,
            type: form.type.value,
            priveteKey: form.priveteKey.value,
            securityCode: form.securityCode.value,
            checkNumber: form.checkNumber.value,
            storeId: form.storeId.value,
        };
        if (type === "Package") {
            data["features"] = features
        }
        if (type === "Wallet") {
            data["discount"] = form.discount.value
        }

        console.log(data);
        fetch(`http://localhost:5000/api/storecard`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                navigate("/dashboard/cards/all")
                form.reset()
            });
    };

    const [products, setProducts] = useState([]);

    const handleGetProduct = (id) => {
        fetch(`http://localhost:5000/api/product/store/${id}`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }


    useEffect(() => {
        const usr = localStorage.getItem("user-id");
        fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
            .then((res) => res.json())
            .then((data) => {
                setStores(data)
                handleGetProduct(data[0]._id)
            });
    }, []);

    return (
        <Fragment>
            <Breadcrumb title="Create Product" parent="products" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5> Add Product</h5>
                            </CardHeader>
                            <CardBody>
                                <Form
                                    className="needs-validation user-add"
                                    noValidate=""
                                    onSubmit={handleSubmit}
                                >
                                    <h4>Product Details</h4>

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
                                                placeholder="Selete Type"
                                                required={true}
                                                name="type"
                                            >
                                                <option selected value="Wallet">Wallet</option>
                                                <option value="Package">Package</option>
                                            </select>
                                        </div>
                                    </FormGroup>

                                    {
                                        type === "Package" ? (
                                            <>
                                                <FormGroup className="row">
                                                    <Label className="col-xl-3 col-md-4">
                                                        <span></span>
                                                    </Label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <ul class="list-group">
                                                            {features.map((feature, index) => (
                                                                <li class="list-group-item d-flex justify-content-between w-full" key={index}>
                                                                    <span>{feature}</span>
                                                                    <div onClick={() => handleRemoveFeature(index)} className="btn-sm px-2 btn-danger">
                                                                        X
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </FormGroup>


                                                <FormGroup className="row">
                                                    <Label className="col-xl-3 col-md-4">
                                                        <span>*</span> Features
                                                    </Label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input
                                                            type="text"
                                                            value={newFeature}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </FormGroup>
                                                <div className="row mb-4">
                                                    <div className="col-xl-3 col-md-4"></div>
                                                    <div className="col-xl-8 col-md-7">
                                                        <div onClick={handleAddFeature}
                                                            className="btn btn-warning pull-right"
                                                            color="primary"
                                                        >
                                                            Add Feature
                                                        </div>
                                                    </div>
                                                </div>


                                            </>


                                        )
                                            :
                                            <FormGroup className="row">
                                                <Label className="col-xl-3 col-md-4">
                                                    <span>*</span> Discount
                                                </Label>
                                                <div className="col-xl-8 col-md-7">
                                                    <Input
                                                        className="form-control"
                                                        id="validationCustom1"
                                                        type="text"
                                                        placeholder="discount"
                                                        required={true}
                                                        name="discount"
                                                    />
                                                </div>
                                            </FormGroup>
                                    }


                                    <FormGroup className="row">
                                        <Label className="col-xl-3 col-md-4">
                                            <span>*</span> Check Number
                                        </Label>
                                        <div className="col-xl-8 col-md-7">
                                            <Input
                                                className="form-control"
                                                id="validationCustom1"
                                                type="text"
                                                placeholder="Check Number"
                                                required={true}
                                                name="checkNumber"
                                            />
                                        </div>
                                    </FormGroup>

                                    <FormGroup className="row">
                                        <Label className="col-xl-3 col-md-4">
                                            <span>*</span> Security Code
                                        </Label>
                                        <div className="col-xl-8 col-md-7">
                                            <Input
                                                className="form-control"
                                                id="validationCustom1"
                                                type="text"
                                                placeholder="Security Code"
                                                required={true}
                                                name="securityCode"
                                            />
                                        </div>
                                    </FormGroup>

                                    <FormGroup className="row">
                                        <Label className="col-xl-3 col-md-4">
                                            <span>*</span> Privete Key
                                        </Label>
                                        <div className="col-xl-8 col-md-7">
                                            <Input
                                                className="form-control"
                                                id="validationCustom1"
                                                type="text"
                                                placeholder=" Privete Key"
                                                required={true}
                                                name="priveteKey"
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
                                                placeholder="Selete Store"
                                                required={true}
                                                name="storeId"
                                            >
                                                {
                                                    stores?.map(store => <option value={store?._id}>{store.name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </FormGroup>

                                    {
                                        products.length > 0 && <FormGroup className="row">
                                            <Label className="col-xl-3 col-md-4">
                                                <span>*</span> Product
                                            </Label>
                                            <div className="col-xl-8 col-md-7">
                                                <select
                                                    class="form-select"
                                                    aria-label="Default select example"
                                                    placeholder="Selete product"
                                                    required={true}
                                                    name="productId"
                                                >
                                                    {
                                                        products && products.map(product => <option value={product?._id}>{product?.title}</option>)
                                                    }

                                                </select>
                                            </div>
                                        </FormGroup>
                                    }


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