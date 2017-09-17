<template>
    <div class="contacts-page">
        <h1>Contacts</h1>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        console.log(`asyncData static method of Contacts called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeMount: function() {
        console.log(`beforeMount method of Contacts called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
