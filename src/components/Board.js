import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Next player: ${xIsNext ? "X" : "O"}`;
	}

	return (
		<>
			<div className="status">{status}</div>
			{[0, 1, 2].map((i) => (
				<div
					className="board-row"
					key={i}
				>
					{[0, 1, 2].map((j) => (
						<Square
							key={j}
							value={squares[i * 3 + j]} // Calculate the index correctly
							onSquareClick={() => handleClick(i * 3 + j)} // Pass the correct index to handleClick
						/>
					))}
				</div>
			))}
		</>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
