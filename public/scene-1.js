class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene-1" });
    this.score = 0;
  }

  preload() {
    this.load.image("orb-1", "assets/orb-1-small.png");
    this.load.image("bomb", "assets/bomb-1.png");
    this.load.image("hand", "assets/hand-small.png");
    this.load.image("fire", "assets/fire.png");
  }
  create() {
    // this.physics.world.setBounds(0, 0, 400, 600);
    this.displayTop = document.querySelector(".display-top");
    this.displayMiddle = document.querySelector(".display-middle");
    this.hand = this.physics.add.image(200, 500, "hand");
    this.hand.body.immovable = true;
    this.hand.body.moves = false;
    this.hand.allowGravity = false;

    this.orbs = this.physics.add.group({
      classType: Orb,
      collideWorldBounds: true,
      velocityY: 500
    });

    this.bombs = this.physics.add.group({
      classType: Bomb
    });

    this.physics.add.collider(
      this.hand,
      this.orbs,
      this.handleCollision.bind(this)
    );

    this.physics.add.collider(
      this.hand,
      this.bombs,
      this.handleCollision.bind(this)
    );

    this.input.keyboard.on(
      "keydown_Q",
      function(event) {
        if (game.input.mouse.locked) game.input.mouse.releasePointerLock();
      },
      0,
      this
    );
    this.input.on(
      "pointerdown",
      function() {
        game.input.mouse.requestPointerLock();
      },
      this
    );

    this.input.on(
      "pointermove",
      function(pointer) {
        if (this.input.mouse.locked) {
          this.hand.x += pointer.movementX;
        } else if (pointer.isDown) {
          this.hand.x = pointer.x + 200;
        }
      },
      this
    );

    this.time.addEvent({
      delay: 2000, // ms
      callback: this.fireOrb,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 10000, // ms
      callback: this.fireBomb.bind(this)
    });
    this.time.addEvent({
      delay: 20000, // ms
      callback: this.fireMoreOrbs.bind(this)
    });
  }
  fireMoreOrbs() {
    this.fireOrb();
    this.time.addEvent({
      delay: Phaser.Math.Between(500, 3000), // ms
      callback: this.fireMoreOrbs.bind(this)
    });
  }

  fireOrb() {
    this.displayMiddle.innerHTML = `<img src="assets/orb-1.png"/>`;
    var orb = this.orbs
      .get()
      .setActive(true)
      .setVisible(true);

    if (orb) {
      orb.fire();
    }
  }
  fireBomb() {
    this.displayMiddle.innerHTML = `<img src="assets/bomb-1.png"/>`;
    var bomb = this.bombs
      .get()
      .setActive(true)
      .setVisible(true);

    if (bomb) {
      bomb.fire();
    }
    this.time.addEvent({
      delay: Phaser.Math.Between(1000, 7000), // ms
      callback: this.fireBomb.bind(this)
    });
  }
  handleCollision(hand, object) {
    if (object instanceof Orb) {
      const distance = Math.abs(
        this.hand.x - this.hand.width / 2 + object.width - object.x
      );
      if (distance < 30 && distance > 0) {
        object.setActive(false).setVisible(false);
        this.updateScore(1);
        return;
      }
      object.setVelocityX(
        object.x < this.game.canvas.width / 2
          ? Phaser.Math.Between(-100, -50)
          : Phaser.Math.Between(100, 50)
      );
      return;
    }
    if (object instanceof Bomb) {
      object.emitter.setPosition(500, -100);
      object.destroy();
      this.updateScore(-5);
    }
  }
  updateScore(amount) {
    this.score += amount;
    if (this.score < 0) {
      this.score = 0;
    }
    let stringScore = `${this.score}`;
    let zeros = new Array(6 - stringScore.length).fill("0").join("");
    this.displayTop.innerHTML = zeros + stringScore;
  }
}
