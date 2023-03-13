import { Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
// import OrderForm from "../Dashboard/Dashboard/OrderForm";
import DepositOrderForm from "../CustomComponent/DepositOrderForm";

const Deposit = () => {
    return (
        <Col >
            <Row>
                <PageTitle activeMenu="Deposit" motherMenu="Home" />
            </Row>
            <Row >
                <Col xs={3}></Col>
                <Col >
                    <div className="card h-auto border-1"    style={{marginTop:'7.5rem',}}>
                        <div className="card-body ">
                            <div className="sell-element "  >
                                {/* //style={{ marginTop:"2rem", height:'18rem' }} */}
                                <DepositOrderForm />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </Col>

    )
}

export default Deposit;