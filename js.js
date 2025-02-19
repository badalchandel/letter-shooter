let score = 0;
        let highScore = localStorage.getItem("highScore") || 0;
        document.getElementById("high-score").textContent = highScore;
        let timeLeft = localStorage.getItem("timeLeft") ? parseInt(localStorage.getItem("timeLeft")) : 60;
        let timerInterval;

        document.getElementById("set-time").addEventListener("input", function () {
            let minutes = parseInt(this.value);
            if (minutes > 5) minutes = 5;
            timeLeft = minutes * 60;
            localStorage.setItem("timeLeft", timeLeft);
            document.getElementById("time").textContent = timeLeft;
        });

        function startTimer() {
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    document.getElementById("time").textContent = timeLeft;
                } else {
                    clearInterval(timerInterval);
                    alert("Game Over! Your Score: " + score);
                    location.reload();
                }
            }, 1000);
        }

        function createBubble() {
            let bubble = document.createElement("div");
            bubble.classList.add("bubble");
            let randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            bubble.textContent = randomLetter;
            document.body.appendChild(bubble);

            bubble.style.width = bubble.style.height = Math.random() * 50 + 20 + "px";
            bubble.style.left = Math.random() * 90 + "vw";
            bubble.style.bottom = "-10vh";
            let duration = Math.random() * 10 + 5;
            bubble.style.animation = `floatUp ${duration}s linear forwards`;

            bubble.addEventListener("click", function(event) {
                createBlast(event.clientX, event.clientY);
                playLetterSound(randomLetter);
                updateScore();
                bubble.remove();
            });

            setTimeout(() => bubble.remove(), duration * 1000);
        }

        function createBlast(x, y) {
            for (let i = 0; i < 10; i++) {
                let blast = document.createElement("div");
                blast.classList.add("blast");
                document.body.appendChild(blast);
                blast.style.left = x + Math.random() * 20 - 10 + "px";
                blast.style.top = y + Math.random() * 20 - 10 + "px";
                setTimeout(() => blast.remove(), 500);
            }
        }

        function updateScore() {
            score++;
            document.getElementById("score").textContent = score;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                document.getElementById("high-score").textContent = highScore;
            }
        }

        function playLetterSound(letter) {
            let utterance = new SpeechSynthesisUtterance(letter);
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }

        setInterval(createBubble, 1500);
        startTimer();