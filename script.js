let age = 15;
let year = 2026;
let month = 4;

let health = 50;
let mental = 50;
let money = 10000;
let luck = 50;
let study = 50;

let hasPartner = false;
let isPartTimeWorking = false;

let currentCards = [];
let selected = false;
let nextCardCount = 3;

let selectedCount = 0;

const MAX_LIFE_RESERVE = 12;
let lifeReserve = MAX_LIFE_RESERVE;

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

let currentCompanyId = "";
let pendingCompanyId = "";

let previousStatusValues = null;

let lifeReserveWarningShown = false;

const maxJobHuntingTurn = 3;

const companyList = [

    // =========================
    // 小規模企業
    // =========================

    {
        id: "small_bad",
        name: "小規模ブラック企業",
        size: "小規模",
        reputation: "悪い",
        salary: 160000,
        monthlyMentalCost: 8,
        badCardRate: 0.75,
        goodCardRate: 0.10,
        promotionRate: 1.20,
        offerWeight: 35,
        description:
            "給料は低いが昇進しやすい。叱責や残業が非常に多い会社。"
    },

    {
        id: "small_normal",
        name: "小規模一般企業",
        size: "小規模",
        reputation: "普通",
        salary: 180000,
        monthlyMentalCost: 3,
        badCardRate: 0.30,
        goodCardRate: 0.30,
        promotionRate: 1.10,
        offerWeight: 30,
        description:
            "給料や労働環境が標準的で、比較的昇進しやすい会社。"
    },

    {
        id: "small_good",
        name: "小規模優良企業",
        size: "小規模",
        reputation: "良い",
        salary: 200000,
        monthlyMentalCost: 1,
        badCardRate: 0.10,
        goodCardRate: 0.70,
        promotionRate: 1.15,
        offerWeight: 12,
        description:
            "規模は小さいが働きやすく、社員が評価されやすい会社。"
    },

    // =========================
    // 中堅企業
    // =========================

    {
        id: "middle_bad",
        name: "中堅ブラック企業",
        size: "中堅",
        reputation: "悪い",
        salary: 220000,
        monthlyMentalCost: 7,
        badCardRate: 0.65,
        goodCardRate: 0.15,
        promotionRate: 1.10,
        offerWeight: 22,
        description:
            "給料は少し高いが、残業や休日出勤が多い会社。"
    },

    {
        id: "middle_normal",
        name: "中堅一般企業",
        size: "中堅",
        reputation: "普通",
        salary: 250000,
        monthlyMentalCost: 3,
        badCardRate: 0.30,
        goodCardRate: 0.40,
        promotionRate: 1.00,
        offerWeight: 18,
        description:
            "給料と働きやすさのバランスが取れた会社。"
    },

    {
        id: "middle_good",
        name: "中堅優良企業",
        size: "中堅",
        reputation: "良い",
        salary: 280000,
        monthlyMentalCost: 0,
        badCardRate: 0.05,
        goodCardRate: 0.80,
        promotionRate: 1.05,
        offerWeight: 8,
        description:
            "給料と労働環境の両方が良い人気企業。"
    },

    // =========================
    // 大手企業
    // =========================

    {
        id: "large_hard",
        name: "大手激務企業",
        size: "大手",
        reputation: "悪い",
        salary: 320000,
        monthlyMentalCost: 6,
        badCardRate: 0.55,
        goodCardRate: 0.20,
        promotionRate: 0.85,
        offerWeight: 12,
        description:
            "高給だが競争が激しく、残業も非常に多い会社。"
    },

    {
        id: "large_normal",
        name: "大手一般企業",
        size: "大手",
        reputation: "普通",
        salary: 350000,
        monthlyMentalCost: 3,
        badCardRate: 0.25,
        goodCardRate: 0.45,
        promotionRate: 0.80,
        offerWeight: 8,
        description:
            "安定した給料が魅力だが、昇進には時間がかかる会社。"
    },

    {
        id: "large_good",
        name: "大手優良企業",
        size: "大手",
        reputation: "良い",
        salary: 380000,
        monthlyMentalCost: -1,
        badCardRate: 0.05,
        goodCardRate: 0.85,
        promotionRate: 0.70,
        offerWeight: 3,
        description:
            "高給で働きやすいが、入社も昇進も非常に難しい会社。"
    }
];

function getCurrentCompany() {
    return companyList.find(
        company => company.id === currentCompanyId
    ) || null;
}

function getPendingCompany() {
    return companyList.find(
        company => company.id === pendingCompanyId
    ) || null;
}

function selectRandomCompany() {

    let candidates = companyList.filter(
        company => company.id !== currentCompanyId
    );

    const weightedCompanies = [];

    candidates.forEach(company => {

        let weight = company.offerWeight;

        // 幸運が低いと優良企業に入りにくい
        if (
            company.reputation === "良い" &&
            luck < 40
        ) {
            weight = Math.max(
                1,
                Math.floor(weight / 4)
            );
        }

        // 幸運が高いと優良企業が少し出やすい
        if (
            company.reputation === "良い" &&
            luck >= 70
        ) {
            weight *= 2;
        }

        // 幸運が高いとブラック企業が少し出にくい
        if (
            company.reputation === "悪い" &&
            luck >= 70
        ) {
            weight = Math.max(
                1,
                Math.floor(weight / 2)
            );
        }

        for (let i = 0; i < weight; i++) {
            weightedCompanies.push(company);
        }
    });

    if (weightedCompanies.length === 0) {
        weightedCompanies.push(...companyList);
    }

    const randomIndex =
        Math.floor(Math.random() * weightedCompanies.length);

    const selectedCompany =
        weightedCompanies[randomIndex];

    pendingCompanyId = selectedCompany.id;

    return selectedCompany;
}

function createCompanyOffer() {

    const company = selectRandomCompany();

    if (!company) {
        console.error("会社の抽選に失敗しました。");
        return;
    }

    showCompanyOfferModal(company);
}

function showCompanyOfferModal(company) {

    if (!company) {
        return;
    }

    let mentalText = "";

    if (company.monthlyMentalCost > 0) {
        mentalText =
            `毎月の精神負担：-${company.monthlyMentalCost}`;
    }
    else if (company.monthlyMentalCost < 0) {
        mentalText =
            `毎月の精神回復：+${Math.abs(company.monthlyMentalCost)}`;
    }
    else {
        mentalText = "毎月の精神負担：なし";
    }

    document.getElementById("jobOfferText").innerHTML = `
        <strong>${company.name}</strong><br><br>

        規模：${company.size}<br>
        評判：${company.reputation}<br>
        給料：${company.salary.toLocaleString()}円<br>
        ${mentalText}<br><br>

        ${company.description}<br><br>

        この会社に入社しますか？
    `;

    document
        .getElementById("jobOfferModal")
        .classList.remove("hidden");

    document.getElementById("nextButton").disabled = true;
}


const cardList15 = [

    // ===== 学力 =====

    {
        name: "定期テスト",
        icon: "📖",
        text: "テスト勉強の成果が出た。",
        type: "work",
        effect: () => {
            study += 5;
            mental -= 3;
        }
    },

    {
        name: "テスト勉強",
        icon: "✏️",
        text: "テストに向けて一生懸命勉強した。",
        type: "work",
        effect: () => {
            study += 4;
            mental -= 3;
        }
    },

    {
        name: "授業をサボった",
        icon: "😴",
        text: "授業をサボってしまった。",
        type: "work",
        effect: () => {
            study -= 6;
            mental += 2;
        }
    },


    {
        name: "友達と勉強した",
        icon: "👨‍🏫",
        text: "友達と一緒に勉強して理解が深まった。",
        type: "event",
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
        type: "destiny",
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
        type: "destiny",
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
        type: "event",
        effect: () => {
            health -= 10;
            study -= 3;
        }
    },

    {
        name: "運動",
        icon: "🏃",
        text: "体を動かして健康になった。",
        type: "event",
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
        type: "event",
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
        type: "event",
        effect: () => {
            luck += 10;
            study += 2;
           
        }
    },

    {
        name: "アンラッキー",
        icon: "☠️",
        text: "今日はついていなかった。",
        type: "event",
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
        type: "destiny",
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
        type: "event",
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
        type: "destiny",
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
        type: "destiny",
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
        type: "destiny",
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
        type: "event",
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
        type: "event",
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
        type: "event",
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
        type: "event",
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
        type: "destiny",
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
        type: "destiny",
        effect: () => {
            isPartTimeWorking = false;
            mental += 5;
        }
    },
    {
        name: "選択肢が増えた",
        icon: "🃏",
        text: "次のターンは4枚のカードから選べる。",
        type: "destiny",
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
        type: "work",
        effect: () => {
            
            mental -= 5;
            study += 5;
        }
    },

    {
        name: "サークル活動",
        icon: "🎸",
        text: "サークル活動を楽しんだ。",
        type: "work",
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
        type: "destiny",
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
        type: "destiny",
        effect: () => {
            isPartTimeWorking = false;
            mental += 5;
        }
    },

    {
        name: "単位を落とした",
        icon: "😱",
        text: "単位を落としてしまった。",
        type: "work",
        effect: () => {
            mental -= 5;
            study -= 5;
        }
    },

    {
        name: "友達と旅行",
        icon: "✈️",
        text: "友達と旅行へ行き、リフレッシュした。",
        type: "event",
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
        type: "event",
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
        type: "event",
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
        type: "event",
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
        type: "event",
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
        type: "event",
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
        type: "event",
        effect: () => {
            health += 5;
            
        }
    },

    {
        name: "恋人とデート",
        icon: "💕",
        text: "恋人と楽しい時間を過ごした。",
        needPartner: true,
        type: "event",
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
        type: "work",
        effect: () => {
            
            mental += 5;
            study += 3;
        }
    },

    {
        name: "インターン",
        icon: "💼",
        text: "インターンで社会経験を積んだ。",
        type: "work",
        effect: () => {
            
            mental += 3;
            study += 3;
        }
    },

    {
        name: "友達と遊びに行く",
        icon: "🎡",
        text: "友達と遊びに行って気分転換した。",
        type: "event",
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
        type: "event",
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
        type: "event",
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
        type: "event",
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
        type: "work",
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
        type: "event",
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
        type: "work",
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
        type: "event",
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
        type: "work",
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
        type: "work",
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
        type: "work",
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
        type: "work",
        effect: () => {
            isPartTimeWorking = false;
            mental += 5;
        }
    },
    {
        name: "日雇い仕事",
        icon: "💴",
        text: "日雇い仕事でお金を稼いだ。",
        type: "work",
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
        type: "event",
        effect: () => {
            health += 8;
            mental += 5;
        }
    },
    {
        name: "趣味で気分転換",
        icon: "🎮",
        text: "趣味を楽しんで気分転換した。",
        type: "event",
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
        type: "event",
        effect: () => {
            mental -= 8;
        }
    },
    {
        name: "就職活動を考える",
        icon: "📄",
        text: "そろそろ就職活動を考え始めた。",
        type: "destiny",
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
        type: "destiny",
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
        type: "event",
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
        type: "event",
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
        type: "work",
        effect: () => {
            contribution += 10;
            mental -= 3;
        }
    },
    {
        name: "仕事でミス",
        icon: "😱",
        text: "仕事でミスをして評価が下がった。",
        type: "work",
        effect: () => {
            contribution -= 10;
            mental -= 5;
        }
    },
    {
        name: "上司に褒められた",
        icon: "👏",
        text: "上司に褒められ、やる気が出た。",
        type: "work",
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
        type: "work",
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
        type: "event",
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
        type: "event",
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
        type: "work",

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
        type: "event",
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
        type: "event",

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
        type: "event",
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
        type: "destiny",
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
        type: "destiny",
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
        type: "destiny",

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
        type: "destiny",
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
        type: "destiny",
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
        type: "destiny",

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
        type: "destiny",
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
    name: "転職を考える",
    icon: "🔄",
    text: "現在の会社を辞めて、新しい会社を探すか考えた。",
    type: "destiny",

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

    // 幸運0なら就職失敗
    if (luck <= 0) {
        return noJobCard();
    }

    // 就職できるかどうかの基本判定
    let successRate = 0;

    // 名門大学
    if (universityRank === "elite") {
        successRate = 85;
    }

    // 普通大学
    else if (universityRank === "normal") {
        successRate = 65;
    }

    // Fラン大学
    else if (universityRank === "low") {
        successRate = 45;
    }

    // 学力による補正
    successRate += Math.floor(study / 5);

    // 幸運による補正
    successRate += Math.floor(luck / 10);

    // 最大95％
    successRate = Math.min(95, successRate);

    const randomNumber = Math.random() * 100;

    if (randomNumber > successRate) {
        return noJobCard();
    }

    return companyOfferCard();
}

function companyOfferCard() {
    return {
        name: "会社から内定",
        icon: "💼",
        text: "就職活動の結果、会社から内定の連絡が届いた。",
        type: "destiny",

        effect: () => {
            createCompanyOffer();
        }
    };
}

function noJobCard() {
    return {
        name: "就職できなかった",
        icon: "❌",
        text: "就職先が決まらなかった。",
        type: "destiny",
        effect: () => {
            jobType = "none";
            mental -= 20;
            money -= 10000;
        }
    };
}


function drawCards() {

    selected = false;
    selectedCount = 0;

    currentCards = [];

    let availableCards = [];

    // ===== 年齢・イベントごとのカード =====

    if (isJobHunting) {
        availableCards = [...cardListJobHunting];
        nextCardCount = 2;
    }
    else if (isWorking && !isJobHunting) {
        availableCards = [...cardListCompany];

        // 12月だけ転職カードを追加
        if (month === 12) {
            availableCards.push(changeJobCard);
        }

        // 所持金10万円ごとに1枚追加
        const moneyBonusCards =
            Math.floor(Math.max(0, money) / 1000000);

        // 役職による追加枚数
        const positionBonusCards =
            getCompanyCardCount();

        // 基本3枚＋所持金＋役職、最大6枚
        nextCardCount = Math.min(
            6,
            3 + moneyBonusCards + positionBonusCards
        );
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

            // カードの種類によって裏面を変更
            let cardBackImage = "images/card-back.png";

            if (card.type === "event") {
                cardBackImage = "images/card_back_event_red.png";
            }

            if (card.type === "destiny") {
                cardBackImage = "images/card-back-destiny-silver.png";
            }

            div.style.backgroundImage = `url(${cardBackImage})`;
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundPosition = "center";
            div.style.backgroundSize = "cover";

            div.textContent = "";

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

    const maxSelections = isWorking
        ? getMaxSelectionsPerTurn()
        : 1;

    if (selectedCount >= maxSelections) {
        return;
    }

    const card = currentCards[index];
    
    if (!card) {
        selected = false;
        drawCards();
        return;
    }

    playCardFlipSe();

    selectedCount++;

    const selectedCardElement =
        document.querySelectorAll(".card")[index];

    if (selectedCardElement) {
        selectedCardElement.style.pointerEvents = "none";
    }

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

            el.style.backgroundImage = "none";
            el.style.backgroundSize = "";
            el.style.backgroundRepeat = "";
            el.style.backgroundPosition = "";

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
    
    if (selectedCount >= maxSelections) {
        selected = true;

        document.getElementById("nextButton").disabled = false;

        document.getElementById("message").textContent +=
            ` このターンは${selectedCount}枚選びました。`;
    } else {
        selected = false;

        document.getElementById("nextButton").disabled = true;

        document.getElementById("message").textContent +=
            ` あと${maxSelections - selectedCount}枚選べます。`;
    }
}

function nextTurn() {

    selected = false;
    document.getElementById("nextButton").disabled = true;

    lifeReserve--;

    clampLifeReserve();
    updateLifeReserveDisplay();

    // 残り2で警告
    checkLifeReserveWarning();

    // 残り0でゲームオーバー
    if (lifeReserve <= 0) {
        lifeReserveGameOver();
        return;
    }

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

function showStatusChange(elementId, difference, suffix = "") {

    if (difference === 0) {
        return;
    }

    const valueElement =
        document.getElementById(elementId);

    if (!valueElement) {
        return;
    }

    const statusItem = valueElement.parentElement;

    if (!statusItem) {
        return;
    }

    statusItem.classList.add("status-change-area");

    const changeElement =
        document.createElement("span");

    changeElement.className =
        difference > 0
            ? "status-change increase"
            : "status-change decrease";

    const sign = difference > 0 ? "+" : "";

    changeElement.textContent =
        `${sign}${difference.toLocaleString()}${suffix}`;

    statusItem.appendChild(changeElement);

    changeElement.addEventListener(
        "animationend",
        () => {
            changeElement.remove();
        }
    );
}

function updateStatus() {

    const currentStatusValues = {
        health: health,
        mental: mental,
        money: money,
        luck: luck,
        study: study
    };

    if (previousStatusValues !== null) {

        showStatusChange(
            "health",
            health - previousStatusValues.health
        );

        showStatusChange(
            "mental",
            mental - previousStatusValues.mental
        );

        showStatusChange(
            "money",
            money - previousStatusValues.money,
            "円"
        );

        showStatusChange(
            "luck",
            luck - previousStatusValues.luck
        );

        showStatusChange(
            "study",
            study - previousStatusValues.study
        );
    }

    previousStatusValues = {
        ...currentStatusValues
    };


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

function updateLifeReserveDisplay() {

    const countText =
        document.getElementById("lifeReserveCount");

    const costText =
        document.getElementById("replenishCostText");

    if (!countText || !costText) {
        return;
    }

    clampLifeReserve();

    if (lifeReserve <= 0) {
        countText.textContent = "緊急補充";
    } else if (lifeReserve <= 3) {
        countText.textContent =
            `残り ${lifeReserve}！`;
    } else {
        countText.textContent =
            `残り ${lifeReserve}`;
    }

    const replenishInfo =
        getReplenishInfo();

    if (replenishInfo.recoverAmount <= 0) {
        costText.textContent =
            "満タン・補充不要";

        return;
    }

    costText.textContent =
        `${replenishInfo.recoverAmount}回復：` +
        `${replenishInfo.cost.toLocaleString()}円`;
}

function replenishLifeReserve() {

    const replenishInfo =
        getReplenishInfo();

    // すでに満タン
    if (replenishInfo.recoverAmount <= 0) {
        document
            .getElementById("message")
            .textContent =
            "残量はすでに満タンです。";

        return;
    }

    // お金が足りない
    if (money < replenishInfo.cost) {

        if (typeof showMoneyModal === "function") {
            showMoneyModal(
                "補充するためのお金が足りません。"
            );
        } else {
            document
                .getElementById("message")
                .textContent =
                "補充するためのお金が足りません。";
        }

        return;
    }

    money -= replenishInfo.cost;

    lifeReserve =
        MAX_LIFE_RESERVE;

    document
        .getElementById("message")
        .textContent =
        `${replenishInfo.cost.toLocaleString()}円を支払い、` +
        `残量を12まで補充しました。`;

    updateStatus();
    updateLifeReserveDisplay();

    if (lifeReserve > 0 && selected) {
        document.getElementById("nextButton").disabled = false;
    }
}

function getReplenishSetPrice() {

    // 社会人
    if (isWorking) {
        switch (position) {
            case "役員":
            case "社長":
                return 70000;

            case "部長":
                return 50000;

            case "課長":
                return 40000;

            case "係長":
                return 30000;

            case "主任":
                return 25000;

            case "一般社員":
            default:
                return 20000;
        }
    }

    // 高校生
    if (age <= 17) {
        return isPartTimeWorking ? 750 : 500;
    }

    // 大学生
    if (age >= 18 && age <= 22) {
        return isPartTimeWorking ? 1500 : 1000;
    }

    // 無職など
    return 5000;
}

function getReplenishInfo() {

    const recoverAmount =
        MAX_LIFE_RESERVE - lifeReserve;

    if (recoverAmount <= 0) {
        return {
            recoverAmount: 0,
            setCount: 0,
            cost: 0
        };
    }

    // 3回復単位で切り上げ
    const setCount =
        Math.ceil(recoverAmount / 3);

    const setPrice =
        getReplenishSetPrice();

    const cost =
        setCount * setPrice;

    return {
        recoverAmount,
        setCount,
        cost
    };
}

function clampLifeReserve() {
    lifeReserve = Math.max(
        0,
        Math.min(MAX_LIFE_RESERVE, lifeReserve)
    );
}

function isGameOver() {
    return health <= 0 || mental <= 0;
}

function showGameOverModal() {
    document.getElementById("gameOverModal").classList.remove("hidden");
}

function lifeReserveGameOver() {
    document
        .getElementById("gameOverModal")
        .classList.remove("hidden");

    const gameOverText =
        document.getElementById("gameOverText");

    if (gameOverText) {
        gameOverText.textContent =
            "余力が尽き、補充するお金もなかったため、生活を続けられませんでした。";
    }

    document.getElementById("nextButton").disabled = true;
    document.getElementById("replenishButton").disabled = true;
}

function checkLifeReserveGameOver() {
    if (lifeReserve > 0) {
        return false;
    }

    const replenishInfo = getReplenishInfo();

    // 補充費用が足りなければゲームオーバー
    if (money < replenishInfo.cost) {
        lifeReserveGameOver();
        return true;
    }

    // 補充できる場合は、次のターンへ進めない
    document.getElementById("nextButton").disabled = true;

    document.getElementById("message").textContent =
        "余力が尽きました。補充しなければ次へ進めません。";

    updateLifeReserveDisplay();

    return false;
}

function checkLifeReserveWarning() {
    if (lifeReserve === 2 && !lifeReserveWarningShown) {
        lifeReserveWarningShown = true;

        showMoneyModal(
            "警告：余力が残り2になりました。0になる前に補充してください。"
        );
    }
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
    document
        .getElementById("livingCostModal")
        .classList.add("hidden");

    selected = false;

    const nextButton =
        document.getElementById("nextButton");

    nextButton.disabled = false;
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
    updateLifeReserveDisplay();
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

    createCompanyOffer();
}


function acceptJobOffer() {

    const company = getPendingCompany();

    if (!company) {
        console.error("内定会社が見つかりません。");
        return;
    }

    const wasWorking = isWorking;
    const wasChangingJob = isChangingJob;

    currentCompanyId = company.id;

    isWorking = true;
    isJobHunting = false;
    isChangingJob = false;

    salary = company.salary;

    jobType = company.size;

    // 転職すると役職は一般社員に戻る
    position = "一般社員";

    // 貢献度を少し残す
    contribution = 30;

    interviewStage = 0;
    jobHuntingTurn = 0;

    document
        .getElementById("jobOfferModal")
        .classList.add("hidden");

    document.getElementById("message").textContent =
        `${company.name}に入社しました。`;

    pendingCompanyId = "";

    updateStatus();

    selected = false;

    drawCards();   // ←追加

    document.getElementById("nextButton").disabled = false;

    // 初就職時だけ社会人生活を表示
    if (
        !wasWorking &&
        !wasChangingJob &&
        typeof showLivingCostModal === "function"
    ) {
        showLivingCostModal();
    }
}

function declineJobOffer() {

    const company = getPendingCompany();

    document
        .getElementById("jobOfferModal")
        .classList.add("hidden");

    if (company) {
        document.getElementById("message").textContent =
            `${company.name}の内定を辞退しました。`;
    }

    pendingCompanyId = "";

    isJobHunting = false;
    isChangingJob = false;

    mental -= 3;
    luck -= 2;

    if (mental < 0) {
        mental = 0;
    }

    if (luck < 0) {
        luck = 0;
    }

    updateStatus();

    document.getElementById("nextButton").disabled = false;
}


function closePurchaseModal() {
    document.getElementById("purchaseModal").classList.add("hidden");
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

function showChangeJobModal() {
    document
        .getElementById("changeJobModal")
        .classList.remove("hidden");

    document.getElementById("nextButton").disabled = true;
}

function getCompanyCardCount() {

    switch (position) {

        case "部長":
        case "役員":
        case "社長":
            return 3;

        case "係長":
        case "課長":
            return 2;

        case "主任":
        case "一般社員":
        default:
            return 1;
    }
}

function getMaxSelectionsPerTurn() {
    switch (position) {
        case "部長":
        case "役員":
        case "社長":
            return 3;

        case "係長":
        case "課長":
            return 2;

        case "一般社員":
        case "主任":
        default:
            return 1;
    }
}

function acceptChangeJob() {
    document
        .getElementById("changeJobModal")
        .classList.add("hidden");

    isChangingJob = true;
    isJobHunting = true;

    interviewStage = 0;
    jobHuntingTurn = 0;

    mental -= 5;

    if (mental < 0) {
        mental = 0;
    }

    document.getElementById("message").textContent =
        "転職活動を始めました。";

    selected = false;

    updateStatus();
    drawCards();

    document.getElementById("nextButton").disabled = true;
}

function declineChangeJob() {
    document
        .getElementById("changeJobModal")
        .classList.add("hidden");

    document.getElementById("message").textContent =
        "今の会社に残ることにしました。";

    document.getElementById("nextButton").disabled = false;
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

    previousStatusValues = null;

    age = 15;
    year = 2026;
    month = 4;

    health = 50;
    mental = 50;
    money = 10000;
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

