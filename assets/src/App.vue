<template>
    <div id="root">
        <navbar></navbar>
        <transition name="slide-routes" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Navbar from "./components/Navbar/Navbar";
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`API_URL: ${process.env.API_URL}`);
console.log(`HOST: ${process.env.HOST}`);
console.log(`PORT: ${process.env.PORT}`);
console.log(`isBrowser: ${isBrowser}`);
console.log(`__hash__: ${__hash__}`);
console.log(`isSSR: ${isSSR}`);

export default {
    components: {
        navbar: Navbar
    }
}
</script>
