<template>
    <div id="root">
        <navbar></navbar>
        <transition name="slide-routes" mode="out-in">
            <router-view></router-view>
        </transition>
        <transition name="slide-routes" mode="out-in">
            <message v-if="showMessage"></message>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from "./common/components/Navbar/Navbar";
import Message from "./common/components/Message/Message";

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`API_URL: ${process.env.API_URL}`);
console.log(`HOST: ${process.env.HOST}`);
console.log(`PORT: ${process.env.PORT}`);
console.log(`isBrowser: ${isBrowser}`);
console.log(`__hash__: ${__hash__}`);
console.log(`isSSR: ${isSSR}`);

export default {
    components: {
        navbar: Navbar,
        message: Message
    },
    asyncData({ store, route }) {
        console.log(`asyncData static method of App called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeCreate: function() {
        console.log(`beforeCreate method of App called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeMount: function() {
        console.log(`beforeMount method of App called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['showMessage'])
    },
}
</script>
