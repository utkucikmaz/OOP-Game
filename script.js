class Game {
    constructor() {
        this.player = null;
        this.obstaclesArr = [];

        this.showName();
    }
    showName() {
        const nameForm = document.createElement("form");
        nameForm.id = "nameForm";
        nameForm.style.backgroundColor = "purple";
        nameForm.innerHTML = `
			<label for="nameInput">Enter your name</label>
			<br/>
            <input type="text" id="nameInput" placeholder="Your name" required>
			<br/>
            <input id="submit-btn" type="submit" value="Start Game">`;

        const parentElm = document.getElementById("board");
        parentElm.appendChild(nameForm);
        nameForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.startGame();
        });
    }
    startGame() {
        const nameInput = document.getElementById("nameInput");
        const userName = nameInput.value.trim().toUpperCase();

        if (userName === "") {
            alert("Please enter a valid name.");
            return;
        }

        const nameForm = document.getElementById("nameForm");
        nameForm.style.display = "none";

        this.player = new Player();

        this.initGameLogic();
    }

    initGameLogic() {
        const obstaclesArr = [];
        const nameInput = document.getElementById("nameInput");
        const userName = nameInput.value.trim().toUpperCase();

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            } else if (event.key === "ArrowUp") {
                this.player.moveUp();
            } else if (event.key === "ArrowDown") {
                this.player.moveDown();
            }
        });

        const obstaclesCreate = setInterval(() => {
            const newObstacle = new Obstacle();
            obstaclesArr.push(newObstacle);
            const randomColor = randomizeColor();
            newObstacle.domElement.style.backgroundColor = randomColor;
        }, 800);

        const obstaclesMove = setInterval(() => {
            obstaclesArr.forEach((obstacleInstance) => {
                obstacleInstance.moveDown();

                if (
                    this.player.positionX <
                        obstacleInstance.positionX + obstacleInstance.width &&
                    this.player.positionX + this.player.width >
                        obstacleInstance.positionX &&
                    this.player.positionY <
                        obstacleInstance.positionY + obstacleInstance.height &&
                    this.player.positionY + this.player.height >
                        obstacleInstance.positionY
                ) {
                    handleDeath();
                }
            });
        }, 50);

        function handleDeath() {
            clearInterval(obstaclesMove);
            clearInterval(obstaclesCreate);

            const gameOverGif = document.createElement("img");
            gameOverGif.className = "over-gif";
            gameOverGif.setAttribute("src", "./images/erdogan-over.gif");
            gameOverGif.setAttribute("alt", "beautiful image of jail");

            const gameOverDiv = document.createElement("p");
            gameOverDiv.className = "game-over";
            gameOverDiv.innerText = `
			ERDOGAN GOT YA :(

			${userName} SENTENCED TO LIFE IMPRISONMENT!!`;

            const parentElm = document.getElementById("board");
            parentElm.appendChild(gameOverDiv);

            const restartDiv = document.createElement("p");
            restartDiv.className = "restart";
            restartDiv.innerText = "Press space to restart";

            gameOverDiv.appendChild(gameOverGif);
            gameOverDiv.appendChild(restartDiv);

            obstaclesArr.forEach((element) => {
                element.domElement.remove();
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === " ") {
                    location.assign("index.html");
                }
            });
        }

        function randomizeColor() {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            return `rgb(${red},${green},${blue})`;
        }
    }
}

class Player {
    constructor() {
        this.width = 8;
        this.height = 6;
        this.positionX = 50 - this.width / 2;
        this.positionY = 0 + this.height;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", "./images/run.png");
        this.domElement.setAttribute("alt", "beautiful image of little girl");

        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    moveLeft() {
        this.positionX -= 5;
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.transform = "scaleX(1)";
    }
    moveRight() {
        this.positionX += 5;
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.transform = "scaleX(-1)";
    }
    moveUp() {
        this.positionY += 5;
        this.domElement.style.bottom = this.positionY - this.height + "vh";
    }
    moveDown() {
        this.positionY -= 5;
        this.domElement.style.bottom = this.positionY - this.height + "vh";
    }
}
class Obstacle {
    constructor() {
        this.width = 10;
        this.height = 9;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
        this.positionY = 100 - this.height;
        this.createDomElement();
    }
    createDomElement() {
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", "./images/jail.png");
        this.domElement.setAttribute("alt", "beautiful image of jail");

        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
        if (this.positionY + this.height < 0) {
            this.domElement.remove();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Game();
});
