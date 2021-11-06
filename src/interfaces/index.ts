export interface Room {
	id: string;
	name: string;
	owner: string;
	type: string;
}

export interface NumberMessage {
	user: string;     
  number: number;
	lastNumber: number | null;
  selectedNumber: number;
  isFirst: boolean; 
  isCorrectResult: boolean;
}

export interface MetaMessage {
	user: string; 
	message: string;
	socketId: string;
	room: string;
}

export interface Message {
	user: string;
	socketId: string;
	message: string;
	room: string;
	type: string;
}

export interface ResultI {
	isWinner: boolean;
	isOver: boolean;
}
export interface ActiveTurn {
	state: string;
	user: string | undefined;
}

