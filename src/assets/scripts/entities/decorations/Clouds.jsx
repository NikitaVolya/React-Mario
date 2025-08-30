import Vector2 from "../../Vector2";
import Game from "../../../../components/Game/Game";
import Decoration from "./Decoration";


class Clouds extends Decoration {


     constructor(game, position) {
        super(game, position, new Vector2(Game.GetBlockSize() * 40, Game.GetBlockSize() * 15));

        this.GetSprite()
            .Load("/clouds.png")
            .SetSpriteNumber(new Vector2(1, 1))
            .SetFrame(0);
    }

}

export default Clouds;