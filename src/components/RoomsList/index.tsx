import './styles.scss';
import { fetchRooms } from '../../store/slices/roomSlice';
import { joinRoom } from '../../store/slices/chatSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetChat, setMetaMessage } from '../../store/slices/chatSlice';


export interface MessageInterface {
	user: string, 
	socketId: string,
	message: string, 
	room: string,
	type: string
}

const RoomsList = () => {
	const dispatch = useDispatch();
	// @ts-ignore
	const {userInfo} = useSelector(state => state.user);
	// @ts-ignore
	const {joinedRoomName} = useSelector(state => state.chat);
	// @ts-ignore
	const {allRooms} = useSelector(state => state.room);
	// @ts-ignore
	const {socket} = useSelector(state => state.socket);


	useEffect(() => {
		dispatch(fetchRooms());
	}, [dispatch])

	useEffect(() => {
		socket.on('message', onMessage);
		return () => socket.off('message', onMessage)
	}, [])

	const onMessage = (message: MessageInterface) => {
		// console.log('ROOM', message);
		if(message.room) dispatch(setMetaMessage(message));
	}

	const handleJoinRoom = (room: any) => {
		if(room.name === joinedRoomName) return;
		if(joinedRoomName && joinedRoomName !== room.name){
			socket.emit('leaveRoom');
			dispatch(resetChat());
		}
		socket.emit('joinRoom', {username: userInfo.username, room: room.name, roomType: room.type})
	}

	const renderRooms = () => {
		return allRooms.map((room: any, index: number) => (
			<li key={index} className={`roomLink ${room.name === joinedRoomName && 'active'}`} onClick={() => handleJoinRoom(room)}> 
				<span className="roomName">{room.name}</span>
				<i className="fas fa-chevron-right rightChevron" />
			</li>
		))
	}

	return (
		<div className="RoomsList">
			{userInfo.username ? (
				<>
					<h2 className="heading">Choose your game room</h2>
					<ul className="roomsNav">
						{renderRooms()}
					</ul>
				</>
			) : 
				<h2 className="heading">Please login to view rooms</h2>
			}
		</div>
	)
}

export default RoomsList
