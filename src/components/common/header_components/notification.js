import React, { Fragment } from "react";
import { ShoppingBag, Download, AlertCircle } from "react-feather";
import { Link } from "react-router-dom";
import { Media } from "reactstrap";

const Notification = ({ allNotification, handleSeenNotification }) => {
  console.log("nootttt", allNotification);

  const hello = [...allNotification].reverse();

  console.log(hello, "ljkfjkkdjfk");

  return (
    <Fragment>
      <ul className="notification-dropdown onhover-show-div p-0">
        <li>
          Notification{" "}
          {/* <span className="badge rounded-pill badge-primary pull-right">3</span> */}
        </li>
        {hello &&
          hello.length > 0 &&
          hello.slice(0, 4).map((notification) => (
            <li key={notification._id}>
              <h6
                className={`mt-0 ${
                  notification.seen === true && "text-warning"
                }`}
                onClick={() => handleSeenNotification(notification._id)}
              >
                {notification.title === "Ticket" && (
                  <Link to="/pages/list-page">
                    <span>
                      {/* <ShoppingBag /> */}
                      {notification.userName} sent a wallet request..!
                    </span>
                  </Link>
                )}
                {notification.title === "Withdraw" && (
                  <Link to="/products/digital/digital-category">
                    <span>
                      {/* <ShoppingBag /> */}
                      {notification.userName} sent a withdraw request..!
                    </span>
                  </Link>
                )}
                {notification.title === "Order" && (
                  <Link to="/sales/orders">
                    <span>
                      {/* <ShoppingBag /> */}
                      {notification.userName} purchase{" "}
                      {notification.productName}
                      ..!
                    </span>
                  </Link>
                )}
              </h6>
              <p className="mb-0">Amount: ${notification.amount}</p>
            </li>
          ))}
        {/* <li>
          <Media>
            <Media body>
              <h6 className="mt-0 txt-success">
                <span>
                  <Download />
                </span>
                Download Complete
              </h6>
              <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
            </Media>
          </Media>
        </li>
        <li>
          <Media>
            <Media body>
              <h6 className="mt-0 txt-danger">
                <span>
                  <AlertCircle />
                </span>
                250 MB trash files
              </h6>
              <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
            </Media>
          </Media>
        </li> */}
        <Link to="/sales/transactions">
          <li className="txt-dark">
            <a href="#javaScript">All</a> notification
          </li>
        </Link>
      </ul>
    </Fragment>
  );
};

export default Notification;
