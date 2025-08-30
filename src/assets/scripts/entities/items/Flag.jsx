import Game from "../../../../components/Game/Game";
import Vector2 from "../../Vector2";
import Item from "./Item";


class Flag extends Item {


    constructor(game, position) {
        super(game, position, new Vector2(Game.GetBlockSize(), Game.GetBlockSize() * 10));

        this.GetSprite()
            .Load("/flag.png")
            .SetSpriteNumber(new Vector2(1, 1))
            .SetFrame(0);
    }

    Use() {
        this.GetGame().ShowGameWin();
    }
}

export default Flag;