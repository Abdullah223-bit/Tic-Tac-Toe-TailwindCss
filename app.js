// import confetti from "canvas-confetti";

let boxes = document.querySelectorAll(".box");
let resestBtn = document.querySelector("#reset-btn"); 
let newtBtn = document.querySelector("#new-btn"); 
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");

let turnO = true; //playerX, playerO
container.classList.remove("hide");
resestBtn.classList.remove("hide");
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () =>
{
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    resestBtn.classList.remove("hide");
}   

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO)
        {
            box.innerHTML = "O";
            turnO = false;
        }
        else
        {
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBox = () => 
{
    for(let box of boxes)
    {
        box.disabled = true;
    }
}; 

const enableBox = () => 
    {
        for(let box of boxes)
        {
            box.disabled = false;
            box.innerText = "";
        }
    }; 

const showWinner = (winner) =>
{
    msg.innerText = `Congratulations. Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();

    confetti(
        {
            particleCount: 150,
            speed: 70,
            origin: { y: 0.6 },
        }
    );

     // Optional: Keep confetti going for a while
    let duration = 2000;
    let animationEnd = Date.now() + duration;

    (function frame() {
        confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        });
        confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        });

        if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
        }
    })();
};

const checkWinner = () =>
{
    for(let pattern of winPatterns)
    {
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;  

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val === pos2Val && pos2Val === pos3Val)
            {
                container.classList.add("hide");
                resestBtn.classList.add("hide");
                showWinner(pos1Val);
            }
        }
    }
};


newtBtn.addEventListener("click", resetGame);
resestBtn.addEventListener("click", resetGame);