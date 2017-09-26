<template>
    <div id="root">
        <navbar></navbar>
        <transition name="slide-routes" mode="out-in">
            <router-view></router-view>
        </transition>
        <transition name="slide-routes" mode="out-in">
            <popup v-if="showPopup"></popup>
        </transition>
        <transition name="message" mode="in-out">
            <messages v-if="messages.length > 0"></messages>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from "./common/components/Navbar/Navbar";
import Popup from "./common/components/Popup/Popup";
import Messages from "./common/components/Messages/Messages"

/* console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`API_URL: ${process.env.API_URL}`);
console.log(`HOST: ${process.env.HOST}`);
console.log(`PORT: ${process.env.PORT}`);
console.log(`isBrowser: ${isBrowser}`);
console.log(`__hash__: ${__hash__}`);
console.log(`isSSR: ${isSSR}`); */

export default {
    components: {
        messages: Messages,
        navbar: Navbar,
        popup: Popup
    },
    beforeCreate: function() {
        //  console.log(`beforeCreate method of App called from ${isBrowser ? 'client' : 'server'}`);
    },
    beforeMount: function() {
        // console.log(`beforeMount method of App called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        ...mapGetters(['showPopup', 'messages'])
    },
}
</script>
