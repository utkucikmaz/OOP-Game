class Player {
    constructor() {
        this.positionX = 50;
        this.positionY = 0;
        this.width = 15;
        this.height = 10;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        //create a dom element for the player
        this.domElement = document.createElement("div");

        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX - this.width / 2 + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    moveLeft() {
        this.positionX--;
        this.domElement.style.left = this.positionX - this.width / 2 + "vw";
    }
    moveRight() {
        this.positionX++;
        this.domElement.style.left = this.positionX - this.width / 2 + "vw";
    }
}

const player = new Player();

document.addEventListener("keydown", (event) => {
    console.log("user pressed");
    if (event.key === "ArrowLeft") {
        player.moveLeft();
    } else if (event.key === "ArrowRight") {
        player.moveRight();
    }
});

player.moveRight();
player.moveLeft();
console.log(player);
