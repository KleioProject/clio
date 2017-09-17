<template>
    <div class="home-page">
        <h1>Home</h1>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        console.log(`asyncData static method of Home called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeMount: function() {
        console.log(`beforeMount method of Home called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
