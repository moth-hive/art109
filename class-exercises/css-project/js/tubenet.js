//I would like to thank the people at corru.observer for making such a cool web project
//Most of my knowledge of fancy javascripting and formatting is from studying their code
//Especially for figuring out how objects and getters work

//Removes that funny index from the pathname (code from corru.observer in the corru.js file)
if (location.pathname.includes("/index.html")) {
    location.replace(location.pathname.replace('/index.html', '/'));
}

//Environment variable to preload all the necessary info
var env = {
    posX: 0, //Starting X
    posY: 0, //Starting Y
    tunnelTypes: {
        //Template tunnel object for default. Stands for "Not A Tunnel"
        NaT: {
            image: "images/test-sewer.jpg",
            disabledExits: []
        },
        Straight1: {
            image: "images/tunnel-1.jpg",
            disabledExits: ['left', 'right']
        },
        Straight2: {
            image: "images/tunnel-2.jpg",
            disabledExits: ['left', 'right']
        },
        TLeft1: {
            image: "images/tleft-1.jpg",
            disabledExits: ['right']
        },
        TRight1: {
            image: "images/tright-1.jpg",
            disabledExits: ['left']
        },
        DeadEnd: {
            image: "images/deadend1.jpg",
            disabledExits: ['up', 'left', 'right']
        }
    },
    map: [
        ['NaT', 'NaT', 'NaT', 'DeadEnd', 'NaT'],
        ['NaT', 'NaT', 'TLeft1', 'TRight1', 'NaT'],
        ['NaT', 'NaT', 'NaT', 'NaT', 'NaT'],
        ['NaT', 'NaT', 'NaT', 'NaT', 'NaT'],
        ['NaT', 'NaT', 'DeadEnd', 'DeadEnd', 'DeadEnd']
    ]
};

//The main code
document.addEventListener("DOMContentLoaded", () => {
    //Start of program initialization things
    console.log("Connection Established");
    document.querySelector('#display-img').src = readMap(env.posX, env.posY).image;
    updateDirections();
    
    
    //Does the standard resetting necessary after finishing the animations
    document.querySelector('.map-img').addEventListener("animationend", () => {
        //Sets the current display to the one that slid in for a seamless transition
        document.querySelector('#display-img').src = document.querySelector('#temp-img').src;
        
        //Resets the animations
        document.querySelector('#display-img').style.animationName = '';
        document.querySelector('#temp-img').style.animationName = '';
        
        //Does what it says
        updateDirections();
    });
    
    
});

//Takes a tunnel slug and returns the object in question
function getTunnelType (inputSlug){
    let tunnelSlug = inputSlug;
    let tunnelObj = env.tunnelTypes[tunnelSlug];
    return tunnelObj;
}

//Parses X and Y into a tunnel object based on the map
function readMap(inputX, inputY){
    let mapID = env.map[inputY][inputX];
    if (mapID === undefined) throw new Error("Position Out of Array");
    //console.log(mapID);
    
    let outputTunnel = getTunnelType(mapID);
    return outputTunnel;
}

//Takes tunnel object as an input and disables direction buttons based on the object
function updateDirections(){
    let tunnelObj = readMap(env.posX, env.posY);
    let exitCheck =['up', 'down', 'left', 'right'];
    
    //If there are no disabled exits, re-enable them all and end the function
    if(!tunnelObj.disabledExits.length){
        for(i = 0; i < 4; i++){
        let tempBtnID = '#';
            tempBtnID = tempBtnID.concat(exitCheck[i]);
            document.querySelector(tempBtnID).setAttribute('class', 'button');
            }
        return;
    }
    
    let notExitsNum = tunnelObj.disabledExits.length;
    let notExits = [];
    
    
    //The disabler loop
    for(i = 0; i < notExitsNum; i++){
        let tempBtnID = '#';
        tempBtnID = tempBtnID.concat(tunnelObj.disabledExits[i]);
        //console.log(tempBtnID);
        document.querySelector(tempBtnID).setAttribute('class', 'button disable');
        notExits[i] = tunnelObj.disabledExits[i];
    }
    
    //The enabler loop (messy)
    for(i = 0; i < 4; i++){
        let tempBtnID = '#';
        if(!notExits.includes(exitCheck[i])){
            tempBtnID = tempBtnID.concat(exitCheck[i]);
            document.querySelector(tempBtnID).setAttribute('class', 'button');
        }
    }
}
         
//Movement script for navigation. Pressing a button will move the scene and increment the position based on which button is pressed.
//[TODO] Disable button input while the animation is going
function moveWindow(btnID) {
    //console.log(btnID);

    switch (String(btnID)) {
        case "up":
            if(!document.querySelector('#up').classList.contains('disable')){
                console.log("MOVING UP");
                env.posY -= 1;
                document.querySelector('#temp-img').style.transform = 'translate(0vw, 100vh)';
                document.querySelector('#temp-img').style.animationName = 'slideInDown';
                document.querySelector('#display-img').style.animationName = 'slideOutDown';
            }
            break;

        case 'left':
            if(!document.querySelector('#left').classList.contains('disable')){
                console.log("MOVING LEFT");
                env.posX -= 1;
                document.querySelector('#temp-img').style.transform = 'translate(100vw, -100vh)';
                document.querySelector('#temp-img').style.animationName = 'slideInRight';
                document.querySelector('#display-img').style.animationName = 'slideOutRight';
            }
            break;

        case 'right':
            if(!document.querySelector('#right').classList.contains('disable')){
                console.log("MOVING RIGHT");
                env.posX += 1;
                document.querySelector('#temp-img').style.transform = 'translate(-100vw, -100vh)';
                document.querySelector('#temp-img').style.animationName = 'slideInLeft';
                document.querySelector('#display-img').style.animationName = 'slideOutLeft';
            }
            break;

        case 'down':
            if(!document.querySelector('#down').classList.contains('disable')){
                console.log("MOVING DOWN");
                env.posY += 1;
                document.querySelector('#temp-img').style.transform = 'translate(0vw, -100vh)';
                document.querySelector('#temp-img').style.animationName = 'slideInUp';
                document.querySelector('#display-img').style.animationName = 'slideOutUp';
            }
            break;

        default:
            console.log("INVALID BUTTON");
            break;
    }

    displayPosition();
}

//Spits out coordinates in the log
function displayPosition() {
    let coords = {
        X: env.posX,
        Y: env.posY
    };
    console.log(coords);
}
