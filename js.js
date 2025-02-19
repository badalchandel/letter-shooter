let score = 0;
        let highScore = localStorage.getItem("highScore") || 0;
        document.getElementById("high-score").textContent = highScore;
        let timeLeft = 60;
        let timerInterval;
        let bubbleInterval;

        function startCountdown() {
            let countdownElement = document.getElementById("countdown");
            countdownElement.style.display = "block";
            let count = 5;
            countdownElement.textContent = count;

            let countdownInterval = setInterval(() => {
                count--;
                if (count > 0) {
                    countdownElement.textContent = count;
                } else {
                    clearInterval(countdownInterval);
                    countdownElement.textContent = "Let's Go!";
                    setTimeout(() => {
                        countdownElement.style.display = "none";
                        startGame();
                    }, 1000);
                }
            }, 1000);
        }

        function startGame() {
            // Reset score and timer
            score = 0;
            timeLeft = 60;
            document.getElementById("score").textContent = score;
            document.getElementById("time").textContent = timeLeft;

            // Hide game-over message
            document.getElementById("game-over-message").style.display = "none";

            // Start timer
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    document.getElementById("time").textContent = timeLeft;
                } else {
                    endGame();
                }
            }, 1000);

            // Start creating bubbles
            bubbleInterval = setInterval(createBubble, 1500);
        }

        function endGame() {
            clearInterval(timerInterval);
            clearInterval(bubbleInterval);
            document.getElementById("game-over-message").textContent = 
                "Game Over! Your Score: " + score;
            document.getElementById("game-over-message").style.display = "block";

            // Update high score if needed
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                document.getElementById("high-score").textContent = highScore;
            }

            // Hide game-over message after 3 seconds
            setTimeout(() => {
                document.getElementById("game-over-message").style.display = "none";
                startCountdown(); // Restart game after countdown
            }, 3000);
        }

        function createBubble() {
            let bubble = document.createElement("div");
            bubble.classList.add("bubble");
            let randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            bubble.textContent = randomLetter;
            document.body.appendChild(bubble);

            bubble.style.width = bubble.style.height = "80px";
            bubble.style.left = Math.random() * 90 + "vw";
            bubble.style.bottom = "-10vh";

            bubble.addEventListener("click", function(event) {
                createBlast(event.clientX, event.clientY);
                playLetterSound(randomLetter);
                updateScore();
                bubble.remove();
            });

            setTimeout(() => bubble.remove(), 5000);
        }

        function createBlast(x, y) {
            let blast = document.createElement("div");
            blast.classList.add("blast");
            document.body.appendChild(blast);
            blast.style.left = x + "px";
            blast.style.top = y + "px";
            setTimeout(() => blast.remove(), 500);
        }

        function playLetterSound(letter) {
            let utterance = new SpeechSynthesisUtterance(letter);
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }

        function updateScore() {
            score++;
            document.getElementById("score").textContent = score;
        }

        startCountdown();