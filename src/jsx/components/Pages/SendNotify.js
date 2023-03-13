import React from "react";
import axiosInstance from "../../../services/AxiosInstance";
import { errorMessage, successMessage } from "../../../utils/message";
import {
  Button,
  Card,
  Form,
  Modal,
  Tab,
} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PageTitle from "../../layouts/PageTitle"

function SendNotify() {
  const [contant, setContant] = React.useState("");
    const semdNotify = async () => {
      try {
        const res = await axiosInstance.post(`/api/admin/notification/`,{content:contant}).catch((err) => {
          console.log(err.response.data, "err.response.data");
        });
        if (res.status === 200) {
          console.log(res.data , "notification send successfully");
          successMessage("Notification end successfully");
          return res.data;
        }
      } catch (err) {
        errorMessage(err.response.data || err.message);
        console.log(err);
    }

    }

  return (
    <>
  
          <PageTitle activeMenu="Portfolio" motherMenu="Admin" link="admin-dashboard" />
       
  <div className="col-xl-12">
      <div className="card">
      <Modal.Body style={{ backgroundColor: "#f1f1f1" }}>
        <Tab.Container defaultActiveKey="Navbuy">
          <div className="">
            <Tab.Content>
              <Tab.Pane eventKey="Navbuy">
                <Tab.Container defaultActiveKey="Navbuymarket">
                  <Card>
                    <Card.Header className="headernotify">
                      Manage Notification
                    </Card.Header>
                    <Card.Body >
                      <div>
                        <p style={{ color: "black" }}>Write a Notification </p>
                      </div>

                      <div className="textarea">
                        <FloatingLabel controlId="floatingTextarea2" label="Write a Notification here" className="textarea2" >
                          <Form.Control onChange={(e) => setContant(e.target.value)}
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                          />
                        </FloatingLabel>
                      </div>
                      <div className="open2" >
                        <Button onClick={semdNotify}
                          className="open2"
                          variant="light" style={{backgroundColor:'#3eacff' ,color:'white'}}
                        >
                          Send
                        </Button>
                      </div>


                    </Card.Body>

                  </Card>


                </Tab.Container>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </Modal.Body>


</div>

</div>

    </>
  );
}
export default SendNotify;
