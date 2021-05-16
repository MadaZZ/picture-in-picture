const videoElement = document.getElementById('video');
const button = document.getElementById('button');


// Prompt user to select a media stream to be displayed
const selectMediaStream = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;

        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        }

        videoElement.onloadedmetadata = () => {
            videoElement.play();
            videoElement.requestPictureInPicture();
        }
        
    } catch (e) {

    }
}

const startPicInPic = async () => {
    button.disabled = true;
    await selectMediaStream();
    button.disabled = false;
}

const onExitPip = () => {
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
        track.stop();
    });
}

videoElement.addEventListener("leavepictureinpicture", onExitPip, false);
button.addEventListener('click', startPicInPic)
