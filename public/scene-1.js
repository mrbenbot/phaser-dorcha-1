class Scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
  }

  preload() {
    this.load.image("orb-1", "assets/orb-1.png");
    this.load.image("hand", "assets/hand.png");
  }
  create() {
    this.physics.world.setBounds(0, 0, 400, 600);

    this.orbs = this.physics.add.group({
      classType: Orb,
      runChildUpdate: true
    });

    this.hand = this.physics.add.image(200, 500, "hand");
    this.hand.setScale(0.5);
    this.hand.body.velocity.setTo(0, 0);
    this.hand.body.gravity.set(0, 0);

    game.canvas.addEventListener("mousedown", function() {
      game.input.mouse.requestPointerLock();
    });

    this.input.keyboard.on(
      "keydown_Q",
      function(event) {
        if (game.input.mouse.locked) game.input.mouse.releasePointerLock();
      },
      0,
      this
    );

    // Move reticle upon locked pointer move
    // this.input.on(
    //   "pointermove",
    //   function(pointer) {
    //     if (this.input.mouse.locked) {
    //       this.hand.x += pointer.movementX;
    //     }
    //   },
    //   this
    // );

    this.input.addMoveCallback(
      function(pointer) {
        if (this.input.mouse.locked) {
          // this works great on comp but cant work out how to do mobile touch
          this.hand.x += pointer.movementX;
        } else {
          this.hand.x = pointer.screenX + 200;
        }
        console.log(pointer);
      }.bind(this)
    );

    this.time.addEvent({
      delay: 500, // ms
      callback: this.fireBall,
      callbackScope: this,
      loop: true
    });
  }

  fireBall() {
    // Get bullet from bullets group
    var orb = this.orbs
      .get()
      .setActive(true)
      .setVisible(true);

    if (orb) {
      orb.fire();
      // Add collider between bullet and player
      //   this.physics.add.collider(this.hand, orb, this.handleCollision);
    }
  }
  handleCollision(e) {
    console.log("hit");
  }
}
