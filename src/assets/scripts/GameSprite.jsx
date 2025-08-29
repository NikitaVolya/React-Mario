import Entity from "./entities/Entity";
import Vector2 from "./Vector2";
import Game from "../../components/Game/Game";



function drawSprite(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh, flipX = false) {
    ctx.save();

    if (flipX) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, sx, sy, sw, sh, -dx - dw, dy, dw, dh);
    } else {
        ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    }

  ctx.restore();
}

const imageCache = {};

class GameSprite {

    #image;
    #imageSize;

    #spriteNumber;

    #scale;
    #slice;
    #frame;

    #flip;

    constructor() {

        this.#image = null;
        this.#imageSize = null;
        this.#spriteNumber = null;

        this.#scale = 1;
        this.#slice = new Vector2(0, 0);
        this.#frame = 0;

        this.#flip = false;
    }

    Load(image_path) {
        const fullPath = process.env.PUBLIC_URL + "/sprites" + image_path;

        if (imageCache[fullPath]) {
            this.#image = imageCache[fullPath].img;
            this.#imageSize = imageCache[fullPath].size;
        } else {
            this.#image = new Image();
            this.#image.src = fullPath;
            this.#image.onload = () => {
                const size = new Vector2(this.#image.width, this.#image.height);
                imageCache[fullPath] = { img: this.#image, size };
                this.#imageSize = size;
            }
        }

        return this;
    }

    SetSpriteNumber(size) {
        if (!size || !(size instanceof  Vector2)) {
            throw new TypeError(`GameSprite.SetSpriteNumber : size must be a valid Vector2`);
        }
        this.#spriteNumber = size;
        return this;
    }
    
    SetScale(number) { 
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError(`GameSprite.SetScale : number must be a valid number`);
        }
        this.#scale = number; 
        return this; 
    }

    SetSlice(vector) {
        if (!vector || !(vector instanceof  Vector2)) {
            throw new TypeError(`GameSprite.SetSlice : vector must be a valid Vector2`);
        }
        this.#slice = vector;
        return this;
    }

    SetFrame(number) {
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError(`GameSprite.SetFrame : number must be a valid number`);
        }

        if (number < 0)
            number = 0;

        let max_index = this.#spriteNumber.GetX() * this.#spriteNumber.GetY() - 1;
        if (number > max_index)
            number = max_index;

        this.#frame = number;
    }

    SetFlip(value) {
        if (typeof value !== "boolean" || Number.isNaN(value)) {
            throw new TypeError(`Owner [GameSprite.SetFlip : value must be a valid boolean`);
        }
        this.#flip = value;
    }

    Draw(ctx, position, size) {
        if (ctx && !(ctx instanceof CanvasRenderingContext2D)) {
            throw new TypeError(`GameSprite.SetFlip : Invalid canvas context`);
        }

        if (this.#image == null || this.#spriteNumber == null || this.#imageSize == null)
            return;

        let spriteSize = new Vector2(
            this.#imageSize.GetX() / this.#spriteNumber.GetX(),
            this.#imageSize.GetY() / this.#spriteNumber.GetY(),
        );

        
        let x = this.#frame % this.#spriteNumber.GetX();
        let y = Math.floor(this.#frame / this.#spriteNumber.GetX());

        let spriteStartX = spriteSize.GetX() * x;
        let spriteStartY = spriteSize.GetY() * y;
        let spriteEndX = spriteSize.GetX();
        let spriteEndY = spriteSize.GetY();
        
        let drawEntitySize = Vector2.Mult(size, this.#scale);
        drawEntitySize.Mult(Game.GetDrawScale());

        let scaleSlice = Vector2.Mult(size, (1 - this.#scale) / 2);

        let drawPosition = Vector2.Add(position, scaleSlice);
        drawPosition.Add(this.#slice);
        drawPosition.Mult(Game.GetDrawScale());

        
        ctx.imageSmoothingEnabled = false;
        drawSprite(
            ctx,
            this.#image,
            spriteStartX, spriteStartY, 
            spriteEndX, spriteEndY,

            drawPosition.GetX(), drawPosition.GetY(), 
            drawEntitySize.GetX(), drawEntitySize.GetY(),
            this.#flip
        );
    }

}

export default GameSprite;