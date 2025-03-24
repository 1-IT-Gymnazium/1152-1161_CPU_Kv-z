// Otázky podle obtížnosti
const quizData = {
    easy: [
        { "question": "Kolik je 9 × 4?", "options": ["32", "36", "40", "42"], "answer": "36" },
        { "question": "Jaká je chemická značka pro sodík?", "options": ["Na", "S", "K", "Ca"], "answer": "Na" },
        { "question": "Kolik stran má čtverec?", "options": ["3", "4", "5", "6"], "answer": "4" },
        { "question": "Který savec umí létat?", "options": ["Netopýr", "Holub", "Orel", "Veverka"], "answer": "Netopýr" },
        { "question": "Kolik planet má Sluneční soustava?", "options": ["7", "8", "9", "10"], "answer": "8" },
        { "question": "Jaký prvek má chemickou značku O?", "options": ["Ozon", "Oxid", "Kyslík", "Osmium"], "answer": "Kyslík" },
        { "question": "Které těleso je nejblíže Zemi?", "options": ["Slunce", "Mars", "Měsíc", "Venuše"], "answer": "Měsíc" },
        { "question": "Jaký je hlavní město Německa?", "options": ["Mnichov", "Berlín", "Hamburk", "Frankfurt"], "answer": "Berlín" },
        { "question": "Které zvíře má nejdelší krk?", "options": ["Slon", "Žirafa", "Lev", "Hroch"], "answer": "Žirafa" },
        { "question": "Jaké číslo se nachází mezi 15 a 17?", "options": ["14", "16", "18", "19"], "answer": "16" }
    ],
    medium: [
        { "question": "Kolik je 14 × 7?", "options": ["88", "98", "108", "118"], "answer": "98" },
        { "question": "Který plyn potřebujeme k dýchání?", "options": ["Vodík", "Kyslík", "Dusík", "Oxid uhličitý"], "answer": "Kyslík" },
        { "question": "Kdo napsal 'Robinsona Crusoe'?", "options": ["Daniel Defoe", "Charles Dickens", "Jules Verne", "Mark Twain"], "answer": "Daniel Defoe" },
        { "question": "Kolik má člověk žeber?", "options": ["20", "22", "24", "26"], "answer": "24" },
        { "question": "Jaký je chemický vzorec kuchyňské soli?", "options": ["HCl", "NaCl", "KCl", "CaCl2"], "answer": "NaCl" },
        { "question": "Kdo namaloval obraz 'Hvězdná noc'?", "options": ["Da Vinci", "Picasso", "Van Gogh", "Rembrandt"], "answer": "Van Gogh" },
        { "question": "Který kontinent má nejvíce obyvatel?", "options": ["Evropa", "Asie", "Afrika", "Severní Amerika"], "answer": "Asie" },
        { "question": "Jaké je hlavní město Kanady?", "options": ["Toronto", "Vancouver", "Ottawa", "Montreal"], "answer": "Ottawa" },
        { "question": "Jaký je symbol pro železo v periodické tabulce?", "options": ["Fe", "Ir", "Zn", "Pb"], "answer": "Fe" },
        { "question": "Který národ postavil Velkou čínskou zeď?", "options": ["Římané", "Egypťané", "Číňané", "Mongolové"], "answer": "Číňané" }
    ],
    hard: [
        { "question": "Kolik je druhá odmocnina z 196?", "options": ["12", "13", "14", "15"], "answer": "14" },
        { "question": "Který rok skončila druhá světová válka?", "options": ["1943", "1944", "1945", "1946"], "answer": "1945" },
        { "question": "Jaký je nejlehčí prvek v periodické tabulce?", "options": ["Helium", "Vodík", "Kyslík", "Dusík"], "answer": "Vodík" },
        { "question": "Kdo napsal knihu '1984'?", "options": ["Huxley", "Orwell", "Bradbury", "Kafka"], "answer": "Orwell" },
        { "question": "Která planeta je nejteplejší?", "options": ["Merkur", "Venuše", "Mars", "Jupiter"], "answer": "Venuše" },
        { "question": "Jaká je nejvyšší hora světa?", "options": ["K2", "Everest", "Kilimandžáro", "Mont Blanc"], "answer": "Everest" },
        { "question": "Který světadíl je nejmenší rozlohou?", "options": ["Evropa", "Austrálie", "Antarktida", "Jižní Amerika"], "answer": "Austrálie" },
        { "question": "Jaký je hlavní plynný prvek na Slunci?", "options": ["Dusík", "Vodík", "Helium", "Kyslík"], "answer": "Vodík" },
        { "question": "Kolik dní trvá oběh Země kolem Slunce?", "options": ["356", "365", "366", "370"], "answer": "365" },
        { "question": "Kdo vynalezl telegraf?", "options": ["Edison", "Bell", "Morse", "Tesla"], "answer": "Morse" }
    ]
}

// Funkce pro zamíchání otázek
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 10; // Časový limit na otázku v sekundách
let selectedQuizData = [];

// Obsluha tlačítka "Hrát", přechod na výběr obtížnosti
document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("difficulty-screen").style.display = "block";
});

// Obsluha tlačítek pro výběr obtížnosti
document.querySelectorAll(".difficulty-btn").forEach(button => {
    button.addEventListener("click", () => {
        const difficulty = button.getAttribute("data-difficulty");
        selectedQuizData = [...quizData[difficulty]];
        shuffle(selectedQuizData);
        selectedQuizData.forEach(q => shuffle(q.options));

        document.getElementById("difficulty-screen").style.display = "none";
        document.getElementById("quiz-screen").style.display = "block";

        startQuiz();
    });
});

// Funkce pro spuštění kvízu
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    showQuestion();
}

// Funkce pro zobrazení aktuální otázky
function showQuestion() {
    clearTimeout(timer);
    if (currentQuestionIndex >= selectedQuizData.length) {
        showResults();
        return;
    }
    
    const questionData = selectedQuizData[currentQuestionIndex];
    document.getElementById("question").innerText = questionData.question;
    
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(button, option);
        optionsContainer.appendChild(button);
    });
    
    startTimer();
}

// Funkce pro kontrolu odpovědi
function checkAnswer(button, selected) {
    const correct = selectedQuizData[currentQuestionIndex].answer;

    // Zakázání dalších kliknutí
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(b => b.disabled = true);

    // Změna barvy odpovědí
    buttons.forEach(b => {
        if (b.innerText === correct) {
            b.style.backgroundColor = "#00cc66"; 
        } else {
            b.style.backgroundColor = "#ff4d4d"; 
        }
    });

    if (selected === correct) {
        score++;
        updateScore();
    }

    clearInterval(timer);

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 3000);
}

// Funkce pro aktualizaci skóre
function updateScore() {
    document.getElementById("score").innerText = `⭐ Skóre: ${score}`;
}

// Funkce pro spuštění časovače
function startTimer() {
    let timeLeft = timeLimit;
    document.getElementById("timer").innerText = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

// Funkce pro zpracování vypršení času
function timeUp() {
    const correct = selectedQuizData[currentQuestionIndex].answer;
    const buttons = document.querySelectorAll("#options button");

    buttons.forEach(b => b.disabled = true);
    buttons.forEach(b => {
        if (b.innerText === correct) {
            b.style.backgroundColor = "#00cc66";
        } else {
            b.style.backgroundColor = "#ff4d4d";
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 3000);
}

// Funkce pro zobrazení výsledků po dokončení kvízu

function showResults() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("results-screen").style.display = "block";
    document.getElementById("final-score").innerText = `${score}/${selectedQuizData.length}`;
    
    // Načtení předchozí historie
    let scoreHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    
    // Přidání aktuálního výsledku do historie
    const newResult = {
        date: new Date().toLocaleString(),
        score: `${score}/${selectedQuizData.length}`
    };
    scoreHistory.push(newResult);
    
    // Uložení zpět do localStorage
    localStorage.setItem("quizHistory", JSON.stringify(scoreHistory));

    // Aktualizace zobrazení historie
    displayHistory();
}

// Funkce pro zobrazení historie výsledků
function displayHistory() {
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "<h3>Historie výsledků:</h3>";
    
    let scoreHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    
    if (scoreHistory.length === 0) {
        historyContainer.innerHTML += "<p>Zatím žádné výsledky.</p>";
        return;
    }

    const list = document.createElement("ul");
    scoreHistory.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.innerText = `${entry.date} : ${entry.score}`;
        list.appendChild(listItem);
    });

    historyContainer.appendChild(list);
}

// Funkce pro smazání historie
function clearHistory() {
    localStorage.removeItem("quizHistory");
    displayHistory();
}
