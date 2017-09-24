<template>
    <div class="register-page">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12">Register</h1>
            </div>
        </div>
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
