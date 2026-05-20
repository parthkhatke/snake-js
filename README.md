# SnakeJS

A simple browser-based implementation of the classic Snake game.

Features
- Grid-based board generated dynamically from the `.board` element size
- Keyboard controls (arrow keys) to move the snake
- Food spawning and score tracking with high-score saved to `localStorage`
- Start and restart overlay UI

Files
- `index.html` — main game page and UI
- `style.css` — game styles and board layout
- `script.js` — game logic (board generation, snake movement, food, scoring)
- `tik-tak-tow/` — separate placeholder project (not part of SnakeJS)

How to run
1. Open `index.html` in a browser (ideally serve from a local server to avoid absolute path issues).
2. Click "Start Game" or press the start button overlay.
3. Use the arrow keys to control the snake.

Controls
- ArrowUp / ArrowDown / ArrowLeft / ArrowRight — move the snake

Notes & Known Issues
- The project uses absolute paths (`/script.js`, `/style.css`) in `index.html`; when opening the file directly from the filesystem these may fail in some browsers. Serve the folder via a simple HTTP server if you see missing assets.
- The overlay UI (`.gameStart-end`) provides start and restart buttons; the restart logic may reload the page to reset game state.

License
This repository is provided as-is for learning and experimentation.

