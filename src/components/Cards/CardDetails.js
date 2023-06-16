import React, { Fragment, useContext, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { AuthContext } from "../../ContextAPI/AuthProvider";
import { useParams } from "react-router-dom";
import { Document, PDFDownloadLink } from "@react-pdf/renderer";
import DownloadCard from "./DownloadCard";

const CardDetails = () => {
  const { stores } = useContext(AuthContext);
  const [card, setCard] = useState({});
  const { id } = useParams();

  const getCard = () => {
    fetch(`http://localhost:5000/api/storecard/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCard(data);
      });
  };

  useEffect(() => {
    getCard();
  }, [id]);

  return (
    <Fragment>
      <Breadcrumb title="Card Details" parent="Cards" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <PDFDownloadLink
              document={<DownloadCard card={card} />}
              fileName="Invoice"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading..."
                ) : (
                  <button className="btn btn-info text-white hidden-print">
                    Download{" "}
                  </button>
                )
              }
            </PDFDownloadLink>
          </CardHeader>
          <CardBody>
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{card?.title}</h5>
                  {card?.type === "Package" && (
                    <ul className="list-group">
                      {card?.features?.map((feature, i) => (
                        <li key={i} className="list-group-item">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="card-text">Amount: {card?.amount}</p>
                  <p className="card-text">Price: {card?.price}</p>
                  <p className="card-text">Type: {card?.type}</p>
                  <p className="card-text">State: {card?.state}</p>
                  <p className="card-text">
                    Serial Number: {card?.serialNumber}
                  </p>
                  <p className="card-text">Check Number: {card?.checkNumber}</p>
                  <p className="card-text">
                    Security Code: {card?.securityCode}
                  </p>
                  <p className="card-text">Private Key: {card?.privateKey}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Created at: {card?.createdAt}
                  </small>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default CardDetails;
