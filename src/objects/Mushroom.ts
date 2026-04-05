import Phaser from "phaser";

export class Mushroom extends Phaser.Physics.Arcade.Sprite
{
    speed!: number;
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 'mushroom_idle', 0);

        this.speed = 300;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body?.setSize(30, 32);
        this.body?.setOffset(22, 32);


        this.play('mushroom-idle');
    }

    update()
    {
        this.setVelocityX(-this.speed);
    }
}