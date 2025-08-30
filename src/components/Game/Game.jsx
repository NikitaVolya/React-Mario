import React from "react";
import WindowScreen from "./WindowScreen";
import { Link } from "react-router-dom";

import Vector2 from "../../assets/scripts/Vector2";
import Player from "../../assets/scripts/entities/Player";
import Gumba from "../../assets/scripts/entities/enemies/Gumba";
import Entity from "../../assets/scripts/entities/Entity";
import MapManager from "../../assets/scripts/MapManager";
import CoinBox from "../../assets/scripts/entities/items/RewardBox";

import "../../assets/styles/Game.css";


class Game extends React.Component {

    static #BlockSize = 50;
    static GetBlockSize() { return this.#BlockSize; }
    static #DrawScale = 1;
    static GetDrawScale() { return this.#DrawScale; }


    #entities;
    #entitiesToKill;

    #mapManager;

    #keys;
    #frame;

    #gameCicle;

    constructor(props) {
        super(props);

        this.#frame = 0;
        this.#gameCicle = true;

        this.#keys = {};

        this.#entities = [
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
        this.#entitiesToKill = [];

        this.#mapManager = new MapManager(this);

        Game.#DrawScale = Number(localStorage.getItem("drawScale")) ?? 1;

        this.state = {
            showGameOverScreen: false
        }
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
        this.setState({
            showGameOverScreen: true
        })
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
            <Link to="/">
                <button className="return-btn">Back to Menu</button>
            </Link>
            {
                this.state.showGameOverScreen &&
                <div className="gameover-overlay">
                    <div className="gameover-content">
                        <h1>GAME OVER</h1>
                        
                        <div className="gameover-buttons">
                        <Link to="/">
                            <button className="gameover-btn">Return to Menu</button>
                        </Link>
                        
                        <button className="gameover-btn" onClick={(e) => window.location.reload()}>
                            Restart Game
                        </button>
                        </div>
                    </div>
                </div>
            }
        </>
    }
}

export default Game;