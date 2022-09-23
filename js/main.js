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

function loadMusic(index) {
    const { name, artist, img, src } = allMusic[ index - 1 ];
    music.artist.innerText = artist;
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
   

    music.audio.addEventListener("loadeddate", event => {
        //Get song duration, minutes and seconds
        console.log(event);
        let musicDuration = music.audio.duration,
            minutes = Math.floor(musicDuration / 60),
            seconds = Math.floor(musicDuration % 60);
        
        progress.maxDuration.innerText = minutes + ":" + seconds;
    });
}

function loadedDate() {
    
}

console.log(document.querySelector('#main-audio'));