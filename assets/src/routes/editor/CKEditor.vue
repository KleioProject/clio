<template>
    <div class="ckeditor-wrapper">
        <textarea id="ckeditor">Loading editor...</textarea>
    </div>
</template>

<script>
export default {
    props: ['value'],
    mounted() {
        const body = document.getElementsByTagName('body')[0];
        const script = document.createElement('script');
        script.src = 'public/ckeditor/ckeditor.js';
        script.onload = () => {
            CKEDITOR.replace('ckeditor');
            CKEDITOR.instances.ckeditor.setData(this.value);
            CKEDITOR.instances.ckeditor.on('change', (event) => {
                this.$emit('input', event.editor.getData());
            });
        }
        body.appendChild(script);
    }
}
</script>
