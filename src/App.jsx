
import { useState } from "react";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [round, setRound] = useState(1);

  const checkWinner = (newBoard) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return combination;
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    const result = checkWinner(newBoard);

    if (result) {
      setWinner(currentPlayer);
      setWinningLine(result);

      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }));
    } else if (newBoard.every((cell) => cell !== "")) {
      setWinner("Draw");

      setScores((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const newGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine([]);
    setRound((prev) => prev + 1);
  };

  const resetScore = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine([]);
    setScores({ X: 0, O: 0, draws: 0 });
    setRound(1);
  };

  return (
    <main className="min-h-screen bg-[#080b18] text-white relative overflow-hidden">

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-9">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-400/20 bg-violet-500/10 text-violet-300 text-xs font-bold tracking-[3px] mb-5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            TWO PLAYER GAME
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
            TIC TAC <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">TOE</span>
          </h1>

          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Think smart. Make your move. Claim victory.
          </p>
        </header>

        {/* Main Game Card */}
        <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40 p-5 sm:p-7">

          {/* Round information */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold tracking-widest text-slate-400">
              MATCH #{String(round).padStart(2, "0")}
            </span>

            <span className="text-xs px-3 py-1.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
              ● LIVE GAME
            </span>
          </div>

          {/* Scoreboard */}
          <div className="grid grid-cols-3 gap-3 mb-7">

            <div className={`rounded-2xl p-3 text-center border transition-all duration-300 ${
              currentPlayer === "X" && !winner
                ? "bg-violet-500/15 border-violet-400/60 shadow-lg shadow-violet-500/10"
                : "bg-white/[0.03] border-white/10"
            }`}>
              <div className="text-violet-400 text-2xl font-black">X</div>
              <p className="text-[10px] text-slate-400 font-bold tracking-wider mt-1">PLAYER 1</p>
              <p className="text-3xl font-black mt-2">{scores.X}</p>
              {currentPlayer === "X" && !winner && (
                <p className="text-[9px] text-violet-300 mt-1">YOUR TURN</p>
              )}
            </div>

            <div className="rounded-2xl p-3 text-center bg-white/[0.03] border border-white/10">
              <div className="text-slate-400 text-sm font-bold mt-2">DRAWS</div>
              <p className="text-3xl font-black mt-3">{scores.draws}</p>
              <p className="text-[9px] text-slate-500 mt-2">TIED MATCHES</p>
            </div>

            <div className={`rounded-2xl p-3 text-center border transition-all duration-300 ${
              currentPlayer === "O" && !winner
                ? "bg-cyan-500/15 border-cyan-400/60 shadow-lg shadow-cyan-500/10"
                : "bg-white/[0.03] border-white/10"
            }`}>
              <div className="text-cyan-400 text-2xl font-black">O</div>
              <p className="text-[10px] text-slate-400 font-bold tracking-wider mt-1">PLAYER 2</p>
              <p className="text-3xl font-black mt-2">{scores.O}</p>
              {currentPlayer === "O" && !winner && (
                <p className="text-[9px] text-cyan-300 mt-1">YOUR TURN</p>
              )}
            </div>

          </div>

          {/* Game Status */}
          <div className="rounded-2xl bg-[#11182b] border border-white/5 p-4 mb-6 text-center">
            {winner === "Draw" ? (
              <>
                <p className="text-2xl mb-1">🤝</p>
                <h2 className="text-lg font-bold text-yellow-400">It's a Draw!</h2>
                <p className="text-xs text-slate-400 mt-1">Both players played well.</p>
              </>
            ) : winner ? (
              <>
                <p className="text-2xl mb-1">🏆</p>
                <h2 className={`text-lg font-bold ${winner === "X" ? "text-violet-400" : "text-cyan-400"}`}>
                  Player {winner} Wins!
                </h2>
                <p className="text-xs text-slate-400 mt-1">Congratulations! Amazing game.</p>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-400 mb-1">CURRENT TURN</p>
                <h2 className={`text-xl font-black ${currentPlayer === "X" ? "text-violet-400" : "text-cyan-400"}`}>
                  Player {currentPlayer}'s Move
                </h2>
              </>
            )}
          </div>

          {/* Game Board */}
          <div className="grid grid-cols-3 gap-3">

            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                disabled={Boolean(cell) || Boolean(winner)}
                aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ", empty"}`}
                className={`
                  aspect-square rounded-2xl border
                  flex items-center justify-center
                  text-5xl sm:text-6xl font-black
                  transition-all duration-200
                  ${cell === "X"
                    ? "text-violet-400 border-violet-400/30 bg-violet-500/10"
                    : cell === "O"
                    ? "text-cyan-400 border-cyan-400/30 bg-cyan-500/10"
                    : "text-white border-white/10 bg-[#11182b] hover:bg-violet-500/10 hover:border-violet-400/50 hover:scale-[1.03]"
                  }
                  ${winningLine.includes(index)
                    ? "!bg-green-500/20 !border-green-400 !text-green-400 shadow-lg shadow-green-500/10"
                    : ""
                  }
                  ${cell || winner ? "cursor-not-allowed" : "cursor-pointer"}
                  active:scale-95
                `}
              >
                {cell}
              </button>
            ))}

          </div>

          {/* Game Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-7">

            <button
              onClick={newGame}
              className="py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              ↻ New Game
            </button>

            <button
              onClick={resetScore}
              className="py-4 rounded-xl font-bold text-sm bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all hover:-translate-y-1 active:scale-95"
            >
              ⟲ Reset Score
            </button>

          </div>

          {/* Instructions */}
          <div className="mt-7 pt-5 border-t border-white/10">
            <p className="text-center text-xs text-slate-500 leading-6">
              Take turns placing X and O. Get three in a row
              horizontally, vertically, or diagonally to win!
            </p>
          </div>

        </section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            DESIGNED WITH <span className="text-violet-400">♥</span> FOR GAMERS
          </p>
          <p className="text-[10px] text-slate-600 mt-2 tracking-widest">
            TIC TAC TOE • REACT • TAILWIND CSS
          </p>
        </footer>

      </div>
    </main>
  );
}
