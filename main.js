function load() {
    document.querySelector('.loading').style.display="none";
    document.querySelector('body').style.overflowY="visible";
};

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;  // Convert 24h to 12h format
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDeg = (hours * 30) + (minutes * 0.5);  // 360° / 12 hours = 30° per hour
    const minuteDeg = (minutes * 6) + (seconds * 0.1);  // 360° / 60 mins = 6° per min
    const secondDeg = seconds * 6;  // 360° / 60 secs = 6° per sec

    document.querySelector(".hr").style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    document.querySelector(".min").style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.querySelector(".sec").style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    }

    // Update clock every second
    setInterval(updateClock, 1000);

    // Initialize clock immediately
    updateClock();

    async function getQuote() {
    const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random", { cache: "no-cache" }));
    const data = await response.json();
    const quotes = JSON.parse(data.contents);
    document.getElementById("quote").innerText = `"${quotes[0].q}" - ${quotes[0].a}`;
    }

    getQuote();

    function updateTime() {
        const n = new Date();
        const hh = n.getHours().toString().padStart(2, '0');   // Pad hours to always have 2 digits
        const mm = n.getMinutes().toString().padStart(2, '0'); // Pad minutes to always have 2 digits
        const ss = n.getSeconds().toString().padStart(2, '0'); // Pad seconds to always have 2 digits

        // Update the spans with the time
        document.getElementById('hh').textContent = hh;
        document.getElementById('mm').textContent = mm;
        document.getElementById('ss').textContent = ss;
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    function setStatus() {
        const day = document.getElementById('day');
        const night = document.getElementById('night');
        const hr = new Date().getHours();

        if(hr>=5 && hr<=18){
            day.style.display = `block`;
            night.style.display = `none`;
        }
        else {
            day.style.display = `none`;
            night.style.display = `block`;
        }
    }

    setInterval(setStatus, 1000);
    setStatus();


    //pomodoro

    let timer;
    let timeLeft = 25*60;
    let isRunning = false;

    //selectElements
    const mint = document.getElementById('mint');
    const sect = document.getElementById('sect');
    const start = document.getElementById('start');
    const pause = document.getElementById('pause');
    const reset = document.getElementById('reset');
    const work = document.getElementById('work');
    const short = document.getElementById('short-break');
    const long = document.getElementById('long-break');
    const cont = document.getElementById('container');
    const stat = document.getElementById('stat');

    //time updation
    function updateDisplay() {
        let minutes = Math.floor(timeLeft/60);
        let seconds = timeLeft % 60;
        mint.textContent = minutes.toString().padStart(2, '0');
        sect.textContent = seconds.toString().padStart(2, '0');
    }

    //startTimer
    start.addEventListener('click', function() {
        start.textContent = "Start";
        if (!isRunning) {
            let sound = new Audio("tick.mp3"); 
            sound.play();
            stat.textContent = "Timer On";
            isRunning = true;
            timer = setInterval(() => {
                if(timeLeft > 0) {
                    timeLeft--;
                    cont.classList.add("active");
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    alert('Time is up!');
                    let sound = new Audio("tick.mp3"); 
                    sound.play();
                    cont.classList.remove("active");
                    isRunning = false;
                }
            }, 1000);
        }
    });

    reset.addEventListener('click', function() {
        stat.textContent = "Hustle Timer";
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            cont.classList.remove("active");
            timeLeft = 25*60;
            updateDisplay();
            alert('Time is reset!');
        }
        else {
            timeLeft = 25*60;
            updateDisplay();
            clearInterval(timer);
            alert('Time is reset!');
        }
    });

    pause.addEventListener('click', function() {
        if(isRunning) {
            stat.textContent = "Paused";
            clearInterval(timer);
            isRunning = false;
            start.textContent = "Resume";
            cont.classList.remove("active");
        }
    });

    work.addEventListener('click', function() {
        if(timeLeft <= 90*60) {
            timeLeft = timeLeft + 300;
            if(timeLeft > 90*60){
                timeLeft = 90*60;
                alert("Max Timer is upto 90 minutes");
            }
            updateDisplay();
        }
        else {
            timeLeft = 90*60;
            alert("Max Timer is upto 90 minutes");
        }
    });

    short.addEventListener('click', function() {
        stat.textContent = "Short Break";
        timeLeft = 5*60;
        updateDisplay();
    });

    long.addEventListener('click', function() {
        stat.textContent = "Long Break";
        timeLeft = 15*60;
        updateDisplay();
    });

    const create = document.getElementById('create');

    create.addEventListener('click', function() {
        let taskBubble = document.createElement("textarea");
        // Generate random position
        let x = Math.random() * (window.innerWidth - 100);
        let y = Math.random() * (window.innerHeight - 100);
        taskBubble.style.left = `${x}px`;
        taskBubble.style.top = `${y}px`;
        taskBubble.classList.add("bubble");
        taskBubble.textContent="Task Input (Edittable, Double Click to Delete)";
        document.getElementById('todo').appendChild(taskBubble);

        taskBubble.addEventListener("dblclick", function() {
            this.remove();
        });
    
        // Clear input field
        document.getElementById("taskInput").value = "";
    })