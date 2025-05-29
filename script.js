function showSection(id) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

const slides = [
  "В тишине наших сердец играет нежная мелодия.",
  "Ты — как солнце с утра, согреваешь меня своим светом.",
  "Твои слова для меня — самый лучший комплимент.",
  "Когда я думаю о тебе, мир становится ярче.",
  "Каждый миг с тобой — это подарок, который я храню.",
  "Ты — вдохновение для моих самых прекрасных мечтаний."
];

const videoIds = [
  "WFBDaxewTY0",
  "odinQDui0CY",
  "5sd7gJTnFRM",
  "xJrA4MfsZjQ",
  "wEhqCE0aEnE",
  "Nhz_8fWhDT0"
];

const correctPassword = 'love';

let player;
let currentSlide = 0;
let sliderStarted = false;

function checkPassword() {
  const input = document.getElementById('passwordInput').value.trim().toLowerCase();
  if (input === correctPassword) {
    document.getElementById('passwordPrompt').style.display = 'none';
    document.getElementById('sliderArea').classList.remove('hidden');
    sliderStarted = true;
    currentSlide = 0;
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      // YouTube API ещё не загружен, создадим плеер при загрузке API
      loadYouTubeAPI();
    } else {
      createPlayer(videoIds[currentSlide]);
    }
    showSlide(currentSlide);
  } else {
    document.getElementById('errorMessage').textContent = 'Неверный пароль. Попробуй ещё.';
  }
}

function loadYouTubeAPI() {
  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

function onYouTubeIframeAPIReady() {
  if (sliderStarted) {
    createPlayer(videoIds[currentSlide]);
  }
}

function createPlayer(videoId) {
  if (player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('player', {
      height: '270',
      width: '480',
      videoId: videoId,
      playerVars: { 'autoplay': 1, 'controls': 1 },
      events: {
        'onReady': (event) => event.target.playVideo()
      }
    });
    document.getElementById('player').style.display = 'block';
  }
}

function showSlide(index) {
  const sliderContent = document.getElementById('sliderContent');
  sliderContent.textContent = slides[index];
  if (player) {
    player.loadVideoById(videoIds[index]);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
}
