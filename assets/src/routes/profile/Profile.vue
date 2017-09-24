<template>
    <div class="profile-page">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12">Profile</h1>
                <div class="col-xs-12">
                    <pre>{{user}}</pre>
                </div>
            </div>
        </div>
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
