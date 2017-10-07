<template>
    <div class="register-page">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 no-pad">
                    <div class="air"></div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 form-control">
                            <input type="text" placeholder="въведете име" v-model="regFirstName">
                            <span class="error-message" v-if="$$hasError(['register', 'regFirstName'])">{{$$getError(['register', 'regFirstName'])}}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 form-control">
                            <input type="text" placeholder="въведете фамилия" v-model="regLastName">
                            <span class="error-message" v-if="$$hasError(['register', 'regLastName'])">{{$$getError(['register', 'regLastName'])}}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 form-control">
                            <input type="password" placeholder="въведете парола" v-model="regPassword">
                            <span class="error-message" v-if="$$hasError(['register', 'passwordsAreEqual']) && !$$hasError(['register', 'regPassword'])">
                                {{$$getError(['register', 'passwordsAreEqual'])}}
                            </span>
                            <span class="error-message" v-if="$$hasError(['register', 'regPassword'])">
                                {{$$getError(['register', 'regPassword'])}}
                            </span>
                        </div>
                        <div class="col-xs-12 col-sm-6 form-control">
                            <input type="password" placeholder="повторете паролата" v-model="regPasswordRepeat">
                            <span class="error-message" v-if="$$hasError(['register', 'passwordsAreEqual']) && !$$hasError(['register', 'regPasswordRepeat'])">
                                {{$$getError(['register', 'passwordsAreEqual'])}}
                            </span>
                            <span class="error-message" v-if="$$hasError(['register', 'regPasswordRepeat'])">
                                {{$$getError(['register', 'regPasswordRepeat'])}}
                            </span>
                        </div>
                        <div class="col-xs-12 col-sm-6 form-control">
                            <input type="text" placeholder="въведете имейл" v-model="regEmail">
                            <span class="error-message" v-if="$$hasError(['register', 'regEmail'])">{{$$getError(['register', 'regEmail'])}}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 form-control">
                            <input type="text" placeholder="въведете телефон" v-model="regPhone">
                            <span class="error-message" v-if="$$hasError(['register', 'regPhone'])">{{$$getError(['register', 'regPhone'])}}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 form-control">
                            <input type="text" placeholder="въведете факултетен номер" v-model="regFacultyNumber">
                            <span class="error-message" v-if="$$hasError(['register', 'regFacultyNumber'])">{{$$getError(['register', 'regFacultyNumber'])}}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 form-control">
                            <dropdown :opts='faculties' v-model='regFaculty' :placeholder='"изберете факултет"' :markerDiameter="22"></dropdown>
                            <span class="error-message" v-if="$$hasError(['register', 'regFaculty'])">{{$$getError(['register', 'regFaculty'])}}</span>
                        </div>
                        <div class="col-xs-12 form-control">
                            <label for="regAgree">Приемам правилата за ползване на сайта</label>
                            <input id="regAgree" class="checkbox" type="checkbox" v-model="regAgree">
                            <span class="error-message" v-if="$$hasError(['register', 'regAgree'])">{{$$getError(['register', 'regAgree'])}}</span>
                        </div>
                    </div>
                    <div class="air-small"></div>
                    <div class="row button-group">
                        <div class="col-xs-12">
                            <button @click="register">Регистрация</button>
                            <router-link to="/clio/login" tag="button" class="link-item" active-class="link-active">Вход</router-link>
                        </div>
                    </div>
                    <!--      <pre>{{$$formErrors}}</pre> -->
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
        register() {
            this.$$validateAllFields.register();
            if (this.$$isValidForm('register')) {
                const payload = {
                    registration: {
                        /*  agree: this.regAgree, */
                        contactEmail: this.regEmail,
                        email: this.regEmail,
                        faculty: this.regFaculty.id,
                        facultyNumber: this.regFacultyNumber,
                        firstName: this.regFirstName,
                        lastName: this.regLastName,
                        password: this.regPassword,
                        phone: this.regPhone,
                    },
                    router: this.$router
                }
                this.$store.dispatch('register', payload);
            }
        }
    }
}
</script>
