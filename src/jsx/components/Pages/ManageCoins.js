import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Col, Dropdown } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";
import { getAllCoin } from "../../../Redux/coins";
import cryptoicons from "../../../images/cryptoIcons/cryptoImg";
import { addToAdminWatchlist, getAllAdminWatchlist, removeFromAdminWatchlist } from "../../../Redux/user";
import { ToastContainer } from "react-toastify";

const ManageCoins = () => {
  const [previousData, setPreviousData] = useState();
  const [watchlist, setWatchlist] = useState(false);
  const [coinList, setCoinList] = useState(true);
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState("percent_change_24h");
  const [columnName , setColumnName] = useState("Change 24h")
  const [inputValue, setInputValue] = useState();
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

  const returnValue = (item) => {
    if (percentage === "percent_change_1h") {
      return item.percent_change_1h;
    } else if (percentage === "percent_change_24h") {
      return item.percent_change_24h;
    } else if (percentage === "percent_change_7d") {
      return item.percent_change_7d;
    }
  };

  const requests = useSelector((state) => state.coinReducer);
  const userRequests = useSelector((state) => state.userReducer);
const getWatchListData = async() => {
  const res = await dispatch(getAllAdminWatchlist());
  console.log(res, "res");
}

const handleAdd = (name) => {
  let body = {
    coin_name : name
  }
   dispatch(addToAdminWatchlist(body));
  //console.log(res, "res of add");
}
const handleRemove = async (id) => {
 let body = {
    watchlist_item_id : id
  }
  dispatch(removeFromAdminWatchlist(body));
 //console.log(res, "res of remove");
 getWatchListData();
}


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
  useEffect(() => {
    // set 1 min interval for fetching data
    //const interval = setInterval(() => {
      getData();
      getWatchListData();
    //}, 60000);
    //return () => clearInterval(interval);
  }, []);

  const TableCoinMarket = () => {
    return [
      {
        title: "Markets",
        render: (rowData) => {
          return  <div className="market-title d-flex align-items-center ">
          <img src={cryptoicons[rowData.symbol]} width="12%" />
          <Col>
            <h5 className="mb-0 ms-2">{rowData.name}</h5>
            <span className="text-muted ms-2">{rowData.symbol}</span>
          </Col>
        </div>;
        },
      },
      {
        title: "Price",
        render: (rowData) => {
          return <span
          style={{
            color: GetColor(rowData.id, rowData.price),
          }}
        >
          ${rowData.price}
        </span>;
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
          return <span>{returnValue(rowData)}%</span>;
        },
      },
      {
        title: "Action",
        render: (rowData) => {
          return <div>
          <Button
            variant="primary"
            className="btn-sm mx-2 "
            size="sm"
            onClick={() => handleAdd(rowData.name)}
          >
            Remove
          </Button>
          {/* <Button
            variant="danger"
            className="text-center mx-2 "
            size="sm"
            // onClick={() => {
            //   setLargeModal(true);
            //   setModalCurrentData(rowData);
            //   //handleReject(rowData)
            // }}
          >
            Remove
          </Button> */}
        </div>;
        },
      },
    ];
  };
  const TableCoinWatchList = () => {
    return [
      {
        title: "ID",
        render: (rowData) => {
          return  <span>{rowData.id}</span>;
        },
      },
      {
        title: "Name",
        render: (rowData) => {
          return <span
        >
          {rowData.coin_name}
        </span>;
        },
      },
      {
        title: "Action",
        render: (rowData) => {
          return <div>
          {/* <Button
            variant="primary"
            className="btn-sm mx-2 "
            size="sm"
            //onClick={() => handleAccept(rowData.id)}
          >
            Show
          </Button> */}
          <Button
            variant="danger"
            className="text-center mx-2 "
            size="sm"
            onClick={() => {
             
              handleRemove(rowData.id)
            }}
          >
            Show
          </Button>
        </div>;
        },
      },
    ];
  };
  const data = ["", "", ""];
  return (
    <>
    <ToastContainer />
      <PageTitle activeMenu="Manage Coins" motherMenu="Admin" />

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
            setCoinList(true);
            setWatchlist(false);
          }}
          style={{
            backgroundColor: coinList ? "#0d6efd" : "#fff",
            color: coinList ? "#fff" : "#0d6efd",
            borderColor: "white",
          }}
          variant="secondary"
        >
          Coin Market
        </Button>
        <Button
          onClick={() => {
            setWatchlist(true);
            setCoinList(false);
          }}
          style={{
            backgroundColor: watchlist ? "#0d6efd" : "#fff",
            color: watchlist ? "#fff" : "#0d6efd",
            borderColor: "white",
          }}
          variant="secondary"
        >
          Watch List
        </Button>
      </ButtonGroup>
      {coinList && (
      <TabelComponent
        cols={TableCoinMarket()}
        data={requests?.coinData}
        tabeltitle={"Manage Coins"}
        itemsPerPage={8}
      />
      )}
      {watchlist && (       
      <TabelComponent
        cols={TableCoinWatchList()}
        data={userRequests?.getAllAdminWatchlist}
        tabeltitle={"Coins watchlist"}
        itemsPerPage={8}
      />
      )}
    </>
  );
};

export default ManageCoins;
