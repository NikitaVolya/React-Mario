

class GameObject {

    #position;
    #id;

    static #globalId;

    constructor(position) {

        this.#position = position;
        this.#id = GameObject.#globalId++;
    }

    GetPosition() { return this.#position.Clone(); }
    SetPosition(position) { this.#position = position; }

    GetId() { return this.#id; }

    Update(deltaTime) {}
    
    Draw(ctx) {}
}

export default GameObject;