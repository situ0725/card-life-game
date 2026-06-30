let age = 15;
let year = 2026;
let month = 4;

let health = 50;
let mental = 50;
let money = 5000;
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

let isJobHunting = false;
let jobHuntingTurn = 0;

let isWorking = false;

let contribution = 50;    // 貢献度
let position = "一般社員"; // 役職
let salary = 0;           // 毎ターンの給料

const maxJobHuntingTurn = 3;


const cardList15 = [

    // ===== 学力 =====

    {
        name: "定期テスト",
        icon: "📖",
        text: "テスト勉強の成果が出た。",
        effect: () => {
            study += 5;
            mental -= 3;
        }
    },

    {
        name: "テスト勉強",
        icon: "✏️",
        text: "テストに向けて一生懸命勉強した。",
        effect: () => {
            study += 4;
            mental -= 3;
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
            study += 3;
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
            luck += 2;
        }
    },

    // ===== 幸運 =====

    {
        name: "ラッキー",
        icon: "🍀",
        text: "今日はいいことがあった。",
        effect: () => {
            luck += 10;
            study += 2;
           
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

                study -= 1;
                luck -= 2;
                return;
            }

            money -= 2000;
            mental += 10;
            luck += 3;
            study -= 1;
        }
    },
    {
        name: "趣味にお金を使う",
        icon: "🎮",
        text: "趣味にお金を使ってリフレッシュした。",
        effect: () => {

             if (money < 3000) {
                showMoneyModal("お金が足りず、諦めた。");

                study -= 1;
                luck -= 2;
                return;
            }

            money -= 3000;
            mental += 12;
            luck += 2;
            study -= 1;
        }
    },
    {
        name: "外食する",
        icon: "🍜",
        text: "友達と外食して楽しい時間を過ごした。",
        effect: () => {

             if (money < 1500) {
                showMoneyModal("お金が足りず、諦めた。");
                study -= 1;
                luck -= 2;
                return;
            }

            money -= 1500;
            mental += 8;
            luck += 1;
            study -= 1;
            health += 2;
        }
    },
    {
        name: "買い物を楽しむ",
        icon: "🛍️",
        text: "欲しかった物を買って気分が上がった。",
        effect: () => {
             if (money < 5000) {
                showMoneyModal("お金が足りず、諦めた。");
                study -= 1;
                luck -= 2;
                return;
            }

            money -= 3000;
            mental += 15;
            luck += 3;
            study -= 1;
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
            study += 5;
        }
    },

    {
        name: "サークル活動",
        icon: "🎸",
        text: "サークル活動を楽しんだ。",
        effect: () => {

             if (money < 10000) {
                showMoneyModal("お金が足りず、諦めた。");
                luck -= 2;
                return;
            }

            mental += 3;
            study -= 1;
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
            study -= 2;
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
            mental -= 5;
            study -= 5;
        }
    },

    {
        name: "友達と旅行",
        icon: "✈️",
        text: "友達と旅行へ行き、リフレッシュした。",
        effect: () => {

             if (money < 25000) {
                showMoneyModal("お金が足りず、諦めた。");
                luck -= 2;
                return;
            }

            health += 5;
            mental += 5;
            money -= 25000;
            luck += 2;
            study -= 2;
        }
    },

    {
        name: "温泉旅行",
        icon: "♨️",
        text: "温泉で心も体も癒された。",
        effect: () => {

             if (money < 25000) {
                showMoneyModal("お金が足りず、諦めた。");
                luck -= 2;
                return;
            }

            health += 10;
            mental += 5;
            money -= 25000;
            luck += 2;
            study -= 2;
        }
    },

    {
        name: "ジム通い",
        icon: "🏋️",
        text: "運動習慣が身についた。",
        effect: () => {

             if (money < 10000) {
                showMoneyModal("お金が足りず、諦めた。");
                luck -= 2;
                return;
            }

            health += 10;
            mental += 10;
            money -= 10000;
            luck += 1;
            study -= 1;
        }
    },

    {
        name: "実家に帰省",
        icon: "🏠",
        text: "家族と過ごして元気になった。",
        effect: () => {

             if (money < 25000) {
                showMoneyModal("お金が足りず、諦めた。");
                luck -= 2;
                return;
            }

            health += 5;
            mental += 5;
            money -= 25000;
            luck += 2;
            study -= 1;
        }
    },

    {
        name: "趣味に没頭",
        icon: "🎮",
        text: "趣味を楽しんでリフレッシュした。",
        effect: () => {

             if (money < 10000) {
                showMoneyModal("お金が足りず、諦めた。");
                luck -= 2;
                return;
            }

            mental += 2;
            money -= 10000;
            luck += 2;
            study -= 2;
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
            study -= 2;
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
            study += 3;
        }
    },

    {
        name: "インターン",
        icon: "💼",
        text: "インターンで社会経験を積んだ。",
        effect: () => {
            
            mental += 3;
            study += 3;
        }
    },

    {
        name: "友達と遊びに行く",
        icon: "🎡",
        text: "友達と遊びに行って気分転換した。",
        effect: () => {

             if (money < 2000) {
                showMoneyModal("お金が足りず、諦めた。");
                study -= 1;
                luck -= 2;
                return;
            }

            money -= 2000;
            mental += 3;
            study -= 2;
            luck += 1;
        }
    },
    {
        name: "趣味にお金を使う",
        icon: "🎮",
        text: "趣味にお金を使ってリフレッシュした。",
        effect: () => {

             if (money < 3000) {
                showMoneyModal("お金が足りず、諦めた。");
                study -= 1;
                luck -= 2;
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

             if (money < 100) {
                showMoneyModal("お金が足りず、諦めた。");
                study -= 1;
                luck -= 2;
                return;
            }

            money -= 1500;
            mental += 8;
            luck += 1;
            study -= 2;
        }
    },
    {
        name: "買い物を楽しむ",
        icon: "🛍️",
        text: "欲しかった物を買って気分が上がった。",
        effect: () => {

             if (money < 5000) {
                showMoneyModal("お金が足りず、諦めた。");
                study -= 1;
                luck -= 2;
                return;
            }

            money -= 5000;
            mental += 15;
            luck += 3;
            study -= 2;
        }
    },

    {
        name: "レポート提出漏れ",
        icon: "📄",
        text: "レポートの提出期限を忘れてしまった。",
        effect: () => {
        
            mental -= 5;
            study -= 3;
            luck -= 3;
        }
    },

    {
        name: "寝坊",
        icon: "⏰",
        text: "寝坊して講義に遅刻してしまった。",
        effect: () => {
            study -= 2;
            mental -= 3;
            health += 2;
        }
    },

    {
        name: "自主休校",
        icon: "🛌",
        text: "今日は講義を休んでしまった。",
        effect: () => {
            study -= 2;
            luck -= 2;
            mental += 3;
            health += 2;
        }
    },

    {
        name: "風邪",
         icon: "🤒",
        text: "風邪をひいてしまった。",
        effect: () => {
            health -= 10;
            mental -= 10;
            study -= 3;
        }
    },

    {
        name: "単位を取った",
        icon: "✅",
        text: "無事に単位を取得した。",
        effect: () => {
            study += 10;
            mental += 5;
            luck += 2;
        }
    },

    {
        name: "ゼミに出席した",
        icon: "👨‍🏫",
        text: "ゼミで先生や仲間と議論し、知識が深まった。",
        effect: () => {
            study += 4;
            mental += 2;
            //luck += 1;
        }
    },

];

const cardListDroppedOut = [
    {
        name: "アルバイトを始めた",
        icon: "🍔",
        text: "アルバイトを始めた。",
        needPartTime: false,
        effect: () => {
            isPartTimeWorking = true;
            mental -= 3;
            study -= 2;
        }
    },
    {
        name: "アルバイトを辞めた",
        icon: "🚪",
        text: "アルバイトを辞めた。",
        needPartTime: true,
        effect: () => {
            isPartTimeWorking = false;
            mental += 5;
        }
    },
    {
        name: "日雇い仕事",
        icon: "💴",
        text: "日雇い仕事でお金を稼いだ。",
        effect: () => {
            money += 8000;
            health -= 2;
            mental -= 2;
            //study -= 1;
        }
    },
    {
        name: "十分な睡眠",
        icon: "😴",
        text: "しっかり眠って体調が回復した。",
        effect: () => {
            health += 8;
            mental += 5;
        }
    },
    {
        name: "趣味で気分転換",
        icon: "🎮",
        text: "趣味を楽しんで気分転換した。",
        effect: () => {
            mental += 8;
            luck += 3;
            //study -= 1;
        }
    },
    {
        name: "将来への不安",
        icon: "🌧️",
        text: "将来への不安で気持ちが沈んだ。",
        effect: () => {
            mental -= 8;
        }
    },
    {
        name: "就職活動を考える",
        icon: "📄",
        text: "そろそろ就職活動を考え始めた。",
        minLuck: 50,
        effect: () => {
            luck += 3;
            mental -= 3;

            isJobHunting = true;
            jobHuntingTurn = 0;
            nextCardCount = 2;
        }
    },

    {
        name: "就職活動",
        icon: "📝",
        text: "正社員を目指して就職活動を始めた。",
        minMental: 30,
        effect: () => {
            isJobHunting = true;
            jobHuntingTurn = 0;
        }
    }
];

const cardListJobHunting = [

    {
        name: "頑張る",
        icon: "💪",
        text: "就職活動を頑張った。",
        effect: () => {
            luck += 10;
            mental -= 5;
            jobHuntingTurn++;
        }
    },

    {
        name: "サボる",
        icon: "😴",
        text: "就職活動をサボってしまった。",
        effect: () => {
            luck -= 10;
            mental += 3;
            jobHuntingTurn++;
        }
    }

];

const cardListCompany = [
    {
        name: "仕事を頑張った",
        icon: "💼",
        text: "仕事を頑張り、会社での評価が上がった。",
        effect: () => {
            contribution += 10;
            mental -= 3;
        }
    },
    {
        name: "仕事でミス",
        icon: "😱",
        text: "仕事でミスをして評価が下がった。",
        effect: () => {
            contribution -= 10;
            mental -= 5;
        }
    },
    {
        name: "上司に褒められた",
        icon: "👏",
        text: "上司に褒められ、やる気が出た。",
        effect: () => {
            contribution += 8;
            mental += 5;
            luck += 2;
        }
    },
    {
        name: "残業",
        icon: "🌙",
        text: "残業して仕事を片付けた。",
        effect: () => {
            contribution += 6;
            mental -= 5;
            health -= 3;
        }
    }
];

function getUniversityCard() {
    if (study >= 80) {
        return {
            name: "名門大学合格",
            icon: "🎓",
            text: "努力が実り、名門大学に合格した。",
            effect: () => {
                universityRank = "elite";
                isCramSchool = false;
                mental += 20;
                luck += 10;
            }
        };
    }

    if (study >= 45) {
        return {
            name: "普通の大学合格",
            icon: "🏫",
            text: "普通の大学へ進学することになった。",
            effect: () => {
                universityRank = "normal";
                isCramSchool = false;
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
            isCramSchool = false;
            mental -= 5;
            luck -= 5;
        }
    };
}

function getJobCard() {

    // 幸運0なら大学ランクに関係なく就職失敗
    if (luck <= 0) {
        return noJobCard();
    }

    // 名門大学
    if (universityRank === "elite") {
        if (study >= 80 && luck >= 70) return bigCompanyCard();
        if (study >= 60 && luck >= 40) return middleCompanyCard();
        if (study >= 40 && luck >= 20) return smallCompanyCard();
        return noJobCard();
    }

    // 普通大学
    if (universityRank === "normal") {
        if (study >= 85 && luck >= 80) return bigCompanyCard();
        if (study >= 60 && luck >= 50) return middleCompanyCard();
        if (study >= 40 && luck >= 20) return smallCompanyCard();
        return noJobCard();
    }

    // Fラン大学
    if (universityRank === "low") {
        if (study >= 90 && luck >= 90) return middleCompanyCard();
        if (study >= 50 && luck >= 40) return smallCompanyCard();
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
            isWorking = true;

            contribution = 50;
            position = "一般社員";
            salary = 30000;

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
            isWorking = true;

            contribution = 50;
            position = "一般社員";
            salary = 22000;
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
            isWorking = true;

            contribution = 50;
            position = "一般社員";
            salary = 16000;

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

    if (isJobHunting) {
        availableCards = [...cardListJobHunting];
        nextCardCount = 2;
    }
    else if (droppedOut) {
        availableCards = [...cardListDroppedOut];
    }
    else if (age === 22 && month === 12) {
        isJobHunting = true;
        jobHuntingTurn = 0;
        availableCards = [...cardListJobHunting];
        nextCardCount = 2;
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
    else if (isWorking) {
        availableCards = [...cardListCompany];
    }
    else {
        availableCards = [...cardListDroppedOut];
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

    // 出せるカードが0枚になった場合の保険
    if (availableCards.length === 0) {
        availableCards = [
            {
                name: "何もない日",
                icon: "🌙",
                text: "特に大きな出来事はなかった。",
                effect: () => {
                    mental += 1;
                }
            }
        ];
    }

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

    console.log("nextCardCount =", nextCardCount);
    console.log("currentCards =", currentCards.length);
    console.log("selected =", selected);
}

function selectCard(index) {

    if (selected) return;

    const card = currentCards[index];
    if (!card) {
        selected = false;
        drawCards();
        return;
    }

    playCardFlipSe();

    selected = true;

    let extraMessage = "";
    const cardName = card.name;

    // アルバイト中なら収入
    if (
        isPartTimeWorking &&
        cardName !== "アルバイトを始めた" &&
        cardName !== "アルバイトを辞めた"
    ) {
        money += 15000;
        mental -= 2;
        health -= 1;

        if (age <= 22 && !droppedOut) {
            study -= 2;
        }

        extraMessage =
            " アルバイト収入で15000円を受け取った。精神・健康が少し下がった。";
    }

    // 会社員なら給料
    if (
        isWorking &&
        cardName !== "大手企業に就職" &&
        cardName !== "中堅企業に就職" &&
        cardName !== "小さい会社に就職"
    ) {
        money += salary;
        extraMessage += ` 給料として${salary}円を受け取った。`;
    }

    // 塾
    if (
        isCramSchool &&
        cardName !== "塾に通い始めた" &&
        cardName !== "塾をやめた"
    ) {
        study += 2;
        mental -= 1;
        extraMessage += " 塾の効果で学力が少し上がったが、少し疲れた。";
    }

    // カード効果
    card.effect();

    clampStatus();
    updateStatus();

    // カードを表にする
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

    // 学力0チェック
    checkStudyZero();


    // 就職活動終了
    if (isJobHunting && jobHuntingTurn >= maxJobHuntingTurn) {

        isJobHunting = false;
        jobHuntingTurn = 0;
        nextCardCount = 3;

        currentCards = [getJobCard()];
        selected = false;

        const cardsArea = document.getElementById("cards");
        cardsArea.innerHTML = "";

        currentCards.forEach((resultCard, resultIndex) => {
            const div = document.createElement("div");

            div.className = "card back";
            div.textContent = "";
            div.onclick = () => selectCard(resultIndex);

            cardsArea.appendChild(div);
        });

        document.getElementById("message").textContent =
            "就職活動が終了した。結果カードを選んでください。";

        document.getElementById("nextButton").disabled = true;

        return;
    }

    if (isGameOver()) {
        document.getElementById("message").textContent =
            "健康・精神・お金のいずれかが限界になりました。";

        showGameOverModal();
        document.getElementById("nextButton").disabled = true;
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

    selected = false;
    document.getElementById("nextButton").disabled = true;

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

    checkPromotion();
}

function updateStatus() {

    // 年齢・日付
    document.getElementById("age").textContent = age;
    document.getElementById("year").textContent = year;
    document.getElementById("month").textContent = month;

    // ステータス
    document.getElementById("health").textContent = health;
    document.getElementById("mental").textContent = mental;
    document.getElementById("money").textContent = money;
    document.getElementById("luck").textContent = luck;

    const studyStatus = document.getElementById("studyStatus");

    const positionStatus = document.getElementById("positionStatus");
    const contributionStatus = document.getElementById("contributionStatus");
    const salaryStatus = document.getElementById("salaryStatus");

    if (isWorking) {

        positionStatus.style.display = "block";
        contributionStatus.style.display = "block";
        salaryStatus.style.display = "block";

        document.getElementById("position").textContent = position;
        document.getElementById("contribution").textContent = contribution;
        document.getElementById("salary").textContent = salary;

    } else {

        positionStatus.style.display = "none";
        contributionStatus.style.display = "none";
        salaryStatus.style.display = "none";

    }

    // 退学・就職後は学力（勉学）を非表示
    if (droppedOut || jobType !== "") {

        studyStatus.style.display = "none";

    }
    // 大学生
    else if (age >= 19) {

        studyStatus.style.display = "block";
        studyStatus.innerHTML =
            `勉学：<span id="study">${study}</span>`;

    }
    // 高校生
    else {

        studyStatus.style.display = "block";
        studyStatus.innerHTML =
            `学力：<span id="study">${study}</span>`;

    }

    // ステータスの上限・下限
    health = Math.max(0, Math.min(100, health));
    mental = Math.max(0, Math.min(100, mental));
    luck = Math.max(0, Math.min(100, luck));
    study = Math.max(0, Math.min(100, study));

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

    selected = false;
    nextCardCount = 3;

    drawCards();
}

function showMoneyModal(text) {
    document.getElementById("moneyModalText").textContent = text;
    document.getElementById("moneyModal").classList.remove("hidden");
}

function closeMoneyModal() {
    document.getElementById("moneyModal").classList.add("hidden");
}

function showSaveModal() {
    document.getElementById("saveModal").classList.remove("hidden");
}

function closeSaveModal() {
    document.getElementById("saveModal").classList.add("hidden");
}

function showCreditModal() {
    document.getElementById("creditModal").classList.remove("hidden");
}

function closeCreditModal() {
    document.getElementById("creditModal").classList.add("hidden");
}

function restartGame() {
    location.reload();
}

function startGame() {
    const saveText = localStorage.getItem("cardLifeSave");

    if (saveText) {
        showNewGameConfirmModal();
        return;
    }

    startNewGame();
}

function startNewGame() {
    resetGameData();

    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    playGameBgm();

    updateStatus();
    drawCards();
}

function confirmStartNewGame() {
    localStorage.removeItem("cardLifeSave"); // セーブデータ削除
    closeNewGameConfirmModal();
    startNewGame();
}

function showNewGameConfirmModal() {
    document.getElementById("newGameConfirmModal").classList.remove("hidden");
}

function closeNewGameConfirmModal() {
    document.getElementById("newGameConfirmModal").classList.add("hidden");
}

function showLoadModal() {

    const save = localStorage.getItem("cardLifeSave");

    if (!save) {

        document.getElementById("loadText").textContent =
        "セーブデータがありません。";

        document.getElementById("loadStartButton").style.display =
        "none";

    } else {

        const data = JSON.parse(save);

        document.getElementById("loadText").innerHTML =
        `年齢：${data.age}歳<br>${data.year}年${data.month}月`;

        document.getElementById("loadStartButton").style.display =
        "block";
    }

    document.getElementById("loadModal")
        .classList.remove("hidden");
}

function closeLoadModal() {

    document.getElementById("loadModal")
        .classList.add("hidden");

}

function playTitleBgm() {
    const titleBgm = document.getElementById("titleBgm");
    const gameBgm = document.getElementById("gameBgm");

    gameBgm.pause();
    gameBgm.currentTime = 0;

    titleBgm.volume = 0.4;
    titleBgm.play();
}

function playGameBgm() {
    const titleBgm = document.getElementById("titleBgm");
    const gameBgm = document.getElementById("gameBgm");

    titleBgm.pause();
    titleBgm.currentTime = 0;

    gameBgm.volume = 0.35;
    gameBgm.play();
}

function playCardFlipSe() {
    const se = document.getElementById("cardFlipSe");
    se.currentTime = 0;
    se.volume = 0.5;
    se.play();
}

function stopAllBgm() {
    document.getElementById("titleBgm").pause();
    document.getElementById("gameBgm").pause();
}

function resetGameData() {

    age = 15;
    year = 2026;
    month = 4;

    health = 50;
    mental = 50;
    money = 5000;
    luck = 50;
    study = 50;

    hasPartner = false;
    isPartTimeWorking = false;
    currentCards = [];
    selected = false;
    nextCardCount = 3;
    droppedOut = false;
    universityRank = "";
    jobType = "";
    isCramSchool = false;
    isJobHunting = false;
    jobHuntingTurn = 0;
    isWorking = false;
    contribution = 50;
    position = "一般社員";
    salary = 0;

    localStorage.removeItem("cardLifeSave");
}

function startGame() {
    const saveText = localStorage.getItem("cardLifeSave");

    console.log("saveText =", saveText);

    if (saveText) {
        showNewGameConfirmModal();
        return;
    }

    startNewGame();
}

function loadGame() {
    const saveText = localStorage.getItem("cardLifeSave");

    if (!saveText) {
        alert("セーブデータがありません。");
        return;
    }

    const saveData = JSON.parse(saveText);

    age = saveData.age;
    year = saveData.year;
    month = saveData.month;
    health = saveData.health;
    mental = saveData.mental;
    money = saveData.money;
    luck = saveData.luck;
    study = saveData.study;

    hasPartner = saveData.hasPartner;
    isPartTimeWorking = saveData.isPartTimeWorking;
    nextCardCount = saveData.nextCardCount;
    droppedOut = saveData.droppedOut;
    universityRank = saveData.universityRank;
    jobType = saveData.jobType;

    isCramSchool = saveData.isCramSchool;
    isJobHunting = saveData.isJobHunting;
    jobHuntingTurn = saveData.jobHuntingTurn;

    isWorking = saveData.isWorking;
    contribution = saveData.contribution;
    position = saveData.position;
    salary = saveData.salary;

    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    playGameBgm();

    updateStatus();
    drawCards();

    closeLoadModal();
}

function showHowToPlay() {
    document.getElementById("howToPlayModal").classList.remove("hidden");
}

function closeHowToPlayModal() {
    document.getElementById("howToPlayModal").classList.add("hidden");
}

function showMenuModal() {
    document.getElementById("menuModal").classList.remove("hidden");
}

function closeMenuModal() {
    document.getElementById("menuModal").classList.add("hidden");
}

function backToTitle() {

    closeMenuModal();
    

    document.getElementById("gameScreen").style.display = "none";

    const titleScreen = document.getElementById("titleScreen");
    titleScreen.style.display = "flex";

    playTitleBgm();

}

function checkPromotion() {

    if (!isWorking) return;

    if (contribution >= 100 && position === "一般社員") {

        position = "主任";
        salary += 8000;
        mental += 10;

        alert("昇進しました！ 主任になりました！");
    }

    if (contribution >= 200 && position === "主任") {

        position = "係長";
        salary += 12000;
        mental += 15;

        alert("昇進しました！ 係長になりました！");
    }

    if (contribution >= 350 && position === "係長") {

        position = "課長";
        salary += 18000;
        mental += 20;

        alert("昇進しました！ 課長になりました！");
    }
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
        isJobHunting = false;
        jobHuntingTurn = 0;
        isCramSchool = false;

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

        updateStatus();
        showDropoutModal();
        return;
    }
}

function saveGame() {
    const saveData = {
        age, year, month,
        health, mental, money, luck, study,
        hasPartner, isPartTimeWorking,
        nextCardCount, droppedOut,
        universityRank, jobType,
        isCramSchool, isJobHunting,
        jobHuntingTurn, isWorking,
        contribution, position, salary
    };

    localStorage.setItem("cardLifeSave", JSON.stringify(saveData));

    showSaveModal();
}

