<template>
    <div class="dropdown-component">
        <div class="dropdown-input-container">
            <input class="dropdown-input" type="text" @input="filterOptions" :placeholder="placeholder" ref="inputEl" @keydown="browseOptions" @click="openOptions">
            <div class="dropdown-options-container" :class="{'dropdown-options-open': showOptions}">
                <div v-scroller>
                    <ul ref="customSelect" v-if="options.length > 0" @mouseleave="onSelectMouseleave()">
                        <li class="dropdown-option" @mouseenter="onMouseenter(index)" @click="onClick(index)" :class="{'selected': opt.id === selected.id}" v-for="(opt, index) in options" :key="opt.id">{{opt.label}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'opts', 'placeholder'],
    data: function() {
        return {
            filter: '',
            option: -1,
            selected: { id: null, label: '' },
            showOptions: false,
            timeout: 200
        }
    },
    beforeMount: function() {
        document.addEventListener('click', this.bodyClickHandler);
    },
    mounted() {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].id === this.value.id) {
                this.selected = this.value;
                this.option = i;
                this.$refs.inputEl.value = this.value.label;
            }
        }
    },
    beforeDestroy: function() {
        document.removeEventListener('click', this.bodyClickHandler);
    },
    computed: {
        options: function() {
            return this.opts.filter((option) => {
                return (option.label.toLowerCase()).indexOf(this.filter.toLowerCase()) > -1;
            });
        }
    },
    methods: {
        bodyClickHandler(event) {
            if (!this.$el.contains(event.target)) {
                this.showOptions = false;
                if (this.selected.id === null) {
                    this.$refs.inputEl.value = this.filter = '';
                }
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
                    if (this.options.length > 0) {
                        if (this.option === this.options.length - 1) {
                            this.option = 0;
                            sel.scrollTop = 0;
                        } else {
                            this.option++;
                        }
                        this.selected = this.options[this.option];
                        if (this.option >= this.getNumberOfOptionsToFit() && this.option < this.options.length) {
                            sel.scrollTop += sel.children[this.option].clientHeight;
                        }
                    }
                    break;
                case 38:
                    if (this.options.length > 0) {
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
                            this.selected = this.options[this.option];
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
                        this.$refs.inputEl.value = this.selected.label;
                        this.showOptions = false;
                    }
                    break;
            }
        },
        filterOptions(event) {
            this.option = -1;
            this.selected = { id: null };
            this.$emit('input', this.selected);
            this.showOptions = true;
            this.filter = event.target.value;
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
            this.$emit('input', this.options[index]);
            this.selected = this.options[index];
            this.$refs.inputEl.value = this.selected.label;
            this.showOptions = false;
        },
        onMouseenter(index) {
            this.selected = this.options[index];
            this.option = index;
        },
        onSelectMouseleave() {
            this.selected = this.value;
            let index = -1;
            for (let i = 0; i < this.options.length; i++) {
                if (this.selected.id === this.options[i].id) {
                    index = i;
                }
            }
            this.option = index;
        },
        openOptions() {
            this.showOptions = true;
        }
    }
}
</script>
