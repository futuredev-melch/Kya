onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  // Open this flower's panel when a flower is clicked
  document.querySelectorAll(".lotus-flower").forEach((flower) => {
    flower.addEventListener("click", () => {
      const id = flower.getAttribute("data-flower");
      if (!id) return;
      document.querySelectorAll(".greeting-panel").forEach((p) => p.classList.remove("active"));
      const panel = document.getElementById("greeting-panel-" + id);
      if (panel) panel.classList.add("active");
      document.body.classList.add("panel-open");
    });
  });

  // Close panel and fade "Hello Kya" back in (any close button)
  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".greeting-panel-close")) {
      document.querySelectorAll(".greeting-panel").forEach((p) => p.classList.remove("active"));
      document.body.classList.remove("panel-open");
    }
  });

  // Background music playlist: play/pause, volume, auto-advance to next song
  const bgMusic = document.getElementById("bg-music");
  const musicPlay = document.getElementById("music-play");
  const musicPause = document.getElementById("music-pause");
  const musicVolume = document.getElementById("music-volume");
  const musicControls = document.querySelector(".music-controls");

  const playlist = [
    "background.mp3/Pelikula_-_Janine_Teñoso__Lyrics__ft._Arthur_Nery(256k).mp3",
    "background.mp3/Jolianne,_Arthur_Nery_–_Palayo_Sa_Mundo__Official_Lyric_Video_(256k).mp3",
    "background.mp3/Arthur_Nery_-_Got_Me_Tangled__Official_Audio_(256k).mp3",
    "background.mp3/Arthur_Nery_-_Life_Puzzle__Lyrics_(256k).mp3",
    "background.mp3/Kyle_Raphael_-_Libu-libong_buwan__uuwian___Official_Lyric_Video_(256k).mp3",
    "background.mp3/Mikasa_-_Arthur_Nery___Janine_Berdin__Official_Lyric_Video_(256k).mp3",
    "background.mp3/Zack_Tabudlo_-_Pulso__Official_Lyric_Video_(256k).mp3",
    "background.mp3/fitterkarma_-_Kalapastangan__Lyrics_(256k).mp3",
    "background.mp3/fitterkarma_-_Pag-Ibig_ay_Kanibalismo_II__Lyrics_(256k).mp3"
  ];
  let playlistIndex = 0;

  function playCurrentTrack() {
    if (playlist.length === 0) return;
    bgMusic.src = playlist[playlistIndex];
    bgMusic.load();
    bgMusic.play().catch(() => {});
    musicControls.classList.add("playing");
  }

  function playNextTrack() {
    playlistIndex = (playlistIndex + 1) % playlist.length;
    playCurrentTrack();
  }

  if (bgMusic && musicPlay && musicPause && musicVolume) {
    bgMusic.addEventListener("ended", playNextTrack);

    musicPlay.addEventListener("click", () => {
      if (bgMusic.src) {
        bgMusic.play().catch(() => {});
        musicControls.classList.add("playing");
      } else {
        playCurrentTrack();
      }
    });
    musicPause.addEventListener("click", () => {
      bgMusic.pause();
      musicControls.classList.remove("playing");
    });
    musicVolume.addEventListener("input", () => {
      bgMusic.volume = parseFloat(musicVolume.value);
    });
  }
};