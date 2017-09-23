<template>
    <ul class="navbar-component">
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
        <router-link to="/clio/lab" tag="li" class="link-item" active-class="link-active">
            <a>Лаборатория</a>
        </router-link>
    </ul>
</template>
