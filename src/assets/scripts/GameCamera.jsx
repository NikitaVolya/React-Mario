
import Vector2 from "./Vector2";


class GameCamera {

    #game;
    #position;


    constructor(game, position) {
        this.#game = game;

        this.SetPosition(position);
    }


    GetPosition() { return this.#position.Clone(); }
    SetPosition(vector) {
        if (!vector || !(vector instanceof  Vector2)) {
            throw new TypeError(`GameCamera.SetPosition : vector must be a valid Vector2`);
        }
        this.#position = vector;
    }

    Update(deltaTime) {
        const player = this.#game.GetPlayer();
        const width = window.innerWidth;

        let playerPositionOnScreen = player.GetPosition()
            .Sub(this.#position);

        let numberToCenter = playerPositionOnScreen.GetX() - width * 0.3;
        let distanceToCenter = Math.abs(numberToCenter);

        if (distanceToCenter > width / 12)
        {
            const direction = numberToCenter > 0 ? Vector2.RIGHT() : Vector2.LEFT();
            this.#position.Add(direction.Mult(Math.sqrt(distanceToCenter * 300) * deltaTime))
        }
    }

}

export default GameCamera;