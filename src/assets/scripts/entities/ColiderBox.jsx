import Entity from "./Entity";


class ColiderBox {

    #owner;
    #game;
    #canColide;

    constructor(owner) {
        if (!owner || !(owner instanceof Entity)) {
            throw new TypeError(`ColiderBox.Constructor : owner must be a valid Entity`);
        }

        this.#owner = owner;
        this.#game = owner.GetGame();
        this.#canColide = true;

        this.OnColide = (entity) => {};
    }

    SetCanColide(value) {
        if (typeof value !== "boolean" || Number.isNaN(value)) {
            throw new TypeError(`Owner [${this.#owner.GetId()}}] | ColiderBox.SetCanColide : value must be a valid boolean`);
        }
        this.#canColide = value;
    }
    CanColide() { return this.#canColide; }

    Update() {

        const selfPosition = this.#owner.GetPosition();
        const selfSize = this.#owner.GetSize();

        this.#game.ForEachEntity(
            (entity) => {

                if (entity.GetId() == this.#owner.GetId())
                    return;
                if (!entity.GetColiderBox().CanColide())
                    return;

                const otherPosition = entity.GetPosition();
                const otherSize = entity.GetSize();

                if (
                    !(
                        selfPosition.GetX() + selfSize.GetX() < otherPosition.GetX() ||
                        selfPosition.GetX() > otherPosition.GetX() + otherSize.GetX() ||
                        selfPosition.GetY() + selfSize.GetY() < otherPosition.GetY() ||
                        selfPosition.GetY() > otherPosition.GetY() + otherSize.GetY()
                    )
                ) {
                    this.OnColide(entity);
                }
            }
        )
    }
}


export default ColiderBox;