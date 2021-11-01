import { useEffect, useState } from 'react';
import './styles.scss';
// @ts-ignore
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/slices/userSlice';

interface IProps {
	showModal: boolean,
	setShowModal: (showModal: boolean) => void
}

const LoginModal: React.FC<IProps> = ({showModal, setShowModal}) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [username, setUsername] = useState('');
	// @ts-ignore
	const {socket} = useSelector(state => state.socket);
	const dispatch = useDispatch();

  const closeModal = () => {
    setIsOpen(false);
  }

	const handleLogin  = () => {
		if(!username.trim().length) return;
		socket.emit('login', {username})
		closeModal();
		setUsername('');
	}

	const onKeyPress = (e: any) => { 
		if (e.which == 13) {
			handleLogin()
		}
	}

	useEffect(() => {
		setIsOpen(showModal);
	}, [showModal]);

	const onMessage = ({user, socketId, message}: {user: string, socketId: string, message: string}) => {
		dispatch(setUserInfo({user}))
	}

	useEffect(() => {
		socket.on('message', onMessage)
		return () => socket.on('message', onMessage);
	}, [socket])


	return (
		<Modal
			className="Modal"
			overlayClassName="Overlay"
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			onAfterClose={() => setShowModal(false)}
		>
			<div className="usernameControl">
				<input placeholder="Enter username" className="usernameInput" type="text" value={username} onChange={e => setUsername(e.target.value)} onKeyPress={onKeyPress}/>
				<button onClick={handleLogin} className="loginBtn">Login</button>
			</div>
		</Modal>
	)
}

export default LoginModal
