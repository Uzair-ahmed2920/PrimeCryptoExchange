import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Button, Card, Col, Form, Modal, Nav, Row, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

//import bitcoin from "../../../images/coins/btc.png";
import cryptoicons from "../../../images/cryptoIcons/cryptoImg";

import Cookies from "universal-cookie";

import { getTradeHistory } from "../../../Redux/coins";

const DataTable = ({ header, description, rows, columns, trade = false }) => {
  const [data, setData] = useState(
    document.querySelectorAll("#market_wrapper tbody tr")
  );
  const [largeModal, setLargeModal] = useState(false);
  const [noSl, setNoSl] = useState(true);
  const navigate = useNavigate();
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  const buyNow = (value) => {
    console.log("row clicked", value);
    // navigate("/coin-details")
    setLargeModal(true);
  };

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#market_wrapper tbody tr"));
    //chackboxFun();
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  const [sortD, setSort] = useState({ columnName: "", sortType: "asc" });

  const onSort = (columnName) => {
    let sortType = "asc";
    if (sortD.columnName === columnName && sortD.sortType === "asc") {
      sortType = "desc";
    }
    setSort({ columnName, sortType });
  };
  const sortData = (rows, columnName, sortType) => {
    return [...rows].sort((a, b) => {
      if (sortType === "asc") {
        if (a[columnName] < b[columnName]) return -1;
        if (a[columnName] > b[columnName]) return 1;
      } else {
        if (a[columnName] < b[columnName]) return 1;
        if (a[columnName] > b[columnName]) return -1;
      }
      return 0;
    });
  };
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = jwt_decode(token);
  const id = user.id;
  const dispatch = useDispatch();

  const requests = useSelector((state) => state.coinReducer);
  console.log("requests", requests);
  let body = {
    user_id: id,
  };
  useEffect(() => {
    const res = dispatch(getTradeHistory(body));
  }, []);

  const profitLossAmount = (unit, openingPrice, closePrice) => {
    let ProfitLoss = 0;

    ProfitLoss = (closePrice - openingPrice) * unit;
    console.log(ProfitLoss, "ProfitLoss");
    return ProfitLoss;
  };

  const profitLossPercentage = (unit, openingPrice, closePrice, trade) => {
    let ProfitLoss = 0;
    let profitLossPercent = 0;

    ProfitLoss = (closePrice - openingPrice) * unit;
    profitLossPercent = (ProfitLoss / trade) * 100;

    console.log(ProfitLoss, "ProfitLoss");
    return profitLossPercent;
  };

  return (
    <>
    <ToastContainer/>
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header border-0">
          <Col xl={12}>
            <Row>
              <h3>{header}</h3>
            </Row>
            <Row>
              <p className="">{description}</p>
            </Row>
          </Col>
        </div>
        <div className="card-body pt-0">
          <div className="table-responsive dataTablemarket">
            <div id="market_wrapper" className="dataTables_wrapper no-footer">
              <table
                className="table dataTable  shadow-hover display"
                style={{ minWidth: "845px" }}
              >
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        style={{
                          textAlign:
                            column.label === "Asset" ? "left" : "center",
                        }}
                      >
                        {column.label}
                        {column.sort ? (
                          <span
                            type="button"
                            onClick={() =>
                              column.sort ? onSort(column.columnName) : ""
                            }
                          >
                            {sortD.columnName === column.columnName &&
                            sortD.sortType === "asc" ? (
                              <i
                                className="fa fa-arrow-down ms-2 fs-14"
                                style={{ opacity: "0.7" }}
                              />
                            ) : (
                              <i
                                className="fa fa-arrow-up ms-2 fs-14"
                                style={{ opacity: "0.7" }}
                              />
                            )}
                          </span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortData(
                    requests?.tradeHistory,
                    sortD.columnName,
                    sortD.sortType
                  ).map((item, index) => (
                    <tr key={index}>
                      <td style={{ width: "30%" }}>
                        <div className="market-title d-flex align-items-center ">
                          <img
                            src={cryptoicons[item.crypto_symbol]}
                            width="12%"
                          />
                          <Col>
                            <h5 className="mb-0 ms-2">{item.crypto_name}</h5>
                            <span className="text-muted ms-2">
                              {item.crypto_symbol}
                            </span>
                          </Col>
                        </div>
                      </td>

                      <td className="text-center">{item.investment}</td>
                      <td
                        className="text-center"
                        style={{ color: item.change > 0 ? "green" : "red" }}
                      >
                        {item.purchase_units}%
                      </td>
                      <td
                        className="text-center"
                        style={{ color: item.pl > 0 ? "green" : "red" }}
                      >
                        {item.open_trade}%
                      </td>
                      <td className="text-center">{item.open_at}</td>
                      <td className="text-center">{item.close_trade}</td>
                      <td className="text-center">{item.closed_at}</td>
                      <td
                        className="text-center"
                        style={{ color: profitLossAmount(item.purchase_units,
                            item.crypto_purchase_price,
                            item.crypto_sale_price) > 0 ? "green" : "red" }}
                      >
                        $
                        {Math.round(profitLossAmount(
                          item.purchase_units,
                          item.crypto_purchase_price,
                          item.crypto_sale_price
                        )*1000)/1000}
                      </td>
                      <td
                        className="text-center"
                        style={{ color: profitLossPercentage(item.purchase_units,
                            item.crypto_purchase_price,
                            item.crypto_sale_price,
                            item.open_trade) > 0 ? "green" : "red" }}
                      >
                        {Math.round(profitLossPercentage(
                          item.purchase_units,
                          item.crypto_purchase_price,
                          item.crypto_sale_price,
                          item.open_trade
                        )*1000)/1000}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                <div className="dataTables_info">
                  Showing {activePag.current * sort + 1} to{" "}
                  {data.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : data.length}{" "}
                  of {data.length} entries
                </div>
                <div
                  className="dataTables_paginate paging_simple_numbers mb-0"
                  id="application-tbl1_paginate"
                >
                  <Link
                    className="paginate_button previous "
                    onClick={() =>
                      activePag.current > 0 && onClick(activePag.current - 1)
                    }
                  >
                    <i className="fa fa-angle-double-left"></i>
                  </Link>
                  <span>
                    {paggination.map((number, i) => (
                      <Link
                        key={i}
                        className={`paginate_button  ${
                          activePag.current === i ? "current" : ""
                        } `}
                        onClick={() => onClick(i)}
                      >
                        {number}
                      </Link>
                    ))}
                  </span>

                  <Link
                    className="paginate_button next"
                    onClick={() =>
                      activePag.current + 1 < paggination.length &&
                      onClick(activePag.current + 1)
                    }
                  >
                    <i className="fa fa-angle-double-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DataTable;
