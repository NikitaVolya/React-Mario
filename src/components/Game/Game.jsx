import React from "react";
import WindowScreen from "./WindowScreen";

import Vector2 from "../../assets/scripts/Vector2";
import Player from "../../assets/scripts/entities/Player";
import Gumba from "../../assets/scripts/entities/enemies/Gumba";
import Entity from "../../assets/scripts/entities/Entity";
import MapManager from "../../assets/scripts/MapManager";
import CoinBox from "../../assets/scripts/entities/items/RewardBox";


class Game extends React.Component {

    static #BlockSize = 100;
    static GetBlockSize() { return this.#BlockSize; }
    static #DrawScale = 0.25;
    static GetDrawScale() { return this.#DrawScale; }


    #entities = [
        new Player(this,
            new Vector2(Game.GetBlockSize(), Game.GetBlockSize() * 10)
        ),
        new Gumba(this, new Vector2(Game.GetBlockSize() * 15, Game.GetBlockSize() * 10)),
        new Gumba(this, new Vector2(Game.GetBlockSize() * 18, Game.GetBlockSize() * 10)),
        new CoinBox(this, new Vector2(Game.GetBlockSize() * 21, Game.GetBlockSize() * 8)),
        new CoinBox(this, new Vector2(Game.GetBlockSize() * 23, Game.GetBlockSize() * 8)),
        new CoinBox(this, new Vector2(Game.GetBlockSize() * 16, Game.GetBlockSize() * 8)),
        new CoinBox(this, new Vector2(Game.GetBlockSize() * 22, Game.GetBlockSize() * 3)),
    ];
    #entitiesToKill = [];

    #mapManager;

    #keys = {};
    #frame;

    #gameCicle;

    constructor(props) {
        super(props);

        this.#frame = 0;
        this.#gameCicle = true;

        this.#mapManager = new MapManager(this);
    }

    KillEntity(entity) {
        if (!entity || !(entity instanceof Entity)) {
            throw new TypeError(`[${this.GetId()}] Game.KillEntity : entity must be a valid Entity`);
        }
        this.#entitiesToKill.push(entity.GetId());
    }

    GetMapManger() {
        return this.#mapManager;
    }

    GetFrame() {
        return this.#frame;
    }

    GetKey(key) {
        return this.#keys[key];
    }

    ForEachEntity(func) {
        this.#entities.forEach(entity => func(entity));
    }

    StopGame() {
        this.#gameCicle = false;
    }

    render() {
        const Draw = (ctx) => {

            this.#mapManager.Draw(ctx);

            this.#entities.forEach(
                entity => {
                    entity.Draw(ctx);
                }
            )
        }

        const Update = (deltaTime) => {
            if (!this.#gameCicle)
                return;

            this.#entities = this.#entities.filter(
                entity => { return !this.#entitiesToKill.includes(entity.GetId()); }
            )
            this.#entitiesToKill = [];
            
            this.#entities.forEach(
                entity => {
                    entity.Update(deltaTime);
                }
            )

            this.#frame++;
        };

        const OnKeyDown = (e) => {
            this.#keys[e.keyCode] = true;
        };

        const OnKeyUp = (e) => {
            this.#keys[e.keyCode] = false;
        };

        return <>
            <WindowScreen
                OnDraw={Draw}
                OnUpdate={Update}
                OnKeyUp={OnKeyUp}
                OnKeyDown={OnKeyDown}
                gameCycle={this.#gameCicle}
                BackgroundColor="#5c94fc"
            />
        </>
    }
}

export default Game;