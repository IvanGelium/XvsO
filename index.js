

//#region Модуль отвечающий за игровой процесс 

const xVSo = (function (){

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

    function boardUpdate (x,y,value) {
        board[x][y] = value;
    }

    let whosTurn = Math.round(Math.random());

    return {board, whosTurn,boardUpdate}
})();

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