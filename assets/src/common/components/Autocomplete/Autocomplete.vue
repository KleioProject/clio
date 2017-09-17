<template>
    <div class="autocomplete-component">
        <div class="col-xs-12">
            <h2>Autocomplete</h2>
            <div class="row autocomplete-input-container">
                <input class="col-xs-12" type="text" :value="query" @input="changeQuery" placeholder="Search here" ref="inputEl" @keydown="focusSelect">
                <select class="col-xs-12 results no-pad-left no-pad-right" v-if="searchResults.length > 0" multiple="multiple" ref="selectEl" @keydown="select" @click="clickSelect">
                    <option v-for="result in searchResults" :key="result.show.id" :value="result.show.id">{{result.show.name}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data: function() {
        return {
            timeout: null,
            debounce: 300
        }
    },
    methods: {
        changeQuery(event) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.timeout = setTimeout(() => {
                this.$store.dispatch('setQuery', event.target.value);
            }, this.debounce);
        },
        focusSelect(event) {
            console.log(event.key === 'ArrowDown');
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                const sel = this.$refs.selectEl;
                sel.focus();
                sel.value = sel.firstChild.value;
            }
        },
        select(event) {
            const sel = event.target;
            const options = sel.options;
            const inp = this.$refs.inputEl;
            if (event.key === 'ArrowDown') {
                console.log(event);
                if (sel.value === options[options.length - 1].value) {
                    sel.value = options[0].value;
                }
            } else if (event.key === 'ArrowUp' && sel.value === options[0].value) {
                inp.focus();
                inp.setSelectionRange(inp.value.length, inp.value.length);
            } else if (event.key === 'Enter') {
                console.log('Selected value ', sel.value);
                inp.focus();
                inp.setSelectionRange(inp.value.length, inp.value.length);
            }
        },
        clickSelect(event) {
            console.log('Click selected: ', this.$refs.selectEl.value);
            this.$refs.inputEl.focus();
        },
        noScroll(event) {
            event.preventDefault();
        }
    },
    computed: {
        ...mapGetters(['searchResults', 'query'])
    },
}
</script>
