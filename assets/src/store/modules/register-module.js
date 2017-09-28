import Vue from 'vue';

export default () => {
    return {
        state: {
            regAgree: false,
            regEmail: '',
            regFaculty: { id: null },
            regFacultyNumber: '',
            regFacultyQuery: '',
            regFirstName: '',
            regLastName: '',
            regPassword: '',
            regPasswordRepeat: '',
            regPhone: ''
        },
        getters: {
            passwordsAreEqual( state ) {
                return state.regPassword === state.regPasswordRepeat;
            },
            regAgree( state ) {
                return state.regAgree;
            },
            regEmail( state ) {
                return state.regEmail;
            },
            regFaculty( state ) {
                return state.regFaculty;
            },
            regFacultyNumber( state ) {
                return state.regFacultyNumber;
            },
            regFacultyQuery( state ) {
                return state.regFacultyQuery;
            },
            regFirstName( state ) {
                return state.regFirstName;
            },
            regLastName( state ) {
                return state.regLastName;
            },
            regPassword( state ) {
                return state.regPassword;
            },
            regPasswordRepeat( state ) {
                return state.regPasswordRepeat;
            },
            regPhone( state ) {
                return state.regPhone;
            }
        },
        mutations: {
            setRegAgree( state, regAgree ) {
                state.regAgree = regAgree;
            },
            setRegEmail( state, regEmail ) {
                state.regEmail = regEmail;
            },
            setRegFaculty( state, regFaculty ) {
                state.regFaculty = regFaculty;
            },
            setRegFacultyNumber( state, regFacultyNumber ) {
                state.regFacultyNumber = regFacultyNumber;
            },
            setRegFacultyQuery( state, regFacultyQuery ) {
                state.regFacultyQuery = regFacultyQuery;
            },
            setRegFirstName( state, regFirstName ) {
                state.regFirstName = regFirstName;
            },
            setRegLastName( state, regLastName ) {
                state.regLastName = regLastName;
            },
            setRegPassword( state, regPassword ) {
                state.regPassword = regPassword;
            },
            setRegPasswordRepeat( state, regPasswordRepeat ) {
                state.regPasswordRepeat = regPasswordRepeat;
            },
            setRegPhone( state, regPhone ) {
                state.regPhone = regPhone;
            }
        },
        actions: {
            register( { commit }, payload ) {
                console.log( payload );
            },
            setRegAgree( { commit }, regAgree ) {
                commit( 'setRegAgree', regAgree );
            },
            setRegEmail( { commit }, regEmail ) {
                commit( 'setRegEmail', regEmail );
            },
            setRegFaculty( { commit }, regFaculty ) {
                commit( 'setRegFaculty', regFaculty );
            },
            setRegFacultyNumber( { commit }, regFacultyNumber ) {
                commit( 'setRegFacultyNumber', regFacultyNumber );
            },
            setRegFacultyQuery( { commit }, regFacultyQuery ) {
                commit( 'setRegFacultyQuery', regFacultyQuery );
            },
            setRegFirstName( { commit }, regFirstName ) {
                commit( 'setRegFirstName', regFirstName );
            },
            setRegLastName( { commit }, regLastName ) {
                commit( 'setRegLastName', regLastName );
            },
            setRegPassword( { commit }, regPassword ) {
                commit( 'setRegPassword', regPassword );
            },
            setRegPasswordRepeat( { commit }, regPasswordRepeat ) {
                commit( 'setRegPasswordRepeat', regPasswordRepeat );
            },
            setRegPhone( { commit }, regPhone ) {
                commit( 'setRegPhone', regPhone );
            }
        }
    };
};


