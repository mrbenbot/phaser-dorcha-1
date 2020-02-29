class Intro extends Phaser.Scene {
  constructor() {
    super("intro");
    this.counter = 5;
  }
  preload() {
    this.load.audio("music", "assets/music.mp3");
    this.load.video("orb_spin", "assets/orb_spin.mp4");
  }

  countDown() {
    if (this.counter > 0) {
      this.displayMiddle.innerHTML = `<h1>${this.counter}</h1>`;
      this.counter--;
      return;
    }
    this.displayMiddle.innerHTML = `<img src="assets/orb-1.png"/>`;
    this.scene.start("Scene-1");
  }
  create() {
    this.displayMiddle = document.querySelector(".display-middle");

    this.music = this.sound.add("music");
    this.video = this.add.video(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "orb_spin"
    );

    this.video.setScale(0.3);

    this.input.on(
      "pointerdown",
      function() {
        this.video.play(true);
        this.music.play();
        game.input.mouse.requestPointerLock();
        this.countDown.bind(this);
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
