import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageTitle = ({ motherMenu, activeMenu, pageContent ,link=motherMenu}) => {
  let path = window.location.pathname.split("/");
const currentUser = useSelector((state) => state.currentUser);

  return (
		<>

		
			<div className="row page-titles mx-0">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to={`/${link}`}>{motherMenu}</Link></li>
					<li className="breadcrumb-item active "><Link to={`/${path[path.length - 1]}`}>{activeMenu}</Link></li>
				</ol>
			</div>
		</>
    	
  );
};

export default PageTitle;
