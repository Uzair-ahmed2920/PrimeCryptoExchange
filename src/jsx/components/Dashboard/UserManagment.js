import React from 'react'
import { Col, Row } from 'react-bootstrap'
const UserManagment = () => {
  return (
 <>
   <div className="col-xl-12">
      <div className="card">
        <div className="card-header border-0">
          <Col xl={12} style={{display:"flex"}} >
            <Row>
              <h3 style={{color:"rgb(62, 172, 255)" }}>Admin / </h3>
            </Row>
            <Row>
              <p className="notification">User Management</p>
            </Row>
          </Col>
        </div>
</div>
</div>
 
 </>
  )
}

export default UserManagment