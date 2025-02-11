

const zoneOfControl = document.querySelector(".zoneOfControl");


// const round = (function(){
    
// })();

//#region Модуль отвечающий за игровой процесс 

const boardG = (function (doc){

    function boardCreation () {
        let brd = [];
        for (let i = 0; i < 3; i++) {
            brd[i] = [];        
            for (let k = 0; k < 3; k++) {
                brd[i].push(2);
                
            }
        }
        return brd;  
    }
    let board = boardCreation();

    function boardUpdate (x,y,value = 0) {
        board[y][x] = value;
        console.table(boardG.board);
        game.round();
    }

    return {board,boardUpdate}



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
            console.log ("Player control ON")
        } 
        
    }
    const battleField = doc.querySelector(".battleField");
    function clickLocation (e) {
        pos.x = Math.floor(e.offsetX/300)
        pos.y = Math.floor(e.offsetY/300)
        console.log (`Игрок выбрал координаты ${pos.x+1} и ${pos.y+1}` );
        boardG.boardUpdate(pos.x,pos.y,value  )
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
        pos.x = Math.floor(Math.random() * 3)
        pos.y = Math.floor(Math.random() * 3)
        boardG.boardUpdate(pos.x,pos.y,value)
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
    console.log(`Первый ход за ${whosTurn}`)
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

    function winCheck () { 
            
    }


    return {round}

})();

//#endregion

//#region Модуль UI

const screenRefresher = (function (){

    

})();

//#endregion

const player = user;
const bot = bots;
const game = turnSys;

zoneOfControl.addEventListener("click", () => game.round());