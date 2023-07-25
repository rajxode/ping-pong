var rods=document.getElementsByClassName('rod');
var rodStep=30;
var ballStep=10;
var ball=document.getElementById('ball');
var interval;
var start=false;
var onRod=1;

ball.style.top="15px";
ball.style.left=parseInt(ball.offsetLeft) + "px";


var initialBall_top=ball.style.top;
var initialBall_left=ball.style.left;
var initialRod=parseInt(rods[0].offsetLeft) + "px";



var rodScore=0;
localStorage.setItem("winner", " ");
localStorage.setItem("maxScore", "0");


function reset(pos){
    if(rodScore > localStorage.getItem("maxScore")){
        localStorage.setItem("maxScore", rodScore);       
    }

    start=false;
    for(let i=0;i<2;i++){
        rods[i].style.left=initialRod;
    }
    ball.style.left=initialBall_left;
    if(pos === 1){
        localStorage.setItem("winner","Rod2");
        ball.style.top=initialBall_top;    
    }

    else{
        localStorage.setItem("winner","Rod1");
        ball.style.top="94vh";    
    }
    
}


function coordinates(rod){
    return rod.getBoundingClientRect();
}

function moveDownLeft(){
    rodScore +=10;
    var ballCoor3=coordinates(ball);
    var rodCoor3=coordinates(rods[1]);

    if( ( (ballCoor3.top + 30) > rodCoor3.top ) && ( (rodCoor3.x < (ballCoor3.x -130) )  || (rodCoor3.x > (ballCoor3.x + 10)) ) ){
        clearInterval(interval);
        onRod=2;
        reset(onRod);
        window.alert(localStorage.getItem("winner") + " is winner with a score of " + rodScore + ". The high Score is " + localStorage.getItem("maxScore") + "!!!");
    }

    else if( (window.innerHeight - ballCoor3.top  > 49) && ( ballCoor3.x > 10 ) ){
        (ball.style.top=parseInt(ball.style.top) + ballStep + "px") && (ball.style.left=parseInt(ball.style.left) - ballStep + "px");
    }

    else if( ballCoor3.x > 10){
        clearInterval(interval);
        interval=setInterval(moveUpLeft,25);
    }

    else if( window.innerHeight - ballCoor3.top  > 49){
        clearInterval(interval);
        interval=setInterval(moveDownRight,25);
    }
}


function moveUpRight(){
    rodScore +=10;
    var ballCoor2=coordinates(ball);
    var rodCoor2=coordinates(rods[0]);

    if( ( ballCoor2.top <= 15 ) && ( (rodCoor2.x < (ballCoor2.x -130) )  || (rodCoor2.x > (ballCoor2.x + 10)) ) ){
        clearInterval(interval);
        onRod=1
        reset(onRod);
        window.alert(localStorage.getItem("winner") + " is winner with a score of " + rodScore + ". The high Score is " + localStorage.getItem("maxScore") + "!!!");
    }

    else if( (ballCoor2.top > 15) &&  ( window.innerWidth - (ballCoor2.x)   >30) ){
            (ball.style.top=parseInt(ball.style.top) - ballStep + "px") && (ball.style.left=parseInt(ball.style.left) + ballStep + "px");   
    }

    else if((window.innerWidth - (ballCoor2.x + 30)  >10)){
        clearInterval(interval);
        interval=setInterval(moveDownRight,25);
    }

    else if( ballCoor2.x > 10  ){
        clearInterval(interval);
        interval=setInterval(moveUpLeft,25);   
    }

}

function moveUpLeft(){
    rodScore +=10;
    var ballCoor1=coordinates(ball);
    var rodCoor1=coordinates(rods[0]);

    if( ( ballCoor1.top <= 15 ) && ( (rodCoor1.x < (ballCoor1.x -130) )  || (rodCoor1.x > (ballCoor1.x + 10)) ) ){
        clearInterval(interval);
        onRod=1;
        reset(onRod);
        window.alert(localStorage.getItem("winner") + " is winner with a score of " + rodScore + ". The high Score is " + localStorage.getItem("maxScore") + "!!!");
    }    

    else if((ballCoor1.top > 15 ) && (ballCoor1.x >10)){
            (ball.style.top=parseInt(ball.style.top) - ballStep + "px") && (ball.style.left=parseInt(ball.style.left) - ballStep + "px");   
    }

    else if( ballCoor1.x > 10 ){
        clearInterval(interval);
        interval=setInterval(moveDownLeft,25);
    }

    else if(ballCoor1.top >15){
        clearInterval(interval);
        interval=setInterval(moveUpRight,25);   
    }

    else{
        clearInterval(interval);
    }
}


function moveDownRight(){
    rodScore +=10;
    var ballCoor=coordinates(ball);
    var rodCoor=coordinates(rods[1]);

    if( ( (ballCoor.top + 30) > rodCoor.top ) && ( (rodCoor.x < (ballCoor.x -130) )  || (rodCoor.x > (ballCoor.x + 10)) ) ){
        clearInterval(interval);
        onRod=2;
        reset(onRod);
        window.alert(localStorage.getItem("winner") + " is winner with a score of " + rodScore + ". The high Score is " + localStorage.getItem("maxScore") + "!!!");
    }


    else if( (window.innerHeight - ballCoor.top  > 49) && (window.innerWidth - ballCoor.x > 40) ){
        (ball.style.top=parseInt(ball.style.top) + ballStep + "px") && (ball.style.left=parseInt(ball.style.left) + ballStep + "px");
    }

    else if((window.innerWidth - (ballCoor.x + 30)  >10)){
        clearInterval(interval);
        interval=setInterval(moveUpRight,25);
    }

    else if(ballCoor.x >10){
        clearInterval(interval);
        interval=setInterval(moveDownLeft,25);
    }

}


window.addEventListener('keyup',(event)=>{
    if( (event.key=="Enter") && (start == false) ){
        rodScore=0;
        start=true;
        if(onRod == 1){
            interval=setInterval(moveDownRight,25);            
        }

        else{
            interval=setInterval(moveUpRight,25);
        }
        
    }
});




window.addEventListener('keypress',(event)=>{
    switch(event.key){
        case "d":
            let pos1=coordinates(rods[0]);
            if(window.innerWidth - pos1.x < 168){
                break;
            }
            
            for(let i=0;i<2;i++){
                rods[i].style.left=parseInt(rods[i].offsetLeft) + rodStep + "px";
            }
            break;
    

        case "a":
            let pos=coordinates(rods[0]);
            if(pos.x == 0){
                break;
            }
            for(let i=0;i<2;i++){
                rods[i].style.left=parseInt(rods[i].offsetLeft) - rodStep + "px";
            }
            break;

        default:
            break;
    }
    
});


