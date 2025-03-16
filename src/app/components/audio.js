document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('myaudio');
    var record = document.getElementById('record');

    // Set initial volume
    audio.volume = 0.3;

    // Retrieve playback state from localStorage
    if (localStorage.getItem('audioPaused') === 'false') {
        audio.play();
    } else {
        audio.pause();
    }

    // Retrieve current time from localStorage
    var savedTime = localStorage.getItem('audioCurrentTime');
    if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime);
    }

    var savedTransform = localStorage.getItem('recordTransform');
    if (savedTransform) {
        record.style.transform = savedTransform;
    }
    record.addEventListener('click', function () { //for this event listener, it should pop up the audio pause and play button
        if (audio.paused) {
            audio.play();
            localStorage.setItem('audioPaused', 'false');
            record.classList.remove('paused');
        } else {
            audio.pause();
            localStorage.setItem('audioPaused', 'true');
            localStorage.setItem('audioCurrentTime', audio.currentTime);
            localStorage.setItem('recordTransform', window.getComputedStyle(record).getPropertyValue('transform'));
            record.classList.add('paused');
        }
    });
    if (audio.paused) {
     
        record.classList.add('paused');
       
    }
    setInterval(function () {
        if (!audio.paused) {
            localStorage.setItem('audioCurrentTime', audio.currentTime);
        }
    }, 1000);
});
