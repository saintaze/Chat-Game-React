import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { NumberMessage } from '../../interfaces';

import './styles.scss';
interface IProps {
	numberMessage: NumberMessage;
}

const Message: React.FC<IProps> = ({numberMessage}) => {
	const {userInfo} = useAppSelector(state => state.user);
	const isMessageSender = numberMessage.user === userInfo.username;
	const messageSide = isMessageSender ? 'right' : 'left';
	const avatar = <div className={`avatar ${messageSide}`}><i className="fas fa-user" /></div>;
	
	return (
		<div className={`Message ${messageSide}`}>
			{!isMessageSender && avatar}
			<div className="content">
				<div className={`selectedNumber ${messageSide}`}>{numberMessage.selectedNumber}</div>
				<div className="cell">[({numberMessage.selectedNumber} + {numberMessage.lastNumber}) / 3] = {numberMessage.number}</div>
				<div className="cell">{numberMessage.number}</div>
			</div>
			{isMessageSender && avatar}
		</div>
	)
}

export default Message
