<template>
    <div class="navbar-component">
        <div class="responsive-nav-header">
            <span class="nav-toggle" @click="toggleNav">X</span>
        </div>
        <ul class="nav-block container" :class="{open: opened}" @click="closeNav">
            <router-link to="/clio" tag="li" class="link-item" active-class="link-active" exact>
                <a>Начало</a>
            </router-link>
            <router-link to="/clio/contacts" tag="li" class="link-item" active-class="link-active">
                <a>Контакти</a>
            </router-link>
            <router-link to="/clio/guide" tag="li" class="link-item" active-class="link-active">
                <a>Наръчник</a>
            </router-link>
            <router-link to="/clio/login" tag="li" class="link-item" active-class="link-active">
                <a>Вход</a>
            </router-link>
            <router-link to="/clio/profile" tag="li" class="link-item" active-class="link-active">
                <a>Профил</a>
            </router-link>
            <router-link to="/clio/project" tag="li" class="link-item" active-class="link-active">
                <a>Проект</a>
            </router-link>
            <router-link to="/clio/register" tag="li" class="link-item" active-class="link-active">
                <a>Регистрация</a>
            </router-link>
            <router-link to="/clio/rules" tag="li" class="link-item" active-class="link-active">
                <a>Правила</a>
            </router-link>
            <router-link to="/clio/search" tag="li" class="link-item" active-class="link-active">
                <a>Търсене</a>
            </router-link>
            <router-link to="/asas" tag="li" class="link-item" active-class="link-active">
                <a>404</a>
            </router-link>
            <li class="link-item" @click="toggleSubNav($event, 'labSubNav')">
                <a class="sub-nav-label">Лаборатория</a>
                <ul class="sub-nav" :class="{'sub-nav-open': subNavs.labSubNav}">
                    <router-link to="/clio/lab/apollo" tag="li" class="link-item" active-class="link-active">
                        <a>Аполо</a>
                    </router-link>
                    <router-link to="/clio/lab/auto" tag="li" class="link-item" active-class="link-active">
                        <a>Аутокъмплийт</a>
                    </router-link>
                    <router-link to="/clio/lab/editor" tag="li" class="link-item" active-class="link-active">
                        <a>Едитор</a>
                    </router-link>
                    <router-link to="/clio/lab/drop" tag="li" class="link-item" active-class="link-active">
                        <a>Дроп</a>
                    </router-link>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            opened: false,
            subNavs: {
                labSubNav: false
            }
        }
    },
    beforeMount: function() {
        document.addEventListener('click', this.bodyClickHandler);
    },
    beforeDestroy: function() {
        document.removeEventListener('click', this.bodyClickHandler);
    },
    methods: {
        bodyClickHandler(event) {
            if (!this.$el.contains(event.target)) {
                this.closeNav();
            }
        },
        closeNav() {
            this.opened = false;
            this.closeSubNavs();
        },
        closeSubNavs() {
            const keys = Object.keys(this.subNavs);
            keys.forEach((key) => {
                this.subNavs[key] = false;
            });
        },
        toggleNav() {
            this.opened = !this.opened;
            if (!this.opened) {
                this.closeSubNavs();
            }
        },
        toggleSubNav(event, id) {
            event.stopPropagation();
            this.subNavs[id] = !this.subNavs[id];
            if (!this.subNavs[id]) {
                this.opened = false;
            }
        }
    }
}
</script>
