import Vector2 from "../Vector2";
import Entity from "./Entity";


class Player extends Entity {

    #game;
    #jumpForce;

    constructor(game, position)
    {
        super(position, new Vector2(100, 100));

        this.#game = game;

        this.SetSpeed(20);
        this.#jumpForce = 30;


        this.GetSprite()
            .Load("/mario.png")
            .SetSpriteNumber(new Vector2(8, 6))
            .SetScale(2.5)
            .SetSlice(new Vector2(this.GetSize().GetX() * 0.025, this.GetSize().GetY() * -0.75))
            .SetFrame(0);
    }

    Update(deltaTime) {
        super.Update(deltaTime);

        if (this.#game.GetKey(87) && this.IsOnFloar())  
            this.AddVelocity(new Vector2(0, -10 * this.#jumpForce));
        if (this.#game.GetKey(87) && this.GetVelocity().GetY() < 0)
            this.AddVelocity(new Vector2(0, -this.#jumpForce / 5));
        
        const speed = this.GetSpeed();
        
        if (this.#game.GetKey(65))
            this.AddVelocity(new Vector2(-speed, 0));
        if (this.#game.GetKey(68))
            this.AddVelocity(new Vector2(speed, 0));

        const velocity = this.GetVelocity();
        if (velocity.GetX() > 0)
            this.GetSprite().SetFlip(false);
        else if (velocity.GetX() < 0)
            this.GetSprite().SetFlip(true);
    }

    Draw(ctx) {
        super.Draw(ctx);
    }
}

export default Player;