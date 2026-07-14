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

let interviewStage = 0;        // 面接段階
let pendingJobOffer = "";      // 内定候補
let isChangingJob = false;     // 転職活動中か

let studyWarningShown = false;
let healthWarningShown = false;
let mentalWarningShown = false;

let hasCar = false;
let hasHouse = false;
let isMarried = false;

let carSaleEvent = false;
let houseSaleEvent = false;

let pendingPurchaseType = "";
let pendingSaleType = "";

let relationshipMonths = 0;

let pendingChangeJob = false;

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
            interviewStage = 0;
            nextCardCount = 2;
        }
    }
];

const cardListJobHunting = [

    {
        name: "面接成功",
        icon: "✅",
        text: "面接で好印象を残せた。",
        effect: () => {
            interviewStage++;

            mental -= 3;
            luck += 3;

            if (interviewStage >= 3) {
                createJobOffer();
            }
        }
    },

    {
        name: "面接失敗",
        icon: "❌",
        text: "面接でうまく話せなかった。",
        effect: () => {
            mental -= 5;
            luck -= 5;
        }
    }

];

//　-----会社員カード======

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
    },

    {
        name: "帰省",
        icon: "🏡",
        text: "久しぶりに実家へ帰省し、家族と過ごした。",
        effect: () => {

            if (money < 30000) {
                showMoneyModal("帰省するお金が足りません。");
                return;
            }

            money -= 30000;
            health += 5;
            mental += 10;
            luck += 3;
        }
    },

    {
        name: "趣味に没頭",
        icon: "🎮",
        text: "休日に趣味へ没頭し、気分転換した。",
        effect: () => {

            if (money < 20000) {
                showMoneyModal("趣味を楽しむお金が足りません。");
                return;
            }

            money -= 20000;
            mental += 15;
            luck += 5;
        }
    },

    {
        name: "健康診断",
        icon: "🩺",
        text: "健康診断を受け、体の状態を確認した。",

        effect: () => {
            if (money < 10000) {
                showMoneyModal("健康診断を受けるお金が足りません。");
                return;
            }

            money -= 10000;
            health += 10;
        }
    },

    {
        name: "友達と遊ぶ",
        icon: "🍻",
        text: "友達と遊び、楽しい時間を過ごした。",

        effect: () => {

            if (money < 15000) {
                showMoneyModal("友達と遊ぶお金が足りません。");
                return;
            }

            money -= 15000;
            mental += 10;
            luck += 5;
        }
    },

    {
        name: "ジムに通う",
        icon: "🏋️",
        text: "ジムで体を鍛え、健康的な生活を送った。",

        effect: () => {

            if (money < 12000) {
                showMoneyModal("ジムに通うお金が足りません。");
                return;
            }

            money -= 12000;
            health += 10;
            mental += 5;
        }
    },

    {
        name: "旅行に行く",
        icon: "✈️",
        text: "旅行へ出かけ、心も体もリフレッシュした。",

        effect: () => {

            if (money < 50000) {
                showMoneyModal("旅行に行くお金が足りません。");
                return;
            }

            money -= 50000;
            health += 8;
            mental += 15;
            luck += 10;
        }
    },

    {
        name: "車を売却する",
        icon: "🚗",
        text: "車の売却を考えた。",
        needCar: true,
        effect: () => {
            carSaleEvent = false;

            pendingSaleType = "car";
            showSaleModal();
        }
    },
    {
        name: "家を売却する",
        icon: "🏠",
        text: "家の売却を考えた。",
        needHouse: true,
        effect: () => {
            houseSaleEvent = false;

            pendingSaleType = "house";
            showSaleModal();
        }
    },
    
    {
        name: "結婚",
        icon: "💍",
        text: "交際から2年が経ち、結婚した。",

        needCar: true,
        needHouse: true,
        needPartner: true,
        needMarried: false,
        minRelationshipMonths: 24,

        effect: () => {
            isMarried = true;

            mental += 20;
            luck += 10;
        }
    },

    {
        name: "離婚",
        icon: "💔",
        text: "夫婦関係が悪化し、離婚してしまった。",

        needMarried: true,
        maxLuck: 30,

        effect: () => {
            isMarried = false;
            hasPartner = false;
            relationshipMonths = 0;

            // 財産分与で所持金を半分にする
            money = Math.floor(money / 2);

            mental -= 20;
            luck -= 10;
        }
    },

    {
        name: "交際を始める",
        icon: "❤️",
        text: "新しい相手と交際を始めた。",

        needPartner: false,
        needMarried: false,

        effect: () => {
            hasPartner = true;
            relationshipMonths = 0;

            mental += 10;
            luck += 5;
        }
    },

    {
        name: "すれ違い",
        icon: "💔",
        text: "すれ違いが続き、別れてしまった。",

        needPartner: true,
        needMarried: false,
        maxLuck: 30,

        effect: () => {
            hasPartner = false;
            relationshipMonths = 0;

            mental -= 20;
            luck -= 5;
        }
    },

    {
        name: "心の余裕がなく別れた",
        icon: "😢",
        text: "精神的な余裕がなく、別れてしまった。",

        needPartner: true,
        needMarried: false,
        maxMental: 20,

        effect: () => {
            hasPartner = false;
            relationshipMonths = 0;

            mental -= 15;
        }
    },

   
];

const changeJobCard = {
    name: "転職活動",
    icon: "🔄",
    text: "より良い会社を目指して転職活動を始めた。",
    effect: () => {

        showChangeJobModal();

    }
};

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
    else if (isWorking) {
        availableCards = [...cardListCompany];

        // 12月だけ転職カードを候補に追加
        if (month === 12) {
            availableCards.push(changeJobCard);
        }

        // 所持金10万円ごとにカードを1枚追加（最大6枚）
        const moneyBonusCards = Math.floor(Math.max(0, money) / 100000);

        nextCardCount = Math.min(6, 3 + moneyBonusCards);
    }
    else if (droppedOut) {
        availableCards = [...cardListDroppedOut];
    }
    else if (age === 22 && month === 12) {
        isJobHunting = true;
        interviewStage = 0;
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

        //　結婚状態
        if (card.needMarried === false && isMarried) return false;
        if (card.needMarried === true && !isMarried) return false;

        // 交際期間
        if (
            card.minRelationshipMonths !== undefined &&
            relationshipMonths < card.minRelationshipMonths
        ) {
            return false;
        }

        //車
        if (card.needCar === true && !hasCar) return false;
        if (card.needCar === false && hasCar) return false;

        //家
        if (card.needHouse === true && !hasHouse) return false;
        if (card.needHouse === false && hasHouse) return false;

        // 車売却カード
        if (card.name === "車を売却する") {
            return carSaleEvent;
        }

        // 家売却カード
        if (card.name === "家を売却する") {
            return houseSaleEvent;
        }

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
        mental -= 2;
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
    checkHealthWarning();
    checkMentalWarning();


    if (mental <= 0) {
        document.getElementById("gameOverText").textContent =
            "精神を病んでしまいました。";

        showGameOverModal();
        document.getElementById("nextButton").disabled = true;
        return;
    }

    if (health <= 0) {
        document.getElementById("gameOverText").textContent =
            "健康を失い、人生の限界を迎えました。";

        showGameOverModal();
        document.getElementById("nextButton").disabled = true;
        return;
    }


        if (age >= 60) {
            document.getElementById("message").textContent =
                "60歳まで生き抜きました！ゲームクリア！";
            return;
        }

    let displayText = card.text;

    if (cardName === "面接成功") {
        if (interviewStage === 1) {
            displayText = "一次面接に成功した。";
        } else if (interviewStage === 2) {
            displayText = "二次面接に成功した。";
        } else if (interviewStage >= 3) {
            displayText = "最終面接に成功した。内定が出た。";
        }
    }

    document.getElementById("message").textContent =
        displayText + extraMessage + " 『次を引く』を押して次のカードへ進みます。";
    document.getElementById("nextButton").disabled = false;
}

function nextTurn() {

    selected = false;
    document.getElementById("nextButton").disabled = true;

    // 交際中で、まだ結婚していない場合
    if (hasPartner && !isMarried) {
        relationshipMonths++;
    }

    month++;

    if (month > 12) {
        month = 1;
        year++;
        age++;
        // 年に一度だけ売却イベントを抽選
        carSaleEvent = false;
        houseSaleEvent = false;

        // 車を所有しているなら15%で抽選
        if (hasCar && Math.random() < 0.15) {
            carSaleEvent = true;
        }

        // 家を所有しているなら10%で抽選
        if (hasHouse && Math.random() < 0.10) {
            houseSaleEvent = true;
        }

        if (age >= 40 && age < 50) {
            health -= 1;
        } else if (age >= 50 && age < 60) {
            health -= 2;
        }
    }

    // 維持費
    if (hasCar) {
        money -= 10000;
    }

    if (hasHouse) {
        money -= 30000;
    }

    // 食費
    if (isWorking) {
        money -= isMarried ? 50000 : 30000;
    }
    
    // 家賃（持ち家がない社会人のみ）
    if (isWorking && !hasHouse) {
        money -= 50000;
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
    return health <= 0 || mental <= 0;
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

function checkHealthWarning() {

    if (health <= 10 && !healthWarningShown) {

        healthWarningShown = true;

        showHealthWarningModal();
    }

}

function checkMentalWarning() {

    if (mental <= 10 && !mentalWarningShown) {
        mentalWarningShown = true;
        showMentalWarningModal();
    }

}

function closeMoneyModal() {
    document.getElementById("moneyModal").classList.add("hidden");
}

function showStudyWarningModal() {
    document.getElementById("studyWarningModal")
        .classList.remove("hidden");
}

function showHealthWarningModal() {
    document.getElementById("healthWarningModal")
        .classList.remove("hidden");
}

function showMentalWarningModal() {
    document.getElementById("mentalWarningModal")
        .classList.remove("hidden");
}

function closeMentalWarningModal() {
    document.getElementById("mentalWarningModal")
        .classList.add("hidden");
}

function closeHealthWarningModal() {
    document.getElementById("healthWarningModal")
        .classList.add("hidden");
}

function closeStudyWarningModal() {
    document.getElementById("studyWarningModal")
        .classList.add("hidden");
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

function showLivingCostModal() {
    document.getElementById("livingCostModal")
        .classList.remove("hidden");
}

function closeLivingCostModal() {
    document.getElementById("livingCostModal")
        .classList.add("hidden");
}

function restartGame() {

    studyWarningShown = false;
    healthWarningShown = false;

    location.reload();
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

function createJobOffer() {

    isJobHunting = false;
    interviewStage = 0;

    if (!isWorking) {
        pendingJobOffer = "small";
    } else if (jobType === "small") {
        const offers = ["small", "middle"];
        pendingJobOffer = offers[Math.floor(Math.random() * offers.length)];
    } else if (jobType === "middle") {
        const offers = ["small", "middle", "big"];
        pendingJobOffer = offers[Math.floor(Math.random() * offers.length)];
    } else {
        const offers = ["middle", "big"];
        pendingJobOffer = offers[Math.floor(Math.random() * offers.length)];
    }

    showJobOfferModal();
}

function showJobOfferModal() {

    let companyName = "";

    if (pendingJobOffer === "small") companyName = "小さい会社";
    if (pendingJobOffer === "middle") companyName = "中堅企業";
    if (pendingJobOffer === "big") companyName = "大企業";

    document.getElementById("jobOfferText").textContent =
        `${companyName}から内定が出ました。就職しますか？`;

    document.getElementById("jobOfferModal").classList.remove("hidden");
}

function acceptJobOffer() {

    document.getElementById("jobOfferModal").classList.add("hidden");

    if (pendingJobOffer === "small") {
        jobType = "small";
        salary = 180000;
    }

    if (pendingJobOffer === "middle") {
        jobType = "middle";
        salary = 250000;
    }

    if (pendingJobOffer === "big") {
        jobType = "big";
        salary = 350000;
    }

    isWorking = true;
    isChangingJob = false;
    position = "一般社員";
    contribution = 50;
    pendingJobOffer = "";

    updateStatus();

    showLivingCostModal();

    document.getElementById("message").textContent =
        "就職が決まり、新しい生活が始まりました。";

    document.getElementById("nextButton").disabled = false;
}

function declineJobOffer() {

    document.getElementById("jobOfferModal").classList.add("hidden");

    pendingJobOffer = "";
    isChangingJob = false;

    mental -= 3;
    luck -= 2;

    updateStatus();

    document.getElementById("message").textContent =
        "内定を辞退しました。次の機会を待ちます。";

    document.getElementById("nextButton").disabled = false;
}


function closePurchaseModal() {
    document.getElementById("purchaseModal").classList.add("hidden");
}

function showChangeJobModal(){

    pendingChangeJob = true;

    document.getElementById("changeJobModal").classList.remove("hidden");

    document.getElementById("nextButton").disabled = true;
}

function acceptChangeJob(){

    isJobHunting = true;
    isChangingJob = true;

    pendingChangeJob = false;

    closeChangeJobModal();

    updateStatus();

    document.getElementById("nextButton").disabled = false;
}

function declineChangeJob(){

    pendingChangeJob = false;

    closeChangeJobModal();

    updateStatus();

    document.getElementById("nextButton").disabled = false;
}

function closeChangeJobModal(){

    document.getElementById("changeJobModal").classList.add("hidden");
}

function showPromotionModal(text) {
    document.getElementById("promotionText").textContent = text;
    document.getElementById("promotionModal").classList.remove("hidden");

    document.getElementById("nextButton").disabled = true;
}

function closePromotionModal() {
    document.getElementById("promotionModal").classList.add("hidden");

    document.getElementById("nextButton").disabled = false;
}

function closeSaleModal() {
    document.getElementById("saleModal").classList.add("hidden");
}

function showPurchaseModal() {
    if (pendingPurchaseType === "car") {
        document.getElementById("purchaseText").textContent =
            "車を100万円で購入しますか？";
    }

    if (pendingPurchaseType === "house") {
        document.getElementById("purchaseText").textContent =
            "家を500万円で購入しますか？";
    }

    document.getElementById("purchaseModal").classList.remove("hidden");
}

function acceptPurchase() {
    if (pendingPurchaseType === "car") {
        if (money < 1000000) {
            pendingPurchaseType = "";
            closePurchaseModal();
            showMoneyModal("車を買うお金が足りません。");
            document.getElementById("nextButton").disabled = false;
            return;
        }

        money -= 1000000;
        hasCar = true;
        mental += 5;
    }

    if (pendingPurchaseType === "house") {
        if (money < 5000000) {
            pendingPurchaseType = "";
            closePurchaseModal();
            showMoneyModal("家を買うお金が足りません。");
            document.getElementById("nextButton").disabled = false;
            return;
        }

        money -= 5000000;
        hasHouse = true;
        mental += 10;
    }

    pendingPurchaseType = "";
    closePurchaseModal();
    updateStatus();

    document.getElementById("nextButton").disabled = false;
}

function declinePurchase() {
    pendingPurchaseType = "";
    closePurchaseModal();

    document.getElementById("nextButton").disabled = false;
}

function showSaleModal() {
    if (pendingSaleType === "car") {
        document.getElementById("saleText").textContent =
            "車を60万円で売却しますか？";
    }

    if (pendingSaleType === "house") {
        document.getElementById("saleText").textContent =
            "家を350万円で売却しますか？";
    }

    document.getElementById("saleModal").classList.remove("hidden");
}

function acceptSale() {
    if (pendingSaleType === "car") {
        money += 600000;
        hasCar = false;
    }

    if (pendingSaleType === "house") {
        money += 3500000;
        hasHouse = false;
    }

    pendingSaleType = "";
    closeSaleModal();
    updateStatus();

    document.getElementById("nextButton").disabled = false;
}

function declineSale() {
    pendingSaleType = "";
    closeSaleModal();

    document.getElementById("nextButton").disabled = false;
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

    studyWarningShown = false;
    healthWarningShown = false;
    mentalWarningShown = false;

    hasCar = false;
    hasHouse = false;
    isMarried = false;
    pendingPurchaseType = "";
    pendingSaleType = "";

    relationshipMonths = 0;

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

    hasCar = saveData.hasCar;
    hasHouse = saveData.hasHouse;
    isMarried = saveData.isMarried;

    relationshipMonths = saveData.relationshipMonths ?? 0;

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

        updateStatus();

        showPromotionModal(
            "昇進しました！主任になりました。給料が8,000円増えました。"
        );

        return;
    }

    if (contribution >= 200 && position === "主任") {

        position = "係長";
        salary += 12000;
        mental += 15;

        updateStatus();

        showPromotionModal(
            "昇進しました！係長になりました。給料が12,000円増えました。"
        );

        return;
    }

    if (contribution >= 350 && position === "係長") {

        position = "課長";
        salary += 18000;
        mental += 20;

        updateStatus();

        showPromotionModal(
            "昇進しました！課長になりました。給料が18,000円増えました。"
        );

        return;
    }
}

function clampStatus() {
    health = Math.max(0, Math.min(100, health));
    mental = Math.max(0, Math.min(100, mental));
    luck = Math.max(0, Math.min(100, luck));
    study = Math.max(0, Math.min(100, study));
}

function checkStudyZero() {

    if (study <= 10 && study > 0 && droppedOut === false && studyWarningShown === false) {
        studyWarningShown = true;
        showStudyWarningModal();
    }

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
        contribution, position, salary,
        hasCar,
        hasHouse,
        isMarried,
        relationshipMonths,
    };

    localStorage.setItem("cardLifeSave", JSON.stringify(saveData));

    showSaveModal();
}

