
//获取画布
var canvas = document.getElementById('canvas')
var content = canvas.getContext('2d')
var lineWidth=3
autoSetCanvasSize(canvas)
listenToUser(canvas)

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    pen.classList.remove('active')
    eraser.classList.add('active')
}
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
clear.onclick=function(){
    content.clearRect(0, 0, canvas.width, canvas.height);
}
download.onclick=function(){
    var url=canvas.toDataURL('image/png')
    var a=document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download='filename'
    a.click()
}

black.onclick=function(){
    content.fillStyle='black'
    content.strokeStyle='black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick=function(){
    content.fillStyle='red'
    content.strokeStyle='red'
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick=function(){
    content.fillStyle='green'
    content.strokeStyle='green'
    green.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick=function(){
    content.fillStyle='blue'
    content.strokeStyle='blue'
    blue.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    green.classList.remove('active')
}
thin.onclick=function(){
    lineWidth=3
}
thick.onclick=function(){
    lineWidth=6
}


//初始化白色画布背景
function initCanvas(content,x,y){
    content.fillStyle='white'
    content.fillRect(0,0,x,y)
}
//画线
function drawLine(x1, y1, x2, y2) {
    content.beginPath()
    content.moveTo(x1, y1)
    content.lineWidth = lineWidth
    content.lineTo(x2, y2)
    content.stroke()
    content.closePath()
}
//监听视窗大小画布自适应
function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
        initCanvas(content,pageWidth,pageHeight)
    }
}
//监听鼠标操作
function listenToUser(canvas) {
    //开始画的状态
    var using = false

    var lastPoint = {
        'x': undefined,
        'y': undefined
    }
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (aaa) {
            using = true
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (eraserEnabled) {
                content.clearRect(x - 5, y - 5, 20, 20)
            }
            lastPoint['x'] = x
            lastPoint['y'] = y
        }
        canvas.ontouchmove = function (aaa) {
            if (!using) {
                return
            }
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (eraserEnabled) {
                content.clearRect(x - 5, y - 5, 20, 20)
            } else {
                var newPoint = {
                    'x': x,
                    'y': y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)

                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function (aaa) {
            using = false
        }
    } else {
        canvas.onmousedown = function (aaa) {
            using = true
            var x = aaa.clientX
            var y = aaa.clientY
            if (eraserEnabled) {
                content.clearRect(x - 5, y - 5, 20, 20)
            }
            lastPoint['x'] = x
            lastPoint['y'] = y

        }
        canvas.onmousemove = function (aaa) {
            if (!using) {
                return
            }
            var x = aaa.clientX
            var y = aaa.clientY
            if (eraserEnabled) {
                content.clearRect(x - 5, y - 5, 20, 20)
            } else {
                var newPoint = {
                    'x': x,
                    'y': y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)

                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}