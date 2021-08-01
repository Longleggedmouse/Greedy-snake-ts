import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

enum Edirection {
  STOP,
  LEFT,
  RIGHT,
  UP,
  DOWM,
}

export default class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  direction: Edirection = Edirection.STOP
  isOver = false
  constructor() {
    this.snake = new Snake(this.gameOver.bind(this))
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 10)
    this.init()
  }

  gameOver() {
    this.isOver = true
    //可以继续扩充其他的操作
    document.querySelector(".tips")?.classList.add("show")
  }

  init() {
    document.addEventListener("keydown", this.keydownHandler.bind(this))
    this.snakeBeginRun()
  }

  keydownHandler(e: KeyboardEvent) {
    const key = e.key
    switch (key) {
      case "ArrowUp":
        this.direction = Edirection.UP
        break
      case "ArrowDown":
        this.direction = Edirection.DOWM
        break
      case "ArrowLeft":
        this.direction = Edirection.LEFT
        break
      case "ArrowRight":
        this.direction = Edirection.RIGHT
        break
      default:
        break
    }
  }

  snakeBeginRun() {
    let snakeX = this.snake.x
    let snakeY = this.snake.y
    switch (this.direction) {
      case Edirection.UP:
        snakeY -= 10
        break
      case Edirection.DOWM:
        snakeY += 10
        break
      case Edirection.LEFT:
        snakeX -= 10
        break
      case Edirection.RIGHT:
        snakeX += 10
        break
      default:
        break
    }
    if (this.checkSnakeEat(snakeX, snakeY)) {
      this.snakeEat()
    }
    this.snake.x = snakeX
    this.snake.y = snakeY
    !this.isOver &&
      setTimeout(
        this.snakeBeginRun.bind(this),
        300 - (this.scorePanel.level - 1) * 50
      )
  }
  checkSnakeEat(x: number, y: number) {
    return x === this.food.x && y === this.food.y
  }
  snakeEat() {
    this.food.changePosition()
    this.scorePanel.addScore()
    this.snake.addBody()
  }
}
