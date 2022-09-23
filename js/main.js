import allMusic from "../assets/musics.js";
// class Player{
//     constructor (className) {
//         this.player = document.querySelector("."+className) || null;
//         musicImg = document.querySelector('img')
//     }

//     play () {
//         console.log(this.musicImg);
//         console.log(this.player);
//     }

// }

// const MyPlayer = new Player('wraper');

// MyPlayer.play();

const wraper = document.querySelector(".wraper"),
    music = {
        image: document.querySelector('img'),
        name: document.querySelector('.name'),
        artist: document.querySelector('.artist'),
        audio: document.querySelector('#main-audio'),
    },
    controls = {
        play: document.querySelector('.play-pause'),
        prev: document.querySelector('.prev'),
        next: document.querySelector('.next')
    },
    // mainAudio = document.querySelector('#main-audio'),
    progress = {
        progressArea: document.querySelector('.progress-area'),
        progressBar: document.querySelector('.progress-bar'),
        currentTime: document.querySelector('.current-time'),
        maxDuration: document.querySelector('.max-duration'),
    };
   


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1), isMusicPaused = true;

window.onload = () => {
    loadMusic(musicIndex);
};

controls.play.onclick = function (event) {
    event.preventDefault();
    const isMusicPlay = wraper.classList.contains('paused');
    isMusicPlay ? pauseMusic() : playMusic();
}

controls.prev.onclick = function (event) {
    event.preventDefault();
    previousMusic();
}

controls.next.onclick = function (event) {
    event.preventDefault();
    nextMusic();
}

music.audio.addEventListener("timeupdate", timeUpdate);
music.audio.addEventListener("ended", () => {
    nextMusic();
});

progress.progressArea.onclick = function (event) {
    let progressLength = progress.progressArea.clientWidth;
    let clientOffsetX = event.offsetX;
    let maxDuration = music.audio.duration;

    music.audio.currentTime = (clientOffsetX / progressLength) * maxDuration;
    playMusic();
}

function loadMusic(index) {
    const { name, artist, img, src } = allMusic[ index - 1 ];
    music.artist.innerText = " - "+artist;
    music.name.innerText = name;
    music.image.src = "assets/images/"+img;
    music.audio.src = "assets/songs/"+src;
    console.log(name);
}

function playMusic() {
    controls.play.innerHTML = ' <i class="ri-pause-line"></i>';
    wraper.classList.add("paused");
    music.image.classList.add("rotate");
    music.audio.play();
}

function pauseMusic() {
    controls.play.innerHTML = ' <i class="ri-play-line"></i>';
    wraper.classList.remove("paused");
    music.image.classList.remove("rotate");
    music.audio.pause();
}

function previousMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic(musicIndex);
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic(musicIndex);
}

function timeUpdate(event) {
    const { currentTime, duration } = event.target;
    let progressLength = (currentTime / duration) * 100;
    progress.progressBar.style.width = progressLength + "%";
   

    music.audio.addEventListener("loadeddata", event => {
        //Get song duration, minutes and seconds
        let musicDuration = music.audio.duration,
            minutes = Math.floor(musicDuration / 60),
            seconds = Math.floor(musicDuration % 60);

        if (seconds < 10) { 
            seconds = `0${seconds}`;
        }
        progress.maxDuration.innerText = minutes + ":" + seconds;
    });

    let currentMin = Math.floor(currentTime / 60),
        currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { 
        currentSec = `0${currentSec}`;
    }
    progress.currentTime.innerText = currentMin + ":" + currentSec;
}
