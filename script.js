// ===========================================
// 1. CUSTOMIZATION
// ===========================================

const PIN = "2580"; // Change to your desired PIN
const SONG_DURATION = 10; // seconds

// ── IMAGE / GIF ASSETS ──────────────────────────────────────────────────────
// Place your files in assets/images/ and update the paths below.
//
// Suggested sources:
//   • https://giphy.com   – search any keyword, download as GIF
//   • https://tenor.com   – same
//   • https://sticker.ly  – sticker packs
//
// Each entry below is { src: "path/to/file", fallback: "emoji" }
// If the image file is missing, the emoji fallback is shown instead.
// ────────────────────────────────────────────────────────────────────────────
const ASSETS = {
  // Cake section ─ assets/images/cake.gif
  cake:      { src: "./assets/images/greet(2).png", fallback: "🎂" },
  blownCake: { src: "./assets/images/greet.png",    fallback: "🍰" },

  // Celebration row (can be more than 3) ─ assets/images/cat1.gif, cat2.gif, cat3.gif
  // Add more objects to the array for more cats in the celebration row.
  celebrationCats: [
    { src: "./assets/images/celeb.png", fallback: "🎉" },
    { src: "./assets/images/celeb.png", fallback: "🎉" },
    { src: "./assets/images/celeb.png", fallback: "🎉" }
  ],

  // Gift icons ─ assets/images/gift1.gif, gift2.gif, gift3.gif
  gifts: [
    { src: "./assets/images/greet(3).png", fallback: "🎁" },
    { src: "./assets/images/greet(4).png", fallback: "💝" },
    { src: "./assets/images/greet(5).png", fallback: "🎀" }
  ],

  // Cat surprise page ─ assets/images/cat-surprise.gif
  cat: { src: "./assets/images/cat-surprise.gif", fallback: "🐱💙" },

  // Memory card faces — 3 unique = 6 cards (3 pairs)
  cards: [
    { id: 0, src: "", fallback: "💙" },
    { id: 1, src: "", fallback: "🧭" },
    { id: 2, src: "", fallback: "✈️" }
  ],

  // Rating modals ─ assets/images/rate1.gif … rate5.gif
  // Index 0 = rating 1, index 4 = rating 5
  ratings: [
    { src: "./assets/images/dog.png",   fallback: "😿" },
    { src: "./assets/images/bird.png",  fallback: "🥺" },
    { src: "./assets/images/hams.png",  fallback: "🙂" },
    { src: "./assets/images/bunny.png", fallback: "😻" },
    { src: "./assets/images/frog.png",  fallback: "🥳" }
  ]
};

const GIFT_DATA = [
  { title: "A Virtual Hug!",      message: "Sending you the biggest birthday hug! 💙",          catAsset: ASSETS.celebrationCats[0] },
  { title: "A Little Love Note!", message: "You are special and deserve all the happiness!",     catAsset: ASSETS.celebrationCats[1] },
  { title: "A Wish Just for You!",message: "May your dreams come true this year! ✨",            catAsset: ASSETS.celebrationCats[2] }
];

const RATING_DATA = [
  ["Halaa! bakeettt?",    "I-open ang imong window and receive my big hug for youuu!"],
  ["Bakit uleettt",   "I hope your day gets brighter!"],
  ["Bakit uleettt (2)",  "Keep smiling, birthday cat!"],
  ["Yayyy! So happy!",        "Tingen nga ng haappyyy"],
  ["SOAPERLATIVE HAPPINESS!",    "YAAAAAY! Happy birthday! May camera ito, smile to capture"]
];

// ===========================================
// 2. HELPERS
// ===========================================

const $ = id => document.getElementById(id);

const labels = {
  pinSection:    "Secret entrance",
  cakeSection:   "Birthday cake",
  giftSection:   "Cat Mystery Surprise",
  giftRevealSection: "The Surprise Cat",
  gameSection:   "Matching game",
  happySection:  "YES question",
  ratingSection: "Rating",
  finalSection:  "The end"
};

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === id));
  $("stepLabel").textContent = labels[id] || "";
  $("siteHeader").style.display = id === "pinSection" ? "none" : "flex";
  window.scrollTo(0, 0);
}

function shuffle(arr) {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// Renders an asset (img or emoji span) into a container element.
// container  – the DOM element to render into
// asset      – { src, fallback }
// className  – CSS class to apply
function renderAsset(container, asset, className = "") {
  container.innerHTML = "";
  if (asset.src) {
    const img = document.createElement("img");
    img.src = asset.src;
    img.alt = asset.fallback;
    if (className) img.className = className;
    img.onerror = () => {
      const span = document.createElement("span");
      span.textContent = asset.fallback;
      if (className) span.className = className;
      img.replaceWith(span);
    };
    container.appendChild(img);
  } else {
    const span = document.createElement("span");
    span.textContent = asset.fallback;
    if (className) span.className = className;
    container.appendChild(span);
  }
}

// ===========================================
// 3. PIN KEYPAD
// ===========================================

let enteredPin = "";
let authenticated = false;
let pinBusy = false;

function updatePin() {
  $("pinDisplay").textContent =
    Array.from({ length: 4 }, (_, i) => i < enteredPin.length ? "●" : "○").join(" ");
}

document.querySelectorAll("[data-digit]").forEach(btn => {
  btn.addEventListener("click", () => {
    if (pinBusy || authenticated || enteredPin.length === 4) return;
    enteredPin += btn.dataset.digit;
    updatePin();

    if (enteredPin.length === 4) {
      if (enteredPin === PIN) {
        authenticated = true;
        $("pinMessage").textContent = "Welcome!💙";
        showPage("cakeSection");
        playBirthdayVideo();
      } else {
        pinBusy = true;
        $("pinMessage").textContent = "Wrong PIN! Try again.";
        setTimeout(() => { enteredPin = ""; pinBusy = false; updatePin(); }, 600);
      }
    }
  });
});

$("clearPin").onclick  = () => { if (!pinBusy) { enteredPin = ""; updatePin(); } };
$("deletePin").onclick = () => { if (!pinBusy) { enteredPin = enteredPin.slice(0, -1); updatePin(); } };

// ===========================================
// 4. BIRTHDAY VIDEO
// ===========================================

const birthdayVideo = $("birthdayVideo");

async function playBirthdayVideo() {
  if (!birthdayVideo) { onVideoEnd(); return; }
  birthdayVideo.currentTime = 0;
  try {
    await birthdayVideo.play();
    $("videoStatus").textContent = " ";
  } catch {
    $("videoStatus").textContent = "Tap the video to play your surprise! 💙";
    birthdayVideo.controls = true;
  }
}

function onVideoEnd() {
  $("videoWrap").classList.add("hidden");
  $("songArea").classList.remove("hidden");
  startBirthdaySong();
}

if (birthdayVideo) {
  birthdayVideo.addEventListener("ended", onVideoEnd);
}

// ===========================================
// 5. AUDIO ENGINE — 10-SECOND BIRTHDAY SONG
// ===========================================

let audioCtx = null, songTimeout = null, progressTimer = null;
let songStart = 0, songFinished = false, candleBlown = false;
let songPlaying = false, activeNotes = [];

function getAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  return audioCtx;
}

function note(freq, start, dur, type = "sine", vol = .09) {
  const ctx = getAudio(); if (!ctx) return;
  const osc = ctx.createOscillator(), gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(.0002, vol), start + .025);
  gain.gain.exponentialRampToValueAtTime(.0001, start + dur);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(start); osc.stop(start + dur + .02);
  activeNotes.push(osc);
}

function stopNotes() { activeNotes.forEach(o => { try { o.stop(); } catch {} }); activeNotes = []; }

function stopSong() {
  clearTimeout(songTimeout); clearInterval(progressTimer);
  stopNotes(); songPlaying = false;
}

async function startBirthdaySong() {
  if (songFinished || candleBlown || songPlaying) return;
  const ctx = getAudio();
  if (!ctx) { finishSong(); return; }
  try { await ctx.resume(); } catch { $("playSongBtn").classList.remove("hidden"); return; }
  if (songFinished || songPlaying) return;

  songPlaying = true;
  $("cakeHint").textContent = " ";

  const melody = [
    523.25, 659.25, 783.99, 659.25,
    587.33, 698.46, 880.00, 698.46,
    659.25, 783.99, 987.77, 783.99,
    698.46, 659.25, 587.33, 523.25,
    587.33, 659.25, 783.99, 1046.50
  ];
  const t = ctx.currentTime + .03;
  melody.forEach((f, i) => {
    note(f,     t + i * .5, .43, "triangle", .08);
    note(f / 2, t + i * .5, .43, "sine",     .025);
  });

  songStart = performance.now();
  progressTimer = setInterval(() => {
    const elapsed = Math.min(SONG_DURATION, (performance.now() - songStart) / 1000);
    $("songProgress").style.width = `${elapsed / SONG_DURATION * 100}%`;
    $("songTimer").textContent = `${Math.floor(elapsed)} seconds`;
  }, 100);
  songTimeout = setTimeout(finishSong, SONG_DURATION * 1000);
}

function finishSong() {
  if (songFinished) return;
  clearInterval(progressTimer); songPlaying = false; songFinished = true;
  $("songProgress").style.width = "100%";
  $("songTimer").textContent = "10 seconds";
  $("cakeHint").textContent = "Make a wish! Tap the cake to blow the candles!";
  $("cakeButton").disabled = false;
  $("cakeButton").classList.add("ready");
  $("playSongBtn").classList.add("hidden");
}

$("playSongBtn").onclick = () => { getAudio() ? startBirthdaySong() : finishSong(); };

// ===========================================
// 6. CANDLE + CELEBRATION
// ===========================================

function playCelebrationSound() {
  const ctx = getAudio(); if (!ctx) return;
  ctx.resume().then(() => {
    const now = ctx.currentTime + .02;
    [523, 659, 784, 1047].forEach((f, i) => note(f, now + i * .12, .35, "triangle", .11));
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * .12), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    for (let i = 0; i < 7; i++) {
      const src = ctx.createBufferSource(), gain = ctx.createGain(), filt = ctx.createBiquadFilter();
      src.buffer = buf; filt.type = "highpass"; filt.frequency.value = 900;
      gain.gain.setValueAtTime(.13, now + i * .17);
      gain.gain.exponentialRampToValueAtTime(.001, now + i * .17 + .11);
      src.connect(filt); filt.connect(gain); gain.connect(ctx.destination);
      src.start(now + i * .17);
    }
  }).catch(() => {});
}

function playGiftCelebrationSound() {
  const ctx = getAudio(); if (!ctx) return;
  ctx.resume().then(() => {
    const now = ctx.currentTime + .02;
    // Fanfare: ascending triumphant notes
    [[523,.0],[659,.15],[784,.3],[1047,.45],[1319,.6],[1047,.75],[1319,.9]]
      .forEach(([f, t]) => note(f, now + t, .25, "triangle", .12));
    // Sparkle noise bursts
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * .08), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    for (let i = 0; i < 5; i++) {
      const src = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      src.buffer = buf; f.type = "highpass"; f.frequency.value = 1200;
      g.gain.setValueAtTime(.15, now + i * .18);
      g.gain.exponentialRampToValueAtTime(.001, now + i * .18 + .08);
      src.connect(f); f.connect(g); g.connect(ctx.destination);
      src.start(now + i * .18);
    }
  }).catch(() => {});
}

function playYaySound() {
  const ctx = getAudio(); if (!ctx) return;
  ctx.resume().then(() => {
    const now = ctx.currentTime + .02;
    // Bright ascending scale
    [523, 587, 659, 698, 784, 880, 988, 1047].forEach((f, i) =>
      note(f, now + i * .1, .18, "sine", .1)
    );
    // Final chord
    [523, 659, 784, 1047].forEach(f => note(f, now + .85, .5, "triangle", .08));
  }).catch(() => {});
}

// Render initial cake image into the cake slot
const cakeSlot = document.createElement("div");
cakeSlot.className = "cake-slot";
renderAsset(cakeSlot, ASSETS.cake, "cake-art float");
$("cakeButton").appendChild(cakeSlot);

$("cakeButton").onclick = () => {
  if (!songFinished || candleBlown) return;
  candleBlown = true;
  $("cakeButton").disabled = true;
  $("cakeButton").classList.remove("ready");
  renderAsset(cakeSlot, ASSETS.blownCake, "cake-art");
  $("cakeHint").textContent = "";

  const container = $("celebrationCats");
  container.replaceChildren();
  const wrap = document.createElement("span");
  renderAsset(wrap, ASSETS.celebrationCats[0], "cat-gif float");
  container.appendChild(wrap);

  $("celebration").classList.remove("hidden");
  $("cakeNext").classList.remove("hidden");
  playCelebrationSound();
};

$("cakeNext").onclick = () => showPage("giftSection");

// ===========================================
// 7. GIFTS
// ===========================================

let giftOrder = [0, 1, 2], selectedGift = null, giftOpening = false;

function renderGifts() {
  $("giftGrid").replaceChildren();
  giftOrder.forEach((giftId, pos) => {
    const btn = document.createElement("button");
    btn.className = "gift-card";
    btn.disabled = selectedGift !== null || giftOpening;

    const iconWrap = document.createElement("div");
    iconWrap.className = "gift-icon";
    renderAsset(iconWrap, ASSETS.gifts[giftId], "gift-img");

    const label = document.createElement("span");
    label.textContent = String.fromCharCode(65 + pos);

    btn.append(iconWrap, label);
    btn.onclick = () => chooseGift(giftId, btn);
    $("giftGrid").appendChild(btn);
  });
}

function chooseGift(id, button) {
  if (selectedGift !== null || giftOpening) return;
  giftOpening = true; selectedGift = id;
  $("shuffleBtn").disabled = true;
  document.querySelectorAll(".gift-card").forEach(c => c.disabled = true);
  button.classList.add("shaking");
  playGiftCelebrationSound();

  setTimeout(() => showPage("giftRevealSection"), 800);
}

$("shuffleBtn").onclick = () => {
  if (selectedGift !== null) return;
  let next;
  do { next = shuffle(giftOrder); } while (next.every((v, i) => v === giftOrder[i]));
  giftOrder = next;
  renderGifts();
};

renderGifts();

$('giftRevealNext').onclick = () => { startGame(); showPage('gameSection'); };

// ===========================================
// 8. MEMORY GAME  (5 pairs = 10 cards)
// ===========================================

let firstCard = null, boardLocked = false, matched = 0, attempts = 0, flipTimer = null;

function startGame() {
  clearTimeout(flipTimer);
  firstCard = null; boardLocked = false; matched = 0; attempts = 0;
  $("pairsCount").textContent = "0 / 3 pairs";
  $("attemptsCount").textContent = "0 attempts";
  $("gameStatus").textContent = "";
  $("gameNext").classList.add("hidden");

  const deck = shuffle([...ASSETS.cards, ...ASSETS.cards.map(c => ({ ...c }))]);
  $("gameGrid").replaceChildren();

  deck.forEach(data => {
    const card = document.createElement("button");
    card.className = "memory-card";
    card.setAttribute("aria-label", "Hidden memory card");

    // Back face (shown by default)
    const back = document.createElement("span");
    back.className = "card-back";
    back.textContent = "?";

    // Front face (shown when flipped)
    const front = document.createElement("div");
    front.className = "card-front";
    renderAsset(front, data, "card-img");

    card.append(back, front);
    card.onclick = () => flipCard(card, data);
    $("gameGrid").appendChild(card);
  });
}

function flipCard(card, data) {
  if (boardLocked || card.classList.contains("flipped") || card.classList.contains("matched")) return;
  card.classList.add("flipped");
  card.setAttribute("aria-label", data.fallback);

  if (!firstCard) { firstCard = { card, data }; return; }

  attempts++;
  $("attemptsCount").textContent = `${attempts} attempts`;

  const prev = firstCard; firstCard = null;

  if (prev.data.id === data.id) {
    prev.card.classList.add("matched"); card.classList.add("matched");
    prev.card.disabled = true; card.disabled = true;
    matched++;
    $("pairsCount").textContent = `${matched} / 3 pairs`;
    if (matched === 3) {
      $("gameStatus").textContent = " Very ameyziiing! You matched all the cards! Ang galinggg! ";
      $("gameNext").classList.remove("hidden");
      playYaySound();
    }
  } else {
    boardLocked = true;
    flipTimer = setTimeout(() => {
      [prev.card, card].forEach(c => {
        c.classList.remove("flipped");
        c.setAttribute("aria-label", "Hidden memory card");
      });
      boardLocked = false;
    }, 900);
  }
}

$("gameNext").onclick = () => showPage("happySection");

// ===========================================
// 9. YES / NO
// ===========================================

$("yesBtn").onclick = () => showPage("ratingSection");

const noBtn = $("noBtn");
const answerArea = $("answerArea");

function moveNo() {
  const maxX = Math.max(0, answerArea.clientWidth  - noBtn.offsetWidth);
  const maxY = Math.max(0, answerArea.clientHeight - noBtn.offsetHeight);
  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top  = `${Math.random() * maxY}px`;
}

noBtn.addEventListener("pointerenter", e => { if (e.pointerType !== "touch") moveNo(); });
noBtn.addEventListener("pointerdown",  e => { e.preventDefault(); moveNo(); });
noBtn.addEventListener("click",        e => { e.preventDefault(); moveNo(); });

// ===========================================
// 10. RATINGS
// ===========================================

let currentRating = -1;

document.querySelectorAll("[data-rating]").forEach(btn => {
  btn.onclick = () => {
    const i = Number(btn.dataset.rating) - 1;
    if (currentRating === i && !$("modalOverlay").classList.contains("hidden")) {
      closeModal();
      return;
    }
    currentRating = i;
    const [title, message] = RATING_DATA[i];
    openModal(ASSETS.ratings[i], title, message, null);
  };
});

// ===========================================
// 11. MODAL
// ===========================================

let modalCallback = null;

function openModal(asset, title, message, callback = null) {
  renderAsset($("modalVisual"), asset, "modal-visual-img float");
  $("modalTitle").textContent = title;
  $("modalMessage").textContent = message;
  modalCallback = callback;
  $("modalOverlay").classList.remove("hidden");
  $("modalClose").focus();
}

function closeModal() {
  if ($("modalOverlay").classList.contains("hidden")) return;
  $("modalOverlay").classList.add("hidden");
  currentRating = -1;
  const cb = modalCallback; modalCallback = null;
  if (cb) cb();
}

$('modalClose').onclick = () => { closeModal(); };
$('modalOverlay').onclick = e => { if (e.target === $('modalOverlay')) closeModal(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
$('ratingNext').onclick = () => showPage('finalSection');

// ===========================================
// 12. RESTART
// ===========================================

$("restartBtn").onclick = () => {
  stopSong();

  // Video
  if (birthdayVideo) { birthdayVideo.pause(); birthdayVideo.currentTime = 0; }
  $("videoWrap").classList.remove("hidden");
  $("videoStatus").textContent = "";
  $("songArea").classList.add("hidden");

  // Song / cake
  songFinished = false; candleBlown = false;
  renderAsset(cakeSlot, ASSETS.cake, "cake-art float");
  $("cakeButton").disabled = true;
  $("cakeButton").classList.remove("ready");
  $("cakeHint").textContent = "Enjoy your birthday song! 🎶";
  $("songProgress").style.width = "0%";
  $("songTimer").textContent = "0 seconds";
  $("playSongBtn").classList.add("hidden");
  $("celebration").classList.add("hidden");
  $("cakeNext").classList.add("hidden");

  // Gifts
  selectedGift = null; giftOpening = false; giftOrder = [0, 1, 2];
  $("shuffleBtn").disabled = false;
  renderGifts();

  // No button
  noBtn.style.left = "60%"; noBtn.style.top = "10px";

  // Ratings
  currentRating = -1;

  startGame();
  showPage("cakeSection");
  playBirthdayVideo();
};
