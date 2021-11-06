import { useEffect } from 'react';
import io  from "socket.io-client";
import connection  from './constants/connection';
import { setSocket } from './store/slices/socketSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Navbar from './components/Navbar';
import RoomsList from './components/RoomsList';
import Room from './components/Room';
import Footer from './components/Footer';

import './App.scss';

function App() {
	const dispatch = useAppDispatch();
	const {socket} = useAppSelector(state => state.socket);
	const {joinedRoomName} = useAppSelector(state => state.chat);

	useEffect(() => {
		const socket = io(connection.SOCKET_URL);
		socket.on("connect", () => {
			dispatch(setSocket({socket}))
		});
	}, [dispatch]);
	

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
