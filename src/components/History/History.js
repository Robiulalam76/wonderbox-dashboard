import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Breadcrumb, Card, Container } from "reactstrap";
function History() {
  const [histories, setHistories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchHistories = async () => {
    try {
      fetch(`http://localhost:5000/api/history?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          const { histories, totalPages, totalCount } = data;
          setHistories(histories);
          setTotalPages(totalPages);
          setTotalCount(totalCount);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="Hisoty" parent="History" />
      <Container fluid={true}>
        <Card>
          <Table responsive>
            <thead className="bg-info">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Message</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {histories?.length > 0 &&
                histories.map((history, i) => (
                  <tr key={i}>
                    <td style={{ maxWidth: "10px" }}>{i + 1}</td>
                    <td style={{ maxWidth: "200px" }}>{history?.title}</td>
                    <td style={{ maxWidth: "400px" }}>{history?.message}</td>
                    <td>
                      <span
                        className={`badge rounded-pill
                        ${
                          (history?.type === "product" && "text-bg-primary") ||
                          (history?.type === "wishlist" && "text-bg-info") ||
                          (history?.type === "order" && "text-bg-success") ||
                          (history?.type === "user" && "text-bg-info") ||
                          (history?.type === "store" && "text-bg-light") ||
                          (history?.type === "review" && "text-bg-secondary") ||
                          (history?.type === "add_cart" && "text-bg-info")
                        }`}
                      >
                        {history?.type}
                      </span>
                    </td>
                    <td>
                      {new Date(
                        history.createAt && history.createAt
                      ).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end justify-items-center p-4">
            <Button
              variant="primary"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span style={{ margin: "0 10px" }}>
              Page {page} of {totalPages}
            </span>
            <Button
              variant="primary"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </Card>
      </Container>
    </Fragment>
  );
}

export default History;
