"use strict";

let gameBoard = (function () {
    let currentPlayer = "X";
    let winner = undefined;
    let board = [];
    let gameBoardNode = document.querySelector(".gameboard");
    let messageNode = document.querySelector(".message");

    gameBoardNode.addEventListener("click", (e) => {
        if (e.target.className === "" && winner === undefined) {
            e.target.className = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageNode.innerHTML = `${currentPlayer} to move.`;
            checkWinDraw();
        }
    });

    function reset() {
        currentPlayer = "X";
        winner = undefined;
        board = [];

        document.querySelector(".message").innerHTML = `${currentPlayer} to move.`;

        gameBoardNode.innerHTML = "";

        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            board.push(cell);
            gameBoardNode.appendChild(cell);
        }
    }

    function checkWinDraw() {
        let winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let emptySpaceExists = false;

        for (let combination of winningCombinations) {
            let a = board[combination[0]].className;
            let b = board[combination[1]].className;
            let c = board[combination[2]].className;

            if (a === "" || b === "" || c === "") {
                emptySpaceExists = true;
                continue;
            }

            if (a === b && b === c) {
                winner = a;
                messageNode.innerHTML = `${a} wins!`;

                for (let i = 0; i < 3; i++) {
                    board[combination[i]].classList.add("highlight");
                }

                return;
            }
        }

        if (!emptySpaceExists) {
            console.log("draw");
            messageNode.innerHTML = "It's a draw.";
            winner = null;
        }
    }

    return {
        reset,
    };
})();

gameBoard.reset();

document.querySelector("button").addEventListener("click", () => gameBoard.reset());
