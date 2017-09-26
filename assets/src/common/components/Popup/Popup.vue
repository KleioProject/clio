<template>
    <div class="popup-component" @click="closeOnClick">
        <div ref="content" class="popup-content">
            <h3>{{popupHeadline}}</h3>
            <p>{{popupBody}}</p>
            <button @click="close">Close</button>
            <button v-if="typeof popupProceed === 'function'" @click="proceed">{{popupProceedLabel}}</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    beforeMount: function() {
        console.log(`beforeMount method of Popup component in: ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['popupBody', 'popupCancel', 'popupHeadline', 'popupProceed', 'popupProceedLabel'])
    },
    methods: {
        clearPopup() {
            this.$store.dispatch('setShowPopup', false);
            this.$store.dispatch('setPopupBody', '');
            this.$store.dispatch('setPopupHeadline', '');
            this.$store.dispatch('setPopupCancel', null);
            this.$store.dispatch('setPopupProceed', null);
        },
        close(event) {
            event.stopPropagation();
            if (typeof this.popupCancel === 'function') {
                this.popupCancel();
            }
            this.clearPopup();
        },
        closeOnClick(event) {
            if (!this.$refs.content.contains(event.target)) {
                this.clearPopup();
            }
        },
        proceed(event) {
            event.stopPropagation();
            if (typeof this.popupProceed === 'function') {
                this.popupProceed();
            }
            this.clearPopup();
        }
    }
}
</script>
