import { Router, store } from 'mage-engine';
// import reducers from './ui/reducers';
import Intro from './intro';
import First from './first';
import Level from './level';

store.createStore(() => {}, {}, true);

const assets = {
    Models: {
        'pc.case': 'assets/models/pc.case.gltf',
        'pc.keyboard': 'assets/models/pc.keyboard.gltf',
        'pc.monitor': 'assets/models/pc.monitor.gltf'
    },
    Textures: {
        'player': 'assets/textures/player.png',
        'skeleton': 'assets/textures/skeleton.png',
        'mage': 'assets/textures/mage.png',
        'ghost': 'assets/textures/ghost.png',
        'bear': 'assets/textures/bear.png',
        'snake': 'assets/textures/snake.png',
        'bat': 'assets/textures/bat.png',


        'tree': 'assets/textures/tree.png',
        'car': 'assets/textures/car.png',
        'truck': 'assets/textures/truck.png',
        'grass': 'assets/textures/grass.png',
        'floor_bricks': 'assets/textures/floor_bricks.png',
        'ceiling_bricks': 'assets/textures/ceiling_bricks.png',
        'wall_bricks': 'assets/textures/wall_bricks.png',
        'chandelier': 'assets/textures/chandelier.png',
        'door_closed': 'assets/textures/door_closed.png',
        'door_open': 'assets/textures/door_open.png',
        'skull_1': 'assets/textures/skull_1.png',
        'skull_2': 'assets/textures/skull_2.png',
        'ladder': 'assets/textures/ladder.png',
        'side_bricks_right': 'assets/textures/side_bricks_right.png',
        'side_bricks_left': 'assets/textures/side_bricks_left.png',
        'floor_bricks_corner_left': 'assets/textures/floor_bricks_corner_left.png',
        'floor_bricks_corner_right': 'assets/textures/floor_bricks_corner_right.png',
        'ceiling_bricks_corner_left': 'assets/textures/ceiling_bricks_corner_left.png',
        'ceiling_bricks_corner_right': 'assets/textures/ceiling_bricks_corner_right.png',
        'red_key': 'assets/textures/red_key.png',
        'yellow_key': 'assets/textures/yellow_key.png',
        'blue_key': 'assets/textures/blue_key.png',
        'metal_bars':'assets/textures/metal_bars.png',
        'spikes':'assets/textures/spikes.png',
        'moving_wall':'assets/textures/moving_wall.png',
        'reversed_stairs_left':'assets/textures/reversed_stairs_left.png',
        'reversed_stairs_right':'assets/textures/reversed_stairs_right.png',
        'stairs_support':'assets/textures/stairs_support.png',
        'reversed_lever_off':'assets/textures/reversed_lever_off.png',
        'reversed_lever_on':'assets/textures/reversed_lever_on.png',
        'reversed_bookshelf_1':'assets/textures/reversed_bookshelf_1.png',
        'reversed_bookshelf_2':'assets/textures/reversed_bookshelf_2.png',
        'reversed_bookshelf_3':'assets/textures/reversed_bookshelf_3.png',
        'library_floor':'assets/textures/library_floor.png',
        'library_ceiling':'assets/textures/library_ceiling.png',
        'cobweb':'assets/textures/cobweb.png',
        '1':'assets/textures/1.png',
        '2':'assets/textures/2.png',
        '3':'assets/textures/3.png',
        'wood_floor':'assets/textures/wood_floor.png',
        'reversed_cauldron':'assets/textures/reversed_cauldron.png',
        'slime_1':'assets/textures/slime_1.png',
        'slime_2':'assets/textures/slime_2.png',
        'slime_3':'assets/textures/slime_3.png',
        'reversed_slime_1':'assets/textures/reversed_slime_1.png',
        'reversed_slime_2':'assets/textures/reversed_slime_2.png',
        'reversed_slime_3':'assets/textures/reversed_slime_3.png',
        'support_beam':'assets/textures/support_beam.png',
        'support_block':'assets/textures/support_block.png',
        'diagonal_left_bottom':'assets/textures/diagonal_left_bottom.png',
        'diagonal_left_up':'assets/textures/diagonal_left_up.png',
        'diagonal_right_up':'assets/textures/diagonal_right_up.png',
        'diagonal_right_bottom':'assets/textures/diagonal_right_bottom.png',
        'soil':'assets/textures/soil.png',
        'reversed_coin':'assets/textures/reversed_coin.png',
        'reversed_minecart':'assets/textures/reversed_minecart.png',
        'vines':'assets/textures/vines.png',
        'trunk':'assets/textures/trunk.png',
        'leaves':'assets/textures/leaves.png',
        'fire':'assets/textures/fire.png',
        'wood_roof_right':'assets/textures/wood_roof_right.png',
        'wood_roof_left':'assets/textures/wood_roof_left.png',
        'wood_roof':'assets/textures/wood_roof.png',
        'wood_window':'assets/textures/wood_window.png',
        'reversed_chandelier': 'assets/textures/reversed_chandelier.png',
        'reversed_door_closed': 'assets/textures/reversed_door_closed.png'
    }
};
const config = {
    screen: {
        h : window ? window.innerHeight : 800,
        w : window ? window.innerWidth : 600,
        ratio : window ? (window.innerWidth / window.innerHeight) : (600/800),
        frameRate : 60,
        alpha: true
    },

    lights: {
        shadows: true
    },

    physics: {
        enabled: false
    },

    tween: {
        enabled: false
    },

    camera : {
        fov : 75,
        near : 0.1,
        far : 3000000
    }
};

window.addEventListener('load', function() {
    Router.on('/', Intro);
    Router.on('/first', First);
    Router.on('/level', Level);
    Router.start(config, assets, '#gameContainer');
});
