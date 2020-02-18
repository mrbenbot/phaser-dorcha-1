class Bomb extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "bomb");
    this.particles = scene.add.particles("fire");
    this.emitter = this.particles.createEmitter({
      speed: 50,
      scale: { start: 0.5, end: 0 },
      blendMode: "ADD",
      followOffset: {
        x: -20,
        y: -30
      },
      follow: this
    });
  }

  fire() {
    this.setPosition(Phaser.Math.Between(0, this.scene.game.canvas.width), 0); // Initial position
    this.setVelocity(0, Phaser.Math.Between(350, 500));
    this.setBounce(0.4);
  }
}
