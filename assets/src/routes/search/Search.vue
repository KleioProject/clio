<template>
    <div class="search-page">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12">Search</h1>
                <router-link :to="{ path: 'search', query: { term: testTerm }}">Hani</router-link>
                <div v-infinite-scroll="treshold" ref='searchResultsContainer' class="search-results-container" @request='requestHandler'>
                    <div class="search-test-array" v-for=" f of testArray" :key="f.label + (new Date()).getTime()">{{f.label}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    asyncAction: {
        action: 'fetchFaculties'
    },
    component: {
    },
    data: function() {
        return {
            testArray: [],
            testTerm: 'hani',
            treshold: 0.8,
        }
    },
    created: function() {
        console.dir(this.$route.query);
    },
    beforeMount: function() {
        console.log(`beforeMount method of Search called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeRouteUpdate(to, from, next) {
        this.makeRequest();
        next();
    },
    computed: {
        ...mapGetters(['faculties'])
    },
    methods: {
        makeRequest() {
            if (this.testArray.length < 100) {
                this.$store.dispatch('fetchFaculties');
                this.testArray = this.testArray.concat(this.faculties);
                this.testTerm = this.testTerm.split('').reverse().join('');
                this.testHeight = this.$refs.searchResultsContainer.clientHeight;
            } else {
                console.log('>>>>>>>>>>>>>>>>>> Final page requested');
            }
        },
        requestHandler(event) {
            this.makeRequest();
        }
    }
}
</script>
