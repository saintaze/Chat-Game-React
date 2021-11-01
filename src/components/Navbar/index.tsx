import './styles.scss';
import logo from '../../images/logo.png';
import LoginModal from '../LoginModal/index';
import { useState } from 'react';
import { useSelector } from 'react-redux';



const Navbar = () => {
	const [showModal, setShowModal] = useState(false);
	// @ts-ignore
	const {userInfo} = useSelector(state => state.user);

	return (
		<nav className="Navbar">
			<LoginModal showModal={showModal} setShowModal={setShowModal}/>
			<div className="left">
				<img className="logo" src={logo} alt="logo" />
				<div>
					<div className="headline">Playing with Sabrican</div>
					<div className="tagline">Win the game or win the job</div>
				</div>
			</div>
			{!userInfo.username && <button onClick={() => setShowModal(true)} className="loginBtn">Login</button>}
		</nav>
	)
}



export default Navbar
