import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-feather';
import { Breadcrumb, Card, CardBody, CardHeader, Container } from "reactstrap";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/product/show/all')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    console.log(products);

    const handleDelete = (productId) => {
        console.log('Deleting product with ID:', productId);
    };

    const handleEdit = (productId) => {
        console.log('Editing product with ID:', productId);
    };

    return (
        <Fragment>
            <Breadcrumb title="Product List" parent="Products" />
            <Container fluid={true}>
                <Card>
                    <CardHeader>
                        <div className="d-flex justify-content-between">
                            <h5>Products</h5>
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
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={product.status === "true" ? true : false} />
                                                <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
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
