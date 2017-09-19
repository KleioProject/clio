<template>
    <div class="register-page">
        <h1>Register</h1>
        <p>{{faculties}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    asyncAction: {
        action: 'fetchFaculties'
    },
    beforeMount: function() {
        console.log(`beforeMount method of Register called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['faculties'])
    }
}
</script>
