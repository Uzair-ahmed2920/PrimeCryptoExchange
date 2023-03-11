import React from "react";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";

const ManageCoins = () => {
  const buyTablePending = () => {
    return [
      {
        title: "Markets",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "Price",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "Change 24h",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "Status",
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
  const data = ["", "", ""];
  return (
    <>
      <PageTitle activeMenu="Manage Coins" motherMenu="Admin" />
      <TabelComponent
        cols={buyTablePending()}
        data={data}
        tabeltitle={"Manage Coins"}
        itemsPerPage={1}
      />
    </>
  );
};

export default ManageCoins;
