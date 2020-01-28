class Orb extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "orb-1");
    this.setScale(0.1);
    this.ySpeed = 0.3;
    this.born = 0;
    this.rotation = Math.random() * 360;
  }

  fire() {
    const randomX = Math.random() * 400;
    this.born = 0;
    this.ySpeed = 0.3;
    this.alpha = 0;
    this.setPosition(randomX, 0); // Initial position
    this.setRotation(this.rotation);
  }
  update(time, delta) {
    if (this.alpha < 1) this.alpha += 0.1;
    this.y += this.ySpeed * delta;
    this.ySpeed *= 1.02;
    this.born += delta;
    if (this.y > 600) {
      this.setActive(false);
      this.setVisible(false);
      this.born = 0;
    }
  }
}
