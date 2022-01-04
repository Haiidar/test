const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// firt - live screen the window 
async function liveScreenWindow(){
  try{
    const screenVideo = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = screenVideo;
    videoElement.onloadedmetadata = () => {
      videoElement.play()
    }
  }catch (err){
    console.log('bug in live screen window');
  }
}

button.addEventListener('click', async () => {
  // button.disabled = true;
  await videoElement.requestPictureInPicture()
  // button.disabled = fasle;
});
liveScreenWindow()