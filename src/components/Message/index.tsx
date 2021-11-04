import React from 'react';
import { NumberMessageInterface } from '../Room';
import './styles.scss';
import { useSelector } from 'react-redux';

interface IProps {
	// message: MessageInterface,
	numberMessage: NumberMessageInterface
}

const Message: React.FC<IProps> = ({numberMessage}) => {
	// @ts-ignore
	const {userInfo} = useSelector(state => state.user);
	// @ts-ignore

	// const {lastNumber} = useSelector(state => state.chat);
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
