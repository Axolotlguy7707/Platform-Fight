import Phaser from "phaser";
import { NormalLevel } from "./scenes/NormalLevel";

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    pixelArt: true,
    backgroundColor: '#00c3ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [NormalLevel]
};

// @ts-ignore
new Phaser.Game(config);