<template>
    <div class="lab-ckeditor-page">
        <h2>CKEditor</h2>
        <ckeditor v-model="ckOne" :editorId="'ckOne'"></ckeditor>
        <hr>
        <ckeditor v-model="ckTwo" :editorId="'ckTwo'"></ckeditor>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import CKEditor from '../../../common/components/CKEditor/CKEditor';

export default {
    components: {
        ckeditor: CKEditor
    },
    beforeMount: function() {
        console.log(`beforeMount method of Lab CKEditor called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters([]),
        ckOne: {
            get() {
                return this.$store.getters.ckOne;
            },
            set(newValue) {
                this.$store.dispatch('setCkOne', newValue);
            }
        },
        ckTwo: {
            get() {
                return this.$store.getters.ckTwo;
            },
            set(newValue) {
                console.log('Settin CK Two');
                this.$store.dispatch('setCkTwo', newValue);
            }
        }
    }
}
</script>
