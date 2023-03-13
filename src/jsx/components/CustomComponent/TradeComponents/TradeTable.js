import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import cryptoicons from "../../../../images/cryptoIcons/cryptoImg";
import { InfinitySpin } from "react-loader-spinner";
import TabelComponent from "../../../layouts/TabelComponent";

//import bitcoin from "../../../../images/coins/btc.png";
import TradeOrderForm from "./TradeOrderForm";
import { connect, useDispatch, useSelector } from "react-redux";
import { createTrade, getAllCoin } from "../../../../Redux/coins";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

// import { change1hAction, getCoinMarketAction } from "../../../../store/actions/CoinMarketActions";
// import { addWatchlistAction } from "../../../../store/actions/WatchlistAction";
let columns = [
  { label: "Markets", columnName: "markets", sort: true },
  { label: "Price", columnName: "price", sort: true },
  { label: "Change 24h", columnName: "change", sort: false },
  { label: "Invest", columnName: "invest", sort: false },
  { label: "Action", columnName: "action", sort: false },
];
const DataTable = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#market_wrapper tbody tr")
    // rows
  );

  const [previousData, setPreviousData] = useState();
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState("percent_change_24h");
  const [largeModal, setLargeModal] = useState(false);
  const [modalCurrentData, setModalCurrentData] = useState();
  //const [noSl, setNoSl] = useState(true);
  const [inputValue, setInputValue] = useState();
  const [inputId, setInputId] = useState("price");
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  // const navigate = useNavigate();
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = jwt_decode(token);
  const id = user.id;
  const openTrade = (value) => {
    let body = {
      user_id: id,
      crypto_name: modalCurrentData.name,
      crypto_symbol: modalCurrentData.symbol,
      crypto_purchase_price: modalCurrentData.price,
      investment:
        inputId === "price" ? inputValue : inputValue * modalCurrentData.price,
      stop_loss: stopLoss,
      take_profit: takeProfit,
    };
    console.log("body of trade", body);
    const res = dispatch(createTrade(body));
    console.log("res of trade", res);
    setLargeModal(false);
  };

  const buyNow = (value) => {
    console.log("row clicked", value);
    // navigate("/coin-details")
    setModalCurrentData(value);
    setLargeModal(true);
  };
  console.log("modalCurrentData", modalCurrentData);
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
  // useEffect(() => {
  //   setData(document.querySelectorAll("#market_wrapper tbody tr"));
  //   //chackboxFun();
  // }, [test]);

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
  const change1h = () => {
    setPercentage("percent_change_1h");
    columns[2].label = "Change 1h";
  };
  const change24h = () => {
    setPercentage("percent_change_24h");
    columns[2].label = "Change 1h";
  };
  const change7d = () => {
    setPercentage("percent_change_7d");
    columns[2].label = "Change 7d";
  };
  const returnValue = (item) => {
    if (percentage === "percent_change_1h") {
      return item.percent_change_1h;
    } else if (percentage === "percent_change_24h") {
      return item.percent_change_24h;
    } else if (percentage === "percent_change_7d") {
      return item.percent_change_7d;
    }
  };

  const addToWatchlist = (item) => {
    console.log("item", item);
    // dispatch(addWatchlistAction(item.name))
  };
  const requests = useSelector((state) => state.coinReducer);

  const getData = async () => {
    const res = await dispatch(getAllCoin()).then((res) => {
      console.log("res", res);
      console.log(requests, "requests");
      console.log(JSON.parse(localStorage.getItem("perviouse")), "from local");
      let previousNewData = JSON.parse(localStorage.getItem("perviouse"));
      setPreviousData(previousNewData);
      console.log("previousNewData", previousNewData);
      localStorage.setItem("perviouse", localStorage.getItem("cur"));
      console.log("coinData in GetData", res.payload);
      localStorage.setItem("cur", JSON.stringify(res.payload));
      console.log(res, "res");
      console.log(requests, "requests");
    });
  };

  const GetColor = (id, price) => {
    if (previousData) {
      let previousPrice = previousData.find((item) => item.id === id);

      if (previousPrice) {
        if (previousPrice.price > price) {
          return "red";
        } else if (previousPrice.price < price) {
          return "green";
        } else {
          return "black";
        }
      }
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleClick = (price) => {
    if (inputId === "price") {
      setInputId("units");
      const newValue = inputValue / price;
      setInputValue(newValue);
    } else {
      setInputId("price");
      const newValue = inputValue * price;
      setInputValue(newValue);
    }
  };

  useEffect(() => {
    // set 1 min interval for fetching data
    const interval = setInterval(() => {
      getData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderTabel = () => {
    return [
      {
        title: "Markets",
        render: (rowData) => {
          return (
            <div className="market-title d-flex align-items-center">
              <img src={cryptoicons[rowData.symbol]} width="12%" />
              {/* <Col> */}
              <span className="text-muted ms-2">{rowData.name}</span>
              {/* </Col> */}
            </div>
          );
        },
      },
      {
        title: "Price",
        render: (rowData) => {
          return (
            <span
              style={{
                color: GetColor(rowData.id, rowData.price),
              }}
            >
              ${rowData.price}
            </span>
          );
        },
      },
      {
        title: "Change 24h",
        render: (rowData) => {
          return <span>{returnValue(rowData)}%</span>;
        },
      },
      {
        title: "Invest",
        render: (rowData) => {
          return (
            <span>
              <Button
                style={{ backgroundColor: "#3eacff" }}
                className="btn-sm"
                onClick={() => buyNow(rowData)}
              >
                Buy Now
              </Button>
            </span>
          );
        },
      },
      {
        title: "Action",
        render: (rowData) => {
          return (
            <span>
              <Button
                style={{ backgroundColor: "black" }}
                className="btn-sm text-white"
                onClick={() => addToWatchlist(rowData)}
              >
                Add to WatchList
              </Button>
            </span>
          );
        },
      },
    ];
  };

  return (
    <div className="col-xl-12">
      <ToastContainer />
      <TabelComponent
        cols={renderTabel()}
        data={requests?.coinData}
        tabeltitle={"Trade"}
        itemsPerPage={8}
      />
      {/* <div className="card">
        <div className="card-header border-0">
          <Col xl={12}>
            <Row></Row>
          </Col>
        </div>

        <div className="card-body pt-0">
          {requests.isloading && <InfinitySpin width="200" color="#4fa94d" />}

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
                          textAlign: column.label === "Markets" ? "" : "center",
                        }}
                      >
                        {column.columnName === "change" ? (
                          <Dropdown>
                            <Dropdown.Toggle
                              variant=""
                              className="pb-0"
                              style={{ color: "#374557" }}
                            >
                              {column.label}
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
                          </Dropdown>
                        ) : (
                          column.label
                        )}

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
                  {requests?.coinData &&
                    sortData(
                      requests.coinData,
                      sortD.columnName,
                      sortD.sortType
                    ).map((item, index) => (
                      <tr key={index}>
                        <td style={{ width: "30%" }}>
                          <div className="market-title d-flex align-items-center ">
                            <img src={cryptoicons[item.symbol]} width="12%" />
                            <Col>
                              <h5 className="mb-0 ms-2"></h5>
                              <span className="text-muted ms-2">
                                {item.name}
                              </span>
                            </Col>
                          </div>
                        </td>
                        <td
                          className="text-center"
                          style={{
                            color: GetColor(item.id, item.price),
                          }}
                        >
                          ${item.price}
                        </td>
                        <td className="text-center">{returnValue(item)}%</td>
                        <td className="text-center">
                          <Button
                            style={{ backgroundColor:"rgb(62, 172, 255)",color:"white" }}
                          variant="light"
                            onClick={() => buyNow(item)}
                          >
                            Buy Now
                          </Button>
                        </td>
                        <td className="text-center">
                          <Button
                            style={{ backgroundColor: "black",color:"white" }}
                       variant="light"
                            onClick={() => addToWatchlist(item)}
                          >
                            Add to WatchList
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
      <Modal className="fade bd-example-modal-lg" show={largeModal} size="lg">
        <Modal.Header>
          <Modal.Title>Market Cap</Modal.Title>
          <Button
            variant=""
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
                    <Card>
                      <Card.Header>
                        <Row>
                          <Col xl={2} xs={4}>
                            <img
                              src={cryptoicons[modalCurrentData?.symbol]}
                              width="100%"
                            />
                          </Col>

                          <Col>
                            <h4 className="mb-0">{modalCurrentData?.name}</h4>
                            <Row>
                              <div className="d-flex justify-content-start mb-0">
                                <p
                                  className="mb-0"
                                  style={{ fontSize: "20px" }}
                                >
                                  <h3 className="mb-0">
                                    {modalCurrentData?.price}
                                  </h3>
                                </p>
                                <span
                                  style={{ marginTop: "0.7rem" }}
                                  className="text-green mb-0"
                                >
                                  650.89[3.04%]
                                </span>
                              </div>
                              <span
                                className="mb-0"
                                style={{ color: "black", fontWeight: "300" }}
                              >
                                Price by PrimeCrypto | Market Open
                              </span>
                            </Row>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col xl={1}></Col>
                          <Col xl={2}>
                            <h3 className="heading">Amount</h3>
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
                                  id={inputId}
                                  value={inputValue}
                                  onChange={(e) =>
                                    setInputValue(e.target.value)
                                  }
                                />
                                <span className="input-group-text text-black">
                                  +
                                </span>
                              </div>
                            </form>
                          </Col>
                          <Col className="unitbtn" >
                            {/* <Button style={{ backgroundColor: '#3eacff', height: "3rem" }} className='btn btn-sm'><i className="material-icons">swap_horiz</i></Button> */}
                            <Button
                            variant="light"
                              className="bttn"
                              onClick={() =>
                                handleClick(modalCurrentData.price)
                              }
                            >
                              <i className="material-icons">swap_horiz</i>
                              Units
                            </Button>
                          </Col>
                          <Col xl={1}></Col>
                        </Row>
                        <Row>
                          <div className="text-center mb-0">
                            <p style={{ color: "black", fontWeight: "300" }}>
                              {" "}
                              0.24 UNITS | 5.00% of Equity | EXPOSURE $5,219.99{" "}
                            </p>
                          </div>
                        </Row>

                        <div className="custom-tab-1">
                          <Tab.Container defaultActiveKey="Posts">
                            <Nav
                              as="ul"
                              style={{ justifyContent: "space-around" }}
                            >
                              <Nav.Item as="li" className="nav-item">
                                <Nav.Link
                                  to="#nosl"
                                  eventKey="NoSl"
                                  style={{ color: "red" }}
                                >
                                  No SL
                                </Nav.Link>
                                <Link style={{ color: "rgb(62, 172, 255)" }}>
                                  Stop Loss
                                </Link>
                              </Nav.Item>
                              {/* <Nav.Item as="li" i className="nav-item">
                                  <Nav.Link
                                    to="#take-profit"
                                    eventKey="TakeProfit" >
                                    X1
                                  </Nav.Link>
                                  <Link style={{color:"rgb(62, 172, 255)"}}
                                    onClick={() =>
                                      onClick()
                                    }
                                  >
                                    Leverage
                                  </Link>
                                </Nav.Item> */}
                              <Nav.Item as="li" i className="nav-item">
                                <Nav.Link
                                  to="#take-profit"
                                  eventKey="TakeProfit"
                                  style={{ color: "green" }}
                                >
                                  $50,000.00
                                </Nav.Link>
                                <Link
                                  style={{
                                    color: "rgb(62, 172, 255)",
                                    marginLeft: "2rem",
                                  }}
                                  onClick={() => onClick()}
                                >
                                  Take Profit
                                </Link>
                              </Nav.Item>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane id="nosl" eventKey="NoSl">
                                <div className="sell-element">
                                  <div className="">
                                    <Row>
                                      <Col xl={1}></Col>
                                      <Col xl={2}>
                                        <h3
                                          style={{
                                            color: "#3eacff",
                                            marginTop: "10px",
                                          }}
                                        >
                                          Rate
                                        </h3>
                                      </Col>
                                      <Col xl={6}>
                                        <form style={{ marginTop: "8px" }}>
                                          <div className="input-group ">
                                            <span className="input-group-text text-black">
                                              -
                                            </span>
                                            <input
                                              type="text"
                                              className="form-control"
                                              onChange={(e) =>
                                                setStopLoss(e.target.value)
                                              }
                                            />
                                            <span className="input-group-text text-black">
                                              +
                                            </span>
                                          </div>
                                        </form>
                                      </Col>
                                      <Col className="unitbtn" >
                                        <Button 
                                       variant="light"
                                       className="bttn"
                                        >
                                          <i className="material-icons">
                                            swap_horiz
                                          </i>
                                          Units
                                        </Button>
                                    
                                      </Col>
                                      <Col xl={1}></Col>
                                    </Row>
                                    <Row>
                                      <div className="text-center mb-0">
                                        <p> 100% of the Position Amount </p>
                                      </div>
                                    </Row>
                                  </div>
                                </div>
                              </Tab.Pane>

                              <Tab.Pane id="take-profit" eventKey="TakeProfit">
                                <div className="sell-element">
                                  <div className="">
                                    <Row>
                                      <Col xl={1}></Col>
                                      <Col xl={2}>
                                        <h3
                                          style={{
                                            color: "#3eacff",
                                            marginTop: "10px",
                                          }}
                                        >
                                          Rate
                                        </h3>
                                      </Col>
                                      <Col xl={6}>
                                        <form style={{ marginTop: "8px" }}>
                                          <div className="input-group ">
                                            <span className="input-group-text text-black">
                                              -
                                            </span>
                                            <input
                                              type="text"
                                              className="form-control"
                                              onChange={(e) =>
                                                setTakeProfit(e.target.value)
                                              }
                                            />
                                            <span className="input-group-text text-black">
                                              +
                                            </span>
                                          </div>
                                        </form>
                                      </Col>
                                      <Col className="unitbtn" >
                                        <Button 
                                       variant="light"
                                       className="bttn"
                                        >
                                          <i className="material-icons">
                                            swap_horiz
                                          </i>
                                          Units
                                        </Button>
                                      </Col>
                                      <Col xl={1}></Col>
                                    </Row>
                                    <Row>
                                      <div className="text-center mb-0">
                                        <p> 100% of the Position Amount </p>
                                      </div>
                                    </Row>
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </Tab.Container>
                        </div>
                        
                      </Card.Body>
                    </Card>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                      <Button className="open"
                        variant="light"
                        onClick={() => openTrade()}
                      >
                        Open Trade
                      </Button>
                    </Modal.Footer>
                    <p style={{ justifyContent: "center", display: "flex" }}>
                      By the Crytocurrencies your Accepting Our
                      <Link style={{ color: "rgb(62, 172, 255)" }}>
                        Crytocurrencies Addendum
                      </Link>
                    </p>
                  </Tab.Container>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DataTable;
