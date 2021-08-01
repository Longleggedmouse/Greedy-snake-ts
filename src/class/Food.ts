export default class Food {
  element: HTMLElement
  constructor() {
    this.element = document.querySelector(".food")!
  }
  get x() {
    return this.element.offsetLeft
  }
  get y() {
    return this.element.offsetTop
  }
  changePosition() {
    //边界的大小为 1150*450 食物的大小10*10
    const top = Math.round(Math.random() * 44) * 10
    const left = Math.round(Math.random() * 114) * 10
    this.element.style.top = top + "px"
    this.element.style.left = left + "px"
  }
}
