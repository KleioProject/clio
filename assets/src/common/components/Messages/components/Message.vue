<template>
    <div class="message-component" :class="{success: message.isSuccess}">
        <div class="tcenter">
            <h3 class="message-headline" :class="{'icon-ok': message.isSuccess, 'icon-attention': !message.isSuccess}">{{message.headline}}</h3>
            <p class="tcenter message-body">{{message.body}}</p>
        </div>
        <div class="date-time" v-html="$options.filters.datetime(message.timestamp,'time')"></div>
        <div class="button-group">
            <button class="btn-small" @click="close">Close</button>
        </div>
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
