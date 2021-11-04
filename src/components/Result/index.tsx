import './styles.scss';
import lose from '../../images/lose.png';
import win from '../../images/win.png';
import { useSelector } from 'react-redux';
import {useEffect} from 'react';

// interface IProps {
// 	isWinner: boolean
// }

const Result = () => {
	// @ts-ignore
	const {userInfo} = useSelector(state => state.user);
	// @ts-ignore
	const {numberMessages} = useSelector(state => state.chat);
	const isWinner = numberMessages[numberMessages.length - 1].user === userInfo.username ; 
	const resultText = isWinner ? 'You Won' : 'You Lose';
	const resultImg = isWinner ? win : lose;

	return (
		<div className="Result">
			<div className="resultBox">
				<img src={resultImg} alt="result image" />
				<h2 className="resultText">{resultText}</h2>
				<button className="playAgain">New game</button>
			</div>
		</div>
	)
}

export default Result
