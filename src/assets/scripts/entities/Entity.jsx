import GameObject from "../GameObject";
import Vector2 from "../Vector2";

import Game from "../../../components/Game/Game";
import GameSprite from "../GameSprite";
import AnimationStateMachine from "./elements/AnimationStateMachine";
import ColiderBox from "./ColiderBox";


class Entity extends GameObject {

    static GravityVector;

    #velocity;
    #size;
    #speed = 40; 

    #sprite;
    #animationStateMachine;

    #coliderBox;

    #isOnFloar = false;

    constructor(game, position, size) {

        Entity.GravityVector = new Vector2(0, Game.GetBlockSize() * 10)

        super(game, position);

        if (!size || !(size instanceof  Vector2)) {
            throw new TypeError(`[${this.GetId()}] Entity.constructor : size must be a valid Vector2`);
        }
        this.#size = size;

        this.#velocity = Vector2.ZERO();

        this.#sprite = new GameSprite();
        this.#animationStateMachine = new AnimationStateMachine(this);

        this.#coliderBox = new ColiderBox(this);
    }

    Update(deltaTime) {
        super.Update(deltaTime);

        let position = this.GetPosition();

        position.Add(Vector2.Mult(this.#velocity, deltaTime));

        this.#velocity.Add(Vector2.Mult(Entity.GravityVector, deltaTime));
        this.#velocity.SetX(this.#velocity.GetX() * 0.95 );

        const size = this.GetSize();
        let left_point = this.GetPosition()
            .Add(new Vector2(size.GetX() * 0.1, size.GetY()));
        let right_point = this.GetPosition()
            .Add(new Vector2(size.GetX() * 0.9, size.GetY()));

        const mapManager = this.GetGame().GetMapManger();

        if (mapManager.CheckColision(left_point) || mapManager.CheckColision(right_point))
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

        let drawPosition = this.GetPosition();
        drawPosition.Mult(Game.GetDrawScale());

        let drawSize = this.GetSize();
        drawSize.Mult(Game.GetDrawScale());

        ctx.beginPath();
        ctx.rect(
            drawPosition.GetX(),
            drawPosition.GetY(), 
            drawSize.GetX(), 
            drawSize.GetY()
        );
        ctx.stroke();

        this.#sprite.Draw(ctx, this.GetPosition(), this.GetSize());
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