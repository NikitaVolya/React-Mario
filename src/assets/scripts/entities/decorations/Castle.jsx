import Decoration from "./Decoration";
import Vector2 from "../../Vector2";
import Game from "../../../../components/Game/Game";


class Castle extends Decoration {

    constructor(game, position) {
        super(game, position, new Vector2(Game.GetBlockSize() * 5, Game.GetBlockSize() * 5));

        this.GetSprite()
            .Load("/castle.png")
            .SetSpriteNumber(new Vector2(1, 1))
            .SetFrame(0);
    }
}

export default Castle;