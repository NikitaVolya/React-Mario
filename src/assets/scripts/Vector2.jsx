

class Vector2 {

    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() { return this.#x; }
    getY() { return this.#y; }

    setX(number) { this.#x = number; }
    setY(number) { this.#y = number; }

    VectorTo(other) {
        return new Vector2(
            other.getX() - this.#x,
            other.getY() - this.#y
        );
    }

    Length() {
        return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
    }

    DistanceTo(other) {
        return this.VectorTo(other).Length();
    }

    Add(other) {
        this.#x = this.#x + other.getX();
        this.#y = this.#y + other.getY();
        return this;
    }

    Sub(other) {
        this.#x -= other.getX();
        this.#y -= other.getY();
        return this;
    }

    Mult(number) {
        this.#x = this.#x * number;
        this.#y = this.#y * number;
        return this;
    }

    static Add(v1, v2) {
        let clone = v1.Clone();
        return clone.Add(v2);
    }

    static Sub(v1, v2) {
        let clone = v1.Clone();
        return clone.Sub(v2);
    }

    static Mult(v, number) {
        let clone = v.Clone();
        return clone.Mult(number);
    }

    Clone() {
        return new Vector2(this.#x, this.#y)
    }

    static Zero() {
        return new Vector2(0, 0);
    }
}

export default Vector2;