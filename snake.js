class Snake{
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1        
    }

    move(){
        var newRect;
        if(this.tail[this.tail.length-1].x > canvas.width && this.y < canvas.height ){//오른쪽으로 넘어가는 경우
            console.log("hello")
            newRect = {
                x: 250,
                y: 250
            }
        }else if(this.x > canvas.width && this.y > canvas.height){//왼쪽으로 넘어가는 경우
            this.x = canvas.width
        }else if(this.x > canvas.width && this.y > canvas.height){//위쪽으로 넘어가는 경우
            this.y = 0
        }else if(this.x > canvas.width && this.y > canvas.height){//아래쪽으로 넘어가는 경우
            this.y = canvas.height
        }

        
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length -1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length -1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length -1].x ,
                y: this.tail[this.tail.length - 1].y+ this.size
            }
        }else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length -1].x ,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
}

class Apple{
    constructor(){
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size                        
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for(var i = 0; i < snake.tail.length; i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true
                }
            }
            if(!isTouching){
                break;
            }
            
            
        }
        this.color = "pink"        
        this.size = snake.size
    }
}

var canvas = document.getElementById('canvas')
var snake = new Snake(20, 20, 20);
var apple = new Apple();
var canvasContext = canvas.getContext('2d');
var score = snake.tail.length

window.onload = ()=>{
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/15) //here 15 is our fps value    
}

function show(){
    update();
    draw();
}

function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    console.log("update")
    snake.move()
    eatApple()
}

function eatApple(){
    
    if(snake.tail[snake.tail.length -1].x == apple.x && 
        snake.tail[snake.tail.length -1].y == apple.y) {
            snake.tail[snake.tail.length] = {x:apple.x, y: apple.y}            
            apple = new Apple();          
            score++               
        }

}

function draw(){
    createRect(0, 0, canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)

    for(var i = 0; i < snake.tail.length;i++ ){
        createRect(snake.tail[i].x+2.5, snake.tail[i].y + 2.5,
            snake.size - 4, snake.size - 5, "white")
    }//snake객체에서 정보를 받아와서 snake를 canvas에 출력하는 부분

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42" //canvas배경을 설정하는 부분

    canvasContext.fillText("Score: ", (snake.tail.length +1), 
        canvas.width - 120, 50 );     
    canvasContext.fillText(score,(snake.tail.length + 51), 
    canvas.width - 120, 50 )//canvas 구석에 score를 출력하는 부분        

    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)        
}
 
function createRect(x, y, width, height, color){    
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1
            snake.rotateY = 0;
        }else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotateY = -1;
        }else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotateY = 0;
        }else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0
            snake.rotateY = 1;
        }
    },1)
})


