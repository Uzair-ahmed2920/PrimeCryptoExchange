import { Col, Row } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import DataTable from "../CustomComponent/TradeComponents/TradeTable";
const Trade = (props) => {
  // const dispatch = useDispatch();
  // const userReducer = useSelector((store) => store.userReducer);

  return (
    <>
      <Col xl="12">
        <Row>
          <PageTitle activeMenu="Trade" motherMenu="Home" />
        </Row>
        <Row><DataTable /></Row>
        {/* <Row>
          <TabelComponent
            cols={buyTablePending()}
            data={data}
            tabeltitle={"Buy Request"}
            itemsPerPage={1}
          />
        </Row> */}
      </Col>
    </>
  );
};

export default Trade;
