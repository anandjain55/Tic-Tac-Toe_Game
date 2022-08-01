
//Data
const cells = document.querySelectorAll(".cell");
const message = document.querySelector("#message");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] 
					];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running;

	
//Logic
	
initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
	running = true;
    
//UI
	message.textContent = `${currentPlayer}'s turn`;
   
}

//Logic
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }
//UI
    updateCell(this, cellIndex);
    checkWinner();
}
//Logic
function updateCell(cell, index){
      
options[index] = currentPlayer;

//UI 
cell.textContent = currentPlayer;
}

//Logic
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
//UI
    message.textContent = `${currentPlayer}'s turn`;
}

//Logic
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
//Logic + UI 
    if(roundWon){
        message.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        message.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

//Logic
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
	 running = true;
//UI
    message.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
   
}

	