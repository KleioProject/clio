<template>
    <div class="login-page">
        <h1>Login</h1>
        <input type="text" placeholder="email" v-model="email">
        <input type="text" placeholder="password" v-model="password">
        <button @click="login">Login</button>
        <button @click="getFaculties">Get faculties</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    beforeMount: function() {
        console.log(`beforeMount method of Login called from ${isBrowser ? 'client' : 'server'}`);
    },
    computed: {
        email: {
            get() {
                return this.$store.getters.email;
            },
            set(value) {
                this.$store.dispatch('setEmail', value);
            }
        },
        password: {
            get() {
                return this.$store.getters.password;
            },
            set(value) {
                this.$store.dispatch('setPassword', value);
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            });
            this.$store.dispatch('setEmail', '');
            this.$store.dispatch('setPassword', '');
        },
        getFaculties() {
            this.$store.dispatch('fetchFaculties');
        }
    }
}
</script>
