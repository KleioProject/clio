<template>
    <div>
        <p>In Child:</p>
        <input type="text" :value="msg" @input="changeMessage">
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {}
    },
    methods: {
        changeMessage(event) {
            /*   this.message = event.target.value;
              this.$emit('messageChanged', this.message); */
            this.$store.commit({
                type: 'changeMessage',
                value: event.target.value
            })
        }
    },
    computed: {
        ...mapGetters({
            msg: 'message'
        })
    }
}
</script>
