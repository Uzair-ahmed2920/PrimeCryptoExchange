import { Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle"
import DataTable from "../CustomComponent/TradeHistoryTable";
const TradeHistory = () => {
    const tableData = [
        { title: 'ZEC', markets: 'ZCash', price: '$0.9632', change: '+9', date_open: Date.now(),date_close: Date.now(), pl: '19' },
        { title: 'AUD', markets: 'Australian Doller', price: '$0.6932', change: '+22', date_open: Date.now(), date_close: Date.now(), pl: '-12' }
    ];
    let columns = [
        { label: 'Asset', columnName: 'asset', sort: false },
        { label: 'Invested', columnName: 'invested', sort: false },
        { label: 'Units', columnName: 'units', sort: false },
        {label: 'Open', columnName: 'open', sort: true},
        { label: 'Date Open', columnName: 'date_open', sort: false },
        { label: 'Close', columnName: 'close', sort: false},
        { label: 'Date close', columnName: 'date_close', sort: false },
        { label: 'P/L($)', columnName: 'pl_amount', sort: false },
        { label: 'P/L(%)', columnName: 'pl_percent', sort: false }

    ]
    return (
        <>
            <Col xl="12">
                <Row>
                    <PageTitle activeMenu="Trade History" motherMenu="Dashboard" link="dashboard" />
                </Row>
                <Row>
                    <DataTable header="" rows={tableData} columns={columns} />
                </Row>
            </Col>
        </>
    )
}

export default TradeHistory;