<template>
    <label for="drop-input" class="dropzone-component" :class="{'drag-over': isDragover}" @dragover="dragoverHandler" @dragleave="dragleaveHandler" @drop="dropHandler">
        <span class="drop-zone-text">Drop files here or click to select from disk</span>
        <input type="file" multiple id="drop-input" class="drop-input" @change="changeHandler">
    </label>
</template>

<script>
export default {
    data() {
        return {
            isDragover: false
        }
    },
    props: ['value', 'merge'],
    beforeMount: function() {
        console.log(`beforeMount method of Dropzone called from ${isBrowser ? 'client' : 'server'}`);
    },
    methods: {
        changeHandler(event) {
            const files = Array.from(event.target.files);
            console.log(files);
            if (this.merge) {
                this.$emit('input', this.mergeFileArrays(this.value, files));
            } else {
                this.$emit('input', files);
            }
            event.target.value = '';
        },
        mergeFileArrays(arrayOne, arrayTwo) {
            const newArray = [].concat(arrayOne);
            for (let i = 0; i < arrayTwo.length; i++) {
                let hasIt = false;
                for (let j = 0; j < arrayOne.length; j++) {
                    if (arrayTwo[i].lastModified === arrayOne[j].lastModified && arrayTwo[i].name === arrayOne[j].name && arrayTwo[i].size === arrayOne[j].size) {
                        hasIt = true;
                        break;
                    }
                }
                if (!hasIt) {
                    newArray.push(arrayTwo[i]);
                }
            }
            return newArray;
        },
        dragleaveHandler(event) {
            event.preventDefault();
            this.isDragover = false;
        },
        dragoverHandler(event) {
            event.preventDefault();
            this.isDragover = true;
        },
        dropHandler(event) {
            event.preventDefault();
            this.isDragover = false;
            const files = Array.from(event.dataTransfer.files);
            event.dataTransfer.clearData();
            if (this.merge) {
                this.$emit('input', this.mergeFileArrays(this.value, files));
            } else {
                this.$emit('input', files);
            }
        }
    }
}
</script>
