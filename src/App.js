import { lazy, Suspense, useEffect } from "react";

/// Components
import Index from "./jsx";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
// action

/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { useDispatch, useSelector } from "react-redux";
import AdminIndex from "../src/jsx/AdminIndex";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axiosInstance from "./services/AxiosInstance";
import { setCurrentUser } from "./Redux/user";

const SignUp = lazy(() => import("./jsx/pages/Registration"));
const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"));
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const cookies = new Cookies();

function App(props) {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      const user = jwt_decode(token);
      axiosInstance
        .get(`/api/user/${user?.id}`)
        .then((res) => {
          console.log(res?.data, "res?.data");
          dispatch(setCurrentUser(res?.data));
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate("/login");
    }
  }, []);
  if (userReducer?.currentUser && userReducer?.currentUser !== null) {
    //if (false)
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {userReducer?.currentUser?.is_admin ? <AdminIndex /> : <Index />}
          {/* {true ? <AdminIndex /> : <Index />} */}
        </Suspense>
      </>
    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {/* {coinReducer.isLoading && (
        <div className="loader">
          <RotatingLines
            strokeColor="#3eacff"
            strokeWidth="5"
            animationDuration="0.75"
            width="70"
            visible={true}
          />
        </div>
      )} */}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/page-register" element={<SignUp />} />
            <Route path="/page-forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Suspense>
      </div>
    );
  }
}

export default withRouter(App);
