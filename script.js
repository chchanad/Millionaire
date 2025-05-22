// 題庫資料，未來只要編輯這裡即可
const questions = [
  {
    question: "以色列人出埃及後在曠野漂流了多少年？",
    options: [
      { label: "A", text: "20" },
      { label: "B", text: "30" },
      { label: "C", text: "40" },
      { label: "D", text: "50" }
    ],
    answer: "C",
    prize: "100",
    let_play_music: "music/q1_let_play.mp3",
    background_music: "music/q1_bg.mp3",
    final_answer_music: "music/q1_final.mp3",
    correct_music: "music/q1_correct.mp3",
    wrong_music: "music/q1_wrong.mp3"
  },
  {
    question: "彼得不認主多少次？",
    options: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "3" },
      { label: "D", text: "4" }
    ],
    answer: "C",
    prize: "200",
    let_play_music: "music/q1_let_play.mp3",
    background_music: "music/q1_bg.mp3",
    final_answer_music: "music/q1_final.mp3",
    correct_music: "music/q1_correct.mp3",
    wrong_music: "music/q1_wrong.mp3"
  },
  {
    question: "耶穌行的第一個神蹟是什麼？",
    options: [
      { label: "A", text: "醫治瞎眼的人" },
      { label: "B", text: "餵飽五千人" },
      { label: "C", text: "在婚宴中使水變成酒" },
      { label: "D", text: "使死人復活" }
    ],
    answer: "C",
    prize: "300",
    let_play_music: "music/q1_let_play.mp3",
    background_music: "music/q1_bg.mp3",
    final_answer_music: "music/q1_final.mp3",
    correct_music: "music/q1_correct.mp3",
    wrong_music: "music/q1_wrong.mp3"
  },
  {
    question: "聖經中人類的「第一宗罪」是什麼？",
    options: [
      { label: "A", text: "殺人" },
      { label: "B", text: "偷竊" },
      { label: "C", text: "吃了分別善惡樹的果子" },
      { label: "D", text: "說謊" }
    ],
    answer: "C",
    prize: "500",
    let_play_music: "music/q1_let_play.mp3",
    background_music: "music/q1_bg.mp3",
    final_answer_music: "music/q1_final.mp3",
    correct_music: "music/q1_correct.mp3",
    wrong_music: "music/q1_wrong.mp3"
  },
  {
    question: "聖經中提到的第一個建築物是什麼？",
    options: [
      { label: "A", text: "方舟" },
      { label: "B", text: "巴別塔" },
      { label: "C", text: "帳棚" },
      { label: "D", text: "城牆" }
    ],
    answer: "B",
    prize: "1000",
    let_play_music: "music/q1_let_play.mp3",
    background_music: "music/q1_bg.mp3",
    final_answer_music: "music/q1_final.mp3",
    correct_music: "music/q5_correct.mp3",
    wrong_music: "music/q1_wrong.mp3"
  },
  {
    question: "聖經裡誰最怕「剪刀」？",
    options: [
      { label: "A", text: "約瑟" },
      { label: "B", text: "參孫" },
      { label: "C", text: "大衛" },
      { label: "D", text: "撒母耳" }
    ],
    answer: "B",
    prize: "2000",
    let_play_music: "music/q6_let_play.mp3",
    background_music: "music/q6_bg.mp3",
    final_answer_music: "music/q6_final.mp3",
    correct_music: "music/q6_correct.mp3",
    wrong_music: "music/q6_wrong.mp3"
  },
  {
    question: "聖經裡第一個被「外人收養」的嬰孩是誰？",
    options: [
      { label: "A", text: "摩西" },
      { label: "B", text: "約瑟" },
      { label: "C", text: "以實馬利" },
      { label: "D", text: "撒母耳" }
    ],
    answer: "A",
    prize: "4000",
    let_play_music: "music/q7_let_play.mp3",
    background_music: "music/q7_bg.mp3",
    final_answer_music: "music/q7_final.mp3",
    correct_music: "music/q7_correct.mp3",
    wrong_music: "music/q7_wrong.mp3"
  },
  // 你可以繼續加入更多題目
  // {
  //   question: "第二題內容...",
  //   options: [
  //     { label: "A", text: "選項A" },
  //     { label: "B", text: "選項B" },
  //     { label: "C", text: "選項C" },
  //     { label: "D", text: "選項D" }
  //   ]
  // },
];

let currentQuestion = 0;
let selectedAnswer = null;
let audio = null;

function playMusic(src, onended) {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  audio = new Audio(src);
  if (onended) audio.onended = onended;
  audio.play();
}

function stopMusic() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function renderQuestion(index) {
  selectedAnswer = null;
  const q = questions[index];
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="question-container">${q.question}</div>
    <div class="options">
      ${q.options.map(opt => `
        <div class="option" data-label="${opt.label}"><span>${opt.label}:</span> ${opt.text}</div>
      `).join('')}
    </div>
    <div id="show-answer-btn-container"></div>
  `;

  // 音樂流程
  playMusic(q.let_play_music, () => playMusic(q.background_music));

  // 選項點擊
  document.querySelectorAll('.option').forEach(opt => {
    opt.onclick = function() {
      if (selectedAnswer) return; // 已選過
      selectedAnswer = this.getAttribute('data-label');
      stopMusic();
      playMusic(q.final_answer_music);
      this.classList.add('selected');
      // 顯示「顯示答案」按鈕
      document.getElementById('show-answer-btn-container').innerHTML = `
        <button id="show-answer-btn" style="margin-top:24px;font-size:1.2rem;">顯示答案</button>
      `;
      document.getElementById('show-answer-btn').onclick = function() {
        stopMusic();
        if (selectedAnswer === q.answer) {
          playMusic(q.correct_music);
          // 標記正確選項
          document.querySelectorAll('.option').forEach(opt => {
            if (opt.getAttribute('data-label') === q.answer) {
              opt.classList.add('correct-bg');
            }
          });
          // 1秒後顯示金額與下一題
          setTimeout(() => {
            showPrizeAndNext(q.prize || '', index + 1);
          }, 1000);
        } else {
          playMusic(q.wrong_music);
          // 答錯時只標記正確選項為綠色，已選選項不變色
          document.querySelectorAll('.option').forEach(opt => {
            if (opt.getAttribute('data-label') === q.answer) {
              opt.classList.add('correct-bg');
            }
          });
        }
      };
    };
  });
}

function showPrizeAndNext(prize, nextIndex) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="prize-panel">${prize}</div>
    <button id="next-btn" style="font-size:1.3rem;margin-top:32px;">下一題</button>
  `;
  document.getElementById('next-btn').onclick = function() {
    renderQuestion(nextIndex);
  };
}

// 預設顯示「開始遊戲」按鈕
const mainContent = document.getElementById('main-content');
mainContent.innerHTML = `
  <button id="start-btn" style="font-size:1.5rem;padding:16px 32px;margin-top:80px;">開始遊戲</button>
`;
document.getElementById('start-btn').onclick = function() {
  renderQuestion(0);
}; 