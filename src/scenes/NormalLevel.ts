import Phaser from "phaser";
import { NormalPlayer } from "../objects/NormalPlayer";

export class NormalLevel extends Phaser.Scene
{
    player!: NormalPlayer;

    bottom!: number;
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
        // Create Tilemap
        const map = this.make.tilemap({ key: 'map'});

        const groundTileset: any = map.addTilesetImage('ground', 'groundTileset');

        const groundLayer: any = map.createLayer("Ground", groundTileset, 0, 0);
        groundLayer.setCollisionByExclusion([-1]);

        this.physics.add.collider(this.player, groundLayer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Spawn Player

        const playerLayer: any = map.getObjectLayer('Player');

        // @ts-ignore
        playerLayer.objects.forEach(obj => {
            this.player.setPosition(obj.x, obj.y);
            this.player.setOrigin(0, 1);
        })

        this.bottom = map.heightInPixels;
    }

    update()
    {
        this.player.update();

        if (this.player.y > this.bottom)
        {
            console.log("Player fell below the map");


        }

    }
}