class Orb extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "orb-1");
  }
  // preUpdate(time, delta) {
  //   super.preUpdate(time, delta);
  //   console.log({ time, delta });
  //   if (time > 10000) {
  //     this.destroy();
  //   }
  // }
  fire() {
    this.setPosition(Phaser.Math.Between(0, this.scene.game.canvas.width), 0); // Initial position
    this.setRotation(Phaser.Math.Between(0, 360));
    this.setVelocity(0, Phaser.Math.Between(350, 500));
    this.setBounce(0.4);
  }
}
