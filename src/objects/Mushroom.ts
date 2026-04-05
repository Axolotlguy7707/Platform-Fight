import Phaser from "phaser";

export class Mushroom extends Phaser.Physics.Arcade.Sprite
{
    speed!: number;
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 'mushroom', 0);

        this.speed = 300;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    initAnims()
    {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('mushroom_idle', {start: 0, end: 6}),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('mushroom_walk', {start: 0, end: 7}),
            frameRate: 24,
            repeat: -1,
        })
    }

    update()
    {
        this.setVelocityX(-this.speed);
    }
}