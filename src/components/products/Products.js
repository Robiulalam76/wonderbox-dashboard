import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-feather';
import { Breadcrumb, Card, CardBody, CardHeader, Container } from "reactstrap";
import ProductUpdateModal from './ProductUpdateModal';

const Products = () => {
    const [stores, setStores] = useState([])
    const [storeId, setStoreId] = useState("")
    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([]);

    const getProducts = (id) => {
        fetch(`http://localhost:5000/api/product/store/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    useEffect(() => {
        getProducts(stores[0]?._id)
    }, [stores]);

    const handleSetStoreId = (id) => {
        setStoreId(id)
        getProducts(id)
    }


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
                getProducts(storeId)
            })
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/product/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                getProducts(storeId)
            })
    }


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
                            <select style={{ width: "400px" }}
                                onClick={(e) => handleSetStoreId(e.target.value)}
                                class="form-select"
                                aria-label="Default select example"
                                placeholder="Selete Store"
                                required={true}
                                name="storeId">
                                {
                                    stores?.map(store => <option value={store?._id}>{store.name}</option>)
                                }
                            </select>
                            <Link to="/dashboard/products/add-product" className='' >
                                <button className='btn btn-primary' >Add Product</button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody>

                        {
                            products.length > 0 ? (
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
                                                        type='button'
                                                        className="btn-sm btn-primary"
                                                        onClick={() => setProduct(product)}
                                                        data-toggle="modal" data-target=".bd-example-modal-lg"
                                                    >
                                                        edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                                :
                                <div className='d-flex justify-content-center'>
                                    <img className='w-25' src="https://nagadhat.com.bd/public/images/no-product-found.png" alt="" />
                                </div>
                        }


                    </CardBody>
                </Card>
            </Container>



            {
                product && <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-body">
                                <ProductUpdateModal product={product} setProduct={setProduct} refetch={getProducts} />
                            </div>
                        </div>
                    </div>
                </div>
            }

        </Fragment>
    );
};

export default Products;
