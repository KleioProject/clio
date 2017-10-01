<template>
    <div class="register-page">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 no-pad">
                    <div class="air"></div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <input type="text" placeholder="въведете име" v-model="regFirstName">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <input type="text" placeholder="въведете фамилия" v-model="regLastName">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <input type="password" placeholder="въведете парола" v-model="regPassword">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <input type="password" placeholder="повторете паролата" v-model="regPasswordRepeat">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <input type="text" placeholder="въведете имейл" v-model="regEmail">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <input type="text" placeholder="въведете телефон" v-model="regPhone">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <input type="text" placeholder="въведете факултетен номер" v-model="regFacultyNumber">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <dropdown :opts='faculties' v-model='regFaculty' :placeholder='"изберете факултет"' :markerDiameter="22"></dropdown>
                        </div>
                        <div class="tcenter">
                            <label for="regAgree">Приемам правилата за ползване на сайта</label>
                            <input id="regAgree" class="checkbox" type="checkbox" v-model="regAgree">
                            <p v-if="$$hasError(['register', 'regAgree'])">{{$$getError(['register', 'regAgree'])}}</p>
                        </div>
                    </div>
                    <input type="text" @keyup="testArrayHandler">
                    <button @click="testArray.pop()">pop</button>
                    <div class="air-small"></div>
                    <div class="row button-group">
                        <div class="col-xs-12">
                            <button @click="register">Регистрация</button>
                            <router-link to="/clio/login" tag="button" class="link-item" active-class="link-active">Вход</router-link>
                        </div>
                    </div>
                    <pre>{{formErrors}}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Dropdown from '../../common/components/Dropdown/Dropdown';
import createRegistrationSchema from './_registration-schema';

export default {
    asyncAction: {
        action: 'fetchFaculties'
    },
    beforeMount: function() {
        console.log(`beforeMount method of Register called from ${isBrowser ? 'client' : 'server'}`);
    },
    data: function() {
        return {
            testArray: [],
            forms: createRegistrationSchema()
        }
    },
    components: {
        dropdown: Dropdown
    },
    computed: {
        ...mapGetters(['faculties', 'passwordsAreEqual']),
        regAgree: {
            get() {
                return this.$store.getters.regAgree;
            },
            set(value) {
                this.$store.dispatch('setRegAgree', value);
            }
        },
        regEmail: {
            get() {
                return this.$store.getters.regEmail;
            },
            set(value) {
                this.$store.dispatch('setRegEmail', value);
            }
        },
        regFaculty: {
            get() {
                return this.$store.getters.regFaculty;
            },
            set(value) {
                this.$store.dispatch('setRegFaculty', value);
            }
        },
        regFacultyNumber: {
            get() {
                return this.$store.getters.regFacultyNumber;
            },
            set(value) {
                this.$store.dispatch('setRegFacultyNumber', value);
            }
        },
        regFirstName: {
            get() {
                return this.$store.getters.regFirstName;
            },
            set(value) {
                this.$store.dispatch('setRegFirstName', value);
            }
        },
        regLastName: {
            get() {
                return this.$store.getters.regLastName;
            },
            set(value) {
                this.$store.dispatch('setRegLastName', value);
            }
        },
        regPassword: {
            get() {
                return this.$store.getters.regPassword;
            },
            set(value) {
                this.$store.dispatch('setRegPassword', value);
            }
        },
        regPasswordRepeat: {
            get() {
                return this.$store.getters.regPasswordRepeat;
            },
            set(value) {
                this.$store.dispatch('setRegPasswordRepeat', value);
            }
        },
        regPhone: {
            get() {
                return this.$store.getters.regPhone;
            },
            set(value) {
                this.$store.dispatch('setRegPhone', value);
            }
        }
    },
    methods: {
        testArrayHandler(event) {
            this.testArray.push(event.target.value);
        },
        register() {
            this.$$validateAllFields.register();
            if (this.$$isValidForm('register')) {
                this.$store.dispatch('register', {
                    agree: this.regAgree,
                    email: this.regEmail,
                    faculty: {
                        id: this.regFaculty.id,
                        name: this.regFaculty.label,
                        __typename: this.regFaculty.__typename
                    },
                    facultyNumber: this.regFacultyNumber,
                    firstName: this.regFirstName,
                    lastName: this.regLastName,
                    password: this.regPassword,
                    passwordRepeat: this.regPasswordRepeat,
                    phone: this.regPhone
                });
            }
        }
    }
}
</script>
