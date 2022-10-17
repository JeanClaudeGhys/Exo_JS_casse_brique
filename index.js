var caneva = document.getElementById("caneva");
var ctx = caneva.getContext("2d");

/*//impression du rectangle
ctx.beginPath();
ctx.rect(20, 40, 50, 50); //rect(x coin gauche sup, y coin gauche sup, largeur rectangle, hauteur rectangle)
ctx.fillStyle = "#FF0000"; //sélection d'une coouleur
ctx.fill(); //remplissage
ctx.closePath();

//tracer des cercles
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false); //arc(x centre, y centre, rayon, angle start arc en rd, angle end arc en rd, direction:
//false->sens aiguilles montre(par défaut), true->sens inverse)
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"; //remplissage du contour (stroke = trait)
ctx.stroke();
ctx.closePath();*/

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

//
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
    drawBall();
    drawRaq();
    //rebond haut et bas
    if(y + dy > caneva.height - diaBal || y + dy < diaBal) {
        dy = -dy;
    }
    else if(y + dy > caneva.height - diaBal) {
        //===========je suis la===============
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

