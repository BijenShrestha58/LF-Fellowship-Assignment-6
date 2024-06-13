import { CANVAS_DIMENSIONS } from "../utils/constants";
import { PLAYER_DIMENSIONS } from "../utils/constants";
import { ctx } from "../main";

export interface IPlayer {
  x: number;
  y: number;
  w: number;
  h: number;
  velocity: number;
  gravity: number;
  jumpHeight: number;
  playerImage: HTMLImageElement;
  draw: () => void;
  update: () => void;
  keyUp: (e: KeyboardEvent) => void;
  keyDown: (e: KeyboardEvent) => void;
  jump: () => void;
  keys: Set<string>;
}

export default class Player implements IPlayer {
  x: number;
  y: number;
  w: number;
  h: number;
  velocity: number;
  gravity: number;
  jumpHeight: number;
  playerImage: HTMLImageElement;
  keys: Set<string>;

  constructor(playerImage: HTMLImageElement) {
    this.x = CANVAS_DIMENSIONS.WIDTH / 2;
    this.y = CANVAS_DIMENSIONS.HEIGHT - 200;
    this.w = PLAYER_DIMENSIONS.WIDTH;
    this.h = PLAYER_DIMENSIONS.HEIGHT;
    this.velocity = 0;
    this.gravity = 0.1;
    this.jumpHeight = 9;
    this.playerImage = playerImage;
    this.keys = new Set<string>();

    document.addEventListener("keydown", (e) => this.keyDown(e));
    document.addEventListener("keyup", (e) => this.keyUp(e));
  }
  draw() {
    ctx.beginPath();
    ctx.drawImage(this.playerImage, this.x, this.y, this.w, this.h);
  }

  jump() {
    this.velocity -= this.jumpHeight;
  }

  keyDown(e: KeyboardEvent) {
    this.keys.add(e.key);
    if (e.key === " ") this.jump();
  }

  keyUp(e: KeyboardEvent) {
    this.keys.delete(e.key);
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    if (this.keys.has("ArrowLeft")) {
      this.x -= 4;
    }
    if (this.keys.has("ArrowRight")) {
      this.x += 4;
    }
  }
}
