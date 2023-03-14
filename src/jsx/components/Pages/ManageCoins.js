import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";

const ManageCoins = () => {
  const [percentage, setPercentage] = useState("percent_change_24h");
  const [columnName , setColumnName] = useState("Change 24h")
  const change1h = () => {
    setPercentage("percent_change_1h");
    setColumnName("Change 1h")
  };
  const change24h = () => {
    setPercentage("percent_change_24h");
    setColumnName("Change 24h")
  };
  const change7d = () => {
    setPercentage("percent_change_7d");
    setColumnName("Change 7d")
  };

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
        title: <Dropdown>
        <Dropdown.Toggle
          variant=""
          className="pb-0"
          style={{ color: "#374557" }}
        >
          {columnName}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={change1h}>
            Change 1h
          </Dropdown.Item>
          <Dropdown.Item href="#" onClick={change24h}>
            Change 24h
          </Dropdown.Item>
          <Dropdown.Item href="#" onClick={change7d}>
            Change 7d
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
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
      <PageTitle activeMenu="Manage Coins" motherMenu="Admin" link="admin-dashboard" />
      <TabelComponent
        cols={buyTablePending()}
        data={data}
        tabeltitle={"Manage Coins"}
        itemsPerPage={10}
      />
    </>
  );
};

export default ManageCoins;
