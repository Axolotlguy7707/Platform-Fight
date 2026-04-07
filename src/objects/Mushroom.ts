import Phaser from "phaser";



export class Mushroom extends Phaser.Physics.Arcade.Sprite
{
    speed!: number;

    direction!: number;

    id!: any;
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 'mushroom_idle', 0);

        this.speed = 100;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body?.setSize(30, 32);
        this.body?.setOffset(22, 32);

        // @ts-ignore
        this.body.checkCollision.left = true;
        // @ts-ignore
        this.body.checkCollision.right = true;



        this.play('mushroom-walk');

        this.direction = -1;

        this.id = Phaser.Math.RND.uuid();
    }

    update()
    {
        this.setVelocityX(this.direction * this.speed);

        if (this.body?.blocked.left) {
            this.direction = 1;
            this.x += 2; // push away from wall
        }
        if (this.body?.blocked.right) {
            this.direction = -1;
            this.x -= 2;
        }




    }


}