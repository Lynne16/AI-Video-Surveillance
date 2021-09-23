vid="";
status1="";
objects=[];
function preload(){
vid=createVideo('video.mp4');
vid.hide();
}

function setup(){
canvas=createCanvas(450,400);
canvas.position(450,220);

}

function draw(){
    image(vid,0,0,450,400);

    if(status1 != ""){
        objectDetector.detect(vid,gotResult);
        document.getElementById("status").innerHTML="Status: Objects Detected";
        document.getElementById("no_objects").innerHTML="Number of objects detected are "+objects.length;

        for(var i=0; i < objects.length; i++){
            fill('yellow');
            percent =floor(objects[i].confidence  * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke('yellow');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
        }

    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log('Model Loaded!!!');
    status1=true;
    vid.loop();
    vid.speed(1);
    vid.volume(0);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
         objects=results;
    }
}
