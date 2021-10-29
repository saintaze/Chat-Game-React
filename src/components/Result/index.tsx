import './styles.scss';
import lose from '../../images/lose.png';
import win from '../../images/win.png';

const Result = () => {
	const resultText = true ? 'You Won' : 'You Lose';
	const resultImg = true ? win : lose;

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
