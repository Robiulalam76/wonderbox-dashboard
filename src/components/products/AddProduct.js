import React, { Fragment, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [user, setUser] = useState(null);
    const [stores, setStores] = useState([]);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [type, setType] = useState("Wallet");

    const [imageFiles, setImageFiles] = useState([])
    // const [images, setImages] = useState([])


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


    const uploadImagesToImageBB = async (files) => {
        let images = []
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);
            const response = await fetch('https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            images.push(data?.data?.url)
        }
        return images
    };

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        const form = event.target;

        if (imageFiles?.length > 0) {
            const images = await uploadImagesToImageBB(imageFiles)
            if (images.length > 0) {
                const data = {
                    title: form.title.value,
                    images: images,
                    type: form.type.value,
                    price: form.price.value,
                    parent: form.parent.value,
                    children: form.children.value,
                    description: form.description.value,
                    storeId: form.storeId.value,
                };
                if (type === "Package") {
                    data["features"] = features
                }
                if (type === "Wallet") {
                    data["discount"] = form.discount.value
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
                        setIsLoading(false)
                        navigate("/products/all")
                        form.reset()
                    });
            }
        }




    };

    useEffect(() => {
        const usr = localStorage.getItem("user-id");
        fetch(`http://localhost:5000/api/user/${usr}`)
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

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
                                            <span>*</span> Price
                                        </Label>
                                        <div className="col-xl-8 col-md-7">
                                            <Input
                                                className="form-control"
                                                id="validationCustom1"
                                                type="text"
                                                placeholder="Price"
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
                                                class="form-select"
                                                aria-label="Default select example"
                                                placeholder="Selete parent"
                                                required={true}
                                                name="parent"
                                            >
                                                <option value="moment">moment</option>
                                                <option value="parent2">parent2</option>
                                                <option value="parent3">parent3</option>
                                                <option value="parent4">parent4</option>
                                                <option value="parent5">parent5</option>
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
                                                placeholder="Selete Type"
                                                required={true}
                                                name="children"
                                            >
                                                <option value="moment">moment</option>
                                                <option value="children2">children2</option>
                                                <option value="children3">children3</option>
                                                <option value="children4">children4</option>
                                                <option value="children5">children5</option>
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
                                                placeholder="Selete Store"
                                                required={true}
                                                name="storeId">
                                                {
                                                    stores?.map(store => <option value={store?._id}>{store.name}</option>)
                                                }
                                            </select>
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



                                    <div className="row">
                                        <div className="col-xl-3 col-md-4"></div>
                                        <div className="col-xl-8 col-md-7">
                                            <div className="pull-right">

                                                {
                                                    isLoading ? <button class="btn btn-primary" type="button" disabled>
                                                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"> </span>
                                                        Loading...
                                                    </button>
                                                        :
                                                        <Button type="submit" color="primary">
                                                            Add Product
                                                        </Button>
                                                }
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