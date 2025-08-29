import Game from "../../../components/Game/Game";
import Vector2 from "../Vector2";
import Enemy from "./Enemy";
import Entity from "./Entity";

import AnimationState from "./elements/AnimationState";



class Player extends Entity {

    #jumpForce;

    constructor(game, position)
    {
        super(game, 
            position, 
            new Vector2(
                Game.GetBlockSize() * 0.8, 
                Game.GetBlockSize() * 0.8
            )
        );

        this.SetSpeed(20);
        this.#jumpForce = 6 * Game.GetBlockSize();


        this.GetSprite()
            .Load("/mario.png")
            .SetSpriteNumber(new Vector2(8, 6))
            .SetScale(3)
            .SetSlice(new Vector2(this.GetSize().GetX() * 0.025, this.GetSize().GetY() * -1))
            .SetFrame(0);
        
        this.GetAnimationStateMachine().AddState(new AnimationState("walk", [0, 1, 2, 3], 0.25));
        this.GetAnimationStateMachine().AddState(new AnimationState("idle", [0], 10));
        this.GetAnimationStateMachine().AddState(new AnimationState("jump", [5], 10));

        this.GetAnimationStateMachine().SelectState("walk");

        this.GetColiderBox().OnColide = (entity) => {
            if (entity instanceof Enemy)
            {
                if (this.GetVelocity().GetY() > 0)
                {
                    entity.GetColiderBox().SetCanColide(false);
                    entity.GetAnimationStateMachine().SelectState("die");
                    entity.Stop();

                    this.AddVelocity(Vector2.TOP().Mult(this.#jumpForce * 2));
                }
                else
                    this.GetGame().StopGame();
            }
        }
    }

    Update(deltaTime) {
        super.Update(deltaTime);

        const game = this.GetGame();

        if (game.GetKey(87) && this.IsOnFloar())  
            this.AddVelocity(new Vector2(0, -this.#jumpForce));
        if (game.GetKey(87) && this.GetVelocity().GetY() < 0)
            this.AddVelocity(new Vector2(0, -this.#jumpForce * 0.01));
        
        const speed = this.GetSpeed();
        
        if (game.GetKey(65))
            this.AddVelocity(new Vector2(-speed, 0));
        if (game.GetKey(68))
            this.AddVelocity(new Vector2(speed, 0));

        const velocity = this.GetVelocity();
        if (velocity.GetX() > 0)
            this.GetSprite().SetFlip(false);
        else if (velocity.GetX() < 0)
            this.GetSprite().SetFlip(true);

        if (Math.abs(velocity.GetX()) < 5)
            this.AddVelocity(new Vector2(-velocity.GetX(), 0));
        
        const animation_state_machine = this.GetAnimationStateMachine();
        if (!this.IsOnFloar())
            animation_state_machine.SelectState("jump");
        else if (velocity.GetX() == 0)
            animation_state_machine.SelectState("idle");
        else 
            animation_state_machine.SelectState("walk");
    }
}

export default Player;