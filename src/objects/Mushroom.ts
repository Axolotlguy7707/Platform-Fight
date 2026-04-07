import Phaser from "phaser";

export class Mushroom extends Phaser.Physics.Arcade.Sprite
{
    speed!: number;
    direction!: number;
    id!: string;

    groundLayer!: Phaser.Tilemaps.TilemapLayer;

    constructor(scene: Phaser.Scene, x: number, y: number, groundLayer: Phaser.Tilemaps.TilemapLayer)
    {
        super(scene, x, y, 'mushroom_idle', 0);

        this.speed = 100;
        this.direction = -1;
        this.id = Phaser.Math.RND.uuid();
        this.groundLayer = groundLayer;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body?.setSize(30, 32);
        this.body?.setOffset(22, 32);

        this.play('mushroom-walk');
    }

    update()
    {
        this.setVelocityX(this.direction * this.speed);

        // Turn around on wall hit
        if (this.body?.blocked.left) {
            this.direction = 1;
        }
        if (this.body?.blocked.right) {
            this.direction = -1;
        }

        // EDGE DETECTION
        const nextX = this.x + (this.direction * 16); // look ahead
        const nextY = this.y + 32; // look slightly below feet

        const tile = this.groundLayer.getTileAtWorldXY(nextX, nextY);

        if (!tile) {
            // No ground ahead → turn around
            this.direction *= -1;
        }

        if (this.body?.blocked.down) {
            if (this.direction === -1) {
                this.flipX = false; // facing left
            } else if (this.direction === 1) {
                this.flipX = true;  // facing right
            }
}


    }
}
