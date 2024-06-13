import Background from "./classes/Background";
import Player from "./classes/Player";
import Platform from "./classes/Platform";
import { CANVAS_DIMENSIONS } from "./utils/constants";
import { getRandomInt } from "./utils/common";
//canvas setup
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
export const ctx = canvas.getContext("2d")!;
canvas.width = CANVAS_DIMENSIONS.WIDTH;
canvas.height = CANVAS_DIMENSIONS.HEIGHT;
//Variables declaration
let player: Player;
let background: Background;
let gap: number;
let platforms: Platform[] = [];
let score = 0;

const backgroundImage = document.getElementById("bg") as HTMLImageElement;
const playerImgL = document.getElementById("playerL") as HTMLImageElement;
const playerImgR = document.getElementById("playerR") as HTMLImageElement;

function setUp() {
  background = new Background(backgroundImage);
  player = new Player(playerImgL, playerImgR);
  let platformCount = 6;
  gap = CANVAS_DIMENSIONS.HEIGHT / platformCount;
  for (let i = 1; i < 6; i++) {
    platforms.push(
      new Platform(
        getRandomInt(0, CANVAS_DIMENSIONS.WIDTH - 60),
        CANVAS_DIMENSIONS.HEIGHT - i * gap
      )
    );
  }
}

//GAME LOOP
function draw() {
  ctx.clearRect(0, 0, CANVAS_DIMENSIONS.WIDTH, CANVAS_DIMENSIONS.HEIGHT); //clear canvas
  //draws background and moves the screen up when the player reaches the middle
  if (player.y < CANVAS_DIMENSIONS.HEIGHT / 2) {
    let offset = CANVAS_DIMENSIONS.HEIGHT / 2 - player.y;
    player.y = CANVAS_DIMENSIONS.HEIGHT / 2;
    platforms.forEach((platform) => (platform.y += offset));
    background.draw();
  } else {
    // Draw background
    background.draw();
  }

  player.platformCollision(platforms);
  //updates player position
  player.update();
  //draws player

  player.draw();

  //draw platforms
  platforms.forEach((platform, index) => {
    platform.removeCheck();
    if (platform.remove) {
      platforms.splice(index, 1);
      score++;
    }
    platform.draw();
  });

  if (player.y < platforms[platforms.length - 1].y + 200) {
    platforms.push(
      new Platform(
        getRandomInt(0, CANVAS_DIMENSIONS.WIDTH - 60),
        platforms[platforms.length - 1].y - gap
      )
    );
  }

  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 10, 30);

  requestAnimationFrame(draw); //calls every frame
}

setUp();
draw();
