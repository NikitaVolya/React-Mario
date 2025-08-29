
import AnimationState from "./AnimationState";
import Entity from "../Entity";


class AnimationStateMachine {

    #owner;

    #currentState;
    #states;

    constructor(owner) {
        if (!owner || !(owner instanceof Entity)) {
            throw new TypeError(`Owner [${this.#owner.GetId()}}] | GameSprite.Constructor : owner must be a valid Entity`);
        }
        this.#owner = owner;

        this.#currentState = null;
        this.#states = {};
    }

    GetCurrentState() {
        return this.#currentState;
    }

    SelectState(name) {
        if (typeof name !== "string" || Number.isNaN(name))
            throw new TypeError("AnimationStateMachine.SelectState : name must be a valid string");

        if (!(name in this.#states))
            throw new Error("AnimationStateMachine.SelectState : state not found");
        
        this.#currentState = this.#states[name];
    }

    AddState(state) {
        if (!state || !(state instanceof  AnimationState))
            throw new TypeError("AnimationState.AddState : state must be a valid AnimationState");
        if (state.GetName() in this.#states)
            throw new Error("AnimationState.AddState : state with same name already existe");

        this.#states[state.GetName()] = state;
    }

    Update() {
        if (this.#currentState == null)
            return;

        let globalFrame = this.#owner.GetGame().GetFrame();
        let entitySprite = this.#owner.GetSprite();

        this.#currentState.Work(globalFrame, entitySprite);
    }
}


export default AnimationStateMachine;