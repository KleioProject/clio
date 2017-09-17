<template>
    <div class="message-component">
        <h1>Message</h1>
        <p>{{messageBody}}</p>
        <button @click="close">Close</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    beforeMount: function() {
        console.log(`beforeMount method of Message component in: ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['messageBody'])
    },
    methods: {
        close() {
            this.$store.dispatch('setShowMessage', false);
            this.$store.dispatch('setMessageBody', '');
        }
    }
}
</script>
