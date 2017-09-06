<template>
    <div class="playground">
        <router-view></router-view>
        <p>Route param: {{$route.params.id}}</p>
        <button @click="goHome">Go Home</button>
        <button :class="greeting" v-on:click="changeTitle">Change</button>
        <img src="../../../assets/cat.jpg">
        <input type="text" v-on:input="inputGreeting">
        <p v-cloak>{{greeting | uppercase}}</p>
        <h2 v-cloak v-if="counter > 8">Couter: {{counter}}</h2>
        <h2 v-else>Counter is less or equal to 8</h2>
        <h2 v-cloak>Clicks: {{clicks}} </h2>
        <button v-on:click="increment">Increment</button>
        <ul>
            <li v-for="(person, index) in persons" :key="index">{{index + 1}} - name: {{person.name}} / age: {{person.age}}</li>
        </ul>
        <p>Mature persons:</p>
        <ul>
            <li v-for="(person, index) in maturePersons" :key="index">{{index + 1}} - name: {{person.name}} / age: {{person.age}}</li>
        </ul>
        <button @click="addUser(40)">Add User</button>
        <p>In parent: {{message}}</p>
        <child></child>
        <p>Mature persons:</p>
        <ul>
            <li v-for="(post, index) in posts" :key="index">Post NUMBER {{index + 1}}</li>
        </ul>
    </div>
</template>

<script>
import Child from './components/Child/Child';
import { mapGetters } from 'vuex';

export default {
    asyncData({ store, route }) {
        return store.dispatch('getPosts', 'https://jsonplaceholder.typicode.com/posts');
    },
    data: function () {
        return {}
    },
    components: {
        child: Child
    },
    beforeMount: function () {
       // console.log('Playground before mount isSSR: ', isSSR);
        if (isSSR) {
          //  console.log('Playground before mount __hash__: ', __hash__);
        } else {
           // console.log('Uses the webpack hash');
        }
       // console.dir(window.__INITIAL_STATE__);
        if (!isSSR || (!window.__INITIAL_STATE__ || this.posts.length === 0)) {
            this.$store.dispatch('getPosts', 'https://jsonplaceholder.typicode.com/posts');
        }
    },
    methods: {
        changeTitle() {
            this.$store.commit({
                type: 'changeGreeting',
                value: 'Lalala'
            });
        },
        inputGreeting(event) {
            this.$store.commit({
                type: 'changeGreeting',
                value: event.target.value
            });
        },
        increment() {
            this.$store.commit({
                type: 'increment',
                amount: 1
            });
        },
        goHome() {
            this.$router.push('/'); //can pass {path: '/', name: 'home'}
        },
        addUser(age) {
            this.$store.dispatch({
                type: 'addUser',
                age: age
            });
        }
    },
    computed: {
        counter() {
            return this.clicks * 2;
        },
        ...mapGetters(['persons', 'personId', 'clicks', 'greeting', 'message', 'maturePersons', 'posts'])
    },
    watch: {
        '$route'(to, from) {
           // console.dir(to);
           // console.dir(from);
        },
        'posts'() {
          //  console.log('Posts fetched');
        }
    }
}
</script>

