export default class Snake {
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement
  //这个做法有待商榷，也是刚接触面向对象编程,此处类似于订阅
  gameOver: () => void
  constructor(gameOver: () => void) {
    this.element = document.getElementById("snake")!
    this.head = document.querySelector("#snake>div")!
    this.bodies = document.getElementById("snake")!.getElementsByTagName("div")
    this.gameOver = gameOver
  }

  get x() {
    return this.head.offsetLeft
  }
  get y() {
    return this.head.offsetTop
  }
  set x(value: number) {
    if (this.x === value) {
      return
    }
    //水平原地掉头
    if ((this.bodies[1] as HTMLElement)?.offsetLeft === value) {
      if (value > this.x) {
        value = this.x - 10
      } else {
        value = this.x + 10
      }
    }
    //蛇的位置越界（撞墙）
    if (value < 0 || value > 1140) {
      this.gameOver()
    } else {
      this.moveBody()
      this.head.style.left = value + "px"
      this.checkHeadHitsBody()
    }
  }

  set y(value: number) {
    if (this.y === value) {
      return
    }
    //垂直原地掉头
    if ((this.bodies[1] as HTMLElement)?.offsetTop === value) {
      if (value > this.y) {
        value = this.y - 10
      } else {
        value = this.y + 10
      }
    }
    //蛇的位置越界（撞墙）
    if (value < 0 || value > 440) {
      this.gameOver()
    } else {
      this.moveBody()
      this.head.style.top = value + "px"
      this.checkHeadHitsBody()
    }
  }

  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div class='box'></div>")
  }

  moveBody() {
    for (let index = this.bodies.length - 1; index > 0; index--) {
      const preBody = this.bodies[index - 1] as HTMLElement
      const x = preBody.offsetLeft
      const y = preBody.offsetTop
      const nextBody = this.bodies[index] as HTMLElement
      nextBody.style.left = x + "px"
      nextBody.style.top = y + "px"
    }
  }

  checkHeadHitsBody() {
    for (let index = 1; index < this.bodies.length; index++) {
      const body = this.bodies[index] as HTMLElement
      const bodyX = body.offsetLeft
      const bodyY = body.offsetTop
      if (bodyX === this.x && bodyY === this.y) {
        this.gameOver()
      }
    }
  }
}
