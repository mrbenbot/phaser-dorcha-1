const rootDiv = document.querySelector("#phaser-root");

var config = {
  type: Phaser.AUTO,
  scale: {
    parent: rootDiv,
    mode: Phaser.Scale.FIT,
    width: 400,
    height: 600
  },
  inputTouchCapture: true,
  inputTouch: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: [Intro, Scene1]
};

var game = new Phaser.Game(config);
