import { useAppSelector } from '../../hooks/redux';
import lose from '../../images/lose.png';
import win from '../../images/win.png';

import './styles.scss';
// interface IProps {
// 	isWinner: boolean
// }

const Result = () => {
	const {userInfo} = useAppSelector(state => state.user);
	const {numberMessages} = useAppSelector(state => state.chat);
	const isWinner = numberMessages[numberMessages.length - 1].user === userInfo.username; 
	const resultText = isWinner ? 'You Won' : 'You Lose';
	const resultImg = isWinner ? win : lose;

	return (
		<div className="Result">
			<div className="resultBox">
				<img src={resultImg} alt="result" />
				<h2 className="resultText">{resultText}</h2>
				<button className="playAgain">New game</button>
			</div>
		</div>
	)
}

export default Result
