import moment from "moment/moment";
import React, { Fragment } from "react";
import { ShoppingBag, Download, AlertCircle } from "react-feather";
import { Link } from "react-router-dom";
import { Media } from "reactstrap";


const order = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-primary">
  <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd" />
</svg>

const review = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-yellow-600">
  <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clip-rule="evenodd" />
</svg>

const new_user = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-blue-600">
  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
</svg>


const Notification = ({ allNotification, handleSeenNotification }) => {
  console.log(allNotification);

  return (
    <Fragment>
      <ul className="notification-dropdown onhover-show-div p-0">
        <li>
          Notification{" "}
          {/* <span className="badge rounded-pill badge-primary pull-right">3</span> */}
        </li>

        <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
          {
            allNotification?.map(notify => (
              <div key={notify?._id} className="d-flex justify-content-center px-4 py-3 border-bottom mx-2" >

                <div className="h-8 w-8 rounded-circle object-cover mx-1">
                  {notify?.type === "new_order" && order}
                  {notify?.type === "review" && review}
                  {notify?.type === "new_user" && new_user}
                </div>

                <p className="text-gray-600 text-sm mx-2">
                  <span className="fw-bold">
                    {notify?.type === "new_user" && <p className='text-blue-600 fw-bold'>Congratulations! </p>}
                    {notify?.title} <span className='text-uppercase fw-bold text-blue-500'>#{notify._id.slice(0, 6)}</span>
                  </span>
                  <span className='block text-xs mt-1'>{moment(notify?.createAt).fromNow()}</span>
                </p>
              </div>

            ))
          }
        </div>



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




// <Fragment>
//       <ul className="notification-dropdown onhover-show-div p-0">
//         <li>
//           Notification{" "}
//           {/* <span className="badge rounded-pill badge-primary pull-right">3</span> */}
//         </li>
//         {hello &&
//           hello.length > 0 &&
//           hello.slice(0, 4).map((notification) => (
//             <li key={notification._id}>
//               <h6
//                 className={`mt-0 ${notification.seen === true && "text-warning"
//                   }`}
//                 onClick={() => handleSeenNotification(notification._id)}
//               >
//                 {notification.title === "Ticket" && (
//                   <Link to="/pages/list-page">
//                     <span>
//                       {/* <ShoppingBag /> */}
//                       {notification.userName} sent a wallet request..!
//                     </span>
//                   </Link>
//                 )}
//                 {notification.title === "Withdraw" && (
//                   <Link to="/products/digital/digital-category">
//                     <span>
//                       {/* <ShoppingBag /> */}
//                       {notification.userName} sent a withdraw request..!
//                     </span>
//                   </Link>
//                 )}
//                 {notification.title === "Order" && (
//                   <Link to="/sales/orders">
//                     <span>
//                       {/* <ShoppingBag /> */}
//                       {notification.userName} purchase{" "}
//                       {notification.productName}
//                       ..!
//                     </span>
//                   </Link>
//                 )}
//               </h6>
//               <p className="mb-0">Amount: ${notification.amount}</p>
//             </li>
//           ))}
//         <li>
//           <Media>
//             <Media body>
//               <h6 className="mt-0 txt-success">
//                 <span>
//                   <Download />
//                 </span>
//                 Download Complete
//               </h6>
//               <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
//             </Media>
//           </Media>
//         </li>
//         <li>
//           <Media>
//             <Media body>
//               <h6 className="mt-0 txt-danger">
//                 <span>
//                   <AlertCircle />
//                 </span>
//                 250 MB trash files
//               </h6>
//               <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
//             </Media>
//           </Media>
//         </li>

//         <Link to="/sales/transactions">
//           <li className="txt-dark">
//             <a href="#javaScript">All</a> notification
//           </li>
//         </Link>
//       </ul>
//     </Fragment>
