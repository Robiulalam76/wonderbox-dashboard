import React, { Fragment, useEffect, useState } from "react";
import {
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

const parents = [
    {
        _id: "1",
        parent: "moment",
        children: ["children"]
    },
    {
        _id: "2",
        parent: "parent2",
        children: ["children2"]
    },
    {
        _id: "3",
        parent: "parent3",
        children: ["children3"]
    },
    {
        _id: "4",
        parent: "parent4",
        children: ["children4"]
    }
]
const ProductUpdateModal = ({ product, setProduct, refetch }) => {
    const [stores, setStores] = useState([]);
    const [type, setType] = useState(product?.type);

    const [imageFiles, setImageFiles] = useState([])
    const [images, setImages] = useState(product?.images)


    const [features, setFeatures] = useState(product?.features);
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
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await fetch('https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                setImages([...images, data?.data?.url])
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (imageFiles?.length > 0) {
            uploadImagesToImageBB(imageFiles)
            if (images) {
                const data = {
                    title: form.title.value,
                    images: images,
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
                console.log(data);
                fetch(`http://localhost:5000/api/product/update/${product?._id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        refetch && refetch(product?.storeId)
                        setProduct(null)
                        form.reset()
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
                            defaultValue={product?.title}
                        />
                    </div>
                </FormGroup>


                <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                        <span></span>
                    </Label>
                    <div className="col-xl-8 col-md-7">
                        {
                            product && product?.images?.map(file => (
                                <img className="pe-2" style={{ width: "70px" }} src={file} alt="" />
                            ))
                        }
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
                                    defaultValue={product?.discount}
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
                            defaultValue={product?.price}
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
                            {
                                parents?.map(parent => (
                                    <option selected={product?.parent === parent?.parent} value={product?.parent}>{parent.parent}</option>
                                ))
                            }
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
                            {
                                parents[0]?.children?.map(title => (
                                    <option selected={product?.children === title} value={title}>{title}</option>
                                ))
                            }
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
                                stores?.map(store => <option selected={product?.storeId === store?._id} value={store?._id}>{store.name}</option>)
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
                            defaultValue={product?.description}
                        ></textarea>
                    </div>
                </FormGroup>

                <div className="row">
                    <div className="col-xl-3 col-md-4"></div>
                    <div className="col-xl-8 col-md-7 d-flex justify-centent-end">
                        <button onClick={() => setProduct(null)} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button
                            className="btn btn-primary pull-right"
                            type="submit"
                            color="primary"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </Form>

        </Fragment>
    );
};


export default ProductUpdateModal;