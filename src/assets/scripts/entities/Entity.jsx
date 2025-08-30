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
    #speed = 10; 

    #sprite;
    #animationStateMachine;

    #coliderBox;

    #isOnFloar;
    #isMovable;

    constructor(game, position, size) {

        Entity.GravityVector = new Vector2(0, Game.GetBlockSize() * 15)

        super(game, position);

        if (!size || !(size instanceof  Vector2)) {
            throw new TypeError(`[${this.GetId()}] Entity.constructor : size must be a valid Vector2`);
        }
        this.#size = size;

        this.#velocity = Vector2.ZERO();

        this.#sprite = new GameSprite();
        this.#animationStateMachine = new AnimationStateMachine(this);

        this.#coliderBox = new ColiderBox(this);

        this.#isOnFloar = false;
        this.#isMovable = true;
    }

    #VerticalMove(deltaTime) {
        if (!this.IsMovable())
            return;

        let vY = this.GetVelocity().GetY();

        let nextPos = this.GetPosition()
            .Add(Vector2.DOWN().Mult(vY * deltaTime));
        let size = this.GetSize();

        let left_top_point = Vector2.Add(nextPos,       new Vector2(size.GetX() * 0.1, 0));
        let left_bottom_point = Vector2.Add(nextPos,    new Vector2(size.GetX() * 0.1, size.GetY()));
        let rigth_top_point = Vector2.Add(nextPos,      new Vector2(size.GetX() * 0.9, 0));
        let right_bottom_point = Vector2.Add(nextPos,   new Vector2(size.GetX() * 0.9, size.GetY()));

        const mapManager = this.GetGame().GetMapManger();

        if ((mapManager.CheckColision(rigth_top_point) || mapManager.CheckColision(left_top_point) && vY <= 0))
        {   
            this.SetVelocity(this.GetVelocity().SetY(vY * -0.1));
            if (vY < 0) {
                this.SetPosition(
                    new Vector2(
                        this.GetPosition().GetX(), 
                        Math.floor(nextPos.GetY() / size.GetY() + 1) * size.GetY()
                    )
                );
            }
            return;
        }

        if ( mapManager.CheckColision(left_bottom_point) || mapManager.CheckColision(right_bottom_point))
        {   
            this.SetVelocity(this.GetVelocity().SetY(0));
            if (vY > 0) {
                this.SetPosition(
                    new Vector2(
                        this.GetPosition().GetX(), 
                        Math.floor(nextPos.GetY() / size.GetY()) * size.GetY()
                    )
                );
            }
            this.#isOnFloar = true;
            return;
        }
        else {
            this.#isOnFloar = false;
        }
        
        this.SetPosition(
            this.GetPosition().Add(new Vector2(0, vY * deltaTime))
        );
    }

    #HorizontalMove(deltaTime) {
        if (!this.IsMovable())
            return;

        let vX = this.GetVelocity().GetX()

        let nextPos = this.GetPosition()
            .Add(Vector2.RIGHT().Mult(vX * deltaTime));
        let size = this.GetSize();

        let left_top_point = Vector2.Add(nextPos,       new Vector2(size.GetX() * 0.1, size.GetY() * 0.1 ));
        let left_bottom_point = Vector2.Add(nextPos,    new Vector2(size.GetX() * 0.1, size.GetY() * 0.9 ));
        let rigth_top_point = Vector2.Add(nextPos,      new Vector2(size.GetX() * 0.9, size.GetY() * 0.1 ));
        let right_bottom_point = Vector2.Add(nextPos,   new Vector2(size.GetX() * 0.9, size.GetY() * 0.9 ));

        const mapManager = this.GetGame().GetMapManger();

        if (mapManager.CheckColision(left_top_point) || mapManager.CheckColision(left_bottom_point) ||
            mapManager.CheckColision(rigth_top_point) || mapManager.CheckColision(right_bottom_point))
        {   
            this.SetVelocity(this.GetVelocity().SetX(0));
            return;
        }
        
        this.SetPosition(
            this.GetPosition().Add(new Vector2(vX * deltaTime, 0))
        );
    }

    Update(deltaTime) {
        super.Update(deltaTime);

        this.#velocity.Add(Vector2.Mult(Entity.GravityVector, deltaTime));
        this.#velocity.SetX(this.#velocity.GetX() * 0.95 );

        this.#VerticalMove(deltaTime);
        this.#HorizontalMove(deltaTime);

        this.#animationStateMachine.Update();
        this.#coliderBox.Update();
    }

    Draw(ctx) {
        super.Draw(ctx);

        let drawPosition = this.GetPosition();
        drawPosition.Mult(Game.GetDrawScale());

        let drawSize = this.GetSize();
        drawSize.Mult(Game.GetDrawScale());

        // ctx.beginPath();
        // ctx.rect(
        //     drawPosition.GetX(),
        //     drawPosition.GetY(), 
        //     drawSize.GetX(), 
        //     drawSize.GetY()
        // );
        // ctx.stroke();

        this.#sprite.Draw(ctx, this.GetPosition(), this.GetSize());
    }

    SetVelocity(vector) {
        if (!vector || !(vector instanceof  Vector2)) {
            throw new TypeError(`Entity.SetVelocity : vector must be a valid Vector2`);
        }
        this.#velocity = vector;
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
    IsMovable() { return this.#isMovable; }

    SetIsMovable(value) {
        if (typeof value !== "boolean" || Number.isNaN(value)) {
            throw new TypeError(` Entity.SetIsMovable : value must be a valid boolean`);
        }
        this.#isMovable = value; 
    }
}

export default Entity;