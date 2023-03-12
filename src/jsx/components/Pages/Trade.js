import PageTitle from "../../layouts/PageTitle";
import DataTable from "../CustomComponent/TradeComponents/TradeTable";
const Trade = (props) => {
  // const dispatch = useDispatch();
  // const userReducer = useSelector((store) => store.userReducer);

  return (
    <>
      <PageTitle activeMenu="Trade" motherMenu="Home" />
      <DataTable />
    </>
  );
};

export default Trade;
