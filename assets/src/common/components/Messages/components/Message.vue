<template>
    <div class="message-component" :class="{success: message.isSuccess}">
        <h3>{{message.headline}}</h3>
        <p>{{message.body}}</p>
        <span>{{new Date(message.timestamp)}}</span>
        <button @click="close">Close</button>
    </div>
</template>

<script>
export default {
    props: ['message', 'timeout'],
    beforeMount: function() {
        console.log(`beforeMount method of Message component in: ${isBrowser ? 'client' : 'server'}`);
    },
    mounted: function() {
        if (isBrowser && this.timeout !== undefined) {
            setTimeout(() => {
                this.$emit('removeMessage');
            }, this.timeout);
        }
    },
    methods: {
        close() {
            this.$emit('removeMessage');
        }
    }
}
</script>
