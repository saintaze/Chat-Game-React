import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import './styles.scss';
import Message from '../Message/index';
import Result from '../Result';
import { useSelector, useDispatch } from 'react-redux';
import { addNumberMessage, setNumber } from '../../store/slices/chatSlice';

export interface NumberMessageInterface {
	user: string,     
  number: number,
	lastNumber: number,
  selectedNumber: number,
  isFirst: boolean, 
  isCorrectResult: boolean
}

enum GameState {
	WAIT = 'wait',
	PLAY = 'play',
}

const Room = () => {
	// @ts-ignore
	const {socket} = useSelector(state => state.socket);
	// @ts-ignore
	const {userInfo} = useSelector(state => state.user);
	// @ts-ignore
	const {joinedRoomName, metaMessages, isFirst, number, lastNumber, numberMessages} = useSelector(state => state.chat);

	const dispatch = useDispatch();
	const [isReady, setIsReady] = useState(false);
	const [turnInfo, setTurnInfo] = useState<any>();
	const [result, setResult] = useState<any>();

	useEffect(() => {
		console.log('BHAO BHAO')
		document.querySelector('.Footer')?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
	}, [numberMessages.length])

	useEffect(() => {
		if(number === 1){
			console.log('BHAO BHAO')
			document.querySelector('.Navbar')?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
		}
	}, [number])

	const isMyTurn = () => {
		return (turnInfo.state === GameState.PLAY && turnInfo.user === socket.id) || 
					 (turnInfo.state === GameState.WAIT && turnInfo.user !== socket.id);
	}

	const isPlayerCPU = useCallback(() => {
		console.log('w222', joinedRoomName)
		return joinedRoomName === 'Room Izmir CPU' || joinedRoomName === 'Room Berlin CPU';
	}, [joinedRoomName])

	const handleSelectedNumber = (selectedNumber: number) => {
		socket.emit('sendNumber', {number, selectedNumber})
	}

	const renderMessages = () => {
		return numberMessages.map((numberMessage: NumberMessageInterface, index: number) => <Message numberMessage={numberMessage} key={index} />)
	}

	const capitalizeName = (username: string) => {
		return username[0].toUpperCase() + username.slice(1);
	}




	const onGameOver = useCallback(({isOver, user}: any) => {
		setResult({isWinner: user === userInfo.username, isOver})
		console.log('GAMEOVER', isOver, user, userInfo.username);
	}, [userInfo.username])

	const onRandomNumber = useCallback((payload: NumberMessageInterface) => {
		console.log('random', payload, joinedRoomName, numberMessages)
		if(isPlayerCPU()){
			console.log('1st')
			setTurnInfo({state: GameState.PLAY, user: socket.id})
		}
		if(payload.isCorrectResult === undefined){
		  dispatch(setNumber({number: +payload.number}));
			console.log('2nd')
			return;
		}
		if(payload.isCorrectResult && (!numberMessages.length || numberMessages[numberMessages.length - 1].number !== 1)){
			// console.log(payload)
			console.log('3rd', numberMessages, numberMessages[numberMessages.length - 1])
			dispatch(addNumberMessage(payload))
			dispatch(setNumber({number: +payload.number}));
			// onNumberMessage(payload)
		}
	}, [dispatch, numberMessages, isPlayerCPU, socket.id, joinedRoomName])

	const onReady = useCallback(({state}: {state: boolean}) => {
		if(state){
			console.log('PLAY',  joinedRoomName)
			socket.emit('letsPlay');
			// setIsReady(true)
		}else{
			console.log('RESET')
			setIsReady(false);
			setTurnInfo(undefined);
		}
	}, [joinedRoomName, socket])
	
	const onTurn = useCallback((payload: any) => {
		// if(number <= 1) return
		setTurnInfo(payload);
		console.log('TURN', payload)
	}, [])

	useEffect(() => {
		socket.on('onReady', onReady);
		socket.on('randomNumber', onRandomNumber);
		socket.on('activateYourTurn', onTurn);
		socket.on('gameOver', onGameOver);

		return () => {
			socket.off('onReady', onReady);
			socket.off('randomNumber', onRandomNumber);
			socket.off('activateYourTurn', onTurn);
			socket.off('gameOver', onGameOver);	
		}
	}, [socket, onGameOver, onRandomNumber, onReady, onTurn])






	return (
		<div className="Room">
			{result?.isOver && <Result />}
			{metaMessages.welcome && 
				<p className="welcomeMessage">
					<span>{capitalizeName(metaMessages.welcome.user)}</span> welcome to <span>{metaMessages.welcome.room}</span>
				</p>
			}
			{metaMessages.joined && 
				<p className="joinMessage">
					<span>{capitalizeName(metaMessages.joined.user)}</span> has joined <span>{metaMessages.joined.room}</span>
				</p>
			} 
			{number?.toString() && <p className="number">Number: <span>{number}</span></p>}
			{renderMessages()}
			{
				turnInfo && isMyTurn() && 
				<div className="answerBox" >
					<span className="answer" onClick={() => handleSelectedNumber(-1)}>-1</span>
					<span className="answer" onClick={() => handleSelectedNumber(0)}>0</span>
					<span className="answer" onClick={() => handleSelectedNumber(1)}>+1</span>
				</div>
			}
			{
				turnInfo && !isMyTurn() &&
				<p className="waitMessage">Waiting: <span>Other Player's Move</span></p>
			}
		</div>
	)
}

export default Room




































