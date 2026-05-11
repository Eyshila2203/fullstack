const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'blue';
ctx.fillRect(0,0,50,50);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'red';
ctx.fillRect(250,0,50,50);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = '#77e7fd';
ctx.fillRect(0,120,30,60);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = '#77e7fd';
ctx.fillRect(270,135,30,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'yellow';
ctx.fillRect(0,240,30,60);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'yellow';
ctx.fillRect(0,270,60,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'black';
ctx.fillRect(240,270,60,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'black';
ctx.fillRect(270,240,30,60);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = 'green';     
ctx.moveTo(0, 150);
ctx.lineTo(300, 150);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = '#77e7fd';
ctx.arc(150,300,50,3*Math.PI,0*Math.PI);
ctx.fill();
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = 'black';     
ctx.moveTo(150, 150);  
ctx.lineTo(150, 250);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'red';
ctx.fillRect(105,150,45,45);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = 'blue';     
ctx.moveTo(50, 50);  
ctx.lineTo(150, 150);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = 'red';     
ctx.moveTo(250, 50);  
ctx.lineTo(150, 150);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.arc(150,150,55,3*Math.PI,0*Math.PI);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.arc(150,150,65,3*Math.PI,1.25*Math.PI);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.arc(150,150,65,1.75*Math.PI,0*Math.PI);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = '#77e7fd';
ctx.arc(150,120,15,0*Math.PI,2*Math.PI);
ctx.strokeStyle = 'blue';
ctx.fill();
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'yellow';
ctx.arc(80,210,15,0*Math.PI,2*Math.PI);
ctx.strokeStyle = 'green';
ctx.fill();
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.fillStyle = 'yellow';
ctx.arc(220,210,15,0*Math.PI,2*Math.PI);
ctx.strokeStyle = 'green';
ctx.fill();
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.arc(150,300,70,1.5*Math.PI,0*Math.PI);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.arc(150,300,85,1*Math.PI,1.5*Math.PI);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.font = "20px Arial"
ctx.textAlign = "center";
ctx.fillText("Canvas",150,50);
ctx.closePath();
