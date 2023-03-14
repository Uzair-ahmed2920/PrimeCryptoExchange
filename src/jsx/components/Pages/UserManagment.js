import React from "react";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";

const UserManagment = () => {
    
  const renderTabelPending = () => {
    return [
      {
        title: "User",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "Email",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "Profit",
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
        title: "Loss",
        render: (rowData) => {
          return <span>{20}</span>;
        },
      },
      {
        title: "Available Balance",
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
      <PageTitle activeMenu="User Management" motherMenu="Admin" link="admin-dashboard" />
      <TabelComponent
        cols={renderTabelPending()}
        data={data}
        tabeltitle={"Users"}
        itemsPerPage={1}
      />
    </>
  );
};
export default UserManagment;
