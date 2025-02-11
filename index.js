

const zoneOfControl = document.querySelector(".zoneOfControl");


// const round = (function(){
    
// })();

//#region Модуль отвечающий за игровой процесс 

const boardG = (function (doc){
    let takenCells = [];
    function boardCreation () {
        let brd = [];
        for (let i = 0; i < 3; i++) {
            brd[i] = [];        
            for (let k = 0; k < 3; k++) {
                brd[i].push(NaN);
                
            }
        }
        return brd;  
    }
    let board = boardCreation();

    function boardUpdate (x,y,value = 0) {
        takenCells.push([x,y]);
        console.log(takenCells);
        board[y][x] = value;
        scr.drawBoard();
        console.log(board);
        if (isWin() === "win") {alert("winnier")};
        game.round();
    }

    const isTaken = (element) => {
        let match = false;
        console.log (`Элемент ${element}`);
        for (let i = 0;i<takenCells.length;i++) {
            let k = takenCells[i];
            if (element[0] === k[0] && element[1] === k[1]) {
                match = true;
            }
        }
        if (match === true) {
            return true
        } else {return false};

    };

    function isWin () {
        let h = 0;
        let winCount = 0;
        for (let i = 0; i <3; i++) {
            h=0;
            winCount = 0;
            for (let k = 0; k < 3; k++) {
                if (board[i][h] === board[i][k]) {
                    winCount++;
                }
                if (winCount === 3) {return "win"};
            }

            h++;
        }


        for (let i = 0; i <3; i++) {
            h=0;
            winCount = 0;
            for (let k = 0; k < 3; k++) {
                if (board[h][i] === board[k][i]) {
                    winCount++;
                }
                if (winCount === 3) {return "win"};
            }

            h++;
        }
        winCount =0;
        for (let i = 0; i < 3; i++) {
            if (board[0][0] === board[i][i]) {
                winCount++;
            }
            // console.log (`Эталон ${board[0][0]}`);
            // console.log (`'Экземляр ${board[i][i]}`);
            // console.log (board[0][0] === board[i][i]);
            // console.log(winCount);
            if (winCount === 3) {return "win"};
            
        }

        if (board[1][1] === board[0][2] && board[1][1] === board[2][0]) {return "win"};


        return "not win";
    }

    return {
        getBoard: () => board,
        boardUpdate,
        isTaken,
        isWin
    }



})(document);

//#endregion
//#region Модуль Игрок

const user = (function (doc){
    let value = `X`;
    let name = `Player`;
    let pos = {x:0,y:0};
    let isTurn = -1  ;
    const turnRele = function () {
        console.log (`Ходит ${name}`);
        isTurn *= -1;
        if (isTurn === 1) {
            battleField.addEventListener("click", clickLocation);
        } 
        
    }
    const battleField = doc.querySelector(".battleField");
    function clickLocation (e) {
        pos.x = Math.floor(e.offsetX/300)
        pos.y = Math.floor(e.offsetY/300)
        console.log (`Игрок выбрал координаты ${pos.x+1} и ${pos.y+1}` );
        boardOb.boardUpdate(pos.x,pos.y,value  )
    }

    return {
        getName: () => name,
        getValue: () => value,
        getPos: () => pos,
        getIsTurn: () => isTurn,
        turnRele
    } 
})(document);

//#endregion
//#region Модуль Бот

const bots = (function (){
    let value = `O`;
    let name = `Bot`;
    let pos = {x:0,y:0};

    const botPlace = () => {
        //placeholder
        console.log (`Ходит ${name}`);
        do {pos.x = Math.floor(Math.random() * 3)
            pos.y = Math.floor(Math.random() * 3)
            console.log(`Бот думает ${[pos.x,pos.y]}`)
            if (boardOb.getBoard().flat().includes(2) !== true) {break}
        } while (boardOb.isTaken([pos.y,pos.x]))

        boardOb.boardUpdate(pos.x,pos.y,value)
    }
    
    return {
        getName: () => name,
        getValue: () => value,
        getPos: () => pos,
        botPlace
    }

})();

//#endregion

//#region Модуль Раундов

const turnSys = (function (){
    zoneOfControl.removeEventListener("click", () => game.round());
    let isWin;
    let whosTurn = Math.round(Math.random());
    let counter = 0;
    // console.log(`Первый ход за ${whosTurn}`)
    const round = () => {
        console.log (`Начинается раунд ${counter}` );
        counter++;
        flipTurn();
        console.log (whosTurn);
        if (whosTurn === 1) {
            player.turnRele();
        }

        if (whosTurn === 0) {
            bot.botPlace();
        }

    }

    function flipTurn () {
        if (whosTurn === 0) { whosTurn = 1;return}
        if (whosTurn === 1) { whosTurn = 0;return}
    }


    return {round}

})();

//#endregion

//#region Модуль UI

const screenRefresher = (function (doc){

    const gridList = doc.querySelectorAll(".grid-obj");
    function drawBoard () {
        for (let i = 0; i < 9; i++) {
            if (typeof boardOb.getBoard().flat()[i] !== "number") {
                gridList[i].firstElementChild.textContent = boardOb.getBoard().flat()[i];
            }
            if (typeof boardOb.getBoard().flat()[i] === "number") {
                gridList[i].firstElementChild.textContent = "";
            }

            
        }
    }


    return {drawBoard}
    

})(document);

//#endregion

const player = user;
const bot = bots;
const boardOb = boardG;
const game = turnSys;
const scr = screenRefresher;

zoneOfControl.addEventListener("click", () => game.round());