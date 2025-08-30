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
import GameCamera from "../../assets/scripts/GameCamera";
import Clouds from "../../assets/scripts/entities/decorations/Clouds";
import Castle from "../../assets/scripts/entities/decorations/Castle";
import Flag from "../../assets/scripts/entities/items/Flag";
import KillBox from "../../assets/scripts/entities/items/KillBox";


class Game extends React.Component {

    static #BlockSize = 50;
    static GetBlockSize() { return this.#BlockSize; }
    static #DrawScale = 1;
    static GetDrawScale() { return this.#DrawScale; }

    static #DrawHitBoxes = true;
    static GetDrawHitBoxes() { return this.#DrawHitBoxes; }


    #entities;
    #entitiesToKill;

    #mapManager;
    #camera;

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
            new Gumba(this, new Vector2(Game.GetBlockSize() * 15, Game.GetBlockSize() * 13)),
            new Gumba(this, new Vector2(Game.GetBlockSize() * 18, Game.GetBlockSize() * 13)),
            new CoinBox(this, new Vector2(Game.GetBlockSize() * 21, Game.GetBlockSize() * 11)),
            new CoinBox(this, new Vector2(Game.GetBlockSize() * 23, Game.GetBlockSize() * 11)),
            new CoinBox(this, new Vector2(Game.GetBlockSize() * 16, Game.GetBlockSize() * 11)),
            new CoinBox(this, new Vector2(Game.GetBlockSize() * 22, Game.GetBlockSize() * 6)),

            new Clouds(this, new Vector2(Game.GetBlockSize(), Game.GetBlockSize() * -3)),
            new Clouds(this, new Vector2(Game.GetBlockSize() * 60, Game.GetBlockSize() * -3)),
            new Clouds(this, new Vector2(Game.GetBlockSize() * 120, Game.GetBlockSize() * -3)),
            new Clouds(this, new Vector2(Game.GetBlockSize() * 180, Game.GetBlockSize() * -6)),

            new Flag(this, new Vector2(Game.GetBlockSize() * 196, Game.GetBlockSize() * 5)),
            new Castle(this,new Vector2(Game.GetBlockSize() * 205, Game.GetBlockSize() * 10)),

            new KillBox(this, new Vector2(Game.GetBlockSize() * 71, Game.GetBlockSize() * 16)),
            new KillBox(this, new Vector2(Game.GetBlockSize() * 72, Game.GetBlockSize() * 16)),

            
            new KillBox(this, new Vector2(Game.GetBlockSize() * 88, Game.GetBlockSize() * 16)),
            new KillBox(this, new Vector2(Game.GetBlockSize() * 89, Game.GetBlockSize() * 16)),
            new KillBox(this, new Vector2(Game.GetBlockSize() * 90, Game.GetBlockSize() * 16)),

            new KillBox(this, new Vector2(Game.GetBlockSize() * 155, Game.GetBlockSize() * 16)),
            new KillBox(this, new Vector2(Game.GetBlockSize() * 156, Game.GetBlockSize() * 16)),
        ];
        this.#entitiesToKill = [];

        this.#mapManager = new MapManager(this);
        this.#camera = new GameCamera(this, new Vector2(Game.GetBlockSize(), 0));

        Game.#DrawScale = Number(localStorage.getItem("drawScale")) ?? 1;
        Game.#DrawHitBoxes = localStorage.getItem("showHitboxes") === "true";

        this.state = {
            showGameOverScreen: false,
            showGameWinScreen: false
        }
    }

    GetPlayer() { return this.#entities[0]; }

    KillEntity(entity) {
        if (!entity || !(entity instanceof Entity)) {
            throw new TypeError(`[${this.GetId()}] Game.KillEntity : entity must be a valid Entity`);
        }
        this.#entitiesToKill.push(entity.GetId());
    }

    GetMapManger() {
        return this.#mapManager;
    }

    GetCamera() {
        return this.#camera
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

    ShowGameWin() {
        this.#gameCicle = false;
        this.setState({
            ...this.state, 
            showGameWinScreen: true
        });
    }

    ShowGameOver() {
        this.#gameCicle = false;
        this.setState({
            ...this.state, 
            showGameOverScreen: true
        })
    }

    render() {
        const Draw = (ctx) => {

            this.#mapManager.Draw(ctx);

            const entitiesDrawSortFunction = (a, b) => {
                return a.GetSprite().GetDrawOrder() - b.GetSprite().GetDrawOrder();
            };


            let draw_queue = [...this.#entities];

            draw_queue
            .sort(entitiesDrawSortFunction)
            .forEach(
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

            this.#camera.Update(deltaTime);

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
            {
                this.state.showGameWinScreen &&
                <div className="victory-overlay">
                <div className="victory-content">
                    <h1>YOU WIN! 🎉</h1>

                    <div className="victory-buttons">
                        <Link to="/">
                            <button className="victory-btn">Return to Menu</button>
                        </Link>

                        <button
                            className="victory-btn"
                            onClick={() => window.location.reload()}
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
            }
        </>
    }
}

export default Game;