import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Table } from "react-bootstrap";

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [stores, setStores] = useState([])
    const [storeId, setStoreId] = useState("")

    const getCards = (id) => {
        fetch(`http://localhost:5000/api/storecard/getcards/${id}`)
            .then((res) => res.json())
            .then((data) => setCards(data.data));
    }


    useEffect(() => {
        getCards(stores[0]?._id)
    }, [stores])

    const handleSetStoreId = (id) => {
        setStoreId(id)
        getCards(id)
    }


    useEffect(() => {
        const usr = localStorage.getItem("user-id");
        fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
            .then((res) => res.json())
            .then((data) => setStores(data));
    }, []);

    return (
        <Fragment>
            <Breadcrumb title="card List" parent="Users" />
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
                            <Link to="/cards/add-card" className="btn btn-secondary">
                                Add Card
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody>

                        <div className="clearfix"></div>
                        <div
                            id="batchDelete"
                            className="category-table user-list order-table coupon-list-delete"
                        >

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>title</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Security</th>
                                        <th>Number</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cards &&
                                        cards.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item?.title}</td>
                                                <td>{item?.amount}</td>
                                                <td>{item?.type}</td>
                                                <td>
                                                    {
                                                        item?.active === "true" ? <span class="badge text-bg-warning">Sold</span> : <span class="badge text-bg-primary">Sell</span>
                                                    }
                                                </td>
                                                <td>{item?.securityCode}</td>
                                                <td>{item?.checkNumber}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </Fragment>
    );
};

export default Cards;