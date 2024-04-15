let video;
let poseNet;
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);

    poseNet = ml5.poseNet(video, videoLoaded);

    poseNet.on("pose", (results) => {
        poses = results;
        //console.log(poses);
    });
}

function videoLoaded() {
    console.log("VIDEO WORKING");
}
