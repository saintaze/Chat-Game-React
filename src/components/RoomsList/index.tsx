import './styles.scss';
import { fetchRooms, joinRoom } from '../../store/slices/roomSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const RoomsList = () => {
	const dispatch = useDispatch();
	const {allRooms} = useSelector(state => state.room);
	console.log(allRooms)
	useEffect(() => {
		dispatch(fetchRooms());
	}, [dispatch])

	const handleJoinRoom = (room: any) => {
		dispatch(joinRoom({roomName: room.name}))
	}

	const renderRooms = () => {
		return allRooms.map((r: any, index: number) => (
			<li key={index} className="roomLink" onClick={e => handleJoinRoom(r)}> 
				<span className="roomName">{r.name}</span>
				<i className="fas fa-chevron-right rightChevron" />
			</li>
		))
	}

	return (
		<div className="RoomsList">
			<h2 className="heading">Choose your game room</h2>
			<ul className="roomsNav">
				{renderRooms()}
			</ul>
		</div>
	)
}

export default RoomsList
