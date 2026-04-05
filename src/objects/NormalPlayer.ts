import Phaser from "phaser";

export class NormalPlayer extends Phaser.Physics.Arcade.Sprite
{
    speed!: number;
    jumpForce!: number;
    keys!: any;
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 'player', 0);

        this.speed = 400;
        this.jumpForce = 300;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    initAnims()
    {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1,
        })
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
            frameRate: 5,
            repeat: -1,
        })
    }

    initKeys()
    {
        // @ts-ignore
        this.keys = this.scene.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D",
            jump: "Space",
            dash: "K"
        });
    }

    update()
    {
        
        this.setVelocityX(0);

        if (this.keys.left.isDown)
        {
            this.setVelocityX(-this.speed);
            this.flipX = true;
        }
        if (this.keys.right.isDown)
        {
            this.setVelocityX(this.speed);
            this.flipX = false;
        }
        if (this.keys.jump.isDown && this.body?.blocked.down)
        {
            this.setVelocityY(-this.jumpForce);
        }

        if (this.body?.velocity.length() !== 0)
        {
            this.anims.play('walk', true);
        }
        else
        {
            this.anims.play('idle', true);
        }
    }
}