<template>
    <div class="lab-page">
        <h1>Welcome to The Lab</h1>
        <ul class="navbar-component">
            <router-link to="/clio/lab/apollo" tag="li" class="link-item" active-class="link-active">
                <a>Аполло</a>
            </router-link>
            <router-link to="/clio/lab/auto" tag="li" class="link-item" active-class="link-active">
                <a>Аутокъмплийт</a>
            </router-link>
            <router-link to="/clio/lab/editor" tag="li" class="link-item" active-class="link-active">
                <a>Едитор</a>
            </router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    beforeMount: function() {
        console.log(`beforeMount method of Lab called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
