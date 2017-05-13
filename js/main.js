//this game will have only 1 state
var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('chicken', 'assets/images/chicken.png');
    this.load.image('horse', 'assets/images/horse.png');
    this.load.image('pig', 'assets/images/pig.png');
    this.load.image('sheep', 'assets/images/sheep3.png');
    this.load.image('arrow', 'assets/images/arrow.png');
  },
  //executed after everything is loaded
  create: function() {

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.background = this.game.add.sprite(0, 0, 'background');
    
    // this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
    // this.chicken.anchor.setTo(0.5);
    // this.chicken.scale.setTo(2,1);

    // this.horse = this.game.add.sprite(120, 10, 'horse');
    // this.horse.scale.setTo(0.5);

    // this.pig = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pig');
    // this.pig.anchor.setTo(0.5);
    // this.pig.scale.setTo(-1, 1);

    //enable input on pig
    // this.pig.inputEnabled = true;
    // this.pig.input.pixelPerfectClick = true;
    // this.pig.events.onInputDown.add(this.animateAnimal, this);

    //group for animals
    var animalData = [
      {key: 'chicken', text: 'CHICKEN'},
      {key: 'horse', text: 'HORSE'},
      {key: 'pig', text: 'PIG'},
      {key: 'sheep', text: 'SHEEP'},
    ]

    this.animals = this.game.add.group();

    var self = this;
    var animal;

    animalData.forEach(function(element){
      animal = self.animals.create(-1000, this.game.world.centerY, element.key);
      
      animal.customParams = {text: element.text};
      animal.anchor.setTo(0.5);

      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.events.onInputDown.add(self.animateAnimal, self);
    });

    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY)
    

    // this.sheep = this.game.add.sprite(100, 250, 'sheep');
    // this.sheep.scale.setTo(0.5);
    // this.sheep.anchor.setTo(0.5);
    // this.sheep.angle = -45;

    //left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.customParams = {direction: -1};

    //left arrow allow user input
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    //right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.customParams = {direction: 1};

    //right arrow allow user input
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
  },
  //this is executed multiple times per second
  update: function() {
    // this.sheep.angle += 0.5;
  },
  animateAnimal: function(sprite, event){
    
  },
  switchAnimal: function(sprite, event){
    
    if (this.isMoving) { return false;}

    this.isMoving = true;

    var newAnimal, endX;

    //1. get the direction of the arrow
    if (sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      newAnimal.x = -newAnimal.width/2;
      endX = 640 + this.currentAnimal.width/2;
    }else{
      newAnimal = this.animals.previous();
      newAnimal.x = 640 + newAnimal.width/2;
      endX = - this.currentAnimal.width/2;
    }

    var newAnimalMovement = game.add.tween(newAnimal);
    newAnimalMovement.to({x: this.game.world.centerX}, 1000);//this tween will take 1 second by defualt, we added the 1 second anyway
    newAnimalMovement.onComplete.add(function(){
      this.isMoving = false;
    }, this);
    newAnimalMovement.start();

    var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
    currentAnimalMovement.to({x: endX});
    currentAnimalMovement.start();

    // this.currentAnimal.x = endX;

    // newAnimal.x = this.game.world.centerX;
    this.currentAnimal = newAnimal;

    //2. get next animal
    //3. get final destination of current animal
    //4. move current animal to final destination
    //5. set the next animal as the new current animal
  }
  

};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');