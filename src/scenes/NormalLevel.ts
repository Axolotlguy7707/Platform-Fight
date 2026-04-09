import Phaser from "phaser";
import { NormalPlayer } from "../objects/NormalPlayer";
import { Mushroom } from "../objects/Mushroom";

export class NormalLevel extends Phaser.Scene
{
    player!: NormalPlayer;
    bottom!: number;
    end!: number;

    mushrooms!: Phaser.Physics.Arcade.Group;


    bgm!: Phaser.Sound.BaseSound;

    constructor()
    {
        super({ key: 'NormalLevel'});
    }

    preload()
    {
        this.load.spritesheet("player", "assets/images/player.png", {
            frameWidth: 32,
            frameHeight: 48
        });

        this.load.tilemapTiledJSON("map", "assets/data/maps/level1.json");
        this.load.image("groundTileset", "assets/images/tilesets/ground.png");

        this.load.spritesheet("mushroom_idle", "assets/images/enemies/mushroom/Mushroom-Idle.png", {
            frameWidth: 80,
            frameHeight: 64
        });

        this.load.spritesheet("mushroom_walk", "assets/images/enemies/mushroom/Mushroom-Run.png", {
            frameWidth: 80,
            frameHeight: 64
        });

        this.load.audio("bgm", "assets/audio/music/Shakedown.mp3");
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

        // @ts-ignore
        this.physics.add.collider(this.player, this.mushrooms, (player, mush: any) => {
            this.scene.pause('NormalLevel');
            this.scene.launch('CombatLevel', { enemyId: mush.id });
        });

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

        // @ts-ignore
        this.events.on(Phaser.Scenes.Events.RESUME, (_scene, data: any) => {
            if (data?.defeated) {
                const mush = this.mushrooms
                    .getChildren()
                    .find((m: any) => m.id === data.enemyId);

                if (mush) {
                    mush.destroy();
                }
            }
        });

        this.LoadNormalLevel();

        // 🎵 Updated: store BGM so we can stop it later
        if (this.cache.audio.has('bgm')) {
            this.bgm = this.sound.add("bgm", {
                loop: true,
                volume: 0.5
            });
            this.bgm.play();
        } else {
            console.log('BGM not loaded');
        }
    }

    LoadNormalLevel()
    {
        const map = this.make.tilemap({ key: "map" });
        const groundTileset = map.addTilesetImage("ground", "groundTileset");

        const groundLayer = map.createLayer("Ground", groundTileset!, 0, 0);
        groundLayer!.setCollisionByExclusion([-1]);

        this.physics.add.collider(this.player, groundLayer!);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        const playerLayer = map.getObjectLayer("Player");

        playerLayer!.objects.forEach(obj => {
            this.player.setPosition(obj.x ?? 0, obj.y ?? 0);
            this.player.setOrigin(0, 1);
        });

        this.bottom = map.heightInPixels;
        this.end = map.widthInPixels;

        const mushLayer = map.getObjectLayer("Mushrooms");

        mushLayer?.objects.forEach(obj => {
            // @ts-ignore
            const mush = new Mushroom(this, obj.x ?? 0, obj.y ?? 0, groundLayer);
            this.mushrooms.add(mush);
        });

        this.physics.add.collider(this.mushrooms, groundLayer!);
    }

    update()
    {
        this.player.update();

        if (this.player.y > this.bottom)
        {
            console.log("Player fell below the map");
            this.die();
        }

        if (this.player.x > this.end)
        {
            console.log("Level Beaten!");
            this.scene.pause('NormalLevel');
            window.location.href = 'win.html';
        }
    }

    die()
    {
        if (this.bgm) {
            this.bgm.stop();
        }

        // Show Game Over UI
        const ui = document.getElementById("gameover-ui");
        ui?.classList.remove("hidden");

        this.scene.pause();
    }
}
