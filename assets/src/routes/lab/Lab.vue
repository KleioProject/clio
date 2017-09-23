<template>
    <div class="lab-page">
        <h1>Welcome to The Lab</h1>
        <ul class="navbar-component">
            <router-link to="/clio/lab/apollo" tag="li" class="link-item" active-class="link-active">
                <a>Аполло</a>
            </router-link>
            <router-link to="/clio/lab/auto" tag="li" class="link-item" active-class="link-active">
                <a>Аутокъмплийт</a>
            </router-link>
            <router-link to="/clio/lab/editor" tag="li" class="link-item" active-class="link-active">
                <a>Едитор</a>
            </router-link>
        </ul>
        <button @click="addMessage">Create message</button>
        <router-view></router-view>
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
        }
    }
}
</script>
