import Phaser from "phaser";
import { NormalLevel } from "./scenes/NormalLevel";

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [NormalLevel]
};

// @ts-ignore
new Phaser.Game(config);