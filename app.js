const app = Vue.createApp({
    data() {
        return {
            isRunning: false,
            timer: '00:00'
        }
    },

    methods: {
        startTimer() {
            this.isRunning = true;
        },
        stopTimer() {
            this.isRunning = false;
        },
        resetTimer() {
            this.isRunning = false;
            this.timer = '00:00'
            // After resetting the timer, set this.isRunning to false and this.timer to '00:00'
        },
        updateTimer() {
            // Implement logic to periodically fetch the timer value from your backend
            // and update this.timer with the fetched value

        },
    },
    mounted() {
        // Periodically update the timer value
        setInterval(this.updateTimer, 1000);
    },
})

app.mount('#app')