
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var time = 0
var ground;
var PLAY = 1;
var END =0;
var gameState = PLAY;
var restart;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_crash = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.png");
  
  reImage = loadImage("restart.png")
}



function setup() {
 createCanvas(500,250);
  
  monkey = createSprite(40,160,10,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("crash", monkey_crash);
  monkey.scale = 0.13;

  
  ground = createSprite(250,250,700,10);
  ground.addImage(groundImage);
  ground.scale = 0.25
  ground.setCollider("rectangle",0,0,4100,600)
  
  
  restart = createSprite(250,125,10,50);
  restart.addImage(reImage);
  
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
 background("cyan");
   
  text("score:  " + score, 250,15)
  text("survivalTime:  " + time, 350, 15)
  
  monkey.collide(ground);
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(ground.x <= 0){
     ground.x = 250;    
   }
  
 if(gameState === PLAY){ 
 
       if(frameCount % 20 === 0){
         time = time+1 
       }
   
     ground.velocityX = -3;
         
      restart.visible = false;   
    if(keyDown("space")&& monkey.y === 135.09){
      monkey.velocityY = -13;
    }
     

    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score = score+1;
    }
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
      monkey.changeAnimation("crash", monkey_crash);
    } 
  
  banana();
  stones();
 }
  
  if(gameState === END){
    
    obstacleGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    
    foodGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    
    restart.visible = true;
    
    
    
      if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  
}

function banana(){
  if(frameCount % 160 === 0){
    var banana = createSprite(505,Math.round(random(30, 135)),10,10);
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}

function stones(){
  if(frameCount % 270 ===0){
    var stone = createSprite(505,150,10,50);
    stone.addImage(obstacleImage);
    stone.scale = 0.13;
    stone.lifetime = 200;   
    stone.velocityX = -5;
    stone.debug = true;
    stone.setCollider("circle",0,0,100);
    obstacleGroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  monkey.changeAnimation("running" , monkey_running);
  score = 0;
  time = 0;
  
}



