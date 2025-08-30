import Entity from "../Entity";
import Player from "../Player";
import Game from "../../../../components/Game/Game";


class Item extends Entity {

    constructor(game, position, size) {
        super(game, position, size);

        this.SetIsMovable(false);

        this.GetColiderBox()
        .OnColide = entity => {
            if (!(entity instanceof Player))
                return;
            this.Use();
        }
    }

    Use() {

    }
}

export default Item;