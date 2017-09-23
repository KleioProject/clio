<template>
    <div class="messages-component">
        <transition-group name="message" mode="out-in">
            <message v-for="(message, index) in messages" :key="message.timestamp" :message="message" :timeout="messageTimeout" @removeMessage="removeMessage(index)"></message>
        </transition-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Message from './components/Message';

export default {
    props: ['headline', 'body'],
    components: {
        message: Message
    },
    computed: {
        ...mapGetters(['messages', 'messageTimeout'])
    },
    beforeMount: function() {
        console.log(`beforeMount method of Message component in: ${isBrowser ? 'client' : 'server'}`);
    },
    methods: {
        removeMessage(index) {
            this.$store.dispatch('removeMessage', index);
        }
    }
}
</script>
