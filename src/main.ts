import Phaser from "phaser";
import { NormalLevel } from "./scenes/NormalLevel";
import { CombatLevel } from "./scenes/CombatLevel";

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.ENVELOP,
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
            debug: false
        }
    },
    scene: [NormalLevel, CombatLevel]
};

// @ts-ignore
export let game = new Phaser.Game(config);