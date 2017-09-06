<template>
    <div class="search-wrapper">
        <h1>Search Route</h1>
        <hr>
        <br><br>
        <div class="row">
            <autocomplete></autocomplete>
        </div>
        <div></div>
        <h3 v-if="searchResults.length === 0">Results: {{searchResults.length}}</h3>
        <!--   <ul v-else>
                    <li v-for="result in searchResults" :key="result.show.id">{{result.show.name}}</li>
                </ul> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Autocomplete from './components/Autocomplete';

export default {
    components: {
        autocomplete: Autocomplete
    },
    methods: {
        search(query) {
            this.$store.dispatch('search', ` http://api.tvmaze.com/search/shows?q=${query}`);
        }
    },
    computed: {
        ...mapGetters(['searchResults', 'query'])
    },
    watch: {
        'query'() {
            this.search(this.query);
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch('setQuery', '');
        this.$store.commit('setSearchResults', []);
        next();
    }
}
</script>