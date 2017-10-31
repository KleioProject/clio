<template>
    <div class="search-page">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12">Search</h1>
                <router-link :to="{ path: 'search', query: { page: page }}">Page</router-link>
                <div v-infinite-scroll="{treshold: treshold, containerId: 'main-content-wrapper'}" ref='searchResultsContainer' class="search-results-container" @request='requestHandler'>
                    <div :id="index + '-' + (new Date()).getTime()" class="search-test-array" v-for=" (f, index) of testArray" :key="f.label + (new Date()).getTime()">{{f.label}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  asyncAction: {
    action: "fetchFaculties"
  },
  component: {},
  data: function() {
    return {
      testArray: [],
      page: 0,
      treshold: 1,
      scrollTop: 0,
      elementsToDelete: 16,
      direction: -1
    };
  },
  created: function() {
    console.dir(this.$route.query);
  },
  beforeMount: function() {
    console.log(
      `beforeMount method of Search called from ${isBrowser
        ? "client"
        : "server"}`
    );
  },
  beforeRouteUpdate(to, from, next) {
    this.makeRequest();
    next();
  },
  computed: {
    ...mapGetters(["faculties"])
  },
  methods: {
    makeRequest() {
      if (this.page < 10) {
        this.$store.dispatch("fetchFaculties");
        this.testArray = this.testArray.concat(this.faculties);
        this.page++;

        const mainContainer = document.getElementById("main-content-wrapper");
        const results = this.$refs.searchResultsContainer;

        if (this.direction < 0) {
          this.setScrollOnScrollingDown(
            mainContainer,
            results,
            this.elementsToDelete,
            this.testArray,
            2
          );
        } else if (this.direction > 0) {
        }
      } else {
        console.log(">>>>>>>>>>>>>>>>>> Final page requested");
      }
    },
    requestHandler(event) {
     console.log(`>>>>>>>>>>> Scroll direction: ${event.scrollDirection}`);
      this.direction = event.scrollDirection;
      this.$router.push({ path: "search", query: { page: this.page } });
    },
    setScrollOnScrollingDown(
      containerEl,
      resultsEl,
      elsToDelete,
      results,
      factor
    ) {
      const scrollTop = containerEl.scrollTop;
      if (results.length > factor * elsToDelete) {
        let i = resultsEl.children.length - 1;
        const length = i - elsToDelete;
        let scr = 0;
        let mar = 0;
        for (i; i > length; i--) {
          scr += resultsEl.children[i].clientHeight;
          mar += parseInt(getComputedStyle(resultsEl.children[i]).marginBottom);
        }
        containerEl.scrollTop = scrollTop - scr - mar;
        results.splice(0, elsToDelete);
      }
    },
    setScrollOnScrollingUp(
      containerEl,
      resultsEl,
      elsToDelete,
      results,
      factor
    ) {
      const scrollBottom = containerEl.scrollBottom;
      if (results.length > factor * elsToDelete) {
        let i = resultsEl.children.length - 1;
        const length = i - elsToDelete;
        let scr = 0;
        let mar = 0;
        for (i; i > length; i--) {
          scr += resultsEl.children[i].clientHeight;
          mar += parseInt(getComputedStyle(resultsEl.children[i]).marginBottom);
        }
        containerEl.scrollTop = scrollBottom - scr - mar;
        results.splice(results.length - elsToDelete - 1, elsToDelete);
      }
    }
  }
};
</script>
