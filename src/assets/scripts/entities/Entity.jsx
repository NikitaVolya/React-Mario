import GameObject from "../GameObject";
import Vector2 from "../Vector2";
import GameSprite from "../GameSprite";


class Entity extends GameObject {

    static GravityVector = new Vector2(0, 675);

    #velocity;
    #size;
    #speed = 40; 
    #sprite;

    #isOnFloar = false;

    constructor(position, size) {
        super(position);

        if (!size || !(size instanceof  Vector2)) {
            throw new TypeError(`[${this.GetId()}] Entity.constructor : size must be a valid Vector2`);
        }
        this.#size = size;

        this.#velocity = Vector2.Zero();
        this.#sprite = new GameSprite(this);
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
    }

    Draw(ctx) {
        super.Draw(ctx);

        let position = this.GetPosition();

        ctx.beginPath();
        ctx.rect(
            position.GetX(),
            position.GetY(), 
            this.#size.GetX(), 
            this.#size.GetY()
        );
        ctx.stroke();

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

    IsOnFloar() { return this.#isOnFloar; }
}

export default Entity;