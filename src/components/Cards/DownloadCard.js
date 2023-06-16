import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const DownloadCard = ({ card }) => (
  <Document>
    <Page>
      <View>
        <Text>Title: {card?.title}</Text>
        <Text>Product ID: {card?.productId}</Text>
        <Text>Store ID: {card?.storeId}</Text>
        {card?.type === "Package" && (
          <ul className="list-group">
            {card?.features?.map((feature, i) => (
              <li key={i} className="list-group-item">
                {feature}
              </li>
            ))}
          </ul>
        )}
        <Text>Amount: {card?.amount}</Text>
        <Text>Price: {card?.price}</Text>
        <Text>Type: {card?.type}</Text>
        <Text>State: {card?.state}</Text>
        <Text>Serial Number: {card?.serialNumber}</Text>
        <Text>Check Number: {card?.checkNumber}</Text>
        <Text>Security Code: {card?.securityCode}</Text>
        <Text>Private Key: {card?.privateKey}</Text>
      </View>
    </Page>
  </Document>
);

export default DownloadCard;
