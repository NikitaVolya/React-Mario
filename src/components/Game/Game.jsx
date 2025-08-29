import React from "react";
import WindowScreen from "./WindowScreen";

import Vector2 from "../../assets/scripts/Vector2";
import Player from "../../assets/scripts/entities/Player";
import Gumba from "../../assets/scripts/entities/Gumba";


class Game extends React.Component {

    #player = new Player(
        this,
        new Vector2(100, 100)
    );
    #entites = [new Gumba(this, new Vector2(800, 100))];
    #keys = {};
    #frame;

    constructor(props) {
        super(props);

        this.#frame = 0;
    }

    GetFrame() {
        return this.#frame;
    }

    GetKey(key) {
        return this.#keys[key];
    }

    render() {
        const Draw = (ctx) => {
            this.#player.Draw(ctx);

            this.#entites.every(
                entity => {
                    entity.Draw(ctx);
                }
            )
        }

        const Update = (deltaTime) => {
            this.#player.Update(deltaTime);

            this.#entites.every(
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
            />
        </>
    }
}

export default Game;