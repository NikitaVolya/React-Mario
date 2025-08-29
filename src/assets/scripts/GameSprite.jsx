

class GameSprite {

    #owner;
    #image;
    #spritesPath;
    #size;

    constructor(owner, file, size) {

        this.#owner = owner;

        this.canDraw = false;
        this.#spritesPath = process.env.PUBLIC_URL + "/sprites" + file;

        this.#size = size;

        this.#image = new Image();
        this.#image.src = this.#spritesPath;

        this.#image.onload = (e) => {
            this.canDraw = true;
        }
    }

    Draw(ctx, x = 0, y = 0) {
        if (!this.canDraw)
            return;
        
        let position = this.#owner.GetPosition();
        let entitySize = this.#owner.GetSize();

        ctx.drawImage(
            this.#image,
            this.#size.getX() * x + 3, this.#size.getY() * y, 
            this.#size.getX() * (x + 1) + 2, this.#size.getY() * (y + 1),

            position.getX(), position.getY(), 
            entitySize.getX(), entitySize.getY()
        )
    }
}

export default GameSprite;