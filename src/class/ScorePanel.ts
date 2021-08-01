export default class ScorePanel {
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement
  maxLevel: number
  upLevelScore: number
  constructor(maxLevel: number, upLevelScore: number) {
    this.maxLevel = maxLevel
    this.scoreEle = document.querySelector(".score_number .number")!
    this.levelEle = document.querySelector(".level .number")!
    this.upLevelScore = upLevelScore
  }
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ""
    if (this.score % this.upLevelScore == 0) {
      this.levelUp()
    }
  }
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ""
    } else {
      this.levelEle.innerHTML = ++this.level + "(最高级!)"
    }
  }
}
