//Variables for convenience

var posX = 0;
var posY = 0;


const backImg = document.querySelector('.map-img'); /*WHY DO RETURN AS NULL?????*/

document.addEventListener("DOMContentLoaded", () => {
    console.log("HEY HEY HEY! WE'RE LIVE!");
    
    //Resets the css animation tag once it's done doing its thing
    document.querySelector('.map-img').addEventListener("animationend", () => {
        document.querySelector('#display-img').src = document.querySelector('#temp-img').src
        
        document.querySelector('#display-img').style.animationName = '';
        document.querySelector('#temp-img').style.animationName = '';
    });
    
});

//Movement script for navigation. Pressing a button will move the scene and increment the position based on which button is pressed.
//[TODO] Add slideout animations for the current image.
function moveWindow(btnID){
    console.log(btnID);
    
    switch(String(btnID)){
        case "up":
            console.log("MOVING UP");
            document.querySelector('#temp-img').style.transform= 'translate(0vw, 100vh)';
            document.querySelector('#temp-img').style.animationName = 'slideInDown';
            document.querySelector('#display-img').style.animationName = 'slideOutDown';
            posY += 1;
            break;
            
        case 'left':
            console.log("MOVING LEFT");
            document.querySelector('#temp-img').style.transform= 'translate(100vw, -100vh)';
            document.querySelector('#temp-img').style.animationName = 'slideInLeft';
            document.querySelector('#display-img').style.animationName = 'slideOutLeft';
            posX -= 1;
            break;
            
        case 'right':
            console.log("MOVING RIGHT");
            document.querySelector('#temp-img').style.transform= 'translate(-100vw, -100vh)';
            document.querySelector('#temp-img').style.animationName = 'slideInRight';
            document.querySelector('#display-img').style.animationName = 'slideOutRight';
            posX += 1;
            break;
            
        case 'down':
            console.log("MOVING DOWN");
            document.querySelector('#temp-img').style.transform= 'translate(0vw, -100vh)';
            document.querySelector('#temp-img').style.animationName = 'slideInUp';
            document.querySelector('#display-img').style.animationName = 'slideOutUp';
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