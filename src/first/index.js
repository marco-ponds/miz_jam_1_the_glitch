import {
    BaseScene,
    Scene,
    AmbientLight,
    Sprite,
    PostProcessing,
    constants
} from 'mage-engine';

const BACKGROUND = '#2D142C';
const WHITE = '#FFFFFF';

import { MAP_HEIGHT, MAP_WIDTH, SPRITE_MAP, first, getPositionFromRowAndCol,  SPRITE_SIZE, first_opacity } from '../levels';

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

        sprite.setPosition(position);
        sprite.setScale({ x: 0.1, y: 0.1 });
        sprite.setOpacity(opacity);
        sprite.addTag(texture);

        return sprite;
    }

    buildMap() {
        for (let row = 0; row < MAP_HEIGHT; row++) {
            for (let col = 0; col < MAP_WIDTH; col++) {
                const type = first[row][col];
                const opacity = first_opacity[row][col];

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
        //this.setAmbientLight();

        this.buildMap();

        // lands in a forest
        // dialog: 'Ouch! what am I doing here? last thing I remember was my player saying he had to download a mod for my game..'
        // 'This is

        //const glitch = PostProcessing.add(constants.EFFECTS.GLITCH);
    }
}

export default FirstScene;
