<template>
    <div class="lab-autoc-page">
        <h2>Autocomplete</h2>
        <autocomplete :results='acFilteredResults' v-model='acSelected' @query='doQuery' :placeholder='"Търси тук"' @clearQuery="clearQuery" :markerDiameter="markerDiameter"></autocomplete>
        <p v-if="acSelected">{{acSelected.label}}
            <span @click="removeSelected">X</span>
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Autocomplete from '../../../common/components/Autocomplete/Autocomplete';

export default {
    components: {
        autocomplete: Autocomplete
    },
    beforeMount: function() {
        console.log(`beforeMount method of Lab AutoC called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['acResults', 'acSelected', 'acFilteredResults', 'markerDiameter']),
        acSelected: {
            get() {
                return this.$store.getters.acSelected;
            },
            set(newValue) {
                this.$store.dispatch('setAcSelected', newValue);
            }
        }
    },
    methods: {
        clearQuery() {
            this.$store.dispatch('setAcResults', []);
        },
        doQuery(value) {
            this.$store.dispatch('doAcQuery', value);
        },
        removeSelected() {
            this.$store.dispatch('setAcSelected', null);
        }
    }
}
</script>
