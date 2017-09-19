<template>
    <div class="profile-page">
        <h1>Profile</h1>
        <p>{{user}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    beforeMount: function() {
        console.log(`beforeMount method of Profile called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>
