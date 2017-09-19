<template>
    <div class="guide-page">
        <h1>Guide</h1>
    </div>
</template>

<script>
export default {
   /*  asyncAction: {
        action: 'fetchUser',
        router: true,
        payload: {
            id: 3
        }
    }, */
    beforeMount: function() {
        console.log(`beforeMount method of Guide called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
