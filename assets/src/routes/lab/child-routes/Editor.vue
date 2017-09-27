<template>
    <div class="lab-ckeditor-page">
        <h2>CKEditor</h2>
        <p v-if="!showCkOne">{{ckOne}}
            <span class="icon-edit" @click="showCkOne = true;"></span>
        </p>
        <ckeditor v-else v-model="ckOne" :editorId="'ckOne'"></ckeditor>
        <br>
        <br>
        <p v-if="!showCkTwo">{{ckTwo}}
            <span class="icon-edit" @click="showCkTwo = true;"></span>
        </p>
        <ckeditor v-else v-model="ckTwo" :editorId="'ckTwo'"></ckeditor>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import CKEditor from '../../../common/components/CKEditor/CKEditor';

export default {
    data() {
        return {
            showCkOne: false,
            showCkTwo: false
        }
    },
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
