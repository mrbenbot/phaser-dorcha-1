var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 400,
  height: 600,
  inputTouchCapture: true,
  inputTouch: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [Scene1]
};

var game = new Phaser.Game(config);
