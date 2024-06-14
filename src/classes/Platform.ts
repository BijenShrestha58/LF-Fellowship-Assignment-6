import { ctx } from "../main";
import { CANVAS_DIMENSIONS } from "../utils/constants";

export interface IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  remove: boolean;
  image: HTMLImageElement;
}

export default class Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  remove: boolean;
  image: HTMLImageElement;

  constructor(x: number, y: number, image: HTMLImageElement) {
    this.x = x;
    this.y = y;
    this.w = 60;
    this.h = 15;
    this.remove = false;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, 0, 0, 120, 35, this.x, this.y, this.w, this.h);
    ctx.fill();
  }
  removeCheck() {
    this.remove = this.y > CANVAS_DIMENSIONS.HEIGHT + 10;
  }
}
