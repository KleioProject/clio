<template>
    <div class="lab-page">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <h1>Welcome to The Lab</h1>
                    <button @click="addMessage">Create message</button>
                    <button @click="switchPopup">Switch popup</button>
                    <transition name="slide-routes" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isSuccess: true
        }
    },
    beforeMount: function() {
        console.log(`beforeMount method of Lab called from ${isBrowser ? 'client' : 'server'}`);
    },
    methods: {
        addMessage() {
            this.isSuccess = !this.isSuccess;
            this.$store.dispatch('addMessage', {
                headline: 'This is a message',
                body: 'This is a test message to show how the messages will look like!',
                timestamp: (new Date()).getTime(),
                isSuccess: this.isSuccess
            });
        },
        switchPopup() {
            this.$store.dispatch('setPopupHeadline', 'Ready to go?');
            this.$store.dispatch('setPopupBody', 'Do you want to go to Home page?');
            this.$store.dispatch('setPopupProceedLabel', 'Go Home');
            this.$store.dispatch('setPopupCancel', () => {
                console.log(this);
            });
            this.$store.dispatch('setPopupProceed', () => {
                this.$router.push({ name: 'home' });
            });
            this.$store.dispatch('setShowPopup', true);
        }
    }
}
</script>
