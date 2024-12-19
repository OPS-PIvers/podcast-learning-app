class QuestionHandler {
    static displayQuestion(question) {
        const container = document.getElementById('questions-container');
        const content = document.getElementById('question-content');
        const options = document.getElementById('answer-options');

        content.textContent = question.question;
        options.innerHTML = '';

        if (question.type === 'multiple-choice') {
            question.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'w-full p-2 text-left border rounded hover:bg-gray-100';
                button.textContent = option;
                button.onclick = () => this.selectAnswer(button, option);
                options.appendChild(button);
            });
        }

        container.classList.remove('hidden');
    }

    static selectAnswer(button, answer) {
        // Remove previous selection
        document.querySelectorAll('#answer-options button').forEach(btn => 
            btn.classList.remove('bg-blue-100'));
        
        // Highlight selected answer
        button.classList.add('bg-blue-100');
        this.selectedAnswer = answer;
    }

    static async submitAnswer() {
        // Handle answer submission
        const container = document.getElementById('questions-container');
        container.classList.add('hidden');
        document.getElementById('podcast-audio').play();
    }
}
