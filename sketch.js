var canvas
var bg, bgImage
var player, playerImg
var bunnyImage
var logImage
var coinImage
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround
var life1, life2, life3
var logCount = 0
var restartButton
var restartImage


function preload(){ 
bgImage = loadImage("forestImage.png");
playerImage = loadAnimation("cheeta1.png","cheeta2.png","cheeta3.png","cheeta4.png","cheeta5.png",
"cheeta6.png","cheeta7.png","cheeta8.png")
bunnyImage = loadImage("bunnyImage.png")
logImage = loadImage("logImage.png")
coinImage = loadImage("coinImage.png")
lifeImage = loadImage("lifeImage.png")
restartImage = loadImage("restartImage.png")
}

function setup(){
  createCanvas(800,250);
  bg = createSprite(450,150);
  bg.addImage(bgImage);
  bg.scale = 1.45
  bg.velocityX = -3

  player = createSprite(100,200);
  player.addAnimation("cheeta", playerImage);
  player.scale = 0.6

 invisibleGround = createSprite(100,250,800,10)
invisibleGround.visible = false

life1 = createSprite(50,40)
life1.addImage(lifeImage)
life1.scale = 0.01
life2 = createSprite(80,40)
life2.addImage(lifeImage)
life2.scale = 0.01
life3 = createSprite(110,40)
life3.addImage(lifeImage)
life3.scale = 0.01

logGroup = new Group()
coinGroup = new Group()

restartButton = createSprite(250,200)
restartButton.addImage(restartImage)
restartButton.scale = 0.09
}


function draw(){
background("black");
if(gameState === PLAY){
  if (bg.x < 150){
    bg.x = bg.width/2;
  }
restartButton.visible = false

  obstacle1()
  obstacle2()

if(coinGroup.isTouching(player)){
  score +=5
  coinGroup.destroyEach(0)
}
   
if(logGroup.isTouching(player)){
  logCount = logCount+1
  logGroup.destroyEach(0)
  console.log(logCount)
  score -=5
}
if(logCount>=1){
  life3.visible = false
}
if(logCount>=2){
  life2.visible = false
}
if(keyDown("space")&& player.y >= 100) {
  player.velocityY = -12;
}


player.velocityY = player.velocityY + 0.8





}

else if (gameState === END) {
  invisibleGround.velocityX = 0;
  player.visible = false
  bg.visible = false
  coinGroup.destroyEach(0)
  score = 0
  restartButton.visible = true
  if(mousePressedOver(restartButton)){
    reset()
  }
  }
  

player.collide(invisibleGround);

drawSprites();
textSize(20)
fill("#FFFFFF")
text("Score: "+ score, 650,40);

if(logCount>=1){
  life1.visible = false
  textSize(50)
  fill("#FFFFFF")
  text("GameOver", 200,150)
  gameState = END
  }

}

 
function obstacle1(){
  if (frameCount % 150 === 0){
    var logObstacle = createSprite(750,220,10,40);
    //logObstacle.x = Math.round(random(10,180))
    logObstacle.velocityX = -3;
    logObstacle.addImage(logImage)
    logObstacle.scale = 0.1
    logGroup.add(logObstacle)
      
    }
}

function obstacle2(){
  if (frameCount % 100 === 0){
    var coinObstacle = createSprite(750,220,10,40);
    coinObstacle.y = Math.round(random(20,180))
    coinObstacle.velocityX = -3;
    coinObstacle.addImage(coinImage)
    coinObstacle.scale = 0.1
    coinGroup.add(coinObstacle)
          
      
    }
}

function reset(){
gameState = PLAY
player.visible = true
bg.visible = true 
}

