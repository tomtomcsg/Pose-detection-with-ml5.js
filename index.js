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
    video.hide();
}

function videoLoaded() {
    console.log("VIDEO WORKING");
}

function draw() {
    image(video, 0, 0);

    drawDots();
}

function drawDots() {
    // loops through all the poses detected
    for (let i = 0; i < poses.length; i += 1) {
        const pose = poses[i].pose;

        for (let j = 0; j < pose.keypoints.length; j += 1) {
            const keypoint = pose.keypoints[j];

            if (keypoint.score > 0.2) {
                fill(255, 0, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}
