let video;
let poseNet;
let poses = [];
let neuralNetwork;

let state = "waiting";
let targetLabel;

function dataTrigger() {
    targetLabel = key;
    console.log(targetLabel);
    setTimeout(function () {
        console.log("collecting");
        state = "collecting";
    }, 1000);
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);

    poseNet = ml5.poseNet(video, videoLoaded);

    poseNet.on("pose", (results) => {
        poses = results;
        //console.log(poses);
    });
    video.hide();

    let options = {
        inputs: 34,
        outputs: 4,
        tasks: "classification",
        debug: true,
    };

    neuralNetwork = ml5.neuralNetwork(options);
}

function videoLoaded() {
    console.log("VIDEO WORKING");
    document.getElementById("loading").innerHTML = "Working!";
}

function draw() {
    translate(video.width, 0);
    scale(-1, 1);
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
    // loops through the skeleton frame
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
