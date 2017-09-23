<template>
    <div class="lab-apollo-page">
        <h2>Fetching with Apollo</h2>
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
        console.log(`beforeMount method of Lab Apollo called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['faculties'])
    }
}
</script>
