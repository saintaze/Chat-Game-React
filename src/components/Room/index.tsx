import { useEffect, useState, useCallback } from 'react';
import { addNumberMessage, setNumber } from '../../store/slices/chatSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { NumberMessage } from '../../interfaces';
import Message from '../Message';
import Result from '../Result';

import './styles.scss';

enum GameState {
	WAIT = 'wait',
	PLAY = 'play',
}

const Room = () => {
	const {socket} = useAppSelector(state => state.socket);
	const {userInfo} = useAppSelector(state => state.user);
	const {joinedRoomName, metaMessages, number, numberMessages} = useAppSelector(state => state.chat);
	const dispatch = useAppDispatch();
	const [isReady, setIsReady] = useState(false);
	const [turnInfo, setTurnInfo] = useState<any>();
	const [result, setResult] = useState<any>();

	const scrollToView = (selector: string) => {
		document.querySelector(selector)?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
	}

	useEffect(() => {
		scrollToView('.Footer');
	}, [numberMessages.length])

	useEffect(() => {
		if(number === 1){
			scrollToView('.Navbar');
		}
	}, [number])

	const isMyTurn = () => {
		return (turnInfo.state === GameState.PLAY && turnInfo.user === socket?.id) || 
					 (turnInfo.state === GameState.WAIT && turnInfo.user !== socket?.id);
	}

	const isPlayerCPU = useCallback(() => {
		return joinedRoomName === 'Room Izmir CPU' || joinedRoomName === 'Room Berlin CPU';
	}, [joinedRoomName])

	const handleSelectedNumber = (selectedNumber: number) => {
		socket?.emit('sendNumber', {number, selectedNumber})
	}

	const renderMessages = () => {
		return numberMessages.map((numberMessage: NumberMessage, index: number) => <Message numberMessage={numberMessage} key={index} />)
	}

	const capitalizeName = (username: string) => {
		return username[0].toUpperCase() + username.slice(1);
	}

	const onGameOver = useCallback(({isOver, user}: any) => {
		setResult({isWinner: user === userInfo.username, isOver})
	}, [userInfo.username])

	const onRandomNumber = useCallback((payload: NumberMessage) => {
		if(isPlayerCPU()){
			setTurnInfo({state: GameState.PLAY, user: socket?.id});
		}
		if(payload.isCorrectResult === undefined){
		  dispatch(setNumber({number: +payload.number}));
			return;
		}
		if(payload.isCorrectResult && (!numberMessages.length || numberMessages[numberMessages.length - 1].number !== 1)){
			dispatch(addNumberMessage(payload))
			dispatch(setNumber({number: +payload.number}));
		}
	}, [dispatch, numberMessages, isPlayerCPU, socket])

	const onReady = useCallback(({state}: {state: boolean}) => {
		if(state){
			console.log('PLAY',  joinedRoomName)
			socket?.emit('letsPlay');
			setIsReady(true)
		}else{
			console.log('RESET')
			setIsReady(false);
			setTurnInfo(undefined);
		}
	}, [joinedRoomName, socket])
	
	const onTurn = useCallback((payload: any) => {
		setTurnInfo(payload);
	}, [])

	useEffect(() => {
		socket?.on('onReady', onReady);
		socket?.on('randomNumber', onRandomNumber);
		socket?.on('activateYourTurn', onTurn);
		socket?.on('gameOver', onGameOver);

		return () => {
			socket?.off('onReady', onReady);
			socket?.off('randomNumber', onRandomNumber);
			socket?.off('activateYourTurn', onTurn);
			socket?.off('gameOver', onGameOver);	
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




































