import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Table } from "react-bootstrap";

const List_store = () => {
  const [stores, setStores] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm("Are you really want to delete this user?")) {
      fetch(`http://localhost:5000/api/store/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            window.location.reload(true);
          }
        });
    }
  };

  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
      .then((res) => res.json())
      .then((data) => {
        setStores(data)
      });
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between">
              <h5>List_store</h5>
              <Link to="/store/create-store" className="btn btn-secondary">
                List_store
              </Link>
            </div>
          </CardHeader>
          <CardBody>

            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              {/* <Datatable
                multiSelectOption={"user"}
                myData={user}
                pageSize={10}
                pagination={true}
                class="-striped -highlight"
              /> */}

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Icon</th>
                    <th>Store Name</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Owner Name</th>
                    {/* <th>Status</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stores &&
                    stores.map((item, idx) => (
                      <tr key={idx}>
                        <td className="w-fit" >{idx + 1}</td>
                        <td className="w-fit">
                          <img style={{ width: "30px", height: "30px" }} src={item?.logo} alt="" />
                        </td>
                        <td>{item?.name}</td>
                        <td>{item?.address}</td>
                        <td>{item?.description.slice(0, 100) + "..."}</td>
                        {/* <td>
                          <div className="">
                            <img
                              src={item?.image}
                              alt=""
                              height={70}
                              className=""
                            />
                          </div>
                        </td> */}
                        <td>{item?.userId?.name}</td>
                        {/* <td>
                          <span
                            className={`border px-2 py-1 rounded ${
                              item.status === true && "bg-success"
                            } ${item.rejected === true && "bg-danger"} ${
                              item.status === false &&
                              item.rejected === false &&
                              "bg-warning"
                            } text-light`}
                          >
                            {item?.status === true && "Accepted"}
                            {item?.rejected === true && "Rejected"}
                            {item?.status === false &&
                              item?.rejected === false &&
                              "Pending"}
                          </span>
                        </td> */}
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <>
                              {/* <button
                                className="btn  btn-secondary btn-sm"
                                // onClick={() => handleMakeSeller(item._id)}
                              >
                                Make Seller
                              </button> */}

                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </>
                          </div>
                        </td>
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

export default List_store;
