<template>
    <div class="project-page">
        <h1>Project</h1>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        console.log(`asyncData static method of Project called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeMount: function() {
        console.log(`beforeMount method of Project called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
