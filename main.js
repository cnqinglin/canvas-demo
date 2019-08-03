var yyy = document.getElementById('xxx');  //获取canvas
var context = yyy.getContext("2d");   //获取yyy的2d上
var lineWidth = '5';
/*********/

//设置页面大小

autoSetCanvasSize(yyy)

//监听鼠标事件
 
listenToUser(yyy)

//控制橡皮擦是否开启

var eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true;
  eraser.classList.add('active')
  pen.classList.remove('active')
}
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height)
}
download.onclick = function(){
  var url = yyy.toDataURL('img/png')  
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'
  a.target = '_blank'
  a.click()
}



red.onclick = function(){
  context.fillStyle = 'red';
  context.strokeStyle = 'red';
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function(){
  context.strokeStyle = 'green';
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  context.strokeStyle = 'blue';
  blue.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
}


thin.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 10
}




/*********/

function autoSetCanvasSize(canvas){
    setCanvasSize()

  window.onresize = function(){          //监听页面大小变化
  setCanvasSize()
} 

function setCanvasSize(){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight

  canvas.width = pageWidth
  canvas.height = pageHeight
}
}

/**********************/

function drawCircle(x,y,radius){
    context.beginPath();   
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill()
}

/***********************/

function drawLine(x1,y1,x2,y2){
  context.lineWidth=lineWidth
  context.beginPath()
  context.moveTo(x1,y1)
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()

}

/****************************/

function listenToUser(canvas) {
  
  var using = false
  var lastPoint={x:undefined,y:undefined}
  //特性检测
  if(document.body.ontouchstart !== undefined){
    //支持触屏设备
    canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x,y)
      using = true
      
      if(eraserEnabled){
         context.clearRect(x-5,y-5,20,20)
      }else{
         lastPoint = {
           'x':x,'y':y
         }     
      }
    }
  
    canvas.ontouchmove = function(aaa){
      console .log("边摸变动")
      var x = aaa.touches[0].clientX    //多点触摸，选择第零个项
       var y = aaa.touches[0].clientY
     
       if(!using){return}
       if(eraserEnabled){
          context.clearRect(x-5,y-5,20,20)
        }else{
        var newPoint = {"x":x,"y":y}
        drawCircle(x,y,1)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
        }
    }
  
    canvas.ontouchend = function(){
      console .log("结束")
      using = false
    }
  }else{
    //不支持触屏设备
    canvas.onmousedown = function(aaa) {
    
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      
      if(eraserEnabled){
         context.clearRect(x-5,y-5,20,20)
      }else{
         lastPoint = {
           'x':x,'y':y
         }     
      }
    }
    canvas.onmousemove = function(aaa){
       var x = aaa.clientX
       var y = aaa.clientY
     
       if(!using){return}
       if(eraserEnabled){
          context.clearRect(x-5,y-5,20,20)
        }else{
        var newPoint = {"x":x,"y":y}
        drawCircle(x,y,1)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
        }
      }
      canvas.onmouseup = function(aaa){
          using = false
          eraserEnabled = false
      }
  }
  
}

