import { CANVAS_DIMENSIONS } from "../utils/constants";
import { ctx } from "../main";

export interface IBackground {
  x: number;
  y: number;
  w: number;
  h: number;
  backgroundImage: HTMLImageElement;
  draw: () => void;
}

export default class Background implements IBackground {
  x: number;
  y: number;
  w: number;
  h: number;
  backgroundImage: HTMLImageElement;
  constructor(backgroundImage: HTMLImageElement) {
    this.x = 0;
    this.y = 0;
    this.w = CANVAS_DIMENSIONS.WIDTH;
    this.h = CANVAS_DIMENSIONS.HEIGHT;
    this.backgroundImage = backgroundImage;
  }
  draw() {
    ctx.beginPath();
    ctx.drawImage(this.backgroundImage, this.x, this.y, this.w, this.h);
  }
}
