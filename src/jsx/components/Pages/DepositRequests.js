import React from "react";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";

const DepositRequests = () => {
  const renderTabelPending = () => {
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
        title: "DEPOSIT AMOUNT",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "DATE",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },

      {
        title: "TYPE",
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
    ];
  };
  const renderTabelAccepted = () => {
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
        title: "DEPOSIT AMOUNT",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "DATE",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },

      {
        title: "TYPE",
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
    ];
  };

  const data = ["", "", ""];
  return (
    <>
      <PageTitle activeMenu="Deposit Request" motherMenu="Admin" link="admin-dashboard" />
      <TabelComponent
        cols={renderTabelPending()}
        data={data}
        tabeltitle={"Deposit Request"}
        itemsPerPage={1}
      />
      <TabelComponent
        cols={renderTabelAccepted()}
        data={data}
        tabeltitle={"Deposit Request"}
        itemsPerPage={1}
      />
    </>
  );
};

export default DepositRequests;
