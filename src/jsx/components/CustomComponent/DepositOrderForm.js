import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postDepositAction } from '../../../store/actions/DepositAction';
import { Button } from 'react-bootstrap';
import { depositAmount } from '../../../Redux/coins';
import { ToastContainer, toast } from "react-toastify";


const DepositOrderForm = () => {
	const state= useSelector(state=>state)
	const [data,setData]=useState('')
	let errorsObj = { data: ''};
	const [errors, setErrors] = useState(errorsObj);
	const dispatch=useDispatch()
	 const postDeposit = (e) =>{
		e.preventDefault();

		// dispatch(postDepositAction(data))
		// setData('');
		let error = false;
		const errorObj = { ...errorsObj };
		if (data === '') {
			errorObj.data = 'Amount is Required';
			error = true;
			return
		}
		setErrors(errorObj);
		if (error) {
			return;
		}

		let body={
			amount:data,
			user_id :state.userReducer.currentUser.id
		}
		console.log(body, "body");

		const res =	dispatch(depositAmount(body))
		console.log(res, "res ");



	}
	return (
		<>
			<form onSubmit={postDeposit} className='border-4' >
				<h2 className=' d-flex justify-content-center' style={{ marginBottom: '1rem' }}>Deposit Amount</h2>
				<p className=' d-flex justify-content-center'>Enter valid amount to deposit into your wallet.</p>
				<div className="sell-blance ">
					<div className="input-group  d-flex justify-content-center">
						<input type="text" value={data} onChange={(e)=>setData(e.target.value)} className="form-control form-control-sm" placeholder='Amount'  />
						<span className="input-group-text">USD</span>
					</div>{errors.data && <div className="text-danger fs-12">{errors.data}</div>}
						
				</div>
				<div className="text-center  d-flex justify-content-center " style={{ marginTop: '2rem', marginLeft:'1rem' }}>
					<Button type="submit" className="btn w-50 text-white" style={{backgroundColor:'#3eacff'}}>Deposit</Button>

				</div>
				<ToastContainer />
			</form>
		</>
	)
}
export default DepositOrderForm;