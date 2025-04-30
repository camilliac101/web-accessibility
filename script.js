document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quizForm");
    const resultsDiv = document.getElementById("results");
    const scoreEl = document.getElementById("score");
    const answersEl = document.getElementById("answers");
    const resultEl = document.getElementById("result");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let score = 0;
        let total = 6;

        const q1 = document.getElementById("q1").value.trim().toLowerCase();
        if (q1 === "alt" || q1 === "alt text") score++;

        const checkboxes = document.querySelectorAll('input[name="q2"]:checked');
        const selected = Array.from(checkboxes).map(cb => cb.value);
        const correctAnswers = ["headings", "alt-text"];
        const incorrectAnswers = ["no-forms", "animations"];
        let q2Correct = correctAnswers.every(a => selected.includes(a)) && !incorrectAnswers.some(a => selected.includes(a));
        if (q2Correct) score++;

        for (let i = 3; i <= 6; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption && selectedOption.value === "correct") score++;
        }

        form.style.display = "none";
        resultsDiv.style.display = "block";
        scoreEl.textContent = `You scored ${score}/${total}.`;
        answersEl.innerHTML = `
            <strong>Correct Answers:</strong><br>
            1. alt<br>
            2. Headings + Alt Text<br>
            3. Web Content Accessibility Guidelines<br>
            4. Light gray text on white<br>
            5. Everyone<br>
            6. <h1>
        `;
        resultEl.textContent = score >= 4 ? "Great job! You passed!" : "Keep practicing. You can try again!";
    });
});

function restartQuiz() {
    location.reload();
}
