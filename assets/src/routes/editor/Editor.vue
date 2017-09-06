<template>
    <div>
        <h1>Editor</h1>
        <ckeditor v-model="content"></ckeditor>
        <h2>Content: </h2>
        {{content}}
    </div>
</template>

<script>
import CKEditor from './CKEditor';
export default {
    data() {
        return {
            content: '<strong>Hi ckeditor!<strong>'
        }
    },
    components: {
        ckeditor: CKEditor
    },
    watch: {
        'content'() {
            console.log(this.content);
        }
    }
}
</script>
