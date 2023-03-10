import React, { Fragment, useState } from "react";

import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
//import RightSideBar from "./RightSideBar";
import ChatBox from "../ChatBox";
import AdminSideBar from "../nav/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  const userReducer = useSelector((store) => store?.userReducer);

  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  return (
    <Fragment>
      <NavHader />
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
      <Header
        onNote={() => onClick("chatbox")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
      />
      {userReducer?.currentUser?.is_admin ? <AdminSideBar /> : <SideBar />}
      {/* {true ? <AdminSideBar /> : <SideBar />} */}
    </Fragment>
  );
};

export default JobieNav;
