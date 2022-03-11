////////////////////
//Global var      //
////////////////////
const SCREEN = document.createElement("div");
document.body.appendChild(SCREEN);
SCREEN.id = "screen";
var particles = [];

var particleType = "";
fetch('./particles.json')
    .then(response => response.text())
    .then((data) => {
        particleType = data;
    })

////////////////////
//Helper functions//
////////////////////

//Return the angle beetwin two angles.
function direction(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

//Get the screen size of a string.
function displayTextWidth(text, font) {
    let canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
}

////////////////////
//Particle class  //
////////////////////
var particle_id = 1;
class Particle {
    constructor(_value, _x, _y, _direction, _speed, _gravity, _life, _fontSize, _color, _font) {
        //Particle variables
        this.value = _value;
        this.xPrevious = 0;
        this.yPrevious = 0;
        this.x = _x;
        this.y = _y;
        this.vpseed = 0;
        this.hspeed = 0;
        this.rotation = 0;
        this.gravity = 0;
        this.direction = _direction;
        this.speed = _speed;
        this.life = _life;
        this.fontSize = _fontSize;
        this.color = _color;
        this.font = _font;
        //Parameter
        this.useGravity = true;
        this.useAlpha = true;
        //Seting the particle id;
        this.id = particle_id;
        particle_id += 1;
        //Creating and adding the particle element to the DOM.
        this.element = document.createElement("div");
        this.element.id = particle_id;
        this.text = document.createTextNode(_value);
        this.element.appendChild(this.text);
        SCREEN.appendChild(this.element);
    }

    destroy() {
        this.element.remove();
        particles.splice(this, 1);
    }

    update() {
        this.element.style.position = "absolute";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.element.style.transform = "Rotate(" + this.rotation + "deg)";
        if (this.useAlpha) this.element.style.opacity = this.life / 100;
        this.element.style.fontSize = this.fontSize + "px";
        this.element.style.color = this.color;
        this.element.style.fontFamily = this.font;
        this.element.style.position = "absolute";

        this.xPrevious = this.x;
        this.yPrevious = this.y;
        //Update the vertical speed and horizontal speed based on the direction
        this.vspeed =  Math.sin(this.direction) * this.speed;
        this.hspeed = -Math.cos(this.direction) * this.speed;
        //Update the position
        this.x += this.vspeed;
        this.y += this.hspeed;
        //Rotate the praticle
        this.rotation += 1;
        //Update the gravity 
        if (this.useGravity) {
            this.gravity += 0.05;
            this.y += this.gravity;
        }
        //Friction
        //if (this.speed >= 0) this.speed -= 0.05;
        //
        this.life -= 1;
        if (this.life < 0) {
            this.destroy();
        }

        
    }
}
//Create particles when writing into inputs
document.querySelectorAll('.input').forEach(item => {
    item.addEventListener('keydown', function (event) {

        var pressedkey = event.key;
        var input = item;
        if (pressedkey == "Backspace") pressedkey = "";
        var inputStyle = getComputedStyle(input);
        var fontSize = parseInt(inputStyle.fontSize);
        var font = inputStyle.fontFamily;
        var textSize = displayTextWidth(input.value, fontSize + "px " + font);
        
        var cursorPosition = input.selectionStart;
        var nexText = String(input.value).substring(0, cursorPosition);
        var textSize = displayTextWidth(nexText, fontSize + "px " + font);

        var inputWeight = parseInt(inputStyle.padding) + parseInt(inputStyle.borderWidth);
        var px = input.offsetLeft + inputWeight + textSize;
        var py = input.offsetTop  + inputWeight;

        let particle = new Particle(pressedkey, px, py, 0.1, 0, 0.5, 100, fontSize, "red", font);
        Object.assign(particle, JSON.parse(particleType)[input.dataset.type]);
        particles.push(particle);
    });
})

function loop(timestamp) {
    var progress = timestamp - lastRender;

    update(progress);

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);

function update() {
    particles.forEach(particle => {
        particle.update();
    });
}