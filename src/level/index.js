import {
    BaseScene,
    Scene,
    AmbientLight,
    Sprite,
    Scripts,
    PostProcessing,
    constants
} from 'mage-engine';

import PlayerScript from './playerscript';

const BACKGROUND = '#2D142C';
const WHITE = '#FFFFFF';

import {
    MAP_HEIGHT,
    MAP_WIDTH,
    SPRITE_MAP,
    LEVEL,
    getPositionFromRowAndCol,
    SPRITE_SIZE,
    LEVEL_TRANSPARENCY,
    INITIAL_ROW,
    INITIAL_COL,
    COLOR_MAP,
    ENEMIES_POSITIONS
} from '../levels';

class FirstScene extends BaseScene {

    progressAnimation = (callback) => {
        const loader = document.querySelector('.loader');
        loader.classList.remove('fadeout', 'invisible');
        setTimeout(() => {
            loader.classList.add('fadeout');
            callback();
        }, 1000);
        setTimeout(() => {
            loader.classList.add('invisible');
        }, 2000);
    };

    setAmbientLight() {
        new AmbientLight({
            color: WHITE,
            intensity: 1,
            name: 'ambientlight'
        });
    }

    createSprite(texture, position, opacity) {
        const sprite = new Sprite(SPRITE_SIZE, SPRITE_SIZE, texture);
        const color = COLOR_MAP[texture];

        sprite.setPosition(position);
        sprite.setScale({ x: 0.1, y: 0.1 });
        sprite.setOpacity(opacity);
        sprite.addTag(texture);

        if (color) {
            sprite.setColor(color);
        }

        return sprite;
    }

    addPlayer() {
        const position = getPositionFromRowAndCol(INITIAL_ROW, INITIAL_COL, SPRITE_SIZE, 0.1);
        
        this.player = new Sprite(SPRITE_SIZE, SPRITE_SIZE, 'player');
        this.player.setPosition(position);
        this.player.setScale({ x: 0.1, y: 0.1 });
        this.player.setOpacity(1);

        this.player.addScript('player');
    }

    addEnemies() {
        ENEMIES_POSITIONS.forEach(enemyType => {
             ENEMIES_POSITIONS[enemyType].forEach(({ row, col}) => {
                const position = getPositionFromRowAndCol(row, col, SPRITE_SIZE, 0.1);
                
                const enemy = new Sprite(SPRITE_SIZE, SPRITE_SIZE, enemyType);
                enemy.setPosition(position);
                enemy.setScale({ x: 0.1, y: 0.1 });
                enemy.setOpacity(1);

                if (!this.enemies[enemyType]) {
                    this.enemies[enemyType] = [];
                }

                enemy.addTags(['enemy', enemyType]);
                enemy.index = this.enemies[enemyType].length;

                this.enemies[enemyType].push(enemy);
             });
        });
    }

    buildMap() {
        for (let row = 0; row < LEVEL.length; row++) {
            for (let col = 0; col < MAP_WIDTH; col++) {
                const type = LEVEL[row][col];
                const opacity = LEVEL_TRANSPARENCY[row][col];

                if (type !== 0) {
                    const texture = SPRITE_MAP[type];
                    const position = getPositionFromRowAndCol(row, col, SPRITE_SIZE, 0.1)

                    this.createSprite(texture, position, opacity);
                }
            }
        }
    }

    onCreate() {
        Scene.setClearColor(BACKGROUND);
        window.camera = Scene.getCamera();

        Scripts.create('player', PlayerScript);

        PostProcessing.add(constants.EFFECTS.PIXEL, { pixelSize: 4 });

        this.buildMap();
        this.addPlayer();

        this.enemies = {};
        // this.addEnemies();
    }
}

export default FirstScene;
