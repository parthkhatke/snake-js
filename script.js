const board = document.querySelector(".board");
const scoreboard=document.getElementById("score")
const highscoreboard=document.getElementById("high-score")
const start=document.getElementById("btn-start");
const startBackground=document.querySelector(".start")
const startEndBackground=document.querySelector(".gameStart-end")
const endBackgroud=document.querySelector(".end");
const restartBtn=document.getElementById("btn-restart");
const blockWidth = 50;
const blockHeight = 50;

// Mobile / controls
const btnUp = document.getElementById("btn-up");
const btnDown = document.getElementById("btn-down");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

// `setDirection` removed: inputs now assign `direction` directly to allow reversing.

//array
const blocks = [];

//get number of row and col
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

//snake direction
let direction="down";
let score=0;
let highScore=localStorage.getItem("highscore") || 0
highscoreboard.innerText=highScore;
//food object 
let food = { x:Math.floor(Math.random()*rows),
             y:Math.floor(Math.random()*cols) }
             
let snake = [
  {
    x: rows%2===0?Math.floor(rows/2):Math.floor(rows/2)-1,
    y: cols%2==0?Math.floor(cols/2):Math.floor(cols/2)-1,
  },

];

//create board
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
   
  }
}


function renderSnake()
{
    blocks[`${food.x}-${food.y}`].classList.add("food")
    let head = direction==="left" ?{x:snake[0].x, y:snake[0].y-1} : 
               direction==="right"?{x:snake[0].x, y:snake[0].y+1} :
               direction==="up"   ?{x:snake[0].x-1, y:snake[0].y} :
                                   {x:snake[0].x+1, y:snake[0].y} ;

    //over logic
    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols)
    {
      clearInterval(interval);

      startEndBackground.style.display="flex"
      startBackground.style.display="none"
      endBackgroud.style.display="flex"
      return
    }

    //food eat logic + score board
    if(head.x == food.x && head.y == food.y)
      {
        //remove food
        blocks[`${food.x}-${food.y}`].classList.remove("food") 
        //food spawn
        food = { x:Math.floor(Math.random()*rows),
          y:Math.floor(Math.random()*cols) }
          blocks[`${food.x}-${food.y}`].classList.add("food") 
          //snake +1
          snake.unshift(head);
          
          scoreboard.innerHTML=++score;
          if(highScore<score)
            {
              highScore=score;
              localStorage.setItem("highscore",highScore)
               highscoreboard.innerText=highScore;
            }
          
      }

    snake.forEach( body => 
    {
       blocks[`${body.x}-${body.y}`].classList.remove("fill");
        
    })
    snake.unshift(head) ;
    snake.pop();    

    snake.forEach( body => 
    {
       blocks[`${body.x}-${body.y}`].classList.add("fill");
       
    }
    )
 
}


//rendersnake every 3ms 
let interval=null;

start.addEventListener('click',()=>
  {
    startEndBackground.style.display="none"
    interval=setInterval(()=>
    {
    renderSnake();
    },300)
  })
restartBtn.addEventListener('click',restart);

function restart()
{
  clearInterval(interval);
  score=0;
  scoreboard.innerText=score
  blocks[`${food.x}-${food.y}`].classList.remove("food") 
  direction="down";
  snake.forEach( body => 
    {
       blocks[`${body.x}-${body.y}`]?.classList.remove("fill");
        
    })
  startEndBackground.style.display = "none";
  endBackgroud.style.display = "none";
  snake = [
  {
    x: rows%2===0?Math.floor(rows/2):Math.floor(rows/2)-1,
    y: cols%2==0?Math.floor(cols/2):Math.floor(cols/2)-1,
  },];
  food = { x:Math.floor(Math.random()*rows),
             y:Math.floor(Math.random()*cols) }
  interval=setInterval(()=>
    {
    renderSnake();
    },300)

}

addEventListener('keydown', (event)=>
{
  switch (event.key) {
    case 'ArrowUp':    direction = "up";    break;
    case 'ArrowDown':  direction = "down";  break;
    case 'ArrowRight': direction = "right"; break;
    case 'ArrowLeft':  direction = "left";  break;
  }
})

// Button listeners (touch and click)

btnUp?.addEventListener('touchstart', (e)=>{ e.preventDefault(); direction = 'up'; }, {passive:false});
btnDown?.addEventListener('touchstart', (e)=>{ e.preventDefault(); direction = 'down'; }, {passive:false});
btnLeft?.addEventListener('touchstart', (e)=>{ e.preventDefault(); direction = 'left'; }, {passive:false});
btnRight?.addEventListener('touchstart', (e)=>{ e.preventDefault(); direction = 'right'; }, {passive:false});

btnUp?.addEventListener('click', ()=> direction = 'up');
btnDown?.addEventListener('click', ()=> direction = 'down');
btnLeft?.addEventListener('click', ()=> direction = 'left');
btnRight?.addEventListener('click', ()=> direction = 'right');

// Swipe handlers removed: control via buttons only on mobile
