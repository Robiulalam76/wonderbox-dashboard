import { Fragment } from "react";
import Table from "react-bootstrap/Table";
import { Breadcrumb, Card, Container } from "reactstrap";

function History() {
  return (
    <Fragment>
      <Breadcrumb title="Hisoty" parent="History" />
      <Container fluid={true}>
        <Card>
          <Table responsive>
            <thead className="bg-info">
              <tr>
                <th>#</th>
                {Array.from({ length: 6 }).map((_, index) => (
                  <th key={index}>Table heading</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                {Array.from({ length: 6 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>2</td>
                {Array.from({ length: 6 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>3</td>
                {Array.from({ length: 6 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Card>
      </Container>
    </Fragment>
  );
}

export default History;
