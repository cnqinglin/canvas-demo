var yyy = document.getElementById('xxx');  //获取canvas
var context = yyy.getContext("2d");   //获取yyy的2d上

/*********/

//设置页面大小

autoSetCanvasSize(yyy)

//监听鼠标事件
 
listenToUser(yyy)

//控制橡皮擦是否开启

var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = true
  actions.className = "actions x"
}
brush.onclick = function(){
   eraserEnabled = false
   actions.className = "actions"
}

/*******/

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
    context.fillStyle = 'black'
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill()
}

/***********************/

function drawLine(x1,y1,x2,y2){
  context.lineWidth=5
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

