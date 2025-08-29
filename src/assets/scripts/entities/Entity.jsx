import GameObject from "../GameObject";
import Vector2 from "../Vector2";
import GameSprite from "../GameSprite";


class Entity extends GameObject {

    static GravityVector = new Vector2(0, 650);

    #velocity;
    #size;
    #speed = 40; 
    #sprite;

    #isOnFloar = false;

    constructor(position, size) {
        super(position);

        this.#size = size;
        this.#velocity = Vector2.Zero();

        
        this.#sprite = new GameSprite(this, "/mario.png", new Vector2(11, 17));
    }

    Update(deltaTime) {
        let position = this.GetPosition();

        position.Add(Vector2.Mult(this.#velocity, deltaTime));

        this.#velocity.Add(Vector2.Mult(Entity.GravityVector, deltaTime));
        this.#velocity.setX(this.#velocity.getX() * 0.95 );

        if (position.getY() >= window.innerHeight - this.#size.getY())
        {    
            this.#velocity.setY(0);
            this.#isOnFloar = true;
        }
        else {
            this.#isOnFloar = false;
        }

        this.SetPosition(position);
    }

    Draw(ctx) {
        
        let position = this.GetPosition();

        ctx.beginPath();
        ctx.rect(
            position.getX(),
            position.getY(), 
            this.#size.getX(), 
            this.#size.getY()
        );
        ctx.stroke();

        this.#sprite.Draw(ctx);
    }

    AddVelocity(vector) {
        this.#velocity.Add(vector);
    }

    GetSpeed() { return this.#speed }
    SetSpeed(number) { this.#speed = number; }

    GetSize() { return this.#size.Clone(); }

    IsOnFloar() { return this.#isOnFloar; }
}

export default Entity;