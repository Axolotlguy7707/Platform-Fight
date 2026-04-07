import Phaser from "phaser";

import { moveTowardPoint } from "../systems/MoveTorwardPoint";
import { randomize } from "../systems/Random";

export class CombatLevel extends Phaser.Scene
{
    mushroom!: Phaser.Physics.Arcade.Sprite;

    mushroomSpeed!: number;

    mushroomHealth!: number;

    constructor()
    {
        super({ key: 'CombatLevel' });

        this.mushroomSpeed = 400;

        
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

            this.time.addEvent({
            delay: 1000,       // 1 second
            callback: () => {
            console.log("Loop tick");
            this.randomPosition();
        },
            callbackScope: this,
            loop: true
        });

        this.mushroom.setInteractive();

        this.mushroom.on("pointerdown", () => {
            console.log("Sprite was clicked!");
            this.mushroomHealth += -randomize(5, 10);
        });
    }

    update(time: number, delta: number): void {
        if (this.mushroomHealth <= 0)
        {
            
        }
    }

    randomPosition()
    {
        let randomX: number;
        let randomY: number;

        randomX = randomize(1, 640);
        randomY = randomize(1, 360);

        moveTowardPoint(this.mushroom, randomX, randomY, this.mushroomSpeed);
    }
}