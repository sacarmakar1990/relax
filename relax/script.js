window.addEventListener('DOMContentLoaded', () => {
    const sound = document.querySelector("#sound"),
          start = document.querySelector("#start"),
          timeButton = document.querySelectorAll("#time div"),
          weather = document.querySelectorAll("#weather div"),
          replay = document.querySelector("#replay"),
          video = document.querySelector("#video"),
          time = document.querySelector("#play-time"),
          circle = document.querySelector("#circle"),
          outlineLength = circle.getTotalLength();


    start.addEventListener('click', () => {
        if (sound.paused) {
            sound.play();
            video.play();
            start.src = "./svg/pause.svg";
        } else {
            sound.pause();
            video.pause();
            start.src = "./svg/play.svg";
        }
    }); 

    replay.addEventListener('click', () => {
        sound.currentTime = 0;
    });

    let duration = 600;

    circle.style.strokeDashoffset = outlineLength;
    circle.style.strokeDasharray = outlineLength;

    sound.ontimeupdate = () => {
        let currentTime = sound.currentTime;
        let elapsed = duration - currentTime;
        let second = Math.floor(elapsed % 60);
        let minute = Math.floor(elapsed / 60);
        minute = minute < 10 ? `0${minute}` : minute;
        second = second < 10 ? `0${second}` : second;
        time.textContent = `${minute}:${second}`;
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        circle.style.strokeDashoffset = progress;

        if (currentTime >= duration) {
            sound.pause();
            sound.currentTime = 0;
            start.src = "./svg/play.svg";
            video.pause();
        }
    };

    timeButton.forEach(btn => {
        btn.addEventListener("click", function() {
            duration = this.getAttribute("data-time");
            let min = Math.floor(duration / 60);
            let sec = Math.floor(duration % 60);
            min = min < 10 ? `0${min}` : min;
            sec = sec < 10 ? `0${sec}` : sec;
            time.textContent = `${min}:${sec}`;
        });
    });


    weather.forEach(item => {
        item.addEventListener("click", function() {
        sound.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
            if (sound.paused) {
                sound.play();
                video.play();
                start.src = "./svg/pause.svg";
            } else {
                sound.pause();
                video.pause();
                start.src = "./svg/play.svg";
            }
        });
    });
});