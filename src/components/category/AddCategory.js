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
import { useNavigate } from "react-router-dom";

const AddCategory = ({ category, setCategory, refetch }) => {
  const usr = localStorage.getItem("user-id");
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [imageFile, setImageFile] = useState([]);

  const [children, setChildren] = useState(
    category?._id ? category?.children : []
  );
  const [newChildren, setNewChildren] = useState("");

  const handleAddChildren = () => {
    if (newChildren) {
      setChildren((prevChildren) => [...prevChildren, newChildren]);
      setNewChildren("");
    }
  };

  const handleRemoveChild = (index) => {
    setChildren((prevChildren) => {
      const updatedChildren = [...prevChildren];
      updatedChildren.splice(index, 1);
      return updatedChildren;
    });
  };

  const uploadImagesToImageBB = async (files) => {
    let image = "";
    if (imageFile?.length > 0) {
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
        image = data?.data?.url;
      }
      return image;
    } else {
      return image;
    }
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;

    if (imageFile?.length > 0) {
      const image = await uploadImagesToImageBB(imageFile);
      if (image || category?.image) {
        const data = {
          image: image ? image : category?.image && category?.image,
          parent: form.parent.value,
          slug: form.parent.value?.toLowerCase().replaceAll(" ", "-"),
          children: children,
          type: form.type.value,
        };
        if (user?.role === "seller") {
          data["store"] = form.store.value;
        }

        if (category && category?._id) {
          fetch(
            `http://localhost:5000/api/category/updateinfo/${category?._id}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(data),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              setIsLoading(false);
              form.reset();
              setCategory(null);
              navigate("/category/all");
            });
        } else {
          fetch(`http://localhost:5000/api/category/add/${usr}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              setIsLoading(false);
              form.reset();
              navigate("/category/all");
            });
        }
      }
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [usr]);

  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/store/getAllStores/byrole/${usr}`)
      .then((res) => res.json())
      .then((data) => setStores(data));
  }, []);

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between justify-items-center">
                <h5>{category?._id ? "Update Category" : "Create Category"}</h5>
              </CardHeader>
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
                      {imageFile &&
                        imageFile?.map((file) => (
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
                      <span>*</span> Image
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <div class="input-group">
                        <input
                          onChange={(e) => setImageFile([e.target.files[0]])}
                          type="file"
                          class="form-control"
                          id="inputGroupFile02"
                          required={category?.image ? false : true}
                        />
                      </div>
                    </div>
                  </FormGroup>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Parent
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        required={true}
                        name="parent"
                        defaultValue={category?.parent}
                      />
                    </div>
                  </FormGroup>

                  <>
                    <FormGroup className="row">
                      <Label className="col-xl-3 col-md-4">
                        <span></span>
                      </Label>
                      <div className="col-xl-8 col-md-7">
                        <div class="d-flex justify-items-center">
                          {children.map((child, index) => (
                            <div class="border d-flex me-2" key={index}>
                              <span className="px-1">{child}</span>
                              <div
                                onClick={() => handleRemoveChild(index)}
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
                      <Label className="col-xl-3 col-md-4">Children</Label>
                      <div className="col-xl-8 col-md-7 d-flex justify-content-between">
                        <input
                          type="text"
                          value={newChildren}
                          onChange={(e) => setNewChildren(e.target.value)}
                          className="form-control"
                        />
                        <div
                          disabled={newChildren ? true : false}
                          onClick={handleAddChildren}
                          className="btn btn-primary pull-right"
                        >
                          Add
                        </div>
                      </div>
                    </FormGroup>
                  </>

                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Type
                    </Label>
                    <div className="col-xl-8 col-md-7">
                      <input
                        type="text"
                        className="form-control"
                        name="type"
                        required={true}
                        defaultValue={category?.type}
                      />
                    </div>
                  </FormGroup>

                  {user?.role === "seller" && (
                    <FormGroup className="row">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span> Request By
                      </Label>
                      <div className="col-xl-8 col-md-7">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          placeholder="Selete Store"
                          required={true}
                          name="store"
                        >
                          {stores?.map((store) => (
                            <option
                              selected={
                                category?._id &&
                                category?.store?._id === store?._id
                              }
                              value={store?._id}
                            >
                              {store.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </FormGroup>
                  )}

                  <div className="row">
                    <div className="col-xl-3 col-md-4"></div>
                    <div className="col-xl-8 col-md-7">
                      <div className="pull-right">
                        {category?._id && (
                          <button
                            onClick={() => setCategory(null)}
                            className="btn btn-warning me-2"
                          >
                            Cancel
                          </button>
                        )}
                        {isLoading ? (
                          <button class="btn btn-info" type="button" disabled>
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
                          <>
                            {category?._id ? (
                              <Button type="submit" color="info">
                                Update Category
                              </Button>
                            ) : (
                              <Button type="submit" color="info">
                                {user?.role === "seller"
                                  ? "Send Request"
                                  : "Add Category"}
                              </Button>
                            )}
                          </>
                        )}
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

export default AddCategory;
