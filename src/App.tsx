import io  from "socket.io-client";
import Navbar from './components/Navbar';
import RoomsList from './components/RoomsList';
import Room from './components/Room/index';
import Footer from './components/Footer';
import connection  from './enums/connection';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './store/slices/socketSlice';

import './App.scss';


function App() {
	const dispatch = useDispatch();
	// @ts-ignore
	// const {number} = useSelector(state => state.chat)
	// @ts-ignore
	const {socket} = useSelector(state => state.socket);
	useEffect(() => {
		const socket = io(connection.SOCKET_URL);
		socket.on("connect", () => {
			dispatch(setSocket({socket}))
			console.log(socket.id);
		});
	}, []);

	// const [id, setId] = useState('1');

	// useEffect(() => {
	// 	console.log('RESET CHAT')
	// 	if(number === null){
	// 		setId(Date.now().toString(36) + Math.random().toString(36).substr(2))
	// 	}
	// }, [number])

  return (
    <div className="App">
			{
				socket && (	
					<>
						<Navbar/>
						<main>
							<RoomsList />
							<Room />
						</main>
						<Footer />
					</>
				)
			}
    </div>
  );
}

export default App;
