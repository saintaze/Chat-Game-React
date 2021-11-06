import { useEffect, useCallback } from 'react';
import { resetChat, setMetaMessage } from '../../store/slices/chatSlice';
import { fetchRooms } from '../../store/slices/roomSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Message, Room } from '../../interfaces';

import './styles.scss';


const RoomsList = () => {
	const dispatch = useAppDispatch();
	const {userInfo} = useAppSelector(state => state.user);
	const {joinedRoomName} = useAppSelector(state => state.chat);
	const {allRooms} = useAppSelector(state => state.room);
	const {socket} = useAppSelector(state => state.socket);

	useEffect(() => {
		dispatch(fetchRooms());
	}, [dispatch])

	const onMessage = useCallback((message: Message) => {
		if(message.room) dispatch(setMetaMessage(message));
	}, [dispatch])
	

	useEffect(() => {
		socket?.on('message', onMessage);
		return () => {
			socket?.off('message', onMessage)
		}
	}, [onMessage, socket])


	const handleJoinRoom = (room: Room) => {
		if(room.name === joinedRoomName) return;
		if(joinedRoomName && joinedRoomName !== room.name){
			socket?.emit('leaveRoom');
			dispatch(resetChat());
		}
		socket?.emit('joinRoom', {username: userInfo.username, room: room.name, roomType: room.type})
	}

	const renderRooms = () => {
		return allRooms.map((room, index: number) => (
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
