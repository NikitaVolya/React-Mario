import Entity from "../Entity";



class Decoration extends Entity {

    constructor(game, position, size) {
        super(game, position, size);

        this.SetIsMovable(false);
        this.GetColiderBox().SetCanColide(false);

        this.GetSprite().SetDrawOrder(-1);
    }
}


export default Decoration;