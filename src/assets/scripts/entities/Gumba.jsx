import Entity from "./Entity";

import Vector2 from "../Vector2";
import AnimationState from "./elements/AnimationState";


class Gumba extends Entity {

    #moveVector

    constructor(game, position) {
        super(game, position, new Vector2(100, 100));

        this.SetSpeed(2);

        this.GetSprite()
            .Load("/gumba.png")
            .SetSpriteNumber(new Vector2(4, 1))
            .SetFrame(1);
        
        this.GetAnimationStateMachine().AddState(new AnimationState("walk", [1, 2], 1));
        this.GetAnimationStateMachine().SelectState("walk");

        this.#moveVector = Vector2.LEFT().Mult(this.GetSpeed());
    }

    Update(deltaTime) {
        super.Update(deltaTime);

        this.AddVelocity(this.#moveVector);
    }
}

export default Gumba;