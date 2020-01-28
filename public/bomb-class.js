class Bomb extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "bomb");
    // this.setScale(0.1);
    this.ySpeed = 0.3;
    this.xSpeed = 0;
    this.born = 0;
    var particles = scene.add.particles("fire");
    var emitter = particles.createEmitter({
      speed: 50,
      scale: { start: 0.5, end: 0 },
      blendMode: "ADD"
    });
    emitter.startFollow(this);
  }

  fire() {
    const randomNumb = Math.random();
    this.xSpeed = randomNumb / 2 - 0.25;
    const randomX = randomNumb * 400;
    this.born = 0;
    this.ySpeed = 0.3;
    this.alpha = 0;
    this.setPosition(randomX, 0); // Initial position
    // this.setRotation(this.rotation);
  }
  update(time, delta) {
    if (this.alpha < 1) this.alpha += 0.1;
    this.y += this.ySpeed * delta;
    this.x += this.xSpeed * delta;
    this.ySpeed *= 1.01;
    this.born += delta;
    if (this.y > 600) {
      this.setActive(false);
      this.setVisible(false);
      this.born = 0;
    }
  }
}
