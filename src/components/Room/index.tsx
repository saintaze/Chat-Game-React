import './styles.scss';
import Message from '../Message/index';
import Result from '../Result';

const Room = () => {
	return (
		<div className="Room">
			<Result />
			<Message isCurrentUser={false}/>
			<Message isCurrentUser={true}/>
			<Message isCurrentUser={false}/>
			<Message isCurrentUser={true}/>
			<div className="answerBox">
				<span className="answer">-1</span>
				<span className="answer">0</span>
				<span className="answer">+1</span>
			</div>
		</div>
	)
}

export default Room
