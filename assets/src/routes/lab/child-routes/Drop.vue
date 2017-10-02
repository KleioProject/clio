<template>
    <div class="lab-apollo-page">
        <div class="container">
            <h2>Dropzone</h2>
            <div class="row">
                <div class="col-xs-12 col-md-4">
                    <dropzone v-model="dropFiles" :merge="merge"></dropzone>
                </div>
                <div class="col-xs-12 col-md-8">
                    <ul>
                        <li v-for="file of dropFiles" :key="file.lastModified">Name: {{file.name}} Size: {{file.size}}
                            <span class="icon-cancel" @click="removeFile(file)"></span>
                        </li>
                    </ul>
                </div>
                <div class="col-xs-12 col-md-8">
                    <container :content="dummyContent" @remove="removeContent"></container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Container from '../../../common/components/Container/Container';
import Dropzone from '../../../common/components/Dropzone/Dropzone';

export default {
    components: {
        container: Container,
        dropzone: Dropzone
    },
    data() {
        return {
            dummyContent: [
                {
                    id: 123,
                    label: 'Ivan Ivanov FN1234543SD'
                },
                {
                    id: 1243,
                    label: 'Gergana Petrova FN134533SD'
                },
                {
                    id: 19923,
                    label: 'Sonia Vladimirova Petrova FN33453hSD'
                },
                {
                    id: 12223,
                    label: 'Габриела Борисова FN1234543SD'
                },
                {
                    id: 124543,
                    label: 'Михаил Огнянов FN114533SD'
                },
                {
                    id: 199323,
                    label: 'Валери Попов FN33457SD'
                }
            ],
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
        },
        removeContent(data) {
            this.dummyContent.splice(data.index, 1);
        }
    }
}
</script>
