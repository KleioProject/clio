<template>
    <div class="autocomplete-component">
        <div class="autocomplete-input-container">
            <input class="autocomplete-input" type="text" @input="emitQuery" :placeholder="placeholder" ref="inputEl" @keydown="browseOptions">
            <ul class="autocomplete-results-container" @scroll="onScroll" ref="customSelect" v-if="results.length > 0" @mouseleave="onSelectMouseleave()">
                <li class="autocomplete-option" @mouseenter="onMouseenter(index)" @mouseleave="onMouseleave()" @click="onClick(index)" :class="{'selected': result.id === selected.id}" v-for="(result, index) in results" :key="result.id">{{result.label}}</li>
            </ul>
            <div class="scroller" v-if="results.length > 0">
                <div class="marker-container">
                    <div class="marker" ref="marker" draggable="draggable" @dragstart="onMarkerDragstart" @drag="onMarkerDrag" @dragend="onMarkerDragend"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'results', 'placeholder', 'markerDiameter'],
    data: function() {
        return {
            drag: {
                startY: null,
                pauseOnScroll: false
            },
            option: -1,
            selected: { id: null, label: '' },
            timeout: 200
        }
    },
    beforeMount: function() {
        document.addEventListener('click', this.bodyClickHandler);
    },
    beforeDestroy: function() {
        document.removeEventListener('click', this.bodyClickHandler);
    },
    methods: {
        bodyClickHandler(event) {
            if (!this.$el.contains(event.target)) {
                this.reset();
            }
        },
        browseOptions() {
            switch (event.key) {
                case 'ArrowDown':
                    if (this.option === -1) {
                        this.$refs.customSelect.scrollTop = 0;
                    }
                    if (this.results.length > 0) {
                        if (this.option === this.results.length - 1) {
                            this.option = 0;
                            this.$refs.customSelect.scrollTop = 0;
                        } else {
                            this.option++;
                        }
                        this.selected = this.results[this.option];
                        if (this.option >= this.getNumberOfOptionsToFit() && this.option < this.results.length) {
                            this.$refs.customSelect.scrollTop += this.$refs.customSelect.children[this.option].clientHeight;
                        }
                        this.setMarker();
                    }
                    break;
                case 'ArrowUp':
                    if (this.results.length > 0) {
                        if (this.option === 0) {
                            this.option = -1;
                            this.selected = { id: null };
                            if (this.$refs.inputEl.setSelectionRange && isBrowser) {
                                const length = this.$refs.inputEl.value.length * 2;
                                // Timeout seems to be required for Blink
                                setTimeout(() => {
                                    this.$refs.inputEl.setSelectionRange(length, length);
                                }, 1);
                            } else {
                                // As a fallback, replace the contents with itself
                                // Doesn't work in Chrome, but Chrome supports setSelectionRange
                                this.$refs.inputEl.value = this.$refs.inputEl.value;
                            }
                        } else if (this.option > 0) {
                            this.option--;
                            this.selected = this.results[this.option];
                        }
                        if (this.option > this.getNumberOfOptionsToFit()) {
                            this.$refs.customSelect.scrollTop -= this.$refs.customSelect.children[this.option].clientHeight;
                        } else {
                            this.$refs.customSelect.scrollTop = 0;
                        }
                        this.setMarker();
                    }
                    break;
                case 'Enter':
                    if (this.option > -1) {
                        this.$emit('input', this.selected);
                        this.reset();
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
            let optionsToFit = 0;
            let sumOfChildrenHeights = 0;
            for (let i = 0; i < this.$refs.customSelect.children.length; i++) {
                if (sumOfChildrenHeights + this.$refs.customSelect.children[i].clientHeight < 100) {
                    sumOfChildrenHeights += this.$refs.customSelect.children[i].clientHeight;
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
        },
        onMarkerDrag(event) {
            const delta = this.drag.startY - event.clientY;
            if (delta !== 0) {
                this.drag.startY = event.clientY;
                if (delta < this.markerDiameter && delta > -this.markerDiameter) {
                    if ((parseInt(this.$refs.marker.style.top) + this.markerDiameter - delta) <= this.$refs.customSelect.clientHeight && (parseInt(this.$refs.marker.style.top) - delta) >= 0) {
                        this.$refs.marker.style.top = (parseInt(this.$refs.marker.style.top) - delta) + 'px';
                    } else if (delta < 0) {
                        this.$refs.marker.style.top = (this.$refs.customSelect.clientHeight - this.markerDiameter) + 'px';
                    } else if (delta > 0) {
                        this.$refs.marker.style.top = 0 + 'px';
                    }
                    this.setScrollTop(delta);
                }
            }
        },
        onMarkerDragend(event) {
            this.drag.pauseOnScroll = false;
        },
        onMarkerDragstart(event) {
            const ghost = this.$refs.marker.cloneNode(true);
            ghost.style.display = 'none';
            document.body.appendChild(ghost);
            event.dataTransfer.setDragImage(ghost, 0, 0);
            this.drag.startY = event.clientY;
            this.drag.pauseOnScroll = true;
        },
        onMouseenter(index) {
            this.selected = this.results[index];
            this.option = index;
            this.setMarker();
        },
        onMouseleave() {
            this.selected = { id: null };
            this.option = -1;
            this.setMarker();
        },
        onSelectMouseleave() {
            this.selected = { id: null };
            this.option = -1;
        },
        onScroll(event) {
            if (!this.drag.pauseOnScroll) {
                this.setMarker();
            }
        },
        reset() {
            this.$store.dispatch('setAcResults', []);
            this.$refs.inputEl.value = '';
            this.option = -1;
            this.selected = { id: null };
        },
        setMarker() {
            const offset = (this.$refs.customSelect.scrollTop / (this.$refs.customSelect.scrollHeight - this.$refs.customSelect.clientHeight)) * (this.$refs.customSelect.clientHeight - this.markerDiameter);
            this.$refs.marker.style.top = `${offset}px`;
        },
        setScrollTop(delta) {
            const offset = Math.floor(((parseInt(this.$refs.marker.style.top) + (delta >= 0 && parseInt(this.$refs.marker.style.top) === 0 ? 0 : this.markerDiameter)) / this.$refs.customSelect.clientHeight) * (this.$refs.customSelect.scrollHeight - this.$refs.customSelect.clientHeight));
            this.$refs.customSelect.scrollTop = offset;
        }
    }
}
</script>
