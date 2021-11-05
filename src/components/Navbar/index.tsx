import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import logo from '../../images/logo.png';
import LoginModal from '../LoginModal';

import './styles.scss';

const Navbar = () => {
	const [showModal, setShowModal] = useState(false);
	const {userInfo} = useAppSelector(state => state.user);

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
