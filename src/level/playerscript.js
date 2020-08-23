import {
    BaseScript,
    Input,
    Scene,
    constants
 } from 'mage-engine';
import { ALLOWED_COLLISIONS } from '../levels';

const SPEED = 0.05

const MIN_X = -1.1;
const MIN_Y = 0;
const MAX_X = 1.1;
const MAX_Y = 0;

const { VECTOR_DOWN, VECTOR_LEFT, VECTOR_RIGHT, DOWN, LEFT, RIGHT } = constants;


export default class Player extends BaseScript {

    constructor() {
        super('player');
    }

    start(mesh) {
        this.mesh = mesh;
        this.camera = Scene.getCamera();

        this.mesh.setColliders(
            [VECTOR_DOWN, VECTOR_LEFT, VECTOR_RIGHT],
            [{ far: 1, near: 0, offset: { y: -0.05 } }, { far: 1, near: 0 }, { far: 1, near: 0 }]
        );
        
        this.movement = {
            up: false,
            down: false,
            right: false,
            left: false
        };
    
        this.speed = 0;
        this.FW_ACC = 0.6;
        this.BW_ACC = 0.6;
        this.climb_speed = 0.2;
        this.bounce_speed = 0.3;

        this.mass = 1;
        this.gravity = 1;

        this.jump = 0.3;
        this.maxSpeed = 1;
        this.maxReverseSpeed = -this.maxSpeed;

        this.speed = 0;
        this.speed_y = 0;
        this.canJump = true;
        this.canFall = true;
        this.canClimb = false;

        Input.enable();
    }

    exponentialEaseOut(k) { return k === 1 ? 10 : - Math.pow(2, - 2 * k) + 5; }

    clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

    isAllowedPosition({ x, y }) {
       return (x < MAX_X && x > MIN_X);
    }

    updateMovement() {
        this.movement = {
            up: Input.keyboard.isPressed('w'),
            down: Input.keyboard.isPressed('s'),
            left: Input.keyboard.isPressed('a'),
            right: Input.keyboard.isPressed('d'),
            space: this.canJump && Input.keyboard.isPressed('space')
        }
    }

    updateSpeed(dt) {

        if (this.movement.right) {
            if (this.speed < 0) {
                this.speed = this.clamp(this.speed + dt * this.FW_ACC * 20, this.maxReverseSpeed, this.maxSpeed);
            } else {
                this.speed = this.clamp(this.speed + dt * this.FW_ACC, this.maxReverseSpeed, this.maxSpeed);
            }
        }

        if (this.movement.left) {
            if (this.speed > 0) {
                // going forward, we're breaking
                this.speed = this.clamp(this.speed - dt * this.BW_ACC * 20, this.maxReverseSpeed, this.maxSpeed);
            } else {
                this.speed = this.clamp(this.speed - dt * this.BW_ACC, this.maxReverseSpeed, this.maxSpeed);
            }
        }

        if (!(this.movement.right || this.movement.left)) {

            if (this.speed > 0) {
                const k = this.exponentialEaseOut(this.speed / this.maxSpeed);
                this.speed = this.clamp(this.speed - k * dt * this.FW_ACC, 0, this.maxSpeed);
            } else {
                const k = this.exponentialEaseOut(this.speed / this.maxReverseSpeed);
                this.speed = this.clamp(this.speed + k * dt * this.BW_ACC, this.maxReverseSpeed, 0);
            }
        }
    }

    isCollisionAllowed(collisions) {
        const { mesh } = collisions[0];

        return ALLOWED_COLLISIONS.filter((element) => mesh.hasTag(element)).length > 0;
    }

    isCollidingWithClimbingPath(collisions) {
        return collisions.filter(({mesh}) => mesh.hasTag('vines') || mesh.hasTag('ladder')).length > 0;
    }

    updateVerticalSpeed(dt) {
        if (this.canFall) {
            this.speed_y -= this.gravity * this.mass * dt;

            if (this.movement.space) {
                this.speed_y = this.jump;
                this.canJump = false;
            }
        }

        if (this.canClimb) {
            if (this.movement.up) {
                this.speed_y = this.climb_speed;
            } else if (this.movement.down) {
                this.speed_y = -this.climb_speed;
            }
        }
    }

    updateCollisions() {
        const { collisions: verticalCollisions } = this.mesh.isCollidingOnDirection(DOWN);
        const { collisions: leftCollisions } = this.mesh.isCollidingOnDirection(LEFT);
        const { collisions: rightCollisions } = this.mesh.isCollidingOnDirection(RIGHT);

        if (this.canFall && verticalCollisions.length && !this.isCollisionAllowed(verticalCollisions)) {
            this.speed_y = Math.max(0, this.speed_y);
        }

        if (leftCollisions.length && !this.isCollisionAllowed(leftCollisions)) {
            this.speed = -this.bounce_speed;
        }

        if (rightCollisions.length && !this.isCollisionAllowed(rightCollisions)) {
            this.speed = this.bounce_speed;
        }

        this.canClimb = verticalCollisions.length && this.isCollidingWithClimbingPath(verticalCollisions);
        this.canFall = !this.canClimb;
        this.canJump = !this.canClimb && this.speed_y === 0;
    }

    updatePosition(dt) {
        const { x, y } = this.mesh.getPosition();
        let newPosition = {
            x: x + this.speed * dt,
            y: y + this.speed_y * dt
        };

        if (!this.isAllowedPosition(newPosition)) {
            newPosition = { x, y };
        }

        this.mesh.setPosition(newPosition);
    }

    updateCamera() {
        const { x, y } = this.mesh.getPosition();
        this.camera.setPosition({ x, y }); // camera following player
    }

    update(dt) {
        this.updateMovement();
        this.updateSpeed(dt);
        this.updateVerticalSpeed(dt);
        this.updateCollisions();
        this.updatePosition(dt);
        this.updateCamera();
    }
}