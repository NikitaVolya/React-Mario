
import Game from "../../../components/Game/Game";
import Vector2 from "../Vector2";
import AnimationState from "./elements/AnimationState";
import Enemy from "./Enemy";


class Gumba extends Enemy {

    #moveVector

    constructor(game, position) {
        super(game, position, new Vector2(Game.GetBlockSize(), Game.GetBlockSize()));

        this.SetSpeed(2);

        this.GetSprite()
            .Load("/gumba.png")
            .SetSpriteNumber(new Vector2(4, 1))
            .SetFrame(1);

        const dieState = new AnimationState("die", [0, 3, 3, 3], 0.2);
        dieState.OnAnimationEnd = () => {
            this.GetGame().KillEntity(this);
        }
        
        this.GetAnimationStateMachine().AddState(new AnimationState("walk", [1, 2], 1));
        this.GetAnimationStateMachine().AddState(dieState);

        this.GetAnimationStateMachine().SelectState("walk");

        this.#moveVector = Vector2.LEFT().Mult(this.GetSpeed());
    }

    Stop() {
        this.#moveVector = Vector2.ZERO();
    }

    Update(deltaTime) {
        super.Update(deltaTime);

        this.AddVelocity(this.#moveVector);
    }
}

export default Gumba;