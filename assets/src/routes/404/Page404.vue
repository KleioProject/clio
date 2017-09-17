<template>
    <div class="not-found-page">
        <h1>404</h1>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        console.log(`asyncData static method of 404 called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeMount: function() {
        console.log(`beforeMount method of 404 called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
