import Game from "../../components/Game/Game";
import GameSprite from "./GameSprite";
import Vector2 from "./Vector2";

const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [11, 11, 11, 11, 11, 11, 0, 0, 0, 11, 11, 11, 11, 11],
    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
]




class MapManager {

    #game;
    #blocksSprites;

    constructor(game) {
        this.#game = game;

        this.#blocksSprites = new GameSprite()
            .Load("/blocks.png")
            .SetSpriteNumber(new Vector2(15, 8));

    }

    CheckColision(position) {
        if (!position || !(position instanceof  Vector2)) {
            throw new TypeError(`MapManager.CheckColision : position must be a valid Vector2`);
        }

        let x = Math.floor(position.GetX() / Game.GetBlockSize());
        let y = Math.floor(position.GetY() / Game.GetBlockSize());

        if (x < 0 || x >= map[0].length)
            return false;
        if (y < 0 || y >= map.length)
            return false;
        return map[y][x] != 0;
    }

    Draw(ctx) {

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const cell = map[y][x];

                if (cell == 0)
                    continue;

                this.#blocksSprites.SetFrame(cell);

                this.#blocksSprites.Draw(
                    ctx, 
                    new Vector2(
                        x * Game.GetBlockSize(),
                        y * Game.GetBlockSize()
                    ),
                    new Vector2(Game.GetBlockSize(), Game.GetBlockSize())
                )
            }
        }
    }

}

export default MapManager;