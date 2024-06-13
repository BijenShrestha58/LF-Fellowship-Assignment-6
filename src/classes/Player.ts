import { CANVAS_DIMENSIONS } from "../utils/constants";
import { PLAYER_DIMENSIONS } from "../utils/constants";
import { ctx } from "../main";
import Platform from "./Platform";

export interface IPlayer {
  x: number;
  y: number;
  w: number;
  h: number;
  offset: number;
  velocity: number;
  gravity: number;
  jumpHeight: number;
  playerImageL: HTMLImageElement;
  playerImageR: HTMLImageElement;
  goingRight: boolean;
  descent: boolean;
  draw: () => void;
  update: () => void;
  keyUp: (e: KeyboardEvent) => void;
  keyDown: (e: KeyboardEvent) => void;
  jump: () => void;
  keys: Set<string>;
  platformCollision: (platforms: Platform[]) => void;
}

export default class Player implements IPlayer {
  x: number;
  y: number;
  w: number;
  h: number;
  offset: number;
  velocity: number;
  gravity: number;
  jumpHeight: number;
  playerImageL: HTMLImageElement;
  playerImageR: HTMLImageElement;
  goingRight: boolean;
  keys: Set<string>;
  descent: boolean;

  constructor(playerImageL: HTMLImageElement, playerImageR: HTMLImageElement) {
    this.x = CANVAS_DIMENSIONS.WIDTH / 2;
    this.y = CANVAS_DIMENSIONS.HEIGHT - 200;
    this.w = PLAYER_DIMENSIONS.WIDTH;
    this.h = PLAYER_DIMENSIONS.HEIGHT;
    this.velocity = -9;
    this.gravity = 0.2;
    this.jumpHeight = 9;
    this.playerImageL = playerImageL;
    this.playerImageR = playerImageR;
    this.keys = new Set<string>();
    this.goingRight = true;
    this.descent = false;
    this.offset = 20;

    document.addEventListener("keydown", (e) => this.keyDown(e));
    document.addEventListener("keyup", (e) => this.keyUp(e));
  }
  draw() {
    ctx.beginPath();
    if (this.goingRight) {
      ctx.drawImage(this.playerImageR, this.x, this.y, this.w, this.h);
    } else {
      ctx.drawImage(this.playerImageL, this.x, this.y, this.w, this.h);
    }
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

  platformCollision(platforms: Platform[]) {
    if (this.descent) {
      platforms.forEach((platform) => {
        if (
          this.y + this.h >= platform.y &&
          this.y + this.h <= platform.y + platform.h
        ) {
          let minX;
          let maxX;
          if (this.goingRight) {
            minX = platform.x - this.w + this.offset;
            maxX = platform.x + platform.w;
          } else {
            minX = platform.x - this.w;
            maxX = platform.x + platform.w - this.offset;
          }

          if (this.x >= minX && this.x <= maxX) {
            this.velocity = 0;
            this.jump();
          }
        }
      });
    }
  }

  update() {
    //goes to other end on leaving screen
    if (this.x + this.w < 0) this.x = CANVAS_DIMENSIONS.WIDTH;
    if (this.x > CANVAS_DIMENSIONS.WIDTH) this.x = -this.w;

    //acceleration due to gravity
    this.velocity += this.gravity;
    this.y += this.velocity;

    //movement
    if (this.keys.has("ArrowLeft")) {
      this.x -= 4;
      this.goingRight = false;
    }
    if (this.keys.has("ArrowRight")) {
      this.x += 4;
      this.goingRight = true;
    }

    //descent check
    if (this.velocity > 0) {
      this.descent = true;
    } else {
      this.descent = false;
    }
  }
}
