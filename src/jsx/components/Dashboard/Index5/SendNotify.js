import React from "react";

import {
  Button,
  Card,
  Form,
  Modal,
  Tab,
} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
function
  SendNotify() {
  return (
    <>

      <Modal.Header>

      </Modal.Header>
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
                          <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                          />
                        </FloatingLabel>
                      </div>
                      <div className="open2" >
                        <Button
                          className="open2"
                          variant="info"
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


    </>
  );
}
export default SendNotify;
