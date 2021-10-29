import './styles.scss';

const rooms = [
	{
		name: 'Berlin CPU',
	},
	{
		name: 'Amsterdam CPU'
	},
	{
		name: 'Sabrican'
	}
]


const RoomsList = () => {

	const renderRooms = () => {
		return rooms.map(r => (
			<li className="roomLink"> 
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
