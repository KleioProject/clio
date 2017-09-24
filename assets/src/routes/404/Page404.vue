<template>
    <div class="not-found-page">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12">404</h1>
            </div>
        </div>
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
