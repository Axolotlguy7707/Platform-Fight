import Phaser from "phaser";
import { moveTowardPoint } from "../systems/MoveTorwardPoint";
import { randomize } from "../systems/Random";

export class CombatLevel extends Phaser.Scene
{
    mushroom!: Phaser.Physics.Arcade.Sprite;
    mushroomSpeed = 400;
    mushroomHealth = 30;

    enemyId!: string;

    constructor()
    {
        super({ key: 'CombatLevel' });
    }

    init(data: { enemyId: string })
    {
        this.enemyId = data.enemyId;
        this.mushroomHealth = 30;
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

        this.mushroom = this.physics.add.sprite(320, 180, 'mushroom_walk', 0);
        this.mushroom.play('mushroom-walk');
        // @ts-ignore
        this.mushroom.body.setAllowGravity(false);

        this.randomPosition();

        this.time.addEvent({
            delay: 1000,
            callback: () => this.randomPosition(),
            loop: true
        });

        this.mushroom.setInteractive();

        this.mushroom.on("pointerdown", () => {
            this.mushroomHealth -= randomize(5, 10);
        });

            // Dark overlay behind combat
            this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setDepth(-1);

    }

    update()
    {
        if (this.mushroomHealth <= 0)
        {
            this.scene.stop('CombatLevel');
            this.scene.resume('NormalLevel', {
                enemyId: this.enemyId,
                defeated: true
            });
        }
    }

    randomPosition()
    {
        const randomX = randomize(1, 640);
        const randomY = randomize(1, 360);

        moveTowardPoint(this.mushroom, randomX, randomY, this.mushroomSpeed);
    }
}
