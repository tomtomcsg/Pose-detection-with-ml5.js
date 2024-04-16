let video;
let poseNet;
let poses = [];
let neuralNetwork;
let state = "waiting";
let targetLabel;
let inputs = [];

//triggers data collection
function dataTrigger(key) {
    targetLabel = key;
    console.log(targetLabel);

    setTimeout(function () {
        console.log("collecting");
        state = "collecting";
        setTimeout(function () {
            console.log("not collecting");
            state = "not collecting";
        }, 10000);
    }, 10000);
}

//sets up web cam
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

//listens for poses
function gotPoses(poses) {
    if (poses.length > 0) {
        let pose = poses[0].pose;
        let skeleton = poses[0].skeleton;
        if (state == "collecting") {
            for (let j = 0; j < pose.keypoints.length; j++) {
                let x = pose.keypoints[j].position.x;
                let y = pose.keypoints[j].position.y;

                if (keypoint.score > 0.2) {
                    inputs.push(x);
                    inputs.push(y);
                }
            }
            let target = [targetLabel];
            neuralNetwork.addData(inputs, target);
        }
    }
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

//keypoints
function drawDots() {
    // loops through all the poses detected
    for (let i = 0; i < poses.length; i += 1) {
        const pose = poses[i].pose;

        for (let j = 0; j < pose.keypoints.length; j++) {
            const keypoint = pose.keypoints[j];

            if (keypoint.score > 0.2) {
                fill(255, 0, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}

// skeleton frame
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
