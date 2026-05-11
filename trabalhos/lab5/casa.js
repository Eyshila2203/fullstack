let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'grey';
ctx.fillRect(0,300,400,100);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'brown';
ctx.fillRect(140,160,120,140);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.arc(325,50,30,0*Math.PI,2*Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.fillRect(190,245,25,55);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'rgba(154, 240, 255, 1)';
ctx.fillRect(150,180,40,40);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'rgba(154, 240, 255, 1)';
ctx.fillRect(210,180,40,40);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'brown';
ctx.fillRect(40,250,15,50);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'rgb(35, 131, 221)';
ctx.arc(0,300,40,1.5*Math.PI,2.5*Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'rgb(35, 131, 221)';
ctx.arc(162,387,30,1.5*Math.PI,2.5*Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'rgb(35,131,221)';
ctx.fillRect(0,357,162,142);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'rgb(35,131,221)';
ctx.fillRect(0,300,40,80);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'green';
ctx.arc(45,240,30,0*Math.PI,2*Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'brown';
ctx.fillRect(350,310,15,50);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'green';
ctx.arc(355,295,30,0*Math.PI,2*Math.PI);
ctx.fill();
ctx.closePath();




// ctx.fillRect(140,160,120,140);
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'red';
ctx.moveTo(140,160);
ctx.lineTo(200,160-60);
ctx.lineTo(260,160);
ctx.fill();
ctx.closePath();