import React from "react";
import { Button, Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../ContextAPI/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProductUpdateModal = ({ product, setProduct, refetch }) => {
  const { user, stores, categories } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [parent, setParent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState(product.type);
  const [imageFiles, setImageFiles] = useState([]);

  const [features, setFeatures] = useState(product?.features);
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

    const images = await uploadImagesToImageBB(imageFiles);

    if (product?.images) {
      const data = {
        title: form.title.value,
        images:
          images?.length > 0 ? [images, ...product?.images] : product?.images,
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
      };
      if (type === "Package") {
        data["features"] = features;
      }
      if (type === "Wallet") {
        data["walletDiscountAmount"] = form.walletDiscountAmount.value;
      }

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
          refetch && refetch(product?.storeId);
          setProduct(null);
          form.reset();
        });
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={product?._id ? true : false}
        onHide={() => setProduct(null)}
      >
        <Modal.Body>
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
                    {product?.images?.length > 0 &&
                      product?.images?.map((file) => (
                        <img
                          className="pe-2"
                          style={{ width: "70px" }}
                          src={file}
                          alt=""
                        />
                      ))}
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
                        required={product?._id ? false : true}
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
                      defaultValue={product?.title}
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
                      {["Wallet", "Package"].map((t, i) => (
                        <option
                          key={i}
                          selected={product?.type === t && product?.type}
                          value={t}
                        >
                          {t}
                        </option>
                      ))}
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
                        defaultValue={
                          product?.type === "Wallet" &&
                          product?.walletDiscountAmount
                        }
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
                      defaultValue={product?.originalPrice}
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
                      onChange={(e) => handleSubCategory(e.target.value)}
                      class="form-select"
                      placeholder="Select Category"
                      required={true}
                    >
                      {categories.length > 0 &&
                        categories.map((cate, i) => (
                          <option
                            key={i}
                            value={cate?._id}
                            selected={
                              product?._id && product?.parent === cate.parent
                            }
                          >
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
                          <option
                            key={i}
                            value={product?._id ? product?.children : child}
                            selected={
                              product?._id && product?.children === child
                                ? true
                                : false
                            }
                          >
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
                        <option
                          selected={
                            product?._id &&
                            product?.storeId === store?._id &&
                            product?.storeId
                          }
                          value={store?._id}
                        >
                          {store.name}
                        </option>
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
                      defaultValue={product?.smallDescription}
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
                      defaultValue={product?.longDescription}
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
                      defaultValue={product?.address}
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
                      defaultValue={product?.numberPerson}
                    ></textarea>
                  </div>
                </FormGroup>

                <div className="row">
                  <div className="col-xl-3 col-md-4"></div>
                  <div className="col-xl-8 col-md-7">
                    <div className="pull-right">
                      {isLoading ? (
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
                          Update Product
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductUpdateModal;

// import React, { Fragment, useEffect, useState } from "react";
// import {
//     Form,
//     FormGroup,
//     Input,
//     Label,
// } from "reactstrap";

// const parents = [
//     {
//         _id: "1",
//         parent: "moment",
//         children: ["children"]
//     },
//     {
//         _id: "2",
//         parent: "parent2",
//         children: ["children2"]
//     },
//     {
//         _id: "3",
//         parent: "parent3",
//         children: ["children3"]
//     },
//     {
//         _id: "4",
//         parent: "parent4",
//         children: ["children4"]
//     }
// ]
// const ProductUpdateModal = ({ product, setProduct, refetch }) => {
//     const [stores, setStores] = useState([]);
//     const [type, setType] = useState(product?.type);

//     const [imageFiles, setImageFiles] = useState([])
//     const [images, setImages] = useState(product?.images)

//     const [features, setFeatures] = useState(product?.features);
//     const [newFeature, setNewFeature] = useState('');

//     const handleInputChange = (event) => {
//         setNewFeature(event.target.value);
//     };

//     const handleAddFeature = () => {
//         if (newFeature) {
//             setFeatures((prevFeatures) => [...prevFeatures, newFeature]);
//             setNewFeature('');
//         }
//     };

//     const handleRemoveFeature = (index) => {
//         setFeatures((prevFeatures) => {
//             const updatedFeatures = [...prevFeatures];
//             updatedFeatures.splice(index, 1);
//             return updatedFeatures;
//         });
//     };

//     const uploadImagesToImageBB = async (files) => {
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append('image', file);
//             try {
//                 const response = await fetch('https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393', {
//                     method: 'POST',
//                     body: formData,
//                 });
//                 const data = await response.json();
//                 setImages([...images, data?.data?.url])
//             } catch (error) {
//                 console.error('Error uploading image:', error);
//             }
//         }
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const form = event.target;

//         if (imageFiles?.length > 0) {
//             uploadImagesToImageBB(imageFiles)
//             if (images) {
//                 const data = {
//                     title: form.title.value,
//                     images: images,
//                     price: form.price.value,
//                     parent: form.parent.value,
//                     children: form.children.value,
//                     description: form.description.value,
//                     storeId: form.storeId.value,
//                 };
//                 if (type === "Package") {
//                     data["features"] = features
//                 }
//                 if (type === "Wallet") {
//                     data["discount"] = form.discount.value
//                 }
//                 console.log(data);
//                 fetch(`http://localhost:5000/api/product/update/${product?._id}`, {
//                     method: "PATCH",
//                     headers: {
//                         "content-type": "application/json",
//                     },
//                     body: JSON.stringify(data),
//                 })
//                     .then((res) => res.json())
//                     .then((data) => {
//                         console.log(data);
//                         refetch && refetch(product?.storeId)
//                         setProduct(null)
//                         form.reset()
//                     });
//             }
//         }

//     };

//     useEffect(() => {
//         const usr = localStorage.getItem("user-id");
//         fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
//             .then((res) => res.json())
//             .then((data) => setStores(data));
//     }, []);

//     return (
//         <Fragment>
//             <Form
//                 className="needs-validation user-add"
//                 noValidate=""
//                 onSubmit={handleSubmit}
//             >
//                 <h4>Product Details</h4>

//                 <FormGroup className="row">
//                     <Label className="col-xl-3 col-md-4">
//                         <span>*</span> Title
//                     </Label>
//                     <div className="col-xl-8 col-md-7">
//                         <Input
//                             className="form-control"
//                             id="validationCustom0"
//                             type="text"
//                             required={true}
//                             name="title"
//                             defaultValue={product?.title}
//                         />
//                     </div>
//                 </FormGroup>

//                 <FormGroup className="row">
//                     <Label className="col-xl-3 col-md-4">
//                         <span></span>
//                     </Label>
//                     <div className="col-xl-8 col-md-7">
//                         {
//                             product && product?.images?.map(file => (
//                                 <img className="pe-2" style={{ width: "70px" }} src={file} alt="" />
//                             ))
//                         }
//                         {
//                             imageFiles && imageFiles?.map(file => (
//                                 <img className="pe-2" style={{ width: "70px" }} src={URL.createObjectURL(file)} alt="" />
//                             ))
//                         }
//                     </div>
//                 </FormGroup>

//                 <FormGroup className="row">
//                     <Label className="col-xl-3 col-md-4">
//                         <span>*</span> Images
//                     </Label>
//                     <div className="col-xl-8 col-md-7">
//                         <div class="input-group">
//                             <input onChange={(e) => setImageFiles([...imageFiles, e.target.files[0]])} type="file" class="form-control" id="inputGroupFile02" />
//                         </div>
//                     </div>
//                 </FormGroup>

//                 {
//                     type === "Package" ? (
//                         <>
//                             <FormGroup className="row">
//                                 <Label className="col-xl-3 col-md-4">
//                                     <span></span>
//                                 </Label>
//                                 <div className="col-xl-8 col-md-7">
//                                     <ul class="list-group">
//                                         {features.map((feature, index) => (
//                                             <li class="list-group-item d-flex justify-content-between w-full" key={index}>
//                                                 <span>{feature}</span>
//                                                 <div onClick={() => handleRemoveFeature(index)} className="btn-sm px-2 btn-danger">
//                                                     X
//                                                 </div>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </FormGroup>

//                             <FormGroup className="row">
//                                 <Label className="col-xl-3 col-md-4">
//                                     <span>*</span> Features
//                                 </Label>
//                                 <div className="col-xl-8 col-md-7">
//                                     <input
//                                         type="text"
//                                         value={newFeature}
//                                         onChange={handleInputChange}
//                                         className="form-control"
//                                     />
//                                 </div>
//                             </FormGroup>
//                             <div className="row mb-4">
//                                 <div className="col-xl-3 col-md-4"></div>
//                                 <div className="col-xl-8 col-md-7">
//                                     <div onClick={handleAddFeature}
//                                         className="btn btn-warning pull-right"
//                                         color="primary"
//                                     >
//                                         Add Feature
//                                     </div>
//                                 </div>
//                             </div>

//                         </>
//                     )
//                         :
//                         <FormGroup className="row">
//                             <Label className="col-xl-3 col-md-4">
//                                 <span>*</span> Discount
//                             </Label>
//                             <div className="col-xl-8 col-md-7">
//                                 <Input
//                                     className="form-control"
//                                     id="validationCustom1"
//                                     type="text"
//                                     placeholder="discount"
//                                     required={true}
//                                     name="discount"
//                                     defaultValue={product?.discount}
//                                 />
//                             </div>
//                         </FormGroup>
//                 }

//                 <FormGroup className="row">
//                     <Label className="col-xl-3 col-md-4">
//                         <span>*</span> Price
//                     </Label>
//                     <div className="col-xl-8 col-md-7">
//                         <Input
//                             className="form-control"
//                             id="validationCustom1"
//                             type="text"
//                             placeholder="Price"
//                             required={true}
//                             name="price"
//                             defaultValue={product?.price}
//                         />
//                     </div>
//                 </FormGroup>

//                 <FormGroup className="row">
//                     <Label className="col-xl-3 col-md-4">
//                         <span>*</span> Parent
//                     </Label>
//                     <div className="col-xl-8 col-md-7">
//                         <select
//                             class="form-select"
//                             aria-label="Default select example"
//                             placeholder="Selete parent"
//                             required={true}
//                             name="parent"
//                         >
//                             {
//                                 parents?.map(parent => (
//                                     <option selected={product?.parent === parent?.parent} value={product?.parent}>{parent.parent}</option>
//                                 ))
//                             }
//                         </select>
//                     </div>
//                 </FormGroup>

//                 <FormGroup className="row">
//                     <Label className="col-xl-3 col-md-4">
//                         <span>*</span> Children
//                     </Label>
//                     <div className="col-xl-8 col-md-7">
//                         <select
//                             class="form-select"
//                             aria-label="Default select example"
//                             placeholder="Selete Type"
//                             required={true}
//                             name="children"
//                         >
//                             {
//                                 parents[0]?.children?.map(title => (
//                                     <option selected={product?.children === title} value={title}>{title}</option>
//                                 ))
//                             }
//                         </select>
//                     </div>
//                 </FormGroup>

//                 <FormGroup className="row">
//                     <Label className="col-xl-3 col-md-4">
//                         <span>*</span> Store
//                     </Label>
//                     <div className="col-xl-8 col-md-7">
//                         <select
//                             class="form-select"
//                             aria-label="Default select example"
//                             placeholder="Selete Store"
//                             required={true}
//                             name="storeId">
//                             {
//                                 stores?.map(store => <option selected={product?.storeId === store?._id} value={store?._id}>{store.name}</option>)
//                             }
//                         </select>
//                     </div>
//                 </FormGroup>

//                 <FormGroup className="row">
//                     <Label className="col-xl-3 col-md-4">
//                         <span>*</span> Description
//                     </Label>
//                     <div className="col-xl-8 col-md-7">
//                         <textarea aria-label="With textarea"
//                             className="form-control"
//                             id="validationCustom1"
//                             type="text"
//                             required={true}
//                             placeholder="description"
//                             name="description"
//                             defaultValue={product?.description}
//                         ></textarea>
//                     </div>
//                 </FormGroup>

//                 <div className="row">
//                     <div className="col-xl-3 col-md-4"></div>
//                     <div className="col-xl-8 col-md-7 d-flex justify-centent-end">
//                         <button onClick={() => setProduct(null)} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                         <button
//                             className="btn btn-primary pull-right"
//                             type="submit"
//                             color="primary"
//                         >
//                             Add Product
//                         </button>
//                     </div>
//                 </div>
//             </Form>

//         </Fragment>
//     );
// };

// export default ProductUpdateModal;
