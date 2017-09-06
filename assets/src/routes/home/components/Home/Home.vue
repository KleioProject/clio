<template>
    <div>
        <h1>Home Route</h1>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        return store.dispatch('fetchUser', 3);
    },
    beforeMount: function() {
        this.$store.dispatch('fetchUser', 3);
    }
}
</script>
