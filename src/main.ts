import Background from "./classes/Background";
import Player from "./classes/Player";
import { CANVAS_DIMENSIONS } from "./utils/constants";

//canvas setup
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
export const ctx = canvas.getContext("2d")!;
canvas.width = CANVAS_DIMENSIONS.WIDTH;
canvas.height = CANVAS_DIMENSIONS.HEIGHT;
//Variables declaration
let player: Player;
let background: Background;
const backgroundImage = document.getElementById("bg") as HTMLImageElement;
// const playerImgL = document.getElementById("playerL") as HTMLImageElement;
const playerImgR = document.getElementById("playerR") as HTMLImageElement;

function setUp() {
  background = new Background(backgroundImage);
  player = new Player(playerImgR);
}

//GAME LOOP
function draw() {
  ctx.clearRect(0, 0, CANVAS_DIMENSIONS.WIDTH, CANVAS_DIMENSIONS.HEIGHT); //clear canvas
  //draws background
  background.draw();

  //updates player position
  player.update();
  //draws player
  player.draw();
  requestAnimationFrame(draw); //calls every frame
}

setUp();
draw();
