import {
    BaseScene,
    Scene,
    AmbientLight,
    Models,
    PostProcessing,
    constants,
    Controls,
} from 'mage-engine';

import MainMenu from '../ui/MainMenu';

const BACKGROUND = '#2f3640';
const WHITE = '#FFFFFF';


class FirstScene extends BaseScene {

    progressAnimation = (callback) => {
        const loader = document.querySelector('.loader');
        loader.classList.remove('fadeout', 'invisible');
        setTimeout(() => {
            loader.classList.add('fadeout');
            callback();
        }, 3000);
        setTimeout(() => {
            loader.classList.add('invisible');
        }, 4000);
    };

    setAmbientLight() {
        new AmbientLight({
            color: WHITE,
            intensity: 1,
            name: 'ambientlight'
        });
    }

    onCreate() {
        Controls.setOrbitControl();
        this.enableUI(MainMenu);
        Scene.setClearColor(BACKGROUND);
        this.setAmbientLight();

        const pc = {
            case: Models.getModel('pc.case'),
            monitor: Models.getModel('pc.monitor'),
            keyboard: Models.getModel('pc.keyboard')
        }

        pc.monitor.setPosition({ x: -10 });
        pc.monitor.setColor(constants.COLORS.BLACK);
        pc.monitor.setWireframe(true);

        pc.case.setPosition({ x: -10 });
        pc.case.setColor(constants.COLORS.BLACK);
        pc.case.setWireframe(true);

        pc.keyboard.setPosition({ x: -10 });
        pc.keyboard.setColor(constants.COLORS.BLACK);
        pc.keyboard.setWireframe(true);

        PostProcessing.add(constants.EFFECTS.SELECTIVE_OUTLINE, { selectedObjects: [pc.keyboard, pc.case, pc.monitor] });
        const glitch = PostProcessing.add(constants.EFFECTS.GLITCH);
    }
}

export default FirstScene;
