let age = 15;
let year = 2026;
let month = 4;

let health = 50;
let mental = 50;
let money = 1000;
let luck = 50;
let study = 50;

let hasPartner = false;
let isPartTimeWorking = false;

let currentCards = [];
let selected = false;
let nextCardCount = 3;

let droppedOut = false;

let universityRank = ""; // elite / normal / low
let jobType = "";        // big / middle / small / none

let isCramSchool = false;

const cardList15 = [

    // ===== 学力 =====

    {
        name: "定期テスト",
        icon: "📖",
        text: "テスト勉強の成果が出た。",
        effect: () => {
            study += 6;
        }
    },

    {
        name: "テスト勉強",
        icon: "✏️",
        text: "テストに向けて一生懸命勉強した。",
        effect: () => {
            study += 4;
            //mental -= 3;
        }
    },

    {
        name: "授業をサボった",
        icon: "😴",
        text: "授業をサボってしまった。",
        effect: () => {
            study -= 6;
            mental += 2;
        }
    },


    {
        name: "友達と勉強した",
        icon: "👨‍🏫",
        text: "友達と一緒に勉強して理解が深まった。",
        effect: () => {
            study += 4;
            mental += 3;
            luck += 2;
        }
    },

    {
        name: "塾に通い始めた",
        icon: "🏫",
        text: "塾に通い始めた。これから毎月、学力が上がる。",
        needCramSchool: false,
        effect: () => {
            isCramSchool = true;
            mental -= 3;
        }
    },
    {
        name: "塾をやめた",
        icon: "🚪",
        text: "塾をやめた。毎月の学力アップが止まった。",
        needCramSchool: true,
        effect: () => {
            isCramSchool = false;
            mental += 3;
        }
    },

    // ===== 健康 =====

    {
        name: "風邪",
        icon: "🤒",
        text: "風邪をひいてしまった。",
        effect: () => {
            health -= 10;
            study -= 3;
        }
    },

    {
        name: "運動",
        icon: "🏃",
        text: "体を動かして健康になった。",
        effect: () => {
            health += 10;
            study -= 2;
        }
    },

    // ===== お金 =====

    {
        name: "お小遣い",
        icon: "💴",
        text: "お小遣いをもらった。",
        effect: () => {
            money += 1000;
            study -= 1;
        }
    },

    // ===== 幸運 =====

    {
        name: "ラッキー",
        icon: "🍀",
        text: "今日はいいことがあった。",
        effect: () => {
            luck += 10;
        }
    },

    {
        name: "アンラッキー",
        icon: "☠️",
        text: "今日はついていなかった。",
        effect: () => {
            luck -= 10;
            study -= 2;
        }
    },

    // ===== 恋愛 =====

    {
        name: "恋人ができた",
        icon: "❤️",
        text: "幸運に恵まれ、恋人ができた。",
        minLuck: 70,
        needPartner: false,
        effect: () => {
            hasPartner = true;
            mental += 20;
            luck += 5;
        }
    },

    {
        name: "デート",
        icon: "💕",
        text: "恋人とデートをした。",
        needPartner: true,
        effect: () => {

            if (money >= 3000) {
                money -= 3000;
                luck += 5;
                mental += 10;
            } else {
                luck -= 10;
                mental -= 5;
                study -= 2;
            }

        }
    },

    {
        name: "すれ違いで別れた",
        icon: "💔",
        text: "すれ違いが続き、恋人と別れてしまった。",
        needPartner: true,
        maxLuck: 30,
        effect: () => {
            hasPartner = false;
            mental -= 20;
            luck -= 5;
        }
    },

    {
        name: "お金がなくて別れた",
        icon: "💸",
        text: "デート代を出せず、恋人と別れてしまった。",
        needPartner: true,
        maxMoney: 0,
        effect: () => {
            hasPartner = false;
            mental -= 15;
            luck -= 10;
        }
    },

    {
        name: "精神的に余裕がなく別れた",
        icon: "😢",
        text: "精神的に余裕がなくなり、恋人と別れてしまった。",
        needPartner: true,
        maxMental: 20,
        effect: () => {
            hasPartner = false;
            mental -= 10;
            luck -= 5;
        }
    },

    {
        name: "友達と遊びに行く",
        icon: "🎡",
        text: "友達と遊びに行って気分転換した。",
        effect: () => {

             if (money < 2000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            money -= 2000;
            mental += 10;
            luck += 3;
            study -= 2;
        }
    },
    {
        name: "趣味にお金を使う",
        icon: "🎮",
        text: "趣味にお金を使ってリフレッシュした。",
        effect: () => {

             if (money < 3000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            money -= 3000;
            mental += 12;
            luck += 2;
            study -= 2;
        }
    },
    {
        name: "外食する",
        icon: "🍜",
        text: "友達と外食して楽しい時間を過ごした。",
        effect: () => {

             if (money < 1500) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            money -= 1500;
            mental += 8;
            luck += 2;
        }
    },
    {
        name: "買い物を楽しむ",
        icon: "🛍️",
        text: "欲しかった物を買って気分が上がった。",
        effect: () => {
             if (money < 5000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            money -= 5000;
            mental += 15;
            luck += 3;
            study -= 2;
        }
    }

];

const cardList16to17 = [
    ...cardList15,

    {
        name: "アルバイトを始めた",
        icon: "🍔",
        text: "アルバイトを始めた。これからカードを引くたびにお金が増える。",
        needPartTime: false,
        effect: () => {
            isPartTimeWorking = true;
            mental -= 3;
        }
    },
    {
        name: "アルバイトを辞めた",
        icon: "🚪",
        text: "アルバイトを辞めた。毎ターンの収入が止まった。",
        needPartTime: true,
        effect: () => {
            isPartTimeWorking = false;
            mental += 5;
        }
    },
    {
        name: "選択肢が増えた",
        icon: "🃏",
        text: "次のターンは4枚のカードから選べる。",
        effect: () => {
            nextCardCount = 4;
        }
    }
];

const cardListUniversity = [

    {
        name: "講義に出席",
        icon: "📚",
        text: "大学の講義を受けた。",
        effect: () => {
            
            mental -= 5;
            luck += 5;
        }
    },

    {
        name: "サークル活動",
        icon: "🎸",
        text: "サークル活動を楽しんだ。",
        effect: () => {

             if (money < 10000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            mental += 3;
            luck += 1;
            money -= 10000;
        }
    },

    {
        name: "アルバイトを始めた",
        icon: "🍔",
        text: "大学生活の合間にアルバイトを始めた。",
        needPartTime: false,
        effect: () => {
            isPartTimeWorking = true;
            mental -= 3;
        }
    },

    {
        name: "アルバイトを辞めた",
        icon: "🚪",
        text: "アルバイトを辞めた。毎ターンの収入が止まった。",
        needPartTime: true,
        effect: () => {
            isPartTimeWorking = false;
            mental += 5;
        }
    },

    {
        name: "単位を落とした",
        icon: "😱",
        text: "単位を落としてしまった。",
        effect: () => {
            mental -= 10;
            luck -= 10;
        }
    },

    {
        name: "友達と旅行",
        icon: "✈️",
        text: "友達と旅行へ行き、リフレッシュした。",
        effect: () => {

             if (money < 25000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            health += 5;
            mental += 5;
            money -= 25000;
            luck += 2;
        }
    },

    {
        name: "温泉旅行",
        icon: "♨️",
        text: "温泉で心も体も癒された。",
        effect: () => {

             if (money < 25000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            health += 10;
            mental += 5;
            money -= 25000;
            luck += 2;
        }
    },

    {
        name: "ジム通い",
        icon: "🏋️",
        text: "運動習慣が身についた。",
        effect: () => {

             if (money < 10000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            health += 5;
            mental += 5;
            money -= 10000;
            luck += 1;
        }
    },

    {
        name: "実家に帰省",
        icon: "🏠",
        text: "家族と過ごして元気になった。",
        effect: () => {

             if (money < 25000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            health += 10;
            mental += 15;
            money -= 25000;
            luck += 2;
        }
    },

    {
        name: "趣味に没頭",
        icon: "🎮",
        text: "趣味を楽しんでリフレッシュした。",
        effect: () => {

             if (money < 10000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            mental += 5;
            money -= 10000;
            luck += 2;
        }
    },

    {
        name: "十分な睡眠",
        icon: "😴",
        text: "しっかり休んで疲れが取れた。",
        effect: () => {
            health += 5;
            mental += 5;
            luck += 1;
        }
    },

    {
        name: "健康診断",
        icon: "🩺",
        text: "健康状態は良好だった。",
        effect: () => {
            health += 5;
            
        }
    },

    {
        name: "恋人とデート",
        icon: "💕",
        text: "恋人と楽しい時間を過ごした。",
        needPartner: true,
        effect: () => {
            if (money >= 5000) {
                money -= 5000;
                mental += 15;
                luck += 8;
            } else {
                mental -= 5;
                luck -= 5;
            }
        }
    },

    {
        name: "資格取得",
        icon: "📜",
        text: "資格試験に合格した。",
        effect: () => {
            
            mental += 5;
            luck += 5;
        }
    },

    {
        name: "インターン",
        icon: "💼",
        text: "インターンで社会経験を積んだ。",
        effect: () => {
            study += 5;
            mental += 3;
            luck += 5;
        }
    },

    {
        name: "友達と遊びに行く",
        icon: "🎡",
        text: "友達と遊びに行って気分転換した。",
        effect: () => {

             if (money < 2000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            money -= 2000;
            mental += 10;
            
        }
    },
    {
        name: "趣味にお金を使う",
        icon: "🎮",
        text: "趣味にお金を使ってリフレッシュした。",
        effect: () => {

             if (money < 3000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            money -= 3000;
            mental += 12;
            luck += 2;
        }
    },
    {
        name: "外食する",
        icon: "🍜",
        text: "友達と外食して楽しい時間を過ごした。",
        effect: () => {

             if (money < 100) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            money -= 1500;
            mental += 8;
            luck += 1;
            
        }
    },
    {
        name: "買い物を楽しむ",
        icon: "🛍️",
        text: "欲しかった物を買って気分が上がった。",
        effect: () => {

             if (money < 5000) {
                showMoneyModal("お金が足りず、諦めた。");
                return;
            }

            money -= 5000;
            mental += 15;
            luck += 3;
        }
    },

    {
    name: "レポート提出漏れ",
    icon: "📄",
    text: "レポートの提出期限を忘れてしまった。",
    effect: () => {
    
        mental -= 5;
        luck -= 7;
    }
},

{
    name: "寝坊",
    icon: "⏰",
    text: "寝坊して講義に遅刻してしまった。",
    effect: () => {
        luck -= 7;
        mental -= 3;
    }
},

{
    name: "自主休校",
    icon: "🛌",
    text: "今日は講義を休んでしまった。",
    effect: () => {
        
        luck -= 7;
        mental += 3;
    }
},

];

function getUniversityCard() {
    if (study >= 80) {
        return {
            name: "名門大学合格",
            icon: "🎓",
            text: "努力が実り、名門大学に合格した。",
            effect: () => {
                mental += 20;
                luck += 10;
            }
        };
    }

    if (study >= 45) {
        return {
            name: "普通の大学合格",
            icon: "🏫",
            text: "無事に普通の大学へ進学することになった。",
            effect: () => {
                mental += 10;
            }
        };
    }

    return {
        name: "Fラン大学進学",
        icon: "🏚️",
        text: "学力は足りなかったが、なんとか大学へ進学した。",
        effect: () => {
            mental -= 5;
            luck -= 5;
        }
    };
}

function getUniversityCard() {
    if (study >= 80) {
        return {
            name: "名門大学合格",
            icon: "🎓",
            text: "努力が実り、名門大学に合格した。",
            effect: () => {
                universityRank = "elite";
                mental += 20;
                luck += 10;
            }
        };
    }

    if (study >= 50) {
        return {
            name: "普通の大学合格",
            icon: "🏫",
            text: "普通の大学へ進学することになった。",
            effect: () => {
                universityRank = "normal";
                mental += 10;
            }
        };
    }

    return {
        name: "Fラン大学進学",
        icon: "🏚️",
        text: "なんとか大学へ進学することになった。",
        effect: () => {
            universityRank = "low";
            mental -= 5;
            luck -= 5;
        }
    };
}

function getJobCard() {

    if (luck <= 0) {
        return {
            name: "就職できなかった",
            icon: "❌",
            text: "運に恵まれず、就職先が決まらなかった。",
            effect: () => {
                jobType = "none";
                mental -= 20;
                money -= 10000;
            }
        };
    }

    if (universityRank === "elite") {
        if (luck >= 70) return bigCompanyCard();
        if (luck >= 40) return middleCompanyCard();
        return smallCompanyCard();
    }

    if (universityRank === "normal") {
        if (luck >= 80) return bigCompanyCard();
        if (luck >= 50) return middleCompanyCard();
        return smallCompanyCard();
    }

    if (universityRank === "low") {
        if (luck >= 90) return middleCompanyCard();
        if (luck >= 50) return smallCompanyCard();
        return noJobCard();
    }

    return noJobCard();
}

function bigCompanyCard() {
    return {
        name: "大手企業に就職",
        icon: "🏢",
        text: "大手企業への就職が決まった。",
        effect: () => {
            jobType = "big";
            money += 50000;
            mental += 15;
            luck += 10;
        }
    };
}

function middleCompanyCard() {
    return {
        name: "中堅企業に就職",
        icon: "🏬",
        text: "中堅企業への就職が決まった。",
        effect: () => {
            jobType = "middle";
            money += 30000;
            mental += 10;
        }
    };
}

function smallCompanyCard() {
    return {
        name: "小さい会社に就職",
        icon: "🏪",
        text: "小さい会社に就職した。",
        effect: () => {
            jobType = "small";
            money += 15000;
            mental += 5;
        }
    };
}

function noJobCard() {
    return {
        name: "就職できなかった",
        icon: "❌",
        text: "就職先が決まらなかった。",
        effect: () => {
            jobType = "none";
            mental -= 20;
            money -= 10000;
        }
    };
}


function drawCards() {

    currentCards = [];

    let availableCards = [];

    // ===== 年齢・イベントごとのカード =====

    if (droppedOut) {
        availableCards = [...cardListDroppedOut];
    }
    else if (age === 22 && month === 12) {
        availableCards = [getJobCard()];
    }
    else if (age === 18 && month === 12) {
        availableCards = [getUniversityCard()];
    }
    else if (age >= 19 && age <= 22) {
        availableCards = [...cardListUniversity];
    }
    else if (age === 15) {
        availableCards = [...cardList15];
    }
    else if (age >= 16 && age <= 18) {
        availableCards = [...cardList16to17];
    }
    else {
        availableCards = [...cardListUniversity];
    }

    // ===== 条件付きカード =====

    availableCards = availableCards.filter(card => {

        // 幸運
        if (card.minLuck !== undefined && luck < card.minLuck) return false;
        if (card.maxLuck !== undefined && luck > card.maxLuck) return false;

        // お金
        if (card.minMoney !== undefined && money < card.minMoney) return false;
        if (card.maxMoney !== undefined && money > card.maxMoney) return false;

        // 精神
        if (card.minMental !== undefined && mental < card.minMental) return false;
        if (card.maxMental !== undefined && mental > card.maxMental) return false;

        // 恋人
        if (card.needPartner === true && !hasPartner) return false;
        if (card.needPartner === false && hasPartner) return false;

        // アルバイト
        if (card.needPartTime === true && !isPartTimeWorking) return false;
        if (card.needPartTime === false && isPartTimeWorking) return false;

        // ★塾
        if (card.needCramSchool === true && !isCramSchool) return false;
        if (card.needCramSchool === false && isCramSchool) return false;

        // 選択肢が4枚以上なら表示しない
        if (card.name === "選択肢が増えた" && nextCardCount >= 4) return false;

        return true;
    });

    // ===== 同じカードは同時に出さない =====

    const usedCardNames = new Set();

    while (
        currentCards.length < nextCardCount &&
        availableCards.length > 0
    ) {

        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const selectedCard = availableCards[randomIndex];

        if (!usedCardNames.has(selectedCard.name)) {
            currentCards.push(selectedCard);
            usedCardNames.add(selectedCard.name);
        }

        availableCards.splice(randomIndex, 1);
    }

    // ===== カード表示 =====

    selected = false;

    const cardsArea = document.getElementById("cards");
    cardsArea.innerHTML = "";

    currentCards.forEach((card, index) => {

        const div = document.createElement("div");

        div.className = "card back";
        div.textContent = "🂠";

        div.onclick = () => selectCard(index);

        cardsArea.appendChild(div);
    });

    document.getElementById("message").textContent =
        "裏向きのカードを1枚選んでください。";

    document.getElementById("nextButton").disabled = true;
}

function selectCard(index) {

    if (selected) return;

    selected = true;

    const card = currentCards[index];

    let extraMessage = "";

    const cardName = card.name;

    // アルバイト中なら収入
    // （開始・終了カードでは収入なし）
    if (
        isPartTimeWorking &&
        cardName !== "アルバイトを始めた" &&
        cardName !== "アルバイトを辞めた"
    ) {

        money += 30000;
        mental -= 2;
        health -= 1;

        // 学生の間だけ学力が下がる
        if (age <= 18 && !droppedOut) {
            study -= 2;
        }

        extraMessage =
            " アルバイト収入で30000円を受け取った。精神・健康が少し下がった。";

        if (age <= 18 && !droppedOut) {
            extraMessage += " 学力も少し下がった。";
        }
    }

    if (
        isCramSchool &&
        cardName !== "塾に通い始めた" &&
        cardName !== "塾をやめた"
    ) {
        study += 2;
        mental -= 1;

        extraMessage +=
            " 塾の効果で学力が少し上がったが、少し疲れた。";
    }

    // カード効果
    card.effect();

    // ステータス補正
    clampStatus();

    // 学力0チェック
    checkStudyZero();

    const cardElements = document.querySelectorAll(".card");

    cardElements.forEach((el, i) => {

        el.classList.add("disabled");

        if (i === index) {

            el.className = "card open";

            el.innerHTML = `
                <div style="font-size:40px;">${card.icon}</div>
                <strong>${card.name}</strong>
                <small>${card.text}</small>
            `;
        }

    });

    updateStatus();

    if (isGameOver()) {

        document.getElementById("message").textContent =
            "健康・精神・お金のいずれかが限界になりました。";

        showGameOverModal();

        return;
    }

    if (age >= 60) {

        document.getElementById("message").textContent =
            "60歳まで生き抜きました！ゲームクリア！";

        return;
    }

    document.getElementById("message").textContent =
        card.text + extraMessage + " 『次を引く』を押して次のカードへ進みます。";

    document.getElementById("nextButton").disabled = false;
}


function nextTurn() {
    month++;

    if (month > 12) {
        month = 1;
        year++;
        age++;

        if (age >= 40 && age < 50) {
            health -= 1;
        } else if (age >= 50 && age < 60) {
            health -= 2;
        }
    }

    clampStatus();
    updateStatus();
    drawCards();
}

function updateStatus() {

    document.getElementById("age").textContent = age;
    document.getElementById("year").textContent = year;
    document.getElementById("month").textContent = month;

    document.getElementById("health").textContent = health;
    document.getElementById("mental").textContent = mental;
    document.getElementById("money").textContent = money;
    document.getElementById("luck").textContent = luck;

    const studyStatus = document.getElementById("studyStatus");

    // 学力は高校生で退学していない間だけ表示
    if (age <= 18 && !droppedOut) {
        studyStatus.style.display = "block";
        document.getElementById("study").textContent = study;
    } else {
        studyStatus.style.display = "none";
    }

}

function isGameOver() {
    return health <= 0 || mental <= 0 || money <= -50000;
}

function showGameOverModal() {
    document.getElementById("gameOverModal").classList.remove("hidden");
}

function showDropoutModal() {
    document.getElementById("dropoutModal").classList.remove("hidden");
}

function closeDropoutModal() {
    document.getElementById("dropoutModal").classList.add("hidden");
}

function showMoneyModal(text) {
    document.getElementById("moneyModalText").textContent = text;
    document.getElementById("moneyModal").classList.remove("hidden");
}

function closeMoneyModal() {
    document.getElementById("moneyModal").classList.add("hidden");
}

function restartGame() {
    location.reload();
}

function clampStatus() {
    health = Math.max(0, Math.min(100, health));
    mental = Math.max(0, Math.min(100, mental));
    luck = Math.max(0, Math.min(100, luck));
    study = Math.max(0, Math.min(100, study));
}

function checkStudyZero() {

    if (study <= 0 && droppedOut === false) {

        droppedOut = true;
        study = 0;
        hasPartner = false;

        if (age <= 18) {

            document.getElementById("message").textContent =
                "学力が0になり、高校を退学しました。";

            document.getElementById("dropoutText").textContent =
                "学力が0になり、高校を退学しました。";

        } else {

            document.getElementById("message").textContent =
                "学力が0になり、大学を退学しました。";

            document.getElementById("dropoutText").textContent =
                "学力が0になり、大学を退学しました。";

        }

        showDropoutModal();
    }
}

updateStatus();
drawCards();