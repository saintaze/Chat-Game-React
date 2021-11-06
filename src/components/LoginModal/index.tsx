import { useEffect, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { MetaMessage } from '../../interfaces';
import { setUserInfo } from '../../store/slices/userSlice';
import Modal from 'react-modal';

import './styles.scss';
interface IProps {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
}

const LoginModal: React.FC<IProps> = ({showModal, setShowModal}) => {
	const dispatch = useAppDispatch();
	const {socket} = useAppSelector(state => state.socket);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [username, setUsername] = useState('');


  const closeModal = () => {
    setIsOpen(false);
  }

	const handleLogin  = () => {
		if(!username.trim()) return;
		socket?.emit('login', {username});
		closeModal();
		setUsername('');
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { 
		if (e.code === 'Enter') handleLogin();
	}

	useEffect(() => {
		setIsOpen(showModal);
	}, [showModal]);


	const onMessage = useCallback(({user}: MetaMessage) => {
		dispatch(setUserInfo({user}));
	}, [dispatch]);


	useEffect(() => {
		socket?.on('message', onMessage);
		return () => {
			socket?.off('message', onMessage);
		}
	}, [onMessage, socket])

	return (
		<Modal
			className="Modal"
			overlayClassName="Overlay"
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			onAfterClose={() => setShowModal(false)}
		>
			<div className="usernameControl">
				<input placeholder="Enter username" className="usernameInput" type="text" value={username} onChange={e => setUsername(e.target.value)} onKeyPress={handleKeyPress}/>
				<button onClick={handleLogin} className="loginBtn">Login</button>
			</div>
		</Modal>
	)
}

export default LoginModal
