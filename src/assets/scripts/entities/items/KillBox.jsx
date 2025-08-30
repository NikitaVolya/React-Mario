import Game from "../../../../components/Game/Game";
import Vector2 from "../../Vector2";
import Item from "./Item";



class KillBox extends Item {

    constructor(game, position) {
        super(game, position, new Vector2(Game.GetBlockSize(), Game.GetBlockSize()));
    }

    Use() {

        console.log('GAME OVER');

        this.GetGame().GetPlayer().Die();

    }
}

export default KillBox;