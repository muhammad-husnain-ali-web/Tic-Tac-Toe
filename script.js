let xop = document.querySelector(".Xop");
let Oop = document.querySelector(".oop");
let header = document.querySelector(".choise")
let tic = document.querySelector(".tic-tac-toe")
let xchange = document.querySelector(".xsvg");
let ochange = document.querySelector(".osvg");
xop.classList.add("Xbtn");
Oop.classList.add("Obtn");
let choice = "O";

xop.addEventListener("click", (e)=>{
    if(choice === "O")
    {
        xop.classList.remove("Xbtn");
    xop.classList.add("Obtn");
    Oop.classList.remove("Obtn");
    Oop.classList.add("Xbtn");

    choice = e.currentTarget.dataset.data;
    xchange.src = "xback.svg"
    ochange.src = "ofront.svg"
    console.log(choice)
    }
})
Oop.addEventListener("click", (e)=>{
    if(choice === "X")
    {
        Oop.classList.add("Obtn");
    Oop.classList.remove("Xbtn");
    xop.classList.add("Xbtn");
    xop.classList.remove("Obtn");

    choice = e.currentTarget.dataset.data;
    xchange.src = "xfront.svg"
    ochange.src = "oback.svg"
    console.log(choice)
    }
})


let cells = document.querySelectorAll(".cells");
let msg = document.querySelector(".confirematin");
let inp = document.querySelector(".in")
let next = document.querySelector(".nround");
let resetBtn = document.querySelector(".restart")
let xyou = document.querySelector(".xyou")
let t_ties = document.querySelector(".ties")
let xcpu = document.querySelector(".ocpu")
let turn = document.querySelector(".take");
let trn = document.querySelector(".turn");
let q = document.querySelector(".quit");

let buttons = Array(9).fill(null);
let isWininner = false;
let userTurn = true;
let turn1 = true;
let count = 0;
let you = 0;
let comm = 0;
let ties = 0;
let comp = null;
let player1 = null;
let player2 = null;
let wP1 = null;
let wP2 = null;
let winMsg = null;
let loseMsg = null;

let c=null;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

function resultShow()
{
    if(choice === "X")
    {
        xyou.classList.add("xcolor")
        xcpu.classList.add("ocolor");
        xyou.innerHTML= `<div>${wP1}</div>
                    <div>${you}</div>`
        xcpu.innerHTML =`<div>${wP2}</div>
                    <div>${comm}</div>`
    }
    else
    {
        xyou.classList.add("ocolor")
        xcpu.classList.add("xcolor");
        xyou.innerHTML= `<div>${wP1.replace("X", "O")}</div>
                    <div>${you}</div>`
        xcpu.innerHTML =`<div>${wP2.replace("O", "X")}</div>
                    <div>${comm}</div>`
    }
    t_ties.innerHTML = `<div>TIES</div>
                <div>${ties}</div>`
}

function laoding(whose)
    {
        turn.innerHTML= `${whose} taken turn
            <span class="dot dot1"></span>
            <span class="dot dot2"></span>
            <span class="dot dot3"></span>`;
        trn.innerText = whose + " Turn";
    }

function quitBack(){
    location.reload(true);
}
const enableButtons = ()=>{
    for (let cell of cells)
    {
        cell.disabled = false;
        cell.innerHTML = "";
    }
}

function nextRound()
{
    msg.classList.add("hidden");

    gameReset();
}

function gameReset()
{
    turn1 = true;
    userTurn = true
    enableButtons();
    count = 0;
    buttons = Array(9).fill(null);
    console.log(buttons)
    if(player2 === "X")
    {
        turn1 = false;
    }
    if(comp === "X")
    {
        userTurn = false;
        laoding(comp)
        setTimeout(computerMove, 3000);
    }
    console.log(userTurn)
}

function scoreBoard()
{
    resultShow();
}

function msgInfo(color, msg, who)
{
    inp.innerHTML =`<div class="winner">${msg}</div>
                <div class="${color}round">${who}</div>`
            next.classList.add(`${color}con2`)
}

function gameDraw()
{
    ties++;
    msg.classList.remove("hidden");
    msgInfo("" , "GAME DRAW", "NONE OF YOU WIN")
    scoreBoard();
}

function showWinner(winner)
{
    ties++;
    msg.classList.remove("hidden");

    if(winner.includes("x.svg") && choice === "X")
    {
        msgInfo("x" , winMsg, "X TAKES THE ROUND")
        
        you++;
    }
    else if(winner.includes("o.svg") && choice === "O")
    {
        msgInfo("o" , winMsg, "O TAKES THE ROUND")
        you++;
    }
    else if(winner.includes("x.svg") && choice != "X")
    {
        msgInfo("x" , loseMsg, "X TAKES THE ROUND")
        comm++;
    }
    else
    {
        msgInfo("o" , loseMsg, "O TAKES THE ROUND")
        comm++;
    }
    scoreBoard();
}

const diabeleButtons = ()=>{
    for (let cell of cells)
    {
        cell.disabled = true;
    }
}
function checkWinner(){
    console.log("chek wiineer")
    for(let pattern of winPatterns)
    {
        let pos1 = cells[pattern[0]].innerHTML;
        let pos2 = cells[pattern[1]].innerHTML;
        let pos3 = cells[pattern[2]].innerHTML;
        if(pos1 != "" && pos2 != "" && pos3 !="")
        {
            if(pos1===pos2 && pos2===pos3)
            {
                diabeleButtons();
                showWinner(pos1)
                return true;
            }
        }
    }
    return false;
}

function buttonWrite(btn, text){
    if(text === "X")
    {
        btn.innerHTML = `<img src="x.svg" alt="">`
    }
    else
    {
        btn.innerHTML = `<img src="o.svg" alt="">`
    }
    count++;

    btn.disabled = true;
}

function computerMove(){
    const emptyindex = [];
    for(i=0; i<buttons.length; i++)
    {
        if(buttons[i]=== null)
        {
            emptyindex.push(i);
        }
    }
    const randindex = emptyindex[Math.floor(Math.random()*emptyindex.length)]
    buttons[randindex] = comp;

    const cell = document.querySelector(`button[data-index= '${randindex}']`);
    buttonWrite(cell, comp)
    userTurn = true
    let isWininner = checkWinner();
    if(count===9 && !isWininner)
    {
        gameDraw();
    }
    laoding(choice)
}
function userClick(e){
    console.log("clicked buttons")
    const index = e.target.dataset.index;
    console.log(userTurn)
    if(buttons[index] !==null || !userTurn)
    {
        return;
    }
    buttons[index] = choice;
    laoding(choice)
    buttonWrite(e.target, choice)
    userTurn = false;
    isWininner = checkWinner();
    console.log(isWininner)
    if(count===9 && !isWininner)
    {
        gameDraw();
    }
    if(isWininner === false)
    {
        laoding(comp)
        setTimeout(computerMove, 3000);
    }

}

function FindWho(wP11, wP22, winMsg1, loseMsg1){
    header.classList.add("hidden");
    tic.classList.remove("hidden");
    wP1 = wP11;
    wP2 = wP22;
    winMsg = winMsg1;
    loseMsg = loseMsg1;
}

// click cpu game
let computer = document.querySelector(".comp");
computer.addEventListener("click", (e)=>{

    FindWho("X(YOU)", "O(CPU)", "YOU WON!", "YOU LOSE!");

    if(choice === "X")
    {
        comp = "O";
    }
    else
    {
        comp = "X";
    }
    resultShow();
    if(comp === "X")
    {
        laoding(comp)
        console.log("com move")
        userTurn = false;
        setTimeout(computerMove, 3000);
    }

    Array.from(cells).forEach((cell)=>{
        cell.addEventListener("click", userClick);
    })
})

function userClickPlayer(e){

    if(!turn1)
    {
        buttonWrite(e.target, player2)
        laoding(player1)
        turn1 = true;
    }
    else
    {
        buttonWrite(e.target, player1)
        laoding(player2)
        turn1 = false;
    }

    isWininner = checkWinner();
    if(count===9 && !isWininner)
    {
        gameDraw();
    }

}

let plyer = document.querySelector(".player");
plyer.addEventListener("click", (e)=>{

    FindWho("Player1", "Player2", "PLAYER1 WON!", "PLAYER2 WON!");

    player1 = choice
    if(player1 === "X")
    {
        player2 = "O";
    }
    else
    {
        player2 = "X";
    }
    resultShow();
    if(player2 === "X")
    {
        laoding(player2);
        turn1 = false;
    }
    else
    {
        laoding(player1)
    }

    Array.from(cells).forEach((cell)=>{
        cell.addEventListener("click", userClickPlayer);
    })

})

resetBtn.addEventListener("click", gameReset);
next.addEventListener("click", nextRound);
q.addEventListener("click", quitBack);
