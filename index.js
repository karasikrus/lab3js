//import {CanvasTextWrapper} from 'canvas-text-wrapper/canvas-text-wrapper'


let canvas = window.document.createElement("canvas");
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(200,0,200)";
ctx.fillRect (10, 10, 55, 50);

ctx.fillStyle = "rgba(0, 100, 100, 0.5)";
ctx.fillRect (30, 30, 55, 50);


let img1 = new Image();
let img2 = new Image();
let img3 = new Image();
let img4 = new Image();
img1.src = '1.jpg';
img2.src = '2.jpg';
img3.src = '3.jpg';
img4.src = '4.jpg';

const min = (a,b) => {
    if (a<b)return a
    else return b;
}
const drawPicture = (img,x,y) => {
    let size = min(img.width, img.height);
    let fragmentX = img.width/2 - size/2;
    let fragmentY = img.height/2 - size/2;
    ctx.drawImage(img, fragmentX, fragmentY,size,size,x,y,CANVAS_WIDTH/2,CANVAS_HEIGHT/2);

}
drawPicture(img1,0,0);
drawPicture(img2,CANVAS_WIDTH/2,0);
drawPicture(img3,0,CANVAS_HEIGHT/2);
drawPicture(img4,CANVAS_WIDTH/2,CANVAS_HEIGHT/2);

ctx.font = "50px Comic Sans MS";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.textBaseline = "middle"
window.document.body.appendChild(canvas);
let string = 'Очень крутая и длинная цитата. Очень много глубоких мыслей, прям супер глубоко';
CanvasTextWrapper(canvas,string,{
    font: "italic 800 25px Arial, sans-serif",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "100%",
});
//git remote add origin https://github.com/karasikrus/lab3js.git
