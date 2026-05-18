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
const snake = [
  {
    x: 1,
    y: 3,
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
    snake.forEach( body => 
    {
       blocks[`${body.x}-${body.y}`].classList.add("fill");
       
    }
    )
}


//rendersnake every 3ms 
setInterval(
  ()=>
  {
    let head = null;
    // if(direction==="left")
    // {
    //   head = {x:snake[0].x, y:snake[0].y-1};
    // }
    direction==="left" ? head = {x:snake[0].x, y:snake[0].y-1} : 
    direction==="right"? head = {x:snake[0].x, y:snake[0].y+1} :
    direction==="up"   ? head = {x:snake[0].x-1, y:snake[0].y} :
                         head = {x:snake[0].x+1, y:snake[0].y} ;
    
    snake.forEach( body => 
    {
       blocks[`${body.x}-${body.y}`].classList.remove("fill");
        
    })
    snake.unshift(head) ;
    snake.pop();
    

    renderSnake();
  },400)
