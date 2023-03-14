import { Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle"
import DataTable from "../CustomComponent/PortFolioComponents/PortfolioTable";
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
    ]
    return (
        <>
            <Col xl="12">   
                <Row>
                    <PageTitle activeMenu="Portfolio" motherMenu="Dashboard" link="dashboard" />
                </Row>
                <Row>
                    <DataTable header="" rows={tableData} columns={columns} />
                </Row>
                <Row>
                    <Card>
                        <Card.Body>
                            <Row style={{ fontSize: '20px ',color:'black', marginLeft:'1rem' }}>
                                <Col>
                                <Card.Text >$0.00</Card.Text>
                                    <Card.Text >Available</Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text>$0.00</Card.Text>
                                    <Card.Text>Total Invested</Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text>$0.00</Card.Text>
                                    <Card.Text>Profit/Loss</Card.Text></Col>
                                <Col>
                                    <Card.Text>$0.00</Card.Text>
                                    <Card.Text>Portfolio Value</Card.Text>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
        </>
    )
}

export default Portfolio;