//import {CanvasTextWrapper} from 'canvas-text-wrapper/canvas-text-wrapper'


let canvas = window.document.createElement("canvas");
const TEXT_HEIGHT = 18;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
let workingFlag = false;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(200,0,200)";
ctx.fillRect (10, 10, 55, 50);

ctx.fillStyle = "rgba(0, 100, 100, 0.5)";
ctx.fillRect (30, 30, 55, 50);
let xhr = new XMLHttpRequest();
let params = 'collections=' + '175083' +
    '&count=' + '4';
xhr.open('GET', 'https://api.unsplash.com/photos/random?'+params,false);
xhr.setRequestHeader('Authorization','Client-ID d30689fcb38588102786360524b57f0b5d532507302f21580ec6c043447a63a1');

xhr.send();
let jsons;
if (xhr.status != 200) {

   // xhr.open('GET', 'https://source.unsplash.com/collection/1127163/300x200', false);
   // xhr.responseType = 'blob';
    //xhr.send();

   // jsons = JSON.parse(xhr.response);
} else {
    workingFlag = true;

    jsons = JSON.parse(xhr.response);
}
xhr.open('GET','https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru', false);
xhr.send();
let quoteJson;
if (xhr.status != 200) {

    alert( xhr.status + ': ' + xhr.statusText );
} else {

    quoteJson = JSON.parse(xhr.response);
}
//

let img1 = new Image();
img1.crossOrigin = 'anonymous';
let img2 = new Image();
img2.crossOrigin = 'anonymous';
let img3 = new Image();
img3.crossOrigin = 'anonymous';
let img4 = new Image();
img4.crossOrigin = 'anonymous';

let quote = quoteJson.quoteText;


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
let counter = 0;
function LoadingChecker(){
    counter++;
    if(counter == 4){
        simpleWrite();
       // write();
        addDownloadLink();
    }

}
img1.onload = function (){drawPicture(img1,0,0); LoadingChecker();}
img2.onload = function (){drawPicture(img2,CANVAS_WIDTH/2,0);LoadingChecker();}
img3.onload = function (){drawPicture(img3,0,CANVAS_HEIGHT/2);LoadingChecker();}
img4.onload = function (){drawPicture(img4,CANVAS_WIDTH/2,CANVAS_HEIGHT/2);LoadingChecker();}
if(workingFlag){
    let picture = jsons[0];
    img1.src = picture.urls.thumb;
picture = jsons[1];
    img2.src = picture.urls.thumb;
picture = jsons[2];
    img3.src = picture.urls.thumb;
picture = jsons[3];
    img4.src = picture.urls.thumb;

} else{

    img1.src = 'https://source.unsplash.com/collection/1127163/300x200';
    img2.src = 'https://source.unsplash.com/collection/1127164/300x200';
    img3.src = 'https://source.unsplash.com/collection/1127165/300x200';
    img4.src = 'https://source.unsplash.com/collection/1127166/300x200';
}




ctx.font = TEXT_HEIGHT + "px Comic Sans MS";
ctx.fillStyle = "#00e0a5";
ctx.textAlign = "center";
ctx.textBaseline = "middle"
window.document.body.appendChild(canvas);
//let string = 'Очень крутая и длинная цитата. Очень много глубоких мыслей, прям супер глубоко';
function simpleWrite(){
    ctx.font = TEXT_HEIGHT + "px Comic Sans MS";
    let lines = getLines(ctx,quote,CANVAS_WIDTH*2/3);
    //let recommendedTextHeight = CANVAS_HEIGHT*2/3/lines.length;
    let middleLineNumber = lines.length/2;
    for(let i = 0; i < lines.length; i++){
        ctx.fillText(lines[i], CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - TEXT_HEIGHT * middleLineNumber + TEXT_HEIGHT * (i + 1), CANVAS_WIDTH * 2 / 3);
    }

}
function write() {
    CanvasTextWrapper(canvas,string,{
        font: "italic 800 25px Arial, sans-serif",
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "100%",
    });
}
function addDownloadLink() {
let link = window.document.createElement('a');
link.innerHTML = 'download image';
link.href = canvas.toDataURL();
link.download = "myPainting.png";
window.document.body.appendChild(link);
}
function getLines(ctx, text, maxWidth) {
    let words = text.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

