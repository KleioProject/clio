<template>
    <div class="search-page">
        <h1>Search</h1>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        console.log(`asyncData static method of Search called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeMount: function() {
        console.log(`beforeMount method of Search called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
