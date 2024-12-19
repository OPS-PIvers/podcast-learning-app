class PodcastPlayer {
    constructor() {
        this.audio = document.getElementById('podcast-audio');
        this.progressBar = document.getElementById('progress-bar');
        this.questions = [];
        this.currentQuestion = null;

        this.audio.addEventListener('timeupdate', () => this.handleTimeUpdate());
    }

    loadPodcast(url) {
        this.audio.src = url;
    }

    setQuestions(questions) {
        this.questions = questions;
    }

    handleTimeUpdate() {
        // Update progress bar
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressBar.style.width = `${progress}%`;

        // Check for questions
        const currentTime = this.audio.currentTime;
        const question = this.questions.find(q => 
            Math.abs(q.timestamp - currentTime) < 0.5 && q !== this.currentQuestion
        );

        if (question) {
            this.currentQuestion = question;
            this.audio.pause();
            QuestionHandler.displayQuestion(question);
        }
    }
}
