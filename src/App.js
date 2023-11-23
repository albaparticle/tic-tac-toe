import { useState } from "react";
import Square from "./components/Square";
import Board from "./components/Board";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	const moves = history.map((squares, move) => {
		return (
			<li key={move}>
				{move == history.length - 1 ? (
					`You are at move #${move}`
				) : (
					<button onClick={() => jumpTo(move)}>
						{move === 0 ? "Go to game start" : `Go to move #${move}`}
					</button>
				)}
			</li>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
				/>
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
}
