import React from "react";
import WindowScreen from "./WindowScreen";

import Vector2 from "../../assets/scripts/Vector2";
import Player from "../../assets/scripts/entities/Player";
import Gumba from "../../assets/scripts/entities/Gumba";
import Entity from "../../assets/scripts/entities/Entity";
import MapManager from "../../assets/scripts/MapManager";


class Game extends React.Component {

    static #BlockSize = 100;
    static GetBlockSize() { return this.#BlockSize; }
    static #DrawScale = 0.45;
    static GetDrawScale() { return this.#DrawScale; }


    #player = new Player(
        this,
        new Vector2(100, 100)
    );
    #entities = [
        new Gumba(this, new Vector2(800, 100)),
        new Gumba(this, new Vector2(1000, 100)),
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

            this.#player.Draw(ctx);
        }

        const Update = (deltaTime) => {
            if (!this.#gameCicle)
                return;

            this.#player.Update(deltaTime);

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
            />
        </>
    }
}

export default Game;