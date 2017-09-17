<template>
    <div class="profile-page">
        <h1>Profile</h1>
        <p>{{user.email}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    asyncAction: {
        action: 'fetchUser',
        router: true,
        payload: {
            id: 3
        }
    },
    beforeMount: function() {
        console.log(`beforeMount method of Profile called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>
