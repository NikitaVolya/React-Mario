
import GameSprite from "../../GameSprite";


class AnimationState {

    #name;

    #frames;
    #animationTime;

    constructor(name, frames, animation_time) {
        if (typeof name !== "string" || Number.isNaN(name))
            throw new TypeError("AnimationState.Constructor : name must be a valid string");
        if (!Array.isArray(frames) || !frames.every((f) => typeof f === "number" && !Number.isNaN(f))) {
    throw new TypeError("AnimationState.Constructor: frames must be a valid array of numbers");
}
        this.#name = name;
        this.#frames = frames;
        
        this.SetAnimationTime(animation_time);
    }

    GetName() { return this.#name; }

    GetAnimationTime() { return this.#animationTime; }
    SetAnimationTime(value) {
        if (typeof value !== "number" || Number.isNaN(value))
            throw new TypeError("AnimationState.SetTime : value must be a valid number");
        this.#animationTime = value;
    }

    Work(globalFrame, sprite) {
        if (typeof globalFrame !== "number" || Number.isNaN(globalFrame))
            throw new TypeError(`AnimationState.Work : globalFrame must be a valid number`);
        if (!sprite || !(sprite instanceof GameSprite))
            throw new TypeError("AnimationState.Work : sprite must be a valid GameSprite");

        let cooldown_frames = this.#animationTime * 60;

        let current_frame = Math.floor(
            ( globalFrame % ( this.#frames.length * cooldown_frames ) ) / cooldown_frames
        );

        sprite.SetFrame(this.#frames[current_frame]);
    }
}

export default AnimationState;