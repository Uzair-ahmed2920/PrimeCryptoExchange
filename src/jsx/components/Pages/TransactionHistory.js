import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import DataTable from "../CustomComponent/TransactionHistoryTable";
const TransactionHistory = () => {
  const tableData = [
    {
      sno: "abc",
      datetime: Date.now(),
      status: "up",
      type: "abc",
      amount: 123,
    },
    {
      sno: "abc",
      datetime: Date.now(),
      status: "up",
      type: "abc",
      amount: 124,
    },
    {
      sno: "abc",
      datetime: Date.now(),
      status: "up",
      type: "abc",
      amount: 125,
    },
    {
      sno: "abc",
      datetime: Date.now(),
      status: "up",
      type: "abc",
      amount: 126,
    },
    {
      sno: "abc",
      datetime: Date.now(),
      status: "up",
      type: "abc",
      amount: 127,
    },
  ];
  let columns = [
    { label: "S.No", columnName: "sno", sort: false },
    { label: "Date Time", columnName: "datetime", sort: true },
    { label: "Status", columnName: "status", sort: true },
    //{ label: 'Type', columnName: 'type', sort: true },
    { label: "Amount", columnName: "amount", sort: true },
  ];
  const [deposit, setDeposit] = useState(true);
  const [withdraw, setWithdraw] = useState(false);
  return (
    <>
      <PageTitle activeMenu="Transaction History" motherMenu="Home" />
      <Row>
        <ButtonGroup
          style={{
            width: "30%",
            marginBottom: "30px",
            "@media (maxWidth: 575px)": {
              marginTop: "50%",
            },
          }}
          aria-label="Basic example"
        >
          <Button
            onClick={() => {
              setDeposit(true);
              setWithdraw(false);
            }}
            style={{
              backgroundColor: deposit ? "#0d6efd" : "#fff",
              color: deposit ? "#fff" : "#0d6efd",
              borderColor: "white",
            }}
            variant="secondary"
          >
            Deposit Requests
          </Button>
          <Button
            onClick={() => {
              setDeposit(false);
              setWithdraw(true);
            }}
            style={{
              backgroundColor: withdraw ? "#0d6efd" : "#fff",
              color: withdraw ? "#fff" : "#0d6efd",
              borderColor: "white",
            }}
            variant="secondary"
          >
            Withdraw Requests
          </Button>
        </ButtonGroup>
      </Row>
      {deposit ? (
        <Row>
          <DataTable
            header="Deposit Requests"
            rows={tableData}
            columns={columns}
          />
        </Row>
      ) : (
        <Row>
          <DataTable
            header="Withdraw Requests"
            rows={tableData}
            columns={columns}
          />
        </Row>
      )}
    </>
  );
};

export default TransactionHistory;
