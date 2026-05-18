const board = document.querySelector(".board");
const blockWidth = 50;
const blockHeight = 50;

//array
const blocks = [];
//get number of row and col
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const snake = [
  {
    x: 1,
    y: 3,
  },
  {
    x: 1,
    y: 4,
  },
  {
    x: 1,
    y: 5,
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
    snake.forEach( body => 
    {
        console.log(blocks[`${body.x}-${body.y}`]);
        
    }
    )
}
