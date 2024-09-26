//Variables for convenience

var posX = 0;
var posY = 0;

const backImg = document.querySelector('.map-img');

document.addEventListener("DOMContentLoaded", () => {
    console.log("HEY HEY HEY! WE'RE LIVE!");
    
    
    
});

//Movement script for navigation. Pressing a button will move the scene and increment the position based on which button is pressed.
function moveWindow(btnID){
    console.log(btnID);
    
    switch(String(btnID)){
        case "up":
            console.log("MOVING UP");
            document.querySelector('.map-img').style.animationName = 'slideInUp';
            posY += 1;
            break;
            
        case 'left':
            console.log("MOVING LEFT");
            document.querySelector('.map-img').style.animationName = 'slideInLeft';
            posX -= 1;
            break;
            
        case 'right':
            console.log("MOVING RIGHT");
            document.querySelector('.map-img').style.animationName = 'slideInRight';
            posX += 1;
            break;
            
        case 'down':
            console.log("MOVING DOWN");
            document.querySelector('.map-img').style.animationName = 'slideInDown';
            posY -= 1;
            break;
            
        default:
            console.log("INVALID BUTTON");
            break;
    }
    
    displayPosition();
}

//Spits out coordinates in the log
function displayPosition(){
    let coords = {X: posX, Y: posY};
    console.log(coords);
}