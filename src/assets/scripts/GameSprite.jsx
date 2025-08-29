import Entity from "./entities/Entity";
import Vector2 from "./Vector2";

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


class GameSprite {

    #owner;

    #image;
    #imageSize;

    #spriteNumber;

    #scale;
    #slice;
    #frame;

    #flip;

    constructor(owner) {
        if (!owner || !(owner instanceof Entity)) {
            throw new TypeError(`GameSprite.Constructor : owner must be a valid Entity`);
        }
        this.#owner = owner;

        this.#image = null;
        this.#imageSize = null;
        this.#spriteNumber = null;

        this.#scale = 1;
        this.#slice = new Vector2(0, 0);
        this.#frame = 0;

        this.#flip = false;
    }

    Load(image_path) {
        this.#image = new Image();
        this.#image.src = process.env.PUBLIC_URL + "/sprites" + image_path;

        this.#image.onload = (e) => {
            this.#imageSize = new Vector2(this.#image.width, this.#image.height);
        }
        return this;
    }

    SetSpriteNumber(size) {
        if (!size || !(size instanceof  Vector2)) {
            throw new TypeError(`Owner [${this.#owner.GetId()}}] | GameSprite.SetSpriteNumber : size must be a valid Vector2`);
        }
        this.#spriteNumber = size;
        return this;
    }
    
    SetScale(number) { 
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError(`Owner [${this.#owner.GetId()}}] | GameSprite.SetScale : number must be a valid number`);
        }
        this.#scale = number; 
        return this; 
    }

    SetSlice(vector) {
        if (!vector || !(vector instanceof  Vector2)) {
            throw new TypeError(`Owner [${this.#owner.GetId()}}] | GameSprite.SetSlice : vector must be a valid Vector2`);
        }
        this.#slice = vector;
        return this;
    }

    SetFrame(number) {
        if (typeof number !== "number" || Number.isNaN(number)) {
            throw new TypeError(`Owner [${this.#owner.GetId()}}] | GameSprite.SetFrame : number must be a valid number`);
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
            throw new TypeError(`Owner [${this.#owner.GetId()}}] | GameSprite.SetFlip : value must be a valid boolean`);
        }
        this.#flip = value;
    }

    Draw(ctx) {
        if (ctx && !(ctx instanceof CanvasRenderingContext2D)) {
            throw new TypeError(`Owner [${this.#owner.GetId()}}] | GameSprite.SetFlip : Invalid canvas context`);
        }

        if (this.#image == null || this.#spriteNumber == null || this.#imageSize == null)
            return;

        let spriteSize = new Vector2(
            this.#imageSize.GetX() / this.#spriteNumber.GetX(),
            this.#imageSize.GetY() / this.#spriteNumber.GetY(),
        );
        
        let position = this.#owner.GetPosition();
        let entitySize = this.#owner.GetSize();

        
        let x = this.#frame % this.#spriteNumber.GetX();
        let y = Math.floor(this.#frame / this.#spriteNumber.GetX());

        let spriteStartX = spriteSize.GetX() * x;
        let spriteStartY = spriteSize.GetY() * y;
        let spriteEndX = spriteSize.GetX();
        let spriteEndY = spriteSize.GetY();
        
        let drawEntitySize = Vector2.Mult(entitySize, this.#scale);
        let scaleSlice = Vector2.Mult(entitySize, (1 - this.#scale) / 2);

        let drawPosition = Vector2.Add(position, scaleSlice);
        drawPosition.Add(this.#slice);
        let drawSizeX = drawEntitySize.GetX();
        let drawSizeY = drawEntitySize.GetY();

        
        ctx.imageSmoothingEnabled = false;
        drawSprite(
            ctx,
            this.#image,
            spriteStartX, spriteStartY, 
            spriteEndX, spriteEndY,

            drawPosition.GetX(), drawPosition.GetY(), 
            drawSizeX, drawSizeY,
            this.#flip
        );
    }

}

export default GameSprite;