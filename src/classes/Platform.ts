import { ctx } from "../main";
import { CANVAS_DIMENSIONS } from "../utils/constants";

export interface IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default class Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  remove: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.w = 60;
    this.h = 15;
    this.remove = false;
  }
  draw() {
    ctx.fillStyle = "rgb(100,225,100)";
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
  }
  removeCheck() {
    this.remove = this.y > CANVAS_DIMENSIONS.HEIGHT + 10;
  }
}
