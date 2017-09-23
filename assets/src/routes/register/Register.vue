<template>
    <div class="register-page">
        <h1>Register</h1>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    beforeMount: function() {
        console.log(`beforeMount method of Register called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
