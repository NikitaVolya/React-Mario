import Entity from "../Entity";



class Item extends Entity {

    constructor(game, position, size) {
        super(game, position, size);

        this.SetIsMovable(false);
    }

    Use() {

    }
}

export default Item;