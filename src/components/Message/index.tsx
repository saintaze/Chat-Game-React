import './styles.scss';

const Message = ({isCurrentUser = true}) => {

	const messageSide = isCurrentUser ? 'right' : 'left';
	const avatar = <div className={`avatar ${messageSide}`}><i className="fas fa-user" /></div>;

	return (
		<div className={`Message ${messageSide}`}>
			{!isCurrentUser && avatar}
			<div className="content">
				<div className={`selectedNumber ${messageSide}`}>-1</div>
				<div className="cell">[(-1 + 19) / 3] = 6</div>
				<div className="cell">6</div>
			</div>
			{isCurrentUser && avatar}
		</div>
	)
}

export default Message
