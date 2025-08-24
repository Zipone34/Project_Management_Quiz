const quizForm = document.getElementById("quizForm");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");

let timeLeft = 300; // 5 minutes
let timer;

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    buildQuiz();
    startTimer();
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    timeDisplay.textContent = formatTime(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function buildQuiz() {
    questions.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
          <p>${item.q}</p>
          <label><input type="radio" name="q${i}" value="a" /> a) ${item.options.a}</label><br>
          <label><input type="radio" name="q${i}" value="b" /> b) ${item.options.b}</label><br>
          <label><input type="radio" name="q${i}" value="c" /> c) ${item.options.c}</label><br>
          <label><input type="radio" name="q${i}" value="d" /> d) ${item.options.d}</label>
        `;
        quizForm.appendChild(div);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Quiz";
    quizForm.appendChild(submitBtn);
}

quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearInterval(timer);
    submitQuiz();
});

function submitQuiz() {
    let score = 0;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    const wrongAnswers = [];

    questions.forEach((item, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const correct = item.a;

        if (selected && selected.value === correct) {
            score++;
        } else {
            const yourAnswer = selected ? selected.value : "None";
            wrongAnswers.push({
                number: i + 1,
                question: item.q,
                yourAnswer: yourAnswer !== "None" ? `${yourAnswer}) ${item.options[yourAnswer]}` : "No answer selected",
                correctAnswer: `${correct}) ${item.options[correct]}`
            });
        }
    });

    resultDiv.innerHTML += `<p>✅ You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>`;

    if (wrongAnswers.length > 0) {
        resultDiv.innerHTML += `<h3>❌ Incorrect Answers:</h3>`;
        wrongAnswers.forEach(item => {
            resultDiv.innerHTML += `
            <div style="margin-bottom: 10px;">
              <strong>Q${item.number}:</strong> ${item.question}<br/>
              <span style="color: red;">Your Answer: ${item.yourAnswer}</span><br/>
              <span style="color: green;">Correct Answer: ${item.correctAnswer}</span>
            </div>
          `;
        });
    } else {
        resultDiv.innerHTML += `<p style="color: green;">🎉 Perfect score! Great job!</p>`;
    }

    quizForm.style.display = "none";
}

const questions = [
    {
        q: "1. What is the primary goal of Project Schedule Management?",
        options: {
            a: "To reduce project costs",
            b: "To ensure timely completion of the project",
            c: "To increase stakeholder engagement",
            d: "To improve product quality"
        },
        a: "b"
    },
    {
        q: "2. Which process involves establishing policies and procedures for schedule planning?",
        options: {
            a: "Define Activities",
            b: "Develop Schedule",
            c: "Plan Schedule Management",
            d: "Control Schedule"
        },
        a: "c"
    },
    {
        q: "3. What is the key output of the Define Activities process?",
        options: {
            a: "Schedule Baseline",
            b: "Activity List",
            c: "Milestone Chart",
            d: "Gantt Chart"
        },
        a: "b"
    },
    {
        q: "4. Which diagram shows logical relationships among project activities?",
        options: {
            a: "Bar Chart",
            b: "Milestone Chart",
            c: "Project Schedule Network Diagram",
            d: "Resource Histogram"
        },
        a: "c"
    },
    {
        q: "5. What is the most commonly used precedence relationship in scheduling?",
        options: {
            a: "Start-to-Finish",
            b: "Finish-to-Start",
            c: "Start-to-Start",
            d: "Finish-to-Finish"
        },
        a: "b"
    },
    {
        q: "6. What technique is used to estimate activity durations using historical data?",
        options: {
            a: "Bottom-Up Estimating",
            b: "Parametric Estimating",
            c: "Analogous Estimating",
            d: "Three-Point Estimating"
        },
        a: "c"
    },
    {
        q: "7. What does the critical path represent?",
        options: {
            a: "The shortest path through the project",
            b: "The path with the most resources",
            c: "The longest path determining project duration",
            d: "The path with the most milestones"
        },
        a: "c"
    },
    {
        q: "8. What is the purpose of resource leveling?",
        options: {
            a: "To reduce project scope",
            b: "To balance resource demand with availability",
            c: "To eliminate float",
            d: "To increase project cost"
        },
        a: "b"
    },
    {
        q: "9. Which estimating technique uses optimistic, pessimistic, and most likely durations?",
        options: {
            a: "Analogous Estimating",
            b: "Parametric Estimating",
            c: "Three-Point Estimating",
            d: "Bottom-Up Estimating"
        },
        a: "c"
    },
    {
        q: "10. What is a milestone?",
        options: {
            a: "A task with high cost",
            b: "A significant point or event in a project",
            c: "A resource allocation",
            d: "A float calculation"
        },
        a: "b"
    },
    {
        q: "11. What is the output of the Develop Schedule process?",
        options: {
            a: "Activity List",
            b: "Schedule Management Plan",
            c: "Project Schedule",
            d: "Resource Calendar"
        },
        a: "c"
    },
    {
        q: "12. What technique shortens the schedule by adding resources?",
        options: {
            a: "Fast Tracking",
            b: "Crashing",
            c: "Simulation",
            d: "Resource Smoothing"
        },
        a: "b"
    },
    {
        q: "13. What is the purpose of Control Schedule?",
        options: {
            a: "To define the scope baseline",
            b: "To monitor and manage schedule changes",
            c: "To allocate resources",
            d: "To develop the schedule"
        },
        a: "b"
    },
    {
        q: "14. Which chart tracks remaining work in an iteration?",
        options: {
            a: "Gantt Chart",
            b: "Milestone Chart",
            c: "Burndown Chart",
            d: "Network Diagram"
        },
        a: "c"
    },
    {
        q: "15. What is the formula for expected duration in triangular distribution?",
        options: {
            a: "(tO + tM + tP) / 3",
            b: "(tO + 4tM + tP) / 6",
            c: "(tM + tP) / 2",
            d: "(tO + tP) / 2"
        },
        a: "a"
    },
    {
        q: "16. What does rolling wave planning involve?",
        options: {
            a: "Planning all activities at once",
            b: "Planning near-term work in detail",
            c: "Ignoring future tasks",
            d: "Using only historical data"
        },
        a: "b"
    },
    {
        q: "17. Which process defines the logical sequence of work?",
        options: {
            a: "Estimate Activity Durations",
            b: "Control Schedule",
            c: "Sequence Activities",
            d: "Define Activities"
        },
        a: "c"
    },
    {
        q: "18. What is a lead in scheduling?",
        options: {
            a: "Delay between activities",
            b: "Time a successor can start before predecessor finishes",
            c: "Float time",
            d: "Resource constraint"
        },
        a: "b"
    },
    {
        q: "19. What is a lag in scheduling?",
        options: {
            a: "Time a successor is delayed after predecessor starts",
            b: "Time a predecessor is delayed",
            c: "Resource optimization",
            d: "Schedule compression"
        },
        a: "a"
    },
    {
        q: "20. What is the key benefit of the Estimate Activity Durations process?",
        options: {
            a: "It defines the cost baseline",
            b: "It determines the project scope",
            c: "It provides time estimates for activities",
            d: "It allocates resources"
        },
        a: "c"
    },
    {
        q: "21. What technique overlaps activities normally done in sequence?",
        options: {
            a: "Crashing",
            b: "Fast Tracking",
            c: "Simulation",
            d: "Resource Leveling"
        },
        a: "b"
    },
    {
        q: "22. What is the output of the Control Schedule process?",
        options: {
            a: "Activity List",
            b: "Schedule Forecasts",
            c: "Milestone Chart",
            d: "Resource Histogram"
        },
        a: "b"
    },
    {
        q: "23. What is the purpose of the Schedule Management Plan?",
        options: {
            a: "To define the cost baseline",
            b: "To guide schedule development and control",
            c: "To allocate resources",
            d: "To manage scope"
        },
        a: "b"
    },
    {
        q: "24. What is the term for the amount of time an activity can be delayed without affecting successor?",
        options: {
            a: "Total Float",
            b: "Free Float",
            c: "Lag",
            d: "Lead"
        },
        a: "b"
    },
    {
        q: "25. What is the purpose of simulation in schedule analysis?",
        options: {
            a: "To reduce scope",
            b: "To calculate cost",
            c: "To evaluate uncertainty and risks",
            d: "To assign resources"
        },
        a: "c"
    },
    {
        q: "26. What is the output of the Define Activities process?",
        options: {
            a: "Schedule Baseline",
            b: "Activity Attributes",
            c: "Resource Calendar",
            d: "Cost Estimate"
        },
        a: "b"
    },
    {
        q: "27. What is the role of the project manager in adaptive environments?",
        options: {
            a: "To eliminate scope changes",
            b: "To manage only predictive projects",
            c: "To apply tools and techniques effectively",
            d: "To avoid stakeholder engagement"
        },
        a: "c"
    },
    {
        q: "28. What is the key benefit of the Develop Schedule process?",
        options: {
            a: "It defines the cost baseline",
            b: "It creates the schedule model",
            c: "It allocates resources",
            d: "It monitors progress"
        },
        a: "b"
    },
    {
        q: "29. What is the purpose of resource smoothing?",
        options: {
            a: "To change the critical path",
            b: "To delay project completion",
            c: "To optimize resources without changing critical path",
            d: "To increase float"
        },
        a: "c"
    },
    {
        q: "30. What is the output that includes planned start and finish dates for activities?",
        options: {
            a: "Schedule Management Plan",
            b: "Project Schedule",
            c: "Milestone List",
            d: "Activity List"
        },
        a: "b"
    }
];



