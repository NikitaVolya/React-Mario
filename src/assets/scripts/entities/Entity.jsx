import GameObject from "../GameObject";
import Vector2 from "../Vector2";

import GameSprite from "../GameSprite";
import AnimationStateMachine from "./elements/AnimationStateMachine";
import ColiderBox from "./ColiderBox";


class Entity extends GameObject {

    static GravityVector = new Vector2(0, 700);

    #velocity;
    #size;
    #speed = 40; 

    #sprite;
    #animationStateMachine;

    #coliderBox;

    #isOnFloar = false;

    constructor(game, position, size) {
        super(game, position);

        if (!size || !(size instanceof  Vector2)) {
            throw new TypeError(`[${this.GetId()}] Entity.constructor : size must be a valid Vector2`);
        }
        this.#size = size;

        this.#velocity = Vector2.ZERO();

        this.#sprite = new GameSprite(this);
        this.#animationStateMachine = new AnimationStateMachine(this);

        this.#coliderBox = new ColiderBox(this);
    }

    Update(deltaTime) {
        super.Update(deltaTime);

        let position = this.GetPosition();

        position.Add(Vector2.Mult(this.#velocity, deltaTime));

        this.#velocity.Add(Vector2.Mult(Entity.GravityVector, deltaTime));
        this.#velocity.SetX(this.#velocity.GetX() * 0.95 );

        if (position.GetY() >= window.innerHeight - this.#size.GetY())
        {    
            this.#velocity.SetY(0);
            this.#isOnFloar = true;
        }
        else {
            this.#isOnFloar = false;
        }

        this.SetPosition(position);

        this.#animationStateMachine.Update();

        this.#coliderBox.Update();
    }

    Draw(ctx) {
        super.Draw(ctx);

        let position = this.GetPosition();

        // ctx.beginPath();
        // ctx.rect(
        //     position.GetX(),
        //     position.GetY(), 
        //     this.#size.GetX(), 
        //     this.#size.GetY()
        // );
        // ctx.stroke();

        this.#sprite.Draw(ctx);
    }

    GetVelocity() { return this.#velocity.Clone(); }

    AddVelocity(vector) { 
        if (!vector || !(vector instanceof  Vector2)) {
            throw new TypeError(`[${this.GetId()}] Entity.AddVelocity : vector must be a valid Vector2`);
        }
        this.#velocity.Add(vector);
    }

    GetSpeed() { return this.#speed }
    SetSpeed(number) { 
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError(`[${this.GetId()}] Entity.SetSpeed : number must be a valid number`);
        }
        this.#speed = number; 
    }

    GetSize() { return this.#size.Clone(); }

    GetSprite() { return this.#sprite; }
    GetAnimationStateMachine() { return this.#animationStateMachine; }

    GetColiderBox() { return this.#coliderBox; }

    IsOnFloar() { return this.#isOnFloar; }
}

export default Entity;