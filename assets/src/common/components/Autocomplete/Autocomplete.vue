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
        browseOptions(event) {
            const sel = this.$refs.customSelect;
            const input = this.$refs.inputEl;
            switch (event.key) {
                case 'ArrowDown':
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
                        this.setMarker();
                    }
                    break;
                case 'ArrowUp':
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
        },
        onMarkerDrag(event) {
            const sel = this.$refs.customSelect;
            const marker = this.$refs.marker;
            const delta = this.drag.startY - event.clientY;
            if (delta !== 0) {
                this.drag.startY = event.clientY;
                if (delta < this.markerDiameter && delta > -this.markerDiameter) {
                    if ((parseInt(marker.style.top) + this.markerDiameter - delta) <= sel.clientHeight && (parseInt(marker.style.top) - delta) >= 0) {
                        marker.style.top = (parseInt(marker.style.top) - delta) + 'px';
                    } else if (delta < 0) {
                        marker.style.top = (sel.clientHeight - this.markerDiameter) + 'px';
                    } else if (delta > 0) {
                        marker.style.top = 0 + 'px';
                    }
                    this.setScrollTop(delta);
                }
            }
        },
        onMarkerDragend(event) {
            this.drag.pauseOnScroll = false;
        },
        onMarkerDragstart(event) {
            if (isBrowser) {
                if (typeof event.dataTransfer.setDragImage === 'function') {
                    const ghost = this.$refs.marker.cloneNode(true);
                    ghost.style.display = 'none';
                    document.body.appendChild(ghost);
                    event.dataTransfer.setDragImage(ghost, 0, 0);
                    this.drag.startY = event.clientY;
                    this.drag.pauseOnScroll = true;
                }
            }
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
            this.$emit('reset');
            this.$refs.inputEl.value = '';
            this.option = -1;
            this.selected = { id: null };
        },
        setMarker() {
            const sel = this.$refs.customSelect;
            const offset = (sel.scrollTop / (sel.scrollHeight - sel.clientHeight)) * (sel.clientHeight - this.markerDiameter);
            this.$refs.marker.style.top = `${offset}px`;
        },
        setScrollTop(delta) {
            const sel = this.$refs.customSelect;
            const marker = this.$refs.marker;
            const offset = Math.floor(((parseInt(marker.style.top) + (delta >= 0 && parseInt(marker.style.top) === 0 ? 0 : this.markerDiameter)) / sel.clientHeight) * (sel.scrollHeight - sel.clientHeight));
            sel.scrollTop = offset;
        }
    }
}
</script>
