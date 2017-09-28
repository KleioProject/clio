<template>
    <div class="login-page">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 no-pad">
                    <div class="air"></div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <input type="text" placeholder="въведете имейл" v-model="email">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <input type="text" placeholder="въведете парола" v-model="password">
                        </div>
                    </div>
                    <div class="air-small"></div>
                    <div class="row button-group">
                        <div class="col-xs-12">
                            <button @click="login">Вход</button>
                            <router-link to="/clio/register" tag="button" class="link-item" active-class="link-active">Регистрация</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                password: this.password,
                router: this.$router
            });
            this.$store.dispatch('setEmail', '');
            this.$store.dispatch('setPassword', '');
        }
    }
}
</script>
