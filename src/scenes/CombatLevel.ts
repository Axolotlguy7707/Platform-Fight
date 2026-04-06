import Phaser from "phaser";

export class CombatLevel extends Phaser.Scene
{
    mushroom!: Phaser.Physics.Arcade.Sprite;

    constructor()
    {
        super({ key: 'CombatLevel' });
    }

    preload()
    {
        this.load.spritesheet("mushroom_walk", "assets/images/enemies/mushroom/Mushroom-Run.png", {
            frameWidth: 80,
            frameHeight: 64
        });
    }

    create()
    {
        this.anims.create({
            key: 'mushroom-walk',
            frames: this.anims.generateFrameNumbers('mushroom_walk', { start: 0, end: 7 }),
            frameRate: 24,
            repeat: -1
        });

        this.mushroom = this.physics.add.sprite(0, 0, 'mushroom_walk', 0);
        this.mushroom.play('mushroom-walk');
        // @ts-ignore
        this.mushroom.body?.setAllowGravity(false);
        this.mushroom.setGravity(0, 0);
    }

    update(time: number, delta: number): void {

    }
}