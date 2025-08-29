
class Vector2 {

    #x;
    #y;

    constructor(x, y) {
        this.SetX(x);
        this.SetY(y);
    }

    GetX() { return this.#x; }
    GetY() { return this.#y; }

    SetX(number) { 
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError("Vector2.SetX : number must be a valid number");
        }
        this.#x = number; 
    }
    SetY(number) { 
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError("Vector2.SetY : number must be a valid number");
        }
        this.#y = number; 
    }

    VectorTo(other) {
        if (!other || !(other instanceof  Vector2)) {
            throw new TypeError("Vector2.VectorTo : other must be a valid Vector2");
        }
        return new Vector2(
            other.GetX() - this.#x,
            other.GetY() - this.#y
        );
    }

    Length() {
        return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
    }

    DistanceTo(other) {
        if (!other || !(other instanceof  Vector2)) {
            throw new TypeError("Vector2.DistanceTo : other must be a valid Vector2");
        }
        return this.VectorTo(other).Length();
    }

    Add(other) {
        if (!other || !(other instanceof  Vector2)) {
            throw new TypeError("Vector2.Add : other must be a valid Vector2");
        }
        this.#x += other.GetX();
        this.#y += other.GetY();
        return this;
    }

    Sub(other) {
        if (!other || !(other instanceof  Vector2)) {
            throw new TypeError("Vector2.Sub : other must be a valid Vector2");
        }
        this.#x -= other.GetX();
        this.#y -= other.GetY();
        return this;
    }

    Mult(number) {
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError("Vector.Mult : number must be a valid number");
        }
        this.#x = this.#x * number;
        this.#y = this.#y * number;
        return this;
    }

    static Add(v1, v2) {
        if (!v1 || !(v1 instanceof  Vector2)) {
            throw new TypeError("Vector2.Add : v1 must be a valid Vector2");
        }
        if (!v2 || !(v2 instanceof  Vector2)) {
            throw new TypeError("Vector2.Add : v2 must be a valid Vector2");
        }
        let clone = v1.Clone();
        return clone.Add(v2);
    }

    static Sub(v1, v2) {
        if (!v1 || !(v1 instanceof  Vector2)) {
            throw new TypeError("Vector2.Add : v1 must be a valid Vector2");
        }
        if (!v2 || !(v2 instanceof  Vector2)) {
            throw new TypeError("Vector2.Add : v2 must be a valid Vector2");
        }
        let clone = v1.Clone();
        return clone.Sub(v2);
    }

    static Mult(v, number) {
        if (!v || !(v instanceof  Vector2)) {
            throw new TypeError("Vector2.Add : v must be a valid Vector2");
        }
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError("number must be a valid number");
        }
        let clone = v.Clone();
        return clone.Mult(number);
    }

    Clone() {
        return new Vector2(this.#x, this.#y)
    }

    static ZERO() {
        return new Vector2(0, 0);
    }
    static LEFT() {
        return new Vector2(-1, 0);
    }
    static RIGHT() {
        return new Vector2(1, 0);
    }
    static TOP() {
        return new Vector2(0, -1);
    }
    static DOWN() {
        return new Vector2(0, 1);
    }
}

export default Vector2;