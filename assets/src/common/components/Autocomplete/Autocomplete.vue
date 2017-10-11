<template>
    <div class="autocomplete-component">
        <div class="autocomplete-input-container">
            <input class="autocomplete-input" type="text" @input="emitQuery" :placeholder="placeholder" ref="inputEl" @keydown="browseOptions">
            <div class="autocomplete-results-container" :class="{'autocomplete-results-open': showResults}">
                <div v-scroller>
                    <ul ref="customSelect" @mouseleave="onSelectMouseleave()">
                        <li class="autocomplete-option" @mouseenter="onMouseenter(index)" @mouseleave="onMouseleave()" @click="onClick(index)" :class="{'selected': result.id === selected.id}" v-for="(result, index) in results" :key="result.id">{{result.label}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'results', 'placeholder'],
    data: function() {
        return {
            option: -1,
            selected: { id: null, label: '' },
            showResults: false,
            timeout: 200
        }
    },
    beforeMount: function() {
        document.addEventListener('click', this.bodyClickHandler);
    },
    beforeDestroy: function() {
        document.removeEventListener('click', this.bodyClickHandler);
    },
    watch: {
        'results'(){
            if(this.results.length > 0) {
                this.showResults = true;
            }
        }
    },
    methods: {
        bodyClickHandler(event) {
            if (!this.$el.contains(event.target)) {
                this.reset();
            }
        },
        browseOptions(event) {
            const sel = this.$refs.customSelect;
            const input = this.$refs.inputEl;
            switch (event.keyCode) {
                case 40:
                    if (this.option === -1) {
                        sel.scrollTop = 0;
                    }
                    if (this.results.length > 0) {
                        if (this.option === this.results.length - 1) {
                            this.option = 0;
                            sel.scrollTop = 0;
                        } else {
                            this.option++;
                        }
                        this.selected = this.results[this.option];
                        if (this.option >= this.getNumberOfOptionsToFit() && this.option < this.results.length) {
                            sel.scrollTop += sel.children[this.option].clientHeight;
                        }
                    }
                    break;
                case 38:
                    if (this.results.length > 0) {
                        if (this.option === 0) {
                            this.option = -1;
                            this.selected = { id: null };
                            if (input.setSelectionRange && isBrowser) {
                                const length = input.value.length * 2;
                                // Timeout seems to be required for Blink
                                setTimeout(() => {
                                    input.setSelectionRange(length, length);
                                }, 1);
                            } else {
                                // As a fallback, replace the contents with itself
                                // Doesn't work in Chrome, but Chrome supports setSelectionRange
                                input.value = input.value;
                            }
                        } else if (this.option > 0) {
                            this.option--;
                            this.selected = this.results[this.option];
                        }
                        if (this.option > this.getNumberOfOptionsToFit()) {
                            sel.scrollTop -= sel.children[this.option].clientHeight;
                        } else {
                            sel.scrollTop = 0;
                        }
                    }
                    break;
                case 13:
                    if (this.option > -1) {
                        this.$emit('input', this.selected);
                        this.reset();
                        this.showResults = false;
                    }
                    break;
            }
        },
        emitQuery(event) {
            if (event.target.value === '') {
                this.reset();
            } else {
                this.$emit('query', event.target.value);
            }
        },
        getNumberOfOptionsToFit() {
            const sel = this.$refs.customSelect;
            let optionsToFit = 0;
            let sumOfChildrenHeights = 0;
            for (let i = 0; i < sel.children.length; i++) {
                if (sumOfChildrenHeights + sel.children[i].clientHeight < 100) {
                    sumOfChildrenHeights += sel.children[i].clientHeight;
                    optionsToFit++;
                } else {
                    break;
                }
            }
            return optionsToFit;
        },
        onClick(index) {
            this.$emit('input', this.results[index]);
            this.reset();
            this.showResults = false;
        },
        onMouseenter(index) {
            this.selected = this.results[index];
            this.option = index;
        },
        onMouseleave() {
            this.selected = { id: null };
            this.option = -1;
        },
        onSelectMouseleave() {
            this.selected = { id: null };
            this.option = -1;
        },
        reset() {
            this.$emit('reset');
            this.$refs.inputEl.value = '';
            this.option = -1;
            this.selected = { id: null };
            this.showResults = false;
        }
    }
}
</script>
