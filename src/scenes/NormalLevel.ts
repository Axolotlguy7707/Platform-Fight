import Phaser from "phaser";
import { NormalPlayer } from "../objects/NormalPlayer";

export class NormalLevel extends Phaser.Scene
{
    player!: NormalPlayer;
    preload()
    {
        this.load.spritesheet('player', "assets/images/player.png", {frameWidth: 32, frameHeight: 48});
        this.load.tilemapTiledJSON('map', 'assets/data/maps/level1.json')
        this.load.image('groundTileset', 'assets/images/tilesets/ground.png')
    }

    create()
    {
        this.player = new NormalPlayer(this, 300, 0);



        this.player.initAnims();

        this.player.initKeys();

        this.LoadNormalLevel();

        this.cameras.main.startFollow(this.player);

        
    }

    

    LoadNormalLevel()
    {
        const map = this.make.tilemap({ key: 'map'});

        const groundTileset: any = map.addTilesetImage('ground', 'groundTileset');

        const groundLayer: any = map.createLayer("Ground", groundTileset, 0, 0);
        groundLayer.setCollisionByExclusion([-1]);

        this.physics.add.collider(this.player, groundLayer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    update()
    {
        this.player.update();
    }
}