<template>
    <ul class="header-wrapper">
        <router-link to="/" tag="li" class="link-item" active-class="link-active" exact>
            <a>Home</a>
        </router-link>
        <router-link to="/play/10" tag="li" class="link-item" active-class="link-active">
            <a>Playground - id = 10</a>
        </router-link>
        <router-link to="/play/5" tag="li" class="link-item" active-class="link-active">
            <a>Playground - id = 5</a>
        </router-link>
        <router-link :to="{name: 'playgroundDetails', params: {id: 1}, query: {lang: 'en'}, hash: '#scroll-to-me'}" tag="li" class="link-item" active-class="link-active">
            <a>Playground - id = 1 / details</a>
        </router-link>
        <router-link to="/animations" tag="li" class="link-item" active-class="link-active">
            <a>Animations</a>
        </router-link>
        <router-link to="/search" tag="li" class="link-item" active-class="link-active">
            <a>Search</a>
        </router-link>
        <router-link to="/editor" tag="li" class="link-item" active-class="link-active">
            <a>Editor</a>
        </router-link>
    </ul>
</template>
