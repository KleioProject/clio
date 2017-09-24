<template>
    <div class="search-page">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12">Search</h1>
            </div>
        </div>
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
