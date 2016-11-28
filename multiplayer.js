var startX, startY;
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}
function getTouchPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: evt.changedTouches[0].pageX - rect.left,
      y: evt.changedTouches[0].pageY - rect.top
  };
}

function dragPiece(x,y)
{
  if(round%2 === 0  && id == 1 || round%2 === 1 && id == 2)
  {
  if(drag)
    {
  var posX = getXPos(x);
  var posY = getYPos(y);
  var i = 0;
  for(i = 0; i < 32; i++)
   {
    if(getXPos(chessPiece[i].x) === posX && getYPos(chessPiece[i].y) === posY)
      {
        break;
      }
    }
  pieceI = i;
    }
  else
    {
      var x_out = getXPos(mouseX);
      var y_out = getYPos(mouseY);
      if(chessPiece[pieceI].color === "White" && (gracz === 1 && id === 1) || chessPiece[pieceI].color === "Black" && (gracz === 2 && id === 2))
      if(chessPiece[pieceI].checkIfPossible(x_out,y_out))
        {
          var check = chessPiece[pieceI].checkForCollission(x_out,y_out);
          if(check[0] === "none" && (chessPiece[pieceI].type !== "Pawn" || chessPiece[pieceI].type === "Pawn" && pawnDir === "straight"))
          {
            chessPiece[pieceI].x = getX(x_out);
            chessPiece[pieceI].y = getY(y_out);
            $.ajax({ 
                    url : 'echo_input.php',
                    type : 'post',
                    dataType : 'json',
                    data : {X: x_out, Y: y_out, Id: ""+pieceI, X2: ""+0, Y2: ""+0, Id2: ""+32},
                    success : function(jActive,sStatus,jqXHR){ 
                    //     console.log(jActive);
						    drawChessBoard();
                   }  
                  });
            ktoryGracz.innerHTML = "Ruch wykonuje gracz nr " + gracz;
          }
          else if(check[0] === "different color" && chessPiece[pieceI].type !== "Pawn" || (check[0] === "different color" && chessPiece[pieceI].type === "Pawn" && pawnDir === "hit"))
          {
            if(chessPiece[check[1]].color === "White")
            {
              chessPiece[check[1]].x = getX(xPlayer1++);
              chessPiece[check[1]].y = getY(7);
            }
            else
            {
              chessPiece[check[1]].x = getX(xPlayer2++);
              chessPiece[check[1]].y = getY(0);                
            }

            chessPiece[pieceI].x = getX(x_out);
            chessPiece[pieceI].y = getY(y_out);
            $.ajax({ 
                    url : 'echo_input.php',
                    type : 'post',
                    dataType : 'json',
                    data : {X: chessPiece[pieceI].x, Y: chessPiece[pieceI].y, Id: ""+pieceI, X2: ""+chessPiece[check[1]].x, Y2: ""+chessPiece[check[1]].y, Id2: ""+check[1]},
                    success : function(jActive,sStatus,jqXHR){ 
                   //      console.log(jActive);
						    drawChessBoard();
                   }  
                  });


            ktoryGracz.innerHTML = "Ruch wykonuje gracz nr " + gracz;
            if(chessPiece[check[1]].type === "King")
              {
                var koniec = document.getElementById("ktoryGracz");
                koniec.innerHTML = "Koniec gry, wygrał gracz "+(gracz%2+1);
                gracz = 10;
              }
          }
        }
	}
   }
}
function getXPos(x)
{
  var i;
  for(i = 0; i < 8; i++)
    if(x < width*scale*(i+1))
      break;
  return i;
}
function getYPos(y)
{
  var i;
  for(i = 0; i < 8; i++)
    if(y < height*scale*(i+1))
      break;
  return i;
}
function getX(x)
{
  return x*width*scale;
}
function getY(y)
{
  return y*height*scale;
}
function drawRook(color,x,y){
  if(color == "white")
    ctx.drawImage(img,0,0,width,height,getX(x),getY(y),width*scale,height*scale);
  else
    ctx.drawImage(img,width*3,0,width,height,getX(x),getY(y),width*scale,height*scale);
}
function drawKnight(color,x,y){
  if(color == "white")
    ctx.drawImage(img,0,height,width,height,getX(x),getY(y),width*scale,height*scale);
  else
    ctx.drawImage(img,width*3,height,width,height,getX(x),getY(y),width*scale,height*scale);
}
function drawQueen(color,x,y)
{
  if(color == "white")
    ctx.drawImage(img,width,0,width,height,getX(x),getY(y),width*scale,height*scale);
  else
    ctx.drawImage(img,width*4,0,width,height,getX(x),getY(y),width*scale,height*scale);
}
function drawKing(color,x,y)
{
  if(color == "white")
    ctx.drawImage(img,width,height,width,height,getX(x),getY(y),width*scale,height*scale);
  else
    ctx.drawImage(img,width*4,height,width,height,getX(x),getY(y),width*scale,height*scale);
}
function drawPawn(color,x,y)
{
  if(color == "white")
    ctx.drawImage(img,width*2,0,width,height,getX(x),getY(y),width*scale,height*scale);
  else
    ctx.drawImage(img,width*5,0,width,height,getX(x),getY(y),width*scale,height*scale);
}
function drawBishop(color,x,y)
{
  if(color == "white")
    ctx.drawImage(img,width*2,height,width,height,getX(x),getY(y),width*scale,height*scale);
  else
    ctx.drawImage(img,width*5,height,width,height,getX(x),getY(y),width*scale,height*scale);
}



function drawPiece(x,y,type,color){
  if(type.toLowerCase() === "Rook".toLowerCase())
    if(color.toLowerCase() == "white")
      ctx.drawImage(img,0,0,width,height,x,y,width*scale,height*scale);
    else
      ctx.drawImage(img,width*3,0,width,height,x,y,width*scale,height*scale);
  
  if(type.toLowerCase() === "Knight".toLowerCase())
    if(color.toLowerCase() == "white")
      ctx.drawImage(img,0,height,width,height,x,y,width*scale,height*scale);
    else
      ctx.drawImage(img,width*3,height,width,height,x,y,width*scale,height*scale);
  
  if(type.toLowerCase() === "Queen".toLowerCase())
    if(color.toLowerCase() == "white")
      ctx.drawImage(img,width,0,width,height,x,y,width*scale,height*scale);
    else
      ctx.drawImage(img,width*4,0,width,height,x,y,width*scale,height*scale);
  
  if(type.toLowerCase() === "King".toLowerCase())
    if(color.toLowerCase() == "white")
      ctx.drawImage(img,width,height,width,height,x,y,width*scale,height*scale);
    else
      ctx.drawImage(img,width*4,height,width,height,x,y,width*scale,height*scale);

  if(type.toLowerCase() === "Pawn".toLowerCase())
    if(color.toLowerCase() == "white")
      ctx.drawImage(img,width*2,0,width,height,x,y,width*scale,height*scale);
    else
      ctx.drawImage(img,width*5,0,width,height,x,y,width*scale,height*scale);

  if(type.toLowerCase() === "Bishop".toLowerCase())
    if(color.toLowerCase() == "white")
      ctx.drawImage(img,width*2,height,width,height,x,y,width*scale,height*scale);
    else
      ctx.drawImage(img,width*5,height,width,height,x,y,width*scale,height*scale);
}



function drawChessBoard()
{
  for(var j = 0; j < 8; j++)
    {
      for(var k = 0; k < 8; k++)
        {
          var x = j * width*scale;
          var y = k * height*scale;
          if((j+k)%2)
            ctx.fillStyle = "#444444";
          else 
            ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(x,y,width*scale,height*scale)
        }
    }
    $.ajax({ 
    url : 'echo_chessboard.php',
    type : 'post',
    dataType : 'json',
    data : {},
    success : function(jChess,sStatus,jqXHR){ 
	console.log(jChess);
      for(var i = 0; i < jChess.length; i++)
      {
         chessPiece[i].x = getX(jChess[i].x);
         chessPiece[i].y = getY(jChess[i].y);
      }
	   for(var i = 0; i < chessPiece.length; i++)
	  {
		chessPiece[i].drawPiece();
	  }
    }
  });

}

function Piece(x,y,type,color,i)
{
  this.i = i;
  this.x = x;
  this.y = y;
  this.type = type;
  this.color = color;
  this.drawPiece = function(){
    drawPiece(this.x,this.y,this.type,this.color);
  }
  this.checkIfPossible = function(x_out,y_out)
  {
    var direction;
    var posX = getXPos(this.x);
    var posY = getYPos(this.y);
    if(this.color === "Black")
      direction = 1;
    else
      direction = -1;
    if(this.type === "Pawn")
    {
      console.log(posY + " " + y_out);
      if(posX === x_out && posY === y_out - direction)
        {
          pawnDir = "straight";
          return true;
        }
      else if((posX === x_out - 1 || posX === x_out + 1) && posY === y_out - direction)
        {
          pawnDir = "hit";
          return true;
        }
      else 
      {
        pawnDir = "";
        return false;
      }
    }
    if(this.type === "Knight")
      {
        if((posX-x_out === 2 || posX-x_out === -2) && (posY - y_out === 1 || posY - y_out === -1))
           return true;
        else if((posX-x_out === 1 || posX-x_out === -1) && (posY - y_out === 2 || posY - y_out === -2))
           return true;
        else return false;
      }
    if(this.type === "Rook")
      {
        if(posX === x_out)
          {
            var dist = posY-y_out;
        //    console.log(dist);
            for(var z = 1; z < dist; z++)
            {
              for(i = 0; i < 32; i++)
              {
                if(getXPos(chessPiece[i].x) === posX && (getYPos(chessPiece[i].y) === posY-z))
                  return false;
              }
            }
            for(var z = -1; z > dist; z--)
            {
              for(i = 0; i < 32; i++)
              {
                if(getXPos(chessPiece[i].x) === posX && (getYPos(chessPiece[i].y) === posY-z))
                  return false;
              }
            }
            return true;
          }
        if(posY === y_out)
          {
            var dist = posX-x_out;
        //    console.log(dist);
            for(var z = 1; z < dist; z++)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY && (getXPos(chessPiece[i].x) === posX-z))
                  return false;
              }
            }
            for(var z = -1; z > dist; z--)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY && (getXPos(chessPiece[i].x) === posX-z))
                  return false;
              }
            }
            return true;            
          }
      }
    if(this.type === "Bishop")
      {
                    var dist = posX-x_out;

        if(posX-x_out === posY-y_out)
          {
            console.log(dist);
            for(var z = 1; z < dist; z++)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY-z && (getXPos(chessPiece[i].x) === posX-z))
                  {
                    console.log("C");
                  return false;
                  }
                
              }
            }
            for(var z = -1; z > dist; z--)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY-z && (getXPos(chessPiece[i].x) === posX-z))
                  {
                    console.log("d");
                  return false;
                  }
              }
            }
            console.log("a");
            return true;             
          }
        if(posX-x_out === y_out-posY)
        {
            var dist = posX-x_out;
            for(var z = 1; z < dist; z++)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY-z && (getXPos(chessPiece[i].x) === posX-z))
                  return false;
              }
            }
            for(var z = -1; z > dist; z--)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY-z && (getXPos(chessPiece[i].x) === posX-z))
                  return false;
              }
            }
          return true;    
        }
        return false;
      }
    if(this.type === "Queen")
      {
        if(posX === x_out)
          {
            var dist = posY-y_out;
            console.log(dist);
            for(var z = 1; z < dist; z++)
            {
              for(i = 0; i < 32; i++)
              {
                if(getXPos(chessPiece[i].x) === posX && (getYPos(chessPiece[i].y) === posY-z))
                  return false;
              }
            }
            for(var z = -1; z > dist; z--)
            {
              for(i = 0; i < 32; i++)
              {
                if(getXPos(chessPiece[i].x) === posX && (getYPos(chessPiece[i].y) === posY-z))
                  return false;
              }
            }
            return true;
          }
        if(posY === y_out)
          {
            var dist = posX-x_out;
            console.log(dist);
            for(var z = 1; z < dist; z++)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY && (getXPos(chessPiece[i].x) === posX-z))
                  return false;
              }
            }
            for(var z = -1; z > dist; z--)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY && (getXPos(chessPiece[i].x) === posX-z))
                  return false;
              }
            }
            return true;            
          }
        if(posX-x_out === posY-y_out)
          {
            var dist = posX-x_out;
            //console.log(dist);
            for(var z = 1; z < dist; z++)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY-z && (getXPos(chessPiece[i].x) === posX-z))
                  return false;
              }
            }
            for(var z = -1; z > dist; z--)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY-z && (getXPos(chessPiece[i].x) === posX-z))
                  return false;
              }
            }
            console.log("a");
            return true;             
          }
        if(posX-x_out === y_out-posY)
        {
            var dist = posX-x_out;
            for(var z = 1; z < dist; z++)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY+z && (getXPos(chessPiece[i].x) === posX+z))
                  return false;
              }
            }
            for(var z = -1; z > dist; z--)
            {
              for(i = 0; i < 32; i++)
              {
                if(getYPos(chessPiece[i].y) === posY+z && (getXPos(chessPiece[i].x) === posX+z))
                  return false;
              }
            }
          return true;    
        }
        return false;

      }
    if(this.type === "King")
      {
        if(posX-x_out >= -1 && posX-x_out<=1 && posY-y_out >= -1 && posY-y_out <=1)
        if(posX-x_out === posY-y_out || posX-x_out === -(posY-y_out))
          return true;
        else if(posX === x_out || posY === y_out)
          return true;
        else return false;
      }
  }
  this.checkForCollission = function(x_out,y_out)
  {
    for(i = 0; i <= 32; i++)
    {
      if(this.i === i)
        continue;
      if(i < 32)
      if(getXPos(chessPiece[i].x) === x_out && getYPos(chessPiece[i].y) === y_out)
      {
        if(chessPiece[i].color === this.color)
          return ["same color",i];
        else
          return ["different color",i];
        break;
      }
      if(i === 32)
        return ["none"];
    }
  }
}
function generatePieces()
{
  chessPiece[0] = new Piece(getX(0),getY(6),"Pawn","White",0);
  chessPiece[1] = new Piece(getX(1),getY(6),"Pawn","White",1);
  chessPiece[2] = new Piece(getX(2),getY(6),"Pawn","White",2);
  chessPiece[3] = new Piece(getX(3),getY(6),"Pawn","White",3);
  chessPiece[4] = new Piece(getX(4),getY(6),"Pawn","White",4);
  chessPiece[5] = new Piece(getX(5),getY(6),"Pawn","White",5);
  chessPiece[6] = new Piece(getX(6),getY(6),"Pawn","White",6);
  chessPiece[7] = new Piece(getX(7),getY(6),"Pawn","White",7);
  chessPiece[8] = new Piece(getX(0),getY(1),"Pawn","Black",8);
  chessPiece[9] = new Piece(getX(1),getY(1),"Pawn","Black",9);
  chessPiece[10] = new Piece(getX(2),getY(1),"Pawn","Black",10);
  chessPiece[11] = new Piece(getX(3),getY(1),"Pawn","Black",11);
  chessPiece[12] = new Piece(getX(4),getY(1),"Pawn","Black",12);
  chessPiece[13] = new Piece(getX(5),getY(1),"Pawn","Black",13);
  chessPiece[14] = new Piece(getX(6),getY(1),"Pawn","Black",14);
  chessPiece[15] = new Piece(getX(7),getY(1),"Pawn","Black",15);
  chessPiece[16] = new Piece(getX(0),getY(7),"Rook","White",16);
  chessPiece[17] = new Piece(getX(7),getY(7),"Rook","White",17);
  chessPiece[18] = new Piece(getX(0),getY(0),"Rook","Black",18);
  chessPiece[19] = new Piece(getX(7),getY(0),"Rook","Black",19);
  chessPiece[20] = new Piece(getX(1),getY(7),"Knight","White",20);
  chessPiece[21] = new Piece(getX(6),getY(7),"Knight","White",21);
  chessPiece[22] = new Piece(getX(1),getY(0),"Knight","Black",22);
  chessPiece[23] = new Piece(getX(6),getY(0),"Knight","Black",23);
  chessPiece[24] = new Piece(getX(2),getY(7),"Bishop","White",24);
  chessPiece[25] = new Piece(getX(5),getY(7),"Bishop","White",25);
  chessPiece[26] = new Piece(getX(2),getY(0),"Bishop","Black",26);
  chessPiece[27] = new Piece(getX(5),getY(0),"Bishop","Black",27);
  chessPiece[28] = new Piece(getX(3),getY(7),"Queen","White",28);
  chessPiece[29] = new Piece(getX(3),getY(0),"Queen","Black",29);
  chessPiece[30] = new Piece(getX(4),getY(7),"King","White",30);
  chessPiece[31] = new Piece(getX(4),getY(0),"King","Black",31);
}

function wykonaj(){
document.getElementById("btn_rozpocznij").hidden="hidden";
ktoryGracz.innerHTML = "Ruch wykonuje gracz nr " + gracz;

canvas.addEventListener('mousedown', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  drag = true;
  dragPiece(mousePos.x, mousePos.y)
}, false);
canvas.addEventListener('touchstart', function(evt) {
  evt.preventDefault();
  var mousePos = getTouchPos(canvas, evt);
  startX = mousePos.x;
  startY = mousePos.y;
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  //document.getElementById("touchstart").innerHTML = "touchstart";
  drag = true;
  dragPiece(mousePos.x, mousePos.y)
}, false);
canvas.addEventListener('mouseup', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  drag = false;
  dragPiece();
}, false);
canvas.addEventListener('touchend', function(evt) {
  evt.preventDefault();
  var mousePos = getTouchPos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  drag = false;
  dragPiece();
}, false);
  canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
  }, false);
canvas.addEventListener('touchmove', function(evt) {
  evt.preventDefault();
  var mousePos = getTouchPos(canvas, evt);
  mouseX = mousePos.x;
  mouseY = mousePos.y;
}, false);
generatePieces();
drawChessBoard();
}
var pawnDir = "";
var gracz = round%2;
var drag = false;
var width = 480/6;
var height = 162/2;
var scale = 0.5;
var chessPiece = [{}];
var ktoryGracz = document.getElementById("ktoryGracz");
var canvas = document.getElementById("szachownica");
canvas.width = 400;
canvas.height = 400;
var ctx = canvas.getContext("2d");
var mouseX, mouseY, pieceI;
var xPlayer1 = 8;
var xPlayer2 = 8;
