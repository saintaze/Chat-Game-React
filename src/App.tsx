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
	
	// @ts-ignore
	const {joinedRoomName} = useSelector(state => state.chat);
  return (
    <div className="App">
			{
				socket && (	
					<>
						<Navbar/>
						<main>
							<div className="roomListContainer">
								 <RoomsList />
							</div>
							<div className="roomContainer">
								{joinedRoomName && <Room />}
							</div>
						</main>
						<Footer />
					</>
				)
			}
    </div>
  );
}

export default App;
