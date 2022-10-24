var caneva = document.getElementById("caneva");
var ctx = caneva.getContext("2d");

// //impression du rectangle
// ctx.beginPath();
// ctx.rect(20, 50, 100, 50); //rect(x coin gauche sup, y coin gauche sup, largeur rectangle, hauteur rectangle)
// ctx.fillStyle = "#FF0000"; //sélection d'une coouleur
// ctx.fill(); //remplissage
// ctx.closePath();

// //tracer des cercles
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false); //arc(x centre, y centre, rayon, angle start arc en rd, angle end arc en rd, direction:
// //false->sens aiguilles montre(par défaut), true->sens inverse)
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"; //remplissage du contour (stroke = trait)
// ctx.stroke();
// ctx.closePath();

//-------------------déplacement de balle-----------------------------------
var x = caneva.width / 2;
var y = caneva.height - 30;
var dx = 2;
var dy = -2;
var diaBal = 10;

var raqLarg = 75;
var raqHaut = 10;
var raqX = (caneva.width - raqLarg) / 2;

var aDroite = false;
var aGauche = false;

//------------Variable des briques-------------------------------

var brickNbrLignes = 3;
var brickNbrColonne = 5;
var brickLargeur = 75;
var brickHauteur = 20;
var brickEspacement = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var tabBricks = [];

for(var c = 0; c < brickNbrColonne; c++) {
    tabBricks[c] = [];
    for(var r = 0; r < brickNbrLignes; r++) {
        tabBricks[c][r] = {x:0, y:0, etat:1}; 
    }
}

function brScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ score, 8, 20);
}

function collisionDetect() {
    for(var c = 0; c < brickNbrColonne; c++) {
        for(var r = 0; r < brickNbrLignes; r++) {
            var b = tabBricks[c][r];
            if(b.etat == 1) {
                if(x > b.x && x < b.x + brickLargeur && y > b.y && y < b.y + brickHauteur) {
                    dy = -dy;
                    b.etat = 0;
                    score++;
                    if(score == brickNbrLignes * brickNbrColonne) {
                        alert("GAGNE");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end
                    }    
                }
            }
        }
    }
}

function drawBricks() {
    for(var c = 0; c < brickNbrColonne; c++) {
        for(var r = 0; r < brickNbrLignes; r++) {
            if(tabBricks[c][r].etat == 1) {
                var brickX = (c * (brickLargeur + brickEspacement)) + brickOffsetLeft;
                var brickY = (r * (brickHauteur + brickEspacement)) + brickOffsetTop;
                tabBricks[c][r].x = brickX;
                tabBricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickLargeur, brickHauteur);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, diaBal, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function drawRaq() {
    ctx.beginPath();
    ctx.rect(raqX, caneva.height - raqHaut, raqLarg, raqHaut);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, caneva.width, caneva.height);
    drawBricks();
    drawBall();
    drawRaq();
    brScore();
    collisionDetect();
    
    if(y + dy < diaBal) {
        dy = -dy;
    }

    else if(y + dy > caneva.height - diaBal) {
        if(x > raqX && x < raqX + raqLarg) {
            dy = -dy;
        }
        else {
            alert("GAME OVER"); //fin de  partie si balle sort du cadre
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(x + dx > caneva.width - diaBal || x + dx < diaBal) {
        dx = -dx;
    }

    if(aDroite) {
        raqX += 7;
        if(raqX + raqLarg > caneva.width) {
            raqX = caneva.width - raqLarg;
        }
    }
    else if(aGauche) {
        raqX -= 7;
        if(raqX < 0) {
            raqX = 0;
        }
    }

    x += dx;
    y += dy;

}

function touchepress(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        aDroite = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        aGauche = true;
    }
}

function toucherel(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        aDroite = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        aGauche = false;
    }
}

document.addEventListener("keydown", touchepress, false);
document.addEventListener("keyup", toucherel, false);
var interval = setInterval(draw, 10); //setInterval(fonction rappelée, intervalle de temps de rappel en ms)

