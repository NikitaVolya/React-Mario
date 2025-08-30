import Game from "../../../../components/Game/Game";
import Vector2 from "../../Vector2";
import AnimationState from "../elements/AnimationState";
import Item from "./Item";



class CoinBox extends Item {

    constructor(game, position){
        super(game, position, new Vector2(Game.GetBlockSize(), Game.GetBlockSize()));

        this.GetSprite()
            .Load("/tiles.png")
            .SetSpriteNumber(new Vector2(10, 4))
            .SetFrame(16);


        this.GetAnimationStateMachine()
            .AddState(new AnimationState("idel", [16, 36], 2))
            .SelectState("idel");

        
    }

    Use() {
        const player = this.GetGame().GetPlayer();

        if (player.GetPosition().GetY() > this.GetPosition().GetY() - this.GetSize().GetY() / 10 &&
                player.GetVelocity().GetY() < Game.GetBlockSize()) {
            this.GetGame().KillEntity(this);
        }
    }

    Draw(ctx) {
        super.Draw(ctx);
    }
}

export default CoinBox;