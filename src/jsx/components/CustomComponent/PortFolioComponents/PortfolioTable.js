import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Button, Card, Col, Form, Modal, Nav, Row, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import jwt_decode from "jwt-decode";

import bitcoin from "../../../../images/coins/btc.png";
import Cookies from "universal-cookie";
import { getAllCoin, getAllTrade, tradeClose } from "../../../../Redux/coins";
import { useDispatch, useSelector } from "react-redux";
import cryptoicons from "../../../../images/cryptoIcons/cryptoImg";

const DataTable = ({ header, description, rows, columns, trade = false }) => {
  const [data, setData] = useState(
    document.querySelectorAll("#market_wrapper tbody tr")
  );

  const [largeModal, setLargeModal] = useState(false);
  const [modalCurrentData, setModalCurrentData] = useState();
  const [currentPLAmount, setCurrentPLAmount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [reduceData, setReduceData] = useState([]);
  const [allCalculatedData, setAllCalculatedData] = useState([]);
  const [noSl, setNoSl] = useState(true);
  const navigate = useNavigate();
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  const buyNow = (value,pl) => {
    console.log("row clicked", value);
    setModalCurrentData(value);
    setCurrentPLAmount(pl);
    // navigate("/coin-details")
    setLargeModal(true);
  };

  console.log("modalCurrentData", modalCurrentData);
  console.log("currentPLAmount", currentPLAmount);

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
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = jwt_decode(token);
  const id = user.id;

  const requests = useSelector((state) => state.coinReducer);
  console.log(requests, "requests from port folio");

  const getData = async () => {
    let body = {
      user_id: id,
    };
    console.log(body, "body from portfolio");
    const res = await dispatch(getAllTrade(body));
    console.log(res, "res from portfolio");
  };


  useEffect(() => {
    let body = {
      user_id: id,
    };
    dispatch(getAllCoin());
    const resp = dispatch(getAllTrade(body)).then((res) => {
      console.log(res, "res from portfolio");
      const result = Object.values(
        res?.payload?.reduce((acc, cur) => {
             let previousPrice = requests.coinData.find((item) => item.symbol === cur.crypto_symbol);
            // console.log(previousPrice, "previousPrice from reducer");
          const key = cur.crypto_symbol;
          if (!acc[key]) {
            acc[key] = {
              crypto_symbol: cur.crypto_symbol,
              trade: cur.trade,
              Count: 1,
              total_trade: cur.trade,
              admin_profit: cur.admin_profit,
              crypto_name: cur.crypto_name,
              crypto_purchase_price: cur.crypto_purchase_price,
              id: cur.id,
              invested_date: cur.invested_date,
              investment: cur.investment,
              purchase_units: cur.purchase_units,
              stop_loss: cur.stop_loss,
              take_profit: cur.take_profit,
              user_id: cur.user_id,
              profitLoss: (previousPrice?.price - cur.crypto_purchase_price) * cur.purchase_units,

            };
          } else {
            acc[key].investment += cur.investment;
            acc[key].purchase_units += cur.purchase_units;
            acc[key].Count++;
            acc[key].total_trade += cur.trade;
            acc[key].profitLoss += (previousPrice?.price - cur.crypto_purchase_price) * cur.purchase_units;
          }

          return acc;
        }, {})
      ).map((obj) => {
        obj.trade = obj.total_trade / obj.Count;
        obj.profitLoss = obj.profitLoss / obj.Count;
        delete obj.total_trade;
        delete obj.Count;
        return obj;
      });
      setReduceData(result);
      console.log(result, "reduce from portfolio");
    });
    //getData()
  }, []);

  const handleClick = (item) => {
    setClicked(true);
    setSymbol(item.crypto_symbol);
  };
  const filterDataForCoin = () => {
    const filteredData = requests.tradeData.filter(
      (item) => item.crypto_symbol === symbol
    );
    console.log(filteredData, "filteredDataForCoin");
    return filteredData;
  };

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
  let InnerColumns = [
    { label: "Available Assets", columnName: "available_assets", sort: true },
    { label: "Amount", columnName: "amount", sort: true },
    { label: "Units", columnName: "sort", sort: false },
    { label: "Open", columnName: "open", sort: true },
    { label: "SL", columnName: "sl", sort: false },
    { label: "TP", columnName: "tp", sort: false },
    { label: "P/L($)", columnName: "pl", sort: false },
    { label: "P/L(%)", columnName: "plp", sort: false },
  ];

  const profitLossAmount = (unit, openingPrice, symbol) => {
    let ProfitLoss = 0;
    // eslint-disable-next-line array-callback-return
    //console.log(requests.coinData,"requests.coinData")
    if (requests.coinData) {
      let previousPrice = requests.coinData.find((item) => item.symbol === symbol);

      //console.log(previousPrice, "previousPrice");
      if (previousPrice) {


        ProfitLoss = (previousPrice.price - openingPrice) * unit;
      }
    }
    console.log(ProfitLoss, "ProfitLoss");
    return ProfitLoss;

  }

  const profitLossPercentage = (unit, openingPrice, symbol, trade) => {
    let ProfitLoss = 0;
    let profitLossPercent = 0;
    // eslint-disable-next-line array-callback-return
    //console.log(requests.coinData,"requests.coinData")
    if (requests.coinData) {
      let previousPrice = requests.coinData.find((item) => item.symbol === symbol);

      //console.log(previousPrice, "previousPrice");
      if (previousPrice) {


        ProfitLoss = (previousPrice.price - openingPrice) * unit;
        profitLossPercent = (ProfitLoss / trade) * 100;
      }
    }
    console.log(ProfitLoss, "ProfitLoss");
    return profitLossPercent;
  }


  const GetAverageofProfitLoss = (data, symbol) => {
    let total = 0;
    let count = 0;
    data.map((item) => {
      if (item.symbol === symbol) {
        total += profitLossAmount(item.purchase_units, item.crypto_purchase_price, item.crypto_symbol);
        count++;
        console.log(total, "total");
      }


    });
    return total / count;
  }
  const closetrade = () => {
            console.log("checking close trade")
            if (requests?.coinData) {
              let previousPrice = requests.coinData.find((item) => item.symbol === modalCurrentData?.crypto_symbol);
              console.log(previousPrice,"previousPrice from closetrade")
              let body = {
               id: modalCurrentData?.id,
               crypto_sale_price: previousPrice?.price,
               }
             console.log(body,"body of close trade")


   const res=  dispatch(tradeClose(body));
    console.log(res,"res of close trade")
  }

  };


const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      {clicked && (
        <Button
          onClick={() => setClicked(false)}
          variant="link"
          size="lg"
          style={{
            //make it into left

            marginLeft: "-45%",
          }}
        >
          Back
        </Button>
      )}
      <div className="col-xl-12">
        {clicked === false ? (
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
                <div
                  id="market_wrapper"
                  className="dataTables_wrapper no-footer"
                >
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
                                column.label === "Available Assets"
                                  ? ""
                                  : "center",
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
                        reduceData,
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
                              <Col onClick={() => handleClick(item)}>
                                <h5 className="mb-0 ms-2">
                                  {item.crypto_name}
                                </h5>
                                <span className="text-muted ms-2">
                                  {item.crypto_symbol}
                                </span>
                              </Col>
                            </div>
                          </td>
                          <td className="text-center">{item.trade}</td>
                          <td
                            className={`text-center`}
                            style={{ color: item.change > 0 ? "green" : "red" }}
                          >
                            {item.purchase_units}%
                          </td>
                          <td className="text-center">
                            {item.crypto_purchase_price}
                          </td>
                          <td
                            className={`text-center`}
                            style={{ color: item.profitLoss > 0 ? "green" : "red" }}
                          >
                            ${item.profitLoss}
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
                          activePag.current > 0 &&
                          onClick(activePag.current - 1)
                        }
                      >
                        <i className="fa fa-angle-double-left"></i>
                      </Link>
                      <span>
                        {paggination.map((number, i) => (
                          <Link
                            key={i}
                            className={`paginate_button  ${activePag.current === i ? "current" : ""
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
        ) : (
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
                <div
                  id="market_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <table
                    className="table dataTable  shadow-hover display"
                    style={{ minWidth: "845px" }}
                  >
                    <thead>
                      <tr>
                        {InnerColumns.map((column, index) => (
                          <th
                            key={index}
                            style={{
                              textAlign:
                                column.label === "Available Assets"
                                  ? ""
                                  : "center",
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
                        <th>
                          <Button
                            variant="outline-dark"
                            style={{
                              borderRadius: "50px ",
                              border: "2px solid grey",
                              padding: "6px",
                              fontSize: "10px bold",
                              paddingLeft: "20px",
                              paddingRight: "20px",
                              //   '&:hover': {
                              //     backgroundColor: 'red',
                              //     color: 'black',
                              //   }
                            }}
                          >
                            Close all
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortData(
                        filterDataForCoin(),
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
                                <h5 className="mb-0 ms-2">
                                  {item.crypto_name}
                                </h5>
                                <span className="text-muted ms-2">
                                  {item.crypto_symbol}
                                </span>
                              </Col>
                            </div>
                          </td>
                          <td className="text-center">{item.trade}</td>
                          <td
                            className={`text-center`}
                            style={{ color: item.change > 0 ? "green" : "red" }}
                          >
                            {item.purchase_units}%
                          </td>
                          <td className="text-center">
                            {item.crypto_purchase_price}
                          </td>
                          <td className="text-center">
                            <span className="text-center" style={{ border: "2px solid #D3D3D3", padding: "6px 15px", borderRadius: "5px" }}>
                              ....
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="text-center" style={{ border: "2px solid #D3D3D3", padding: "6px 15px", borderRadius: "5px" }}>

                              ....
                            </span>
                          </td>
                          <td
                            className={`text-center`}
                            style={{ color: profitLossAmount(item.purchase_units, item.crypto_purchase_price, item.crypto_symbol) > 0 ? "green" : "red" }}
                          >
                            {Math.round(profitLossAmount(item.purchase_units, item.crypto_purchase_price, item.crypto_symbol) * 10000) / 10000}
                          </td>
                          <td
                            className={`text-center`}
                            style={{ color: profitLossPercentage(item.purchase_units, item.crypto_purchase_price, item.crypto_symbol, item.trade) > 0 ? "green" : "red" }}
                          >
                            {Math.round(profitLossPercentage(item.purchase_units, item.crypto_purchase_price, item.crypto_symbol, item.trade) * 100) / 100}%
                          </td>
                          <td className="align-items-center">
                            <Button
                              variant="outline-danger"
                              style={{
                                borderRadius: "50px ",
                                padding: "5px 15px",
                                fontSize: "10px bold",
                                //   '&:hover': {
                                //     backgroundColor: 'red',
                                //     color: 'black',
                                //   }

                              }}
                              onClick={() => buyNow(item,profitLossAmount(item.purchase_units, item.crypto_purchase_price, item.crypto_symbol))}
                            >
                              Close
                            </Button>
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
                          activePag.current > 0 &&
                          onClick(activePag.current - 1)
                        }
                      >
                        <i className="fa fa-angle-double-left"></i>
                      </Link>
                      <span>
                        {paggination.map((number, i) => (
                          <Link
                            key={i}
                            className={`paginate_button  ${activePag.current === i ? "current" : ""
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
        )}
      </div>
      <Modal className="fade bd-example-modal-lg" show={largeModal} size="lg">
        <Modal.Header>
          <Modal.Title>Close Trade</Modal.Title>
          <Button
            className="btn-close"
            onClick={() => setLargeModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f1f1f1" }}>
          <Tab.Container defaultActiveKey="Navbuy">
            <div className="">
              <Tab.Content>
                <Tab.Pane eventKey="Navbuy">
                  <Tab.Container defaultActiveKey="Navbuymarket">
                    <Row>
                      <Col xl={2}>
                        <img
                          src={cryptoicons[modalCurrentData?.crypto_symbol]}
                          width="100%"
                        />
                      </Col>
                      <Col>
                        <h4 className="mb-0"></h4>
                        <Row>
                          <div style={{ flexDirection: "column" }}>
                            <p
                              className="mb-0"
                              style={{ fontSize: "20px" }}
                            >
                              <h3 className="mb-0">
                                {modalCurrentData?.crypto_name}
                              </h3>
                            </p>
                            <span
                              style={{ marginTop: "0.4rem", flexDirection: "column" }}
                              className="text black mb-0"
                            >
                              650.89
                            </span>
                          </div>

                        </Row>
                      </Col>
                      <Col style={{display: "flex",flexDirection: "column",alignItems: "end"}}>
                        <Row>
                          <div style={{fontSize: "large",fontWeight: "700"}}>
                           | #2591795407     
                        <span style={{display: "flex",flexDirection: "column"}}>Trade Id</span>
                        </div>

                        </Row>
                      </Col>
                    </Row>
                    <Card>
                      <Card.Header style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <Row style={{width: "100%"}}>
                        <div style={{fontSize: "larger",fontWeight: "700"}}>
                           Amount
                          </div>
                          <div>
                            <span style={{display: "flex", justifyContent: "end" }}>${modalCurrentData?.trade}</span>
                            <p style={{ display: "flex", justifyContent: "end" }}>{modalCurrentData?.purchase_units} Units</p>
                          </div>
                        </Row>
                        <Row style={{width: "100%"}}>
                        <div style={{fontSize: "larger",fontWeight: "700"}}>
                            Current P/L
                          </div>
                          <div>
                            <span style={{ color: "red", display: "flex", justifyContent: "end" }}>{currentPLAmount}</span>
                          </div>
                        </Row>
                        <hr></hr>
                        <Row style={{width: "100%"}}>
                          <div style={{fontSize: "larger",fontWeight: "700"}}>
                            Total  
                             </div>
                          <div>
                            <span style={{display: "flex", justifyContent: "end" }}>{modalCurrentData?.trade+(currentPLAmount)}</span>
                          </div>
                        </Row>
                      </Card.Header>
                    </Card>
                    <Form.Check
                      inline
                      label="Close only Part of the trade"
                     type="checkbox"
  checked={isChecked}
  onChange={() => setIsChecked(!isChecked)}
                    />
                    {isChecked && <div> <Row>
                      <Col xl={1}></Col>
                      <Col xl={2}>
                        <h3 style={{ color: "rgb(62, 172, 255)", fontSize: "large", fontWeight: "600", marginTop: "1rem" }}>Amount</h3>
                      </Col>
                      <Col xl={6}>
                        <form style={{ marginTop: "8px" }}>
                          <div className="input-group ">
                            <span className="input-group-text text-black">
                              -
                            </span>
                            {/* <input type="text" className="form-control" value={inputValue}/> */}
                            <input
                              type="text"
                              className="form-control"

                            />
                            <span className="input-group-text text-black">
                              +
                            </span>
                          </div>
                        </form>
                      </Col>
                      <Col>
                        {/* <Button style={{ backgroundColor: '#3eacff', height: "3rem" }} className='btn btn-sm'><i className="material-icons">swap_horiz</i></Button> */}
                        <Button
                              style={{
                                backgroundColor: "#3eacff",
                                height: "4rem",
                                display: "flex",flexDirection: "column"
                              }}
                              variant="info"
                                          >
                          <i className="material-icons">swap_horiz</i>
                          Units
                        </Button>
                      </Col>
                      <Row>
                        <div className="text-center mb-0">
                          <p>

                            0.24 UNITS
                          </p>
                        </div>
                      </Row>
                    </Row></div>}
                   

                  </Tab.Container>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            style={{ backgroundColor: "red", width: "30%" }}
            variant="danger"
            onClick={closetrade}
          >
            Close Trade
          </Button >
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default DataTable;
