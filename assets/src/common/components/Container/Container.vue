<template>
    <div class="container-component">
        <transition-group name="content-item">
            <div class="content-item" v-for="(item, index) of content" :key="item.id">
                <span class="content-label">{{item.label}}</span>
                <span class="icon-cancel" @click="remove(item, index)"></span>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    props: ['content'],
    beforeMount: function() {
        console.log(`beforeMount method of Container component in: ${isBrowser ? 'client' : 'server'}`);
    },
    methods: {
        remove(item, index) {
            this.$emit('remove',
                {
                    item,
                    index
                }
            );
        }
    }
}
</script>
