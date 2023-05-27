import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const Datatable = ({
  myData,
  myClass,
  multiSelectOption,
  pagination,
  handleCategoryDelete,
  listPage,
}) => {
  // console.log(myData, "hellodata");

  const [open, setOpen] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [data, setData] = useState(myData);

  console.log(checkedValues, "gg");
  const selectRow = (e, i) => {
    if (!e.target.checked) {
      setCheckedValues(checkedValues.filter((item, j) => i !== item));
    } else {
      checkedValues.push(i);
      setCheckedValues(checkedValues);
    }
  };

  const handleRemoveRow = (Values) => {
    const ids = {
      id: Values,
    };

    fetch("http://localhost:5000/api/coupon/multipleDelete", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          window.location.reload(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDelteTicketList = (id) => {
    fetch(`http://localhost:5000/api/ticket/remove/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.location.reload(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
          setData({ myData: data });
        }}
        dangerouslySetInnerHTML={{
          __html: myData[cellInfo.index][cellInfo.index.id],
        }}
      />
    );
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/api/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          window.location.reload(true);
        }
      })
      .catch((error) => console.log(error));
  };

  // const handleDeleteWallet = (id)=>{
  //   fetch(``)
  // }

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const del = data;
      del.splice(index, 1);
      setData([...del]);
    }
    toast.success("Successfully Deleted !");
  };
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const columns = [];
  for (const key in myData[0]) {
    let editable = renderEditable;
    if (key === "image") {
      editable = null;
    }
    if (key === "status") {
      editable = null;
    }
    if (key === "avtar") {
      editable = null;
    }
    if (key === "vendor") {
      editable = null;
    }
    if (key === "order_status") {
      editable = null;
    }

    columns.push({
      name: <b>{Capitalize(key.toString())}</b>,
      header: <b>{Capitalize(key.toString())}</b>,
      selector: (row) => row[key],
      Cell: editable,
      style: {
        textAlign: "center",
      },
    });
  }

  if (multiSelectOption === true) {
    columns.push({
      name: (
        <button
          className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
          onClick={(e) => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              handleRemoveRow(checkedValues);
          }}
        >
          Delete
        </button>
      ),
      id: "delete",
      accessor: (str) => "delete",
      cell: (row) => (
        <div>
          <span>
            <input
              type="checkbox"
              name={row._id}
              defaultChecked={checkedValues.includes(row._id)}
              onChange={(e) => selectRow(e, row._id)}
            />
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else if (multiSelectOption === false) {
    columns.push({
      name: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      cell: (row, index) => (
        <div>
          <button className="btn" onClick={() => handleCategoryDelete(row._id)}>
            <i
              className="fa fa-trash"
              style={{
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "#e4566e",
              }}
            ></i>
          </button>

          <span>
            <i
              onClick={onOpenModal}
              className="fa fa-pencil"
              style={{
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "rgb(40, 167, 69)",
              }}
            ></i>
            <Modal
              isOpen={open}
              toggle={onCloseModal}
              style={{ overlay: { opacity: 0.1 } }}
            >
              <ModalHeader toggle={onCloseModal}>
                <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                  Edit Product
                </h5>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label htmlFor="recipient-name" className="col-form-label">
                      Category Name :
                    </Label>
                    <Input type="text" className="form-control" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="message-text" className="col-form-label">
                      Category Image :
                    </Label>
                    <Input
                      className="form-control"
                      id="validationCustom02"
                      type="file"
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => onCloseModal("VaryingMdo")}
                >
                  Update
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  onClick={() => onCloseModal("VaryingMdo")}
                >
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else if (listPage === true) {
    columns.push({
      name: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      cell: (row, index) => (
        <div>
          <button
            className="btn"
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"));
              handleDelteTicketList(row._id);
            }}
          >
            <i
              className="fa fa-trash"
              style={{
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "#e4566e",
              }}
            ></i>
          </button>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else if (multiSelectOption === "user") {
    columns.push({
      name: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      cell: (row, index) => (
        <div>
          <button
            className="btn"
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"));
              handleDeleteUser(row._id);
            }}
          >
            <i
              className="fa fa-trash"
              style={{
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "#e4566e",
              }}
            ></i>
          </button>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else if (multiSelectOption === "wallet") {
    // columns.push({
    //   name: <b></b>,
    //   id: "delete",
    //   accessor: (str) => "delete",
    //   cell: (row, index) => (
    //     <div>
    //       <button
    //         className="btn"
    //         onClick={() => {
    //           if (window.confirm("Are you sure you wish to delete this item?"));
    //           // handleDeleteWallet(row._id);
    //         }}
    //       >
    //         <i
    //           className="fa fa-trash"
    //           style={{
    //             width: 35,
    //             fontSize: 20,
    //             padding: 11,
    //             color: "#e4566e",
    //           }}
    //         ></i>
    //       </button>
    //     </div>
    //   ),
    //   style: {
    //     textAlign: "center",
    //   },
    //   sortable: false,
    // });
    <p></p>;
  }
  return (
    <div>
      <Fragment>
        <DataTable
          data={myData}
          columns={columns}
          className={myClass}
          pagination={pagination}
          striped={true}
          center={true}
        />

        <ToastContainer />
      </Fragment>
    </div>
  );
};

export default Datatable;
