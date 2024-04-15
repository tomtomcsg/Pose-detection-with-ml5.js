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
    drawSkeleton();
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

function drawSkeleton() {
    for (let i = 0; i < poses.length; i++) {
        const skeleton = poses[i].skeleton;

        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255, 0, 0);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
