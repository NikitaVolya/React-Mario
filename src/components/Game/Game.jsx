import React from "react";
import WindowScreen from "./WindowScreen";

import Vector2 from "../../assets/scripts/Vector2";
import Player from "../../assets/scripts/entities/Player";


class Game extends React.Component {

    #player = new Player(
        this,
        new Vector2(100, 100)
    );
    #keys = {};

    GetKey(key) {
        return this.#keys[key];
    }

    render() {
        const Draw = (ctx) => {
            this.#player.Draw(ctx);
        }

        const Update = (deltaTime) => {
            this.#player.Update(deltaTime);
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