import Vector2 from "./Vector2";

class GameObject {

    #game;

    #position;
    #id;

    static #globalId;

    constructor(game, position) {

        this.#id = GameObject.#globalId++;

        this.SetPosition(position);

        this.#game = game;
    }

    GetPosition() { return this.#position.Clone(); }
    SetPosition(vector) { 
        if (!vector || !(vector instanceof  Vector2)) {
            throw new TypeError(`[${this.#id}] GameObject.SetPosition : vector must be a valid Vector2`);
        }
        this.#position = vector; 
    }

    GetId() { return this.#id; }

    GetGame() { return this.#game; }

    Update(deltaTime) {
        if (typeof deltaTime !== "number" || Number.isNaN(deltaTime)) {
            throw new TypeError(`[${this.#id}] GameObject.Update : deltaTime must be a valid number`);
        }
    }
    
    Draw(ctx) {
        if (ctx && !(ctx instanceof CanvasRenderingContext2D)) {
            throw new TypeError(`[${this.#id}] GameObject.Draw : Invalid canvas context`);
        }
    }
}

export default GameObject;