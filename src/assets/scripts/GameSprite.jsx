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
        this.#spriteNumber = size;
        return this;
    }
    
    SetScale(number) { 
        this.#scale = number; 
        return this; 
    }

    SetSlice(vector) {
        this.#slice = vector;
        return this;
    }

    SetFrame(number) {
        if (number < 0)
            number = 0;
        let max_index = this.#spriteNumber.getX() * this.#spriteNumber.getY() - 1;
        if (number > max_index)
            number = max_index;

        this.#frame = number;
    }

    SetFlip(value) {
        this.#flip = value;
    }

    Draw(ctx) {
        if (this.#image == null || this.#spriteNumber == null || this.#imageSize == null)
            return;

        let spriteSize = new Vector2(
            this.#imageSize.getX() / this.#spriteNumber.getX(),
            this.#imageSize.getY() / this.#spriteNumber.getY(),
        );
        
        let position = this.#owner.GetPosition();
        let entitySize = this.#owner.GetSize();

        let x = this.#frame % this.#spriteNumber.getX();
        let y = Math.floor(this.#frame / this.#spriteNumber.getY());

        let spriteStartX = spriteSize.getX() * x;
        let spriteStartY = spriteSize.getY() * y;
        let spriteEndX = spriteSize.getX();
        let spriteEndY = spriteSize.getY();
        
        let drawEntitySize = Vector2.Mult(entitySize, this.#scale);
        let scaleSlice = Vector2.Mult(entitySize, (1 - this.#scale) / 2);

        let drawPosition = Vector2.Add(position, scaleSlice);
        drawPosition.Add(this.#slice);
        let drawSizeX = drawEntitySize.getX();
        let drawSizeY = drawEntitySize.getY();

        
        ctx.imageSmoothingEnabled = false;
        drawSprite(
            ctx,
            this.#image,
            spriteStartX, spriteStartY, 
            spriteEndX, spriteEndY,

            drawPosition.getX(), drawPosition.getY(), 
            drawSizeX, drawSizeY,
            this.#flip
        );
    }

}

export default GameSprite;