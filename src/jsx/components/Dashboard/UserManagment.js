import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
const UserManagment = () => {
    return (
        <>
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header border-0">
                        <Col xl={12} style={{ display: "flex" }} >
                            <Row>
                                <h3 style={{ color: "rgb(62, 172, 255)" }}>Admin / </h3>
                            </Row>
                            <Row>
                                <p className="notification">User Management</p>
                            </Row>
                        </Col>
                    </div>
                </div>
            </div>
            <div className="col-xl-12">
                <div className="card">
            <div className="card-body pt-0">
                        <div className="table-responsive dataTablemarket">
                            <div id="market_wrapper" className="dataTables_wrapper no-footer">
                                <table className="table dataTable  shadow-hover display" style={{ minWidth: "845px" }}>
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Email</th>
                                            <th>Profit</th>
                                            <th>Loss</th>
                                            <th>Available Balance</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                      </div>
                </div>
        </>
    )
}
export default UserManagment