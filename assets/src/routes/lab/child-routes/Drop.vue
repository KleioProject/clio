<template>
    <div class="lab-apollo-page">
        <div class="container">
            <h2>Dropzone</h2>
            <div class="row">
                <div class="col-xs-4 no-pad">
                    <dropzone v-model="dropFiles" :merge="merge"></dropzone>
                </div>
                <div class="col-xs-8">
                    <ul>
                        <li v-for="file of dropFiles" :key="file.lastModified" @click="removeFile(file)">Name: {{file.name}} Size: {{file.size}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Dropzone from '../../../common/components/Dropzone/Dropzone';

export default {
    components: {
        dropzone: Dropzone
    },
    data() {
        return {
            merge: true
        }
    },
    beforeMount: function() {
        console.log(`beforeMount method of Lab Drop called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters([]),
        dropFiles: {
            get() {
                return this.$store.getters.dropFiles;
            },
            set(newValue) {
                this.$store.dispatch('setDropFiles', newValue);
            }
        }
    },
    methods: {
        removeFile(fileToRemove) {
            const filteredFiles = this.dropFiles.filter((file) => {
                return file.name !== fileToRemove.name && file.size !== fileToRemove.size && file.lastModified !== fileToRemove.lastModified;
            });
            this.$store.dispatch('setDropFiles', filteredFiles);
        }
    }
}
</script>
