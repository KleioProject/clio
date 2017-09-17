<template>
    <div class="rules-page">
        <h1>Rules</h1>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        console.log(`asyncData static method of Rules called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeMount: function() {
        console.log(`beforeMount method of Rules called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
