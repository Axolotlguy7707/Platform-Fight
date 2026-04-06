import Phaser from "phaser";
import { NormalPlayer } from "../objects/NormalPlayer";
import { Mushroom } from "../objects/Mushroom";

// Import assets so Vite can fingerprint + bundle them
// import playerPng from "../assets/images/player.png";
// import mapJson from "../assets/data/maps/level1.json";
// import groundTilesetPng from "../assets/images/tilesets/ground.png";

export class NormalLevel extends Phaser.Scene
{
    player!: NormalPlayer;
    bottom!: number;

    mushrooms!: Phaser.Physics.Arcade.Group;

    constructor()
    {
        super({ key: 'NormalLevel'});
    }

    preload()
    {
        // Spritesheet
        this.load.spritesheet("player", "assets/images/player.png", {
            frameWidth: 32,
            frameHeight: 48
        });

        // Tilemap JSON
        this.load.tilemapTiledJSON("map", "assets/data/maps/level1.json");

        // Tileset image
        this.load.image("groundTileset", "assets/images/tilesets/ground.png");

        this.load.spritesheet("mushroom_idle", "assets/images/enemies/mushroom/Mushroom-Idle.png", {
            frameWidth: 80,
            frameHeight: 64
        });
        this.load.spritesheet("mushroom_walk", "assets/images/enemies/mushroom/Mushroom-Run.png", {
            frameWidth: 80,
            frameHeight: 64
        });
    }

    create()
    {
        this.player = new NormalPlayer(this, 300, 0);

        this.player.initAnims();
        this.player.initKeys();

        
        this.cameras.main.startFollow(this.player);


        this.mushrooms = this.physics.add.group({
            classType: Mushroom,
            runChildUpdate: true
        });

        this.physics.add.collider(this.player, this.mushrooms, (player, mush) => {
            console.log("Player touched mushroom");
            this.scene.pause('NormalLevel');
            this.scene.launch('CombatLevel');
        });
        

        // Create Mushroom Anims

        this.anims.create({
    key: 'mushroom-idle',
    frames: this.anims.generateFrameNumbers('mushroom_idle', { start: 0, end: 6 }),
    frameRate: 15,
    repeat: -1
});

this.anims.create({
    key: 'mushroom-walk',
    frames: this.anims.generateFrameNumbers('mushroom_walk', { start: 0, end: 7 }),
    frameRate: 24,
    repeat: -1
});




        this.LoadNormalLevel();


    }

    LoadNormalLevel()
    {
        // Create Tilemap
        const map = this.make.tilemap({ key: "map" });

        const groundTileset = map.addTilesetImage("ground", "groundTileset");
        if (!groundTileset) {
            throw new Error("Failed to load ground tileset");
        }

        const groundLayer = map.createLayer("Ground", groundTileset, 0, 0);
        if (!groundLayer) {
            throw new Error("Failed to create ground layer");
        }
        groundLayer.setCollisionByExclusion([-1]);

        this.physics.add.collider(this.player, groundLayer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Spawn Player from Object Layer
        const playerLayer = map.getObjectLayer("Player");
        if (!playerLayer) {
            throw new Error("Player layer not found in map");
        }

        playerLayer.objects.forEach(obj => {
            this.player.setPosition(obj.x ?? 0, obj.y ?? 0);
            this.player.setOrigin(0, 1);
        });

        this.bottom = map.heightInPixels;

        // Spawn Mushrooms

        const mushLayer = map.getObjectLayer("Mushrooms");
        if (mushLayer) {
            mushLayer.objects.forEach(obj => {
            const mush = new Mushroom(this, obj.x ?? 0, obj.y ?? 0);
            this.mushrooms.add(mush);
        });

        this.physics.add.collider(this.mushrooms, groundLayer);
}

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
