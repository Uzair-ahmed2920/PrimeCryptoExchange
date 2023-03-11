import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";
import DataTable from "../CustomComponent/TradeComponents/TradeTable";
const Trade = (props) => {
  // const dispatch = useDispatch();
  // const userReducer = useSelector((store) => store.userReducer);
  const buyTablePending = () => {
    return [
      {
        title: "#",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "USERNAME",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "SOLID",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "AMOUNT",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },

      {
        title: "TIME",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "STATUS",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "Action",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
    ];
  };
  const data=["","",""];
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
