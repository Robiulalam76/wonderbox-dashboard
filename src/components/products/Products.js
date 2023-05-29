import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-feather';
import { Breadcrumb, Card, CardBody, CardHeader, Container } from "reactstrap";

const Products = () => {
    const [stores, setStores] = useState([])
    const [products, setProducts] = useState([]);

    const getProducts = (id) => {
        fetch(`http://localhost:5000/api/product/store/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    useEffect(() => {
        getProducts(stores[0]?._id)
    }, [stores]);


    const handleUpdateStatus = (id, status) => {
        fetch(`http://localhost:5000/api/product/status/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: status })
        })
            .then(res => res.json())
            .then(data => {
                getProducts()
            })
    }

    const handleDelete = (productId) => {
        console.log('Deleting product with ID:', productId);
    };

    const handleEdit = (productId) => {
        console.log('Editing product with ID:', productId);
    };


    useEffect(() => {
        const usr = localStorage.getItem("user-id");
        fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
            .then((res) => res.json())
            .then((data) => setStores(data));
    }, []);

    return (
        <Fragment>
            <Breadcrumb title="Product List" parent="Products" />
            <Container fluid={true}>
                <Card>
                    <CardHeader>
                        <div className="d-flex justify-content-between">
                            <h5>Products</h5>
                            <select style={{ width: "400px" }}
                                onClick={(e) => getProducts(e.target.value)}
                                class="form-select"
                                aria-label="Default select example"
                                placeholder="Selete Store"
                                required={true}
                                name="storeId">
                                {
                                    stores?.map(store => <option value={store?._id}>{store.name}</option>)
                                }
                            </select>
                            <Link to="/products/addproduct" className="btn btn-secondary text-primary">Add Product</Link>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <table className="table table-responsive">

                            <thead className='py-2' style={{ backgroundColor: "lightgrey" }} >
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Parent</th>
                                    <th>Children</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            {product.images.length > 0 && (
                                                <img style={{ width: "40px", height: "40px" }} src={product.images[0]} alt="Product" />
                                            )}
                                        </td>
                                        <td>{product.title}</td>
                                        <td>{product.price}</td>
                                        <td>{product.discount}</td>
                                        <td>{product.parent}</td>
                                        <td>{product.children}</td>
                                        <td>{product.type}</td>
                                        <td>
                                            <div onClick={() => handleUpdateStatus(product?._id, product.status === "Show" ? "Hide" : "Show")} class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={product.status === "Show" ? true : false} />
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-sm btn-danger me-2"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                X
                                            </button>
                                            <button
                                                className="btn-sm btn-primary"
                                                onClick={() => handleEdit(product._id)}
                                            >
                                                edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </Container>
        </Fragment>
    );
};

export default Products;
