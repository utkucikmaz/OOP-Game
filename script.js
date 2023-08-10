class Player {
    constructor() {
        this.positionX = 50;
        this.positionY = 0;
        this.width = 3;
        this.height = 6;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
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
        this.positionX -= 5;
        this.domElement.style.left = this.positionX - this.width / 2 + "vw";
    }
    moveRight() {
        this.positionX += 5;
        this.domElement.style.left = this.positionX - this.width / 2 + "vw";
    }
    moveUp() {
        this.positionY += 5;
        this.domElement.style.bottom = this.positionY - this.height + "vh";
    }
    moveDown() {
        this.positionX -= 5;
        this.domElement.style.bottom = this.positionY - this.height + "vh";
    }
}
class Obstacle {
    constructor() {
        this.positionX = Math.floor(Math.random() * 100);
        this.positionY = 100;
        this.width = 15;
        this.height = 5;
        this.createDomElement();
    }
    createDomElement() {
        this.domElement = document.createElement("div");

        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX - this.width / 2 + "vw";
        this.domElement.style.bottom = this.positionY - this.height + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY - this.height + "vh";
        if (this.positionY + this.height < 0) {
            this.domElement.remove();
        }
    }
}

const player = new Player();
const obstaclesArr = [];

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        player.moveLeft();
    } else if (event.key === "ArrowRight") {
        player.moveRight();
    } else if (event.key === "ArrowUp") {
        player.moveUp();
    } else if (event.key === "ArrowDown") {
        player.moveDown();
    }
});

player.moveRight();
player.moveLeft();
player.moveUp();
player.moveDown();

console.log(player);
console.log(obstaclesArr);

const obstaclesCreate = setInterval(() => {
    const newObstacle = new Obstacle();
    obstaclesArr.push(newObstacle);
    const randomColor = randomizeColor();
    newObstacle.domElement.style.backgroundColor = randomColor;
}, 1000);

const obstaclesMove = setInterval(() => {
    obstaclesArr.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();

        if (
            player.positionX + 3.5 <
                obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width - 3.5 >
                obstacleInstance.positionX &&
            player.positionY + 3.5 <
                obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height - 3.5 > obstacleInstance.positionY
        ) {
            handleDeath();
        }
    });
}, 50);

function handleDeath() {
    clearInterval(obstaclesMove);
    clearInterval(obstaclesCreate);

    const gameOverDiv = document.createElement("p");
    gameOverDiv.className = "game-over";
    gameOverDiv.innerText = "YOU LOST LOSER!!";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(gameOverDiv);

    const restartDiv = document.createElement("p");
    restartDiv.className = "restart";
    restartDiv.innerText = "Press space to restart";

    gameOverDiv.appendChild(restartDiv);

    player.domElement.remove();
    obstaclesArr.forEach((element) => {
        element.domElement.remove();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === " ") {
            location.reload();
        }
    });
}

function randomizeColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
}
