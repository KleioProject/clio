<template>
    <div class="ckeditor-component">
        <textarea :id="editorId">Loading editor...</textarea>
    </div>
</template>

<script>
export default {
    props: ['value', 'editorId'],
    data() {
        return {
            editor: null
        }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.editor.removeEventListener('load', this.attachEditor);
    },
    methods: {
        init() {
            this.editor = document.getElementById('ckeditor');
            if (!this.editor) {
                const body = document.getElementsByTagName('body')[0];
                const script = document.createElement('script');
                script.src = '/public/ckeditor/ckeditor.js';
                script.id = 'ckeditor';
                script.addEventListener('load', this.attachEditor);
                body.appendChild(script);
            } else {
                if (window.CKEDITOR) {
                    this.attachEditor();
                } else {
                    this.editor.addEventListener('load', this.attachEditor);
                }
            }
        },
        attachEditor() {
            if (!this.editor) {
                this.editor = document.getElementById('ckeditor');
            }
            CKEDITOR.replace(this.editorId);
            CKEDITOR.instances[this.editorId].setData(this.value);
            CKEDITOR.instances[this.editorId].on('change', (event) => {
                this.$emit('input', event.editor.getData());
            });
        }
    }
}
</script>
