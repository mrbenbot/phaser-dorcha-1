class Intro extends Phaser.Scene {
  constructor() {
    super("intro");
    this.counter = 3;
  }
  preload() {
    this.load.audio("music", "assets/music.mp3");
  }
  countDown() {
    if (this.counter > 0) {
      this.text.text = this.counter;
      this.displayMiddle.innerHTML = `<h1>${this.counter}</h1>`;
      this.counter--;
      return;
    }
    this.displayMiddle.innerHTML = `<img src="assets/orb-1.png"/>`;
    this.scene.start("Scene-1");
  }

  create() {
    var music = this.sound.add("music");

    this.text = this.add.text(
      100,
      this.game.canvas.height + 20,
      "CLICK HERE TO START GAME!!"
    );
    this.displayMiddle = document.querySelector(".display-middle");
    this.tweens.add({
      targets: this.text,
      x: this.game.canvas.width / 4,
      y: this.game.canvas.height / 2,
      duration: 2000,
      ease: "Elastic",
      easeParams: [1.5, 0.5]
    });

    this.input.on(
      "pointerdown",
      function() {
        music.play();
        game.input.mouse.requestPointerLock();
        this.countDown();
        this.time.addEvent({
          delay: 1000, // ms
          callback: this.countDown,
          callbackScope: this,
          loop: true
        });
      },
      this
    );
  }
}
