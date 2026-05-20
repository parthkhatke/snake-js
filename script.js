const board = document.querySelector(".board");
const blockWidth = 50;
const blockHeight = 50;

//array
const blocks = [];

//get number of row and col
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

//snake direction
let direction="down";

//food object 
let food = { x:Math.floor(Math.random()*rows),
             y:Math.floor(Math.random()*cols) }
             
const snake = [
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
    block.innerHTML=`${row}-${col}`
  }
}


function renderSnake()
{
    blocks[`${food.x}-${food.y}`].classList.add("food")
    let head = direction==="left" ?{x:snake[0].x, y:snake[0].y-1} : 
               direction==="right"?{x:snake[0].x, y:snake[0].y+1} :
               direction==="up"   ?{x:snake[0].x-1, y:snake[0].y} :
                                   {x:snake[0].x+1, y:snake[0].y} ;

    if(snake[0].x<0 || snake[0].x>rows || snake[0].y<0 || snake[0].y>cols)
    {
      alert("game over");
      clearInterval(interval);
    }

    if(head.x == food.x && head.y == food.y)
      {
        blocks[`${food.x}-${food.y}`].classList.remove("food") 
        food = { x:Math.floor(Math.random()*rows),
                     y:Math.floor(Math.random()*cols) }
        blocks[`${food.x}-${food.y}`].classList.add("food") 

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
let interval=setInterval(
  ()=>
  {

    renderSnake();
  },400)

addEventListener('keydown', (event)=>
{
  switch (event.key) {
    case 'ArrowUp':    direction="up";    break;
    case 'ArrowDown':  direction="down";  break;
    case 'ArrowRight': direction="right"; break;
    case 'ArrowLeft':  direction="left";  break;
  }
 
  
})