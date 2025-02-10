

//#region Модуль отвечающий за игровой процесс 

const xVSo = (function (doc){
    const battleField = doc.querySelector(".battleField");
    battleField.addEventListener("click",(e) => clickLocation(e))

    const zoneOfControl = doc.querySelector(".zoneOfControl");
    zoneOfControl.addEventListener("click", (e)=> {console.log(e)})

    function clickLocation (e) {
        x = Math.floor(e.offsetX/300)
        y = Math.floor(e.offsetY/300)
        boardUpdate(x,y);
        console.table(board);
        return {y,x};
    }

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
    }

    let whosTurn = Math.round(Math.random());

    return {board, whosTurn,boardUpdate, battleField}



})(document);

//#endregion
//#region Модуль Игрок

const user = (function (){
    let value = `X`;
    let name = `Player`;

})();

//#endregion
//#region Модуль Бот

const bot = (function (){

    

})();

//#endregion

//#region Модуль Раундов

const turnSys = (function (){

})();

//#endregion

//#region Модуль UI

const screenRefresher = (function (){

    

})();

//#endregion