import { useEffect, useLayoutEffect, useState } from 'react';
import './styles.scss';
import Message from '../Message/index';
import Result from '../Result';
import { useSelector, useDispatch } from 'react-redux';
import { addNumberMessage, setNumber } from '../../store/slices/chatSlice';

export interface NumberMessageInterface {
	user: string,     
  number: number,
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
	const {allRooms} = useSelector(state => state.room);
	// @ts-ignore
	const {joinedRoomName, metaMessages, isFirst, number, lastNumber, numberMessages} = useSelector(state => state.chat);

	const dispatch = useDispatch();
	const [isReady, setIsReady] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState<number | undefined>();
	const [turnInfo, setTurnInfo] = useState<any>();
	const [roomType, setRoomType] = useState('');


	const onNumberMessage = (message: NumberMessageInterface) => {
		// console.log('ROOM', message);
		dispatch(addNumberMessage(message))
	}

	useLayoutEffect(() => {
		console.log('BHARWAY')
		if(isReady && joinedRoomName){
			console.log('BHARWAY inside', joinedRoomName)

			socket.emit('letsPlay');
		}
	}, [isReady, joinedRoomName])

	const isPlayerCPU = (roomName: string) =>{
		console.log('w222', roomName, joinedRoomName)
		return roomName === 'Room Izmir CPU' || roomName === 'Room Berlin CPU';
	}
	// @ts-ignore
	const onRandomNumber = (payload: NumberMessageInterface) => {
		console.log('random', payload, joinedRoomName, '3e32')
		// if(isPlayerCPU(joinedRoomName)){
		// 	console.log('1st')
		// 	setTurnInfo(true)
		// }
		if(isPlayerCPU(joinedRoomName)){
			console.log('1st')
			setTurnInfo({state: GameState.PLAY, user: socket.id})
		}
		if(payload.isCorrectResult === undefined){
		  dispatch(setNumber({number: +payload.number}));
			console.log('2nd')

			return;
		}
		if(payload.isCorrectResult){
			// console.log(payload)
			console.log('3rd')

			dispatch(setNumber({number: +payload.number}));
			// onNumberMessage(payload)
			dispatch(addNumberMessage(payload))
		}
	}


	

	const onReady = ({state}: {state: boolean}) => {
		if(state){
			console.log('PLAY',  joinedRoomName)
			// socket.emit('letsPlay');
			setIsReady(true)
		}else{
			console.log('RESET')

			setIsReady(false);
			setSelectedNumber(undefined);
			setTurnInfo(undefined);
		}
		// setIsReady(state)
		// console.log('onReady', state);
	}

	const onTurn = (payload: any) => {
		setTurnInfo(payload);
		console.log('TURN', payload)
	}

	const isMyTurn = () => {
		return turnInfo.state === GameState.PLAY && turnInfo.user === socket.id || turnInfo.state === GameState.WAIT && turnInfo.user !== socket.id;
	}

	useEffect(() => {
		// console.log(number, selectedNumber)
		if(selectedNumber !== undefined){
			socket.emit('sendNumber', {number, selectedNumber})
		}
		setSelectedNumber(undefined);
	}, [selectedNumber])

	// useEffect(() => {
	// 	console.log('first && ready', isFirst, isReady)
	// 	if(isFirst && isReady) {
	// 		// console.log(isFirst, isReady)
 	// 		socket.emit('letsPlay');
	// 	} 
	// 	// else{		
	// 	// 	// console.log('I MA IN')
	// 	// 	setIsReady(false);
	// 	// 	setSelectedNumber(undefined);
	// 	// 	setTurnInfo(undefined);
	// 	// }
	// }, [isFirst, isReady])

	

	useEffect(() => {
		socket.on('onReady', onReady);
		socket.on('randomNumber', onRandomNumber);
		socket.on('activateYourTurn', onTurn);

		return () => {
			socket.on('onReady', onReady);
			socket.off('randomNumber', onRandomNumber);
			socket.off('activateYourTurn', onTurn);
		}
	}, [])


	const renderMessages = () => {
		return numberMessages.map((numberMessage: NumberMessageInterface, index: number) => <Message numberMessage={numberMessage} key={index}/>)
	}

	const getUserName = (username: string) => {
		return username[0].toUpperCase() + username.slice(1);
	}


	return (
		<div className="Room">
			{/* {!!messages.length && ( */}
				<>
					{number === 1 && <Result />}
					{metaMessages.welcome && 
						<p className="welcomeMessage"><span>{getUserName(metaMessages.welcome.user)}</span> welcome to <span>{metaMessages.welcome.room}</span></p>
					}
					{metaMessages.joined && 
						<p className="joinMessage"><span>{getUserName(metaMessages.joined.user)}</span> has joined <span>{metaMessages.joined.room}</span></p>
					} 
					{number && <p className="number">Number: <span>{number}</span></p>}
					{renderMessages()}
					{
						turnInfo && isMyTurn() && 
						<div className="answerBox">
							<span className="answer" onClick={() => setSelectedNumber(-1)}>-1</span>
							<span className="answer" onClick={() => setSelectedNumber(0)}>0</span>
							<span className="answer" onClick={() => setSelectedNumber(1)}>+1</span>
						</div>
					}
					{
						turnInfo && !isMyTurn() &&
						<p className="waitMessage">Waiting: <span>Other Player's Move</span></p>
					}
				</>
			{/* )} */}
		</div>
	)
}

export default Room









































// import { useEffect, useState } from 'react';
// import './styles.scss';
// import Message from '../Message/index';
// import Result from '../Result';
// import { useSelector, useDispatch } from 'react-redux';
// import { addNumberMessage, setNumber } from '../../store/slices/chatSlice';



// export interface NumberMessageInterface {
// 	user: string,     
//   number: number,
//   selectedNumber: number,
//   isFirst: boolean, 
//   isCorrectResult: boolean
// }

// enum GameState {
// 	WAIT = 'wait',
// 	PLAY = 'play',
// }

// const Room = () => {
	
	
// 	// @ts-ignore
// 	const {socket} = useSelector(state => state.socket);
// 	// @ts-ignore
// 	const {allRooms} = useSelector(state => state.room);
// 	// @ts-ignore
// 	const {joinedRoomName, metaMessages, isFirst, number, lastNumber, numberMessages} = useSelector(state => state.chat);

// 	const dispatch = useDispatch();
// 	const [isReady, setIsReady] = useState(false);
// 	const [selectedNumber, setSelectedNumber] = useState<number | undefined>();
// 	const [turnInfo, setTurnInfo] = useState<any>();
// 	const [isMyTurn, setIsMyTurn] = useState(false);


// 	const onNumberMessage = (message: NumberMessageInterface) => {
// 		// console.log('ROOM', message);
// 		dispatch(addNumberMessage(message))
// 	}

// 	const isPlayerCPU = (roomName: string) =>{
// 		return roomName === 'Room Izmir CPU' || roomName === 'Room Berlin CPU';
// 	}
// 	// @ts-ignore
// 	const onRandomNumber = (payload: NumberMessageInterface) => {
// 		console.log('random', payload, joinedRoomName, '3e32')
// 		// if(isPlayerCPU(joinedRoomName)){
// 		// 	console.log('1st')
// 		// 	setTurnInfo(true)
// 		// }
// 		// if(payload.isFirst){
// 		// 	// console.log('1st')
// 		// 	setTurnInfo(true)
// 		// }
// 		if(payload.isCorrectResult === undefined){
// 		  dispatch(setNumber({number: +payload.number}));
// 			console.log('2nd')

// 			return;
// 		}
// 		if(payload.isCorrectResult){
// 			// console.log(payload)
// 			console.log('3rd')

// 			dispatch(setNumber({number: +payload.number}));
// 			// onNumberMessage(payload)
// 			dispatch(addNumberMessage(payload))
// 		}
// 	}


	

// 	const onReady = ({state}: {state: boolean}) => {
// 		if(state){
// 			console.log('PLAY',  joinedRoomName)
// 			socket.emit('letsPlay');
// 		}else{
// 			console.log('RESET')

// 			setIsReady(false);
// 			setSelectedNumber(undefined);
// 			setTurnInfo(undefined);
// 		}
// 		// setIsReady(state)
// 		// console.log('onReady', state);
// 	}

// 	const onTurn = (payload: any) => {
// 		// setTurnInfo(payload);
// 		console.log('TURN', payload)

// 		// setIsMyTurn(payload.)
// 	}

// 	// const isMyTurn = () => {
// 	// 	return turnInfo.state === GameState.PLAY && turnInfo.user === socket.id || turnInfo.state === GameState.WAIT && turnInfo.user !== socket.id;
// 	// }

// 	useEffect(() => {
// 		// console.log(number, selectedNumber)
// 		if(selectedNumber !== undefined){
// 			socket.emit('sendNumber', {number, selectedNumber})
// 		}
// 		setSelectedNumber(undefined);
// 	}, [selectedNumber])

// 	// useEffect(() => {
// 	// 	console.log('first && ready', isFirst, isReady)
// 	// 	if(isFirst && isReady) {
// 	// 		// console.log(isFirst, isReady)
//  	// 		socket.emit('letsPlay');
// 	// 	} 
// 	// 	// else{		
// 	// 	// 	// console.log('I MA IN')
// 	// 	// 	setIsReady(false);
// 	// 	// 	setSelectedNumber(undefined);
// 	// 	// 	setTurnInfo(undefined);
// 	// 	// }
// 	// }, [isFirst, isReady])

	

// 	useEffect(() => {
// 		socket.on('onReady', onReady);
// 		socket.on('randomNumber', onRandomNumber);
// 		socket.on('activateYourTurn', onTurn);

// 		return () => {
// 			socket.on('onReady', onReady);
// 			socket.off('randomNumber', onRandomNumber);
// 			socket.off('activateYourTurn', onTurn);
// 		}
// 	}, [])


// 	const renderMessages = () => {
// 		return numberMessages.map((numberMessage: NumberMessageInterface, index: number) => <Message numberMessage={numberMessage} key={index}/>)
// 	}

// 	const getUserName = (username: string) => {
// 		return username[0].toUpperCase() + username.slice(1);
// 	}


// 	return (
// 		<div className="Room">
// 			{/* {!!messages.length && ( */}
// 				<>
// 					{number === 1 && <Result />}
// 					{metaMessages.welcome && 
// 						<p className="welcomeMessage"><span>{getUserName(metaMessages.welcome.user)}</span> welcome to <span>{metaMessages.welcome.room}</span></p>
// 					}
// 					{metaMessages.joined && 
// 						<p className="joinMessage"><span>{getUserName(metaMessages.joined.user)}</span> has joined <span>{metaMessages.joined.room}</span></p>
// 					} 
// 					{number && <p className="number">Number: <span>{number}</span></p>}
// 					{renderMessages()}
// 					{
// 						turnInfo && isMyTurn() && 
// 						<div className="answerBox">
// 							<span className="answer" onClick={() => setSelectedNumber(-1)}>-1</span>
// 							<span className="answer" onClick={() => setSelectedNumber(0)}>0</span>
// 							<span className="answer" onClick={() => setSelectedNumber(1)}>+1</span>
// 						</div>
// 					}
// 					{
// 						turnInfo && !isMyTurn() &&
// 						<p className="waitMessage">Waiting: <span>Other Player's Move</span></p>
// 					}
// 				</>
// 			{/* )} */}
// 		</div>
// 	)
// }

// export default Room
