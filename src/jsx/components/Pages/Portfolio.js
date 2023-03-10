import { Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import DataTable from "../CustomComponent/PortFolioComponents/PortfolioTable";
import TabelComponent from "../../layouts/TabelComponent";
const Portfolio = () => {
    const tableData = [
        { title: 'ZEC', markets: 'ZCash', price: '$0.9632', change: '-9', open: "yes", pl: '3.49' },
        { title: 'AUD', markets: 'Australian Doller', price: '$0.6932', change: '+22', open: "yes", pl: '-0.15' }
    ];
    let columns = [
        { label: 'Available Assets', columnName: 'available_assets', sort: true },
        { label: 'Amount', columnName: 'amount', sort: true },
        { label: 'Units', columnName: 'sort', sort: false },
        { label: 'Open', columnName: 'open', sort: true },
        { label: 'P/L($)', columnName: 'pl', sort: false },
    ];
  return (
    <>
      <PageTitle activeMenu="Portfolio" motherMenu="Home" />
   
      <DataTable header="" rows={tableData} columns={columns} />
      <Card>
        <Card.Body>
          <Row
            style={{ fontSize: "20px ", color: "black", marginLeft: "1rem" }}
          >
            <Col>
              <Card.Text>$0.00</Card.Text>
              <Card.Text>Available</Card.Text>
            </Col>
            <Col>
              <Card.Text>$0.00</Card.Text>
              <Card.Text>Total Invested</Card.Text>
            </Col>
            <Col>
              <Card.Text>$0.00</Card.Text>
              <Card.Text>Profit/Loss</Card.Text>
            </Col>
            <Col>
              <Card.Text>$0.00</Card.Text>
              <Card.Text>Portfolio Value</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Portfolio;