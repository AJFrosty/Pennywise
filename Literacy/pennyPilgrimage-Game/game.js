const gameArea = document.querySelector('canvas');
const context = gameArea.getContext('2d');

const boundaries = []
for (let i = 0; i < boundaries.length; i+=60) {
    boundaries.push(boundaries.slice(i, 60 + i))
}

class Collision {
    static width = 16
    static height = 16
    constructor({position}) {
        this.position = position
        this.width = 16
        this.height = 16
    }
    draw () {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const collisions = []

boundaries.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 52432 || symbol === 3221277904 || symbol === 2684406992)
        collisions.push(
            new Collision({
                position: {
                    x: j * Collision.width,
                    y: i * Collision.height
                }
        
            })
        )
    })
})

const image = new Image();
image.src = "img/gameMap2.png";
image.onload = init;

const playerImage = new Image();
playerImage.src = "img/Alex_run_down - Copy.png";
playerImage.onload = init;

let imagesLoaded = 0;

function init() {
    imagesLoaded++;

    if (imagesLoaded === 2) {
        animate();
    }
}

class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position;
        this.image = image;
    }

    draw() {
        context.fillStyle = 'red'
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}


const background = new Sprite({
    position: { x: 0, y: 0 },
    image: image
});

const player = new Sprite({
    position: { x: 30, y: 270 },
    image: playerImage
});

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
};

let zoomLevel = 1;
const zoomIncrement = 0.02;

function animate() {
    window.requestAnimationFrame(animate);
    
    context.clearRect(0, 0, gameArea.width, gameArea.height);

    context.save();
    context.scale(zoomLevel, zoomLevel);

    background.draw();
    collisions.forEach(Collision => {
        Collision.draw()
    })
    player.draw();

    context.restore();

    if (keys.w.pressed) player.position.y -= 3 / zoomLevel;
    else if (keys.a.pressed) player.position.x -= 3 / zoomLevel;
    else if (keys.s.pressed) player.position.y += 3 / zoomLevel;
    else if (keys.d.pressed) player.position.x += 3 / zoomLevel;
}



animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key){
        case'w':
            keys.w.pressed = true
            lastKey = 'w'
            break

        case'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case'd':
            keys.d.pressed = true
            lastKey = 'd'
            break            
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case'w':
            keys.w.pressed = false
            break

        case'a':
            keys.a.pressed = false
            break

        case's':
            keys.s.pressed = false 
            break

        case'd':
            keys.d.pressed = false
            break            
    }
})
