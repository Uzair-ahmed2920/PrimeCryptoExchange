import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Modal,
  Row,
  Tab,
} from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TabelComponent from "../../layouts/TabelComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepositRequest,
  updateDepositStatus,
} from "../../../Redux/coins";


const DepositRequests = () => {
  const [pending, setPending] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [largeModal, setLargeModal] = useState(false);
  const [modalCurrentData, setModalCurrentData] = useState();
  const [rejectedReason, setRejectedReason] = useState(
    "Your request is rejected"
  );
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.coinReducer);
  const getData = async () => {
    const res = await dispatch(getAllDepositRequest());
    console.log(res);
  };
  const filterData = (data, type) => {
    const filteredData = data?.filter((item) => item.status === type);
    return filteredData;
  };
  const handleAccept = async (id) => {
    console.log("id from com", id);
    let data = {
      status: "approved",
      status_description: "Your request has been accepted",
      id: id,
    };
    const res = await dispatch(updateDepositStatus(data));
    console.log("res of deposit data", res);
    if (res.payload === "updated") {
      dispatch(getAllDepositRequest());
    }
  };
  const onRejected = async () => {
    console.log("id from com", modalCurrentData.id);
    let data = {
      status: "rejected",
      status_description: rejectedReason,
      id: modalCurrentData.id,
    };
    const res = await dispatch(updateDepositStatus(data));
    console.log("res of deposit data", res);
    if (res.payload === "updated") {
      dispatch(getAllDepositRequest());
    }
    setLargeModal(false);
  };
  const formattedDate = (item) => {
    if (item.requested_at === null) {
      return "N/A";
    }
    
    dayjs.extend(utc);
    dayjs.extend(timezone);
  
    return dayjs(item.requested_at)
      .utc()
      .format("YYYY-MM-DD | HH:mm:ss");
  };

  React.useEffect(() => {
    getData();
  }, []);

  const renderTabelPending = () => {
    return [
      {
        title: "S.No",
        render: (rowData) => {
          return <span>{rowData.count}</span>;
        },
      },
      {
        title: "Amount",
        render: (rowData) => {
          return <span>{rowData.amount}</span>;
        },
      },
      {
        title: "Status",
        render: (rowData) => {
          return <span>{rowData.status}</span>;
        },
      },
      {
        title: "Description",
        render: (rowData) => {
          return <span>{rowData.status_description}</span>;
        },
      },

      {
        title: "Date",
        render: (rowData) => {
          return <span>{formattedDate(rowData)}</span>;
        },
      },
      {
        title: "Action",
        render: (rowData) => {
          return (
            <div>
              <Button
                variant="primary"
                className="btn-sm mx-2 "
                size="sm"
                onClick={() => handleAccept(rowData.id)}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                className="text-center mx-2 "
                size="sm"
                onClick={() => {
                  setLargeModal(true);
                  setModalCurrentData(rowData);
                  //handleReject(rowData)
                }}
              >
                Reject
              </Button>
            </div>
          );
        },
      },
    ];
  };
  const renderTabelAccepted = () => {
    return [
      {
        title: "S.No",
        render: (rowData) => {
          return <span>{rowData.count}</span>;
        },
      },
      {
        title: "Amount",
        render: (rowData) => {
          return <span>{rowData.amount}</span>;
        },
      },
      {
        title: "Status",
        render: (rowData) => {
          return <span>{rowData.status}</span>;
        },
      },
      {
        title: "Description",
        render: (rowData) => {
          return <span>{rowData.status_description}</span>;
        },
      },

      {
        title: "Date",
        render: (rowData) => {
          return <span>{formattedDate(rowData)}</span>;
        },
      },
    ];
  };
  const renderTabelRejected = () => {
    return [
      {
        title: "S.No",
        render: (rowData) => {
          return <span>{rowData.count}</span>;
        },
      },
      {
        title: "Amount",
        render: (rowData) => {
          return <span>{rowData.amount.toLocaleString()}</span>;
        },
      },
      {
        title: "Status",
        render: (rowData) => {
          return <span>{rowData.status}</span>;
        },
      },
      {
        title: "Description",
        render: (rowData) => {
          return <span>{rowData.status_description}</span>;
        },
      },

      {
        title: "Date",
        render: (rowData) => {
          return <span>{formattedDate(rowData)}</span>;
        },
      },
    ];
  };
  const data = ["", "", ""];

  return (
    <>
      <PageTitle activeMenu="Deposit Request" motherMenu="Admin" />

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
            setAccepted(false);
            setRejected(false);
            setPending(true);
          }}
          style={{
            backgroundColor: pending ? "#0d6efd" : "#fff",
            color: pending ? "#fff" : "#0d6efd",
            borderColor: "white",
          }}
          variant="secondary"
        >
          Pending
        </Button>
        <Button
          onClick={() => {
            setAccepted(true);
            setRejected(false);
            setPending(false);
          }}
          style={{
            backgroundColor: accepted ? "#0d6efd" : "#fff",
            color: accepted ? "#fff" : "#0d6efd",
            borderColor: "white",
          }}
          variant="secondary"
        >
          Accepted
        </Button>
        <Button
          onClick={() => {
            setAccepted(false);
            setRejected(true);
            setPending(false);
          }}
          style={{
            backgroundColor: rejected ? "#0d6efd" : "#fff",
            color: rejected ? "#fff" : "#0d6efd",
            borderColor: "white",
          }}
          variant="secondary"
        >
          Rejected
        </Button>
      </ButtonGroup>

      {pending && (
        <TabelComponent
          cols={renderTabelPending()}
          data={filterData(requests?.data, "pending").map((obj, index) => {
            return {
              ...obj,
              count: index + 1,
            };
          })}
          tabeltitle={"Deposit pending Request"}
          itemsPerPage={8}
        />
      )}
      {accepted && (
        <TabelComponent
          cols={renderTabelAccepted()}
          data={filterData(requests?.data, "approved").map((obj, index) => {
            return {
              ...obj,
              count: index + 1,
            };
          })}
          tabeltitle={"Deposit accepted Request"}
          itemsPerPage={8}
        />
      )}
      {rejected && (
        <TabelComponent
          cols={renderTabelRejected()}
          data={filterData(requests?.data, "rejected").map((obj, index) => {
            return {
              ...obj,
              count: index + 1,
            };
          })}
          tabeltitle={"Deposit rejected Request"}
          itemsPerPage={8}
        />
      )}

      <Modal className="fade bd-example-modal-lg" show={largeModal} size="lg">
        <Modal.Header>
          <Modal.Title>Reject Request</Modal.Title>
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
                      <Card.Body>
                        <Row>
                          <Col xl={1}></Col>
                          <Col xl={2}>
                            <h3 className="heading">Reason</h3>
                          </Col>
                          <Col xl={6}>
                            <form style={{ marginTop: "8px" }}>
                              <div className="input-group ">
                                {/* <input type="text" className="form-control" value={inputValue}/> */}
                                <input
                                  type="text"
                                  className="form-control"
                                  // id={inputId}
                                  value={rejectedReason}
                                  onChange={(e) =>
                                    setRejectedReason(e.target.value)
                                  }
                                />
                              </div>
                            </form>
                          </Col>
                          <Col xl={1}></Col>
                        </Row>
                        <Row></Row>
                      </Card.Body>
                    </Card>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                      <Button
                        style={{ backgroundColor: "#3eacff", width: "30%" }}
                        variant="info"
                        onClick={() => onRejected()}
                      >
                        Reject
                      </Button>
                    </Modal.Footer>
                  </Tab.Container>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DepositRequests;
