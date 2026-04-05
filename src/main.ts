import Phaser from "phaser";
import { NormalLevel } from "./scenes/NormalLevel";

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ENVELOP,   // Same as Construct 3 "Scale Outer"
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 360,
        expandParent: true
    },
    pixelArt: true,
    backgroundColor: '#00c3ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: true
        }
    },
    scene: [NormalLevel]
};

// @ts-ignore
new Phaser.Game(config);
