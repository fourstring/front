<template>
    <q-layout view="hHh LpR lfr">
        <q-layout-header>
            <q-toolbar color="primary">

                <q-btn @click="changeDrawer()" icon="menu" flat round/>
                <q-toolbar-title>{{currentTitle}}</q-toolbar-title>
                <q-btn icon="exit_to_app" label="退出登录" dense
                       v-if="this.$route.path !='/login' && this.$route.path !='/changePassword'" class="shadow-1"
                       color="negative" @click="logout"/>

            </q-toolbar>
        </q-layout-header>
        <q-layout-drawer v-model="leftDrawerOpen" side="left" content-class="bg-grey-3"
                         :content-style="{padding: '3px'}">
            <urls/>
        </q-layout-drawer>
        <q-page-container>
            <q-page padding class="row justify-sm-center fit" :style-fn="pageStyle">
                <router-view></router-view>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
    import QLayout from "quasar-framework/src/components/layout/QLayout";
    import QLayoutHeader from "quasar-framework/src/components/layout/QLayoutHeader";
    import QLayoutDrawer from "quasar-framework/src/components/layout/QLayoutDrawer";
    import QPageContainer from "quasar-framework/src/components/layout/QPageContainer";
    import QToolbar from "quasar-framework/src/components/toolbar/QToolbar";
    import QToolbarTitle from "quasar-framework/src/components/toolbar/QToolbarTitle";
    import QBtn from "quasar-framework/src/components/btn/QBtn";
    import Urls from "@/components/urls";
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import QPage from "quasar-framework/src/components/layout/QPage";
    import Status from "@/components/Status";
    import Settings from "@/components/Settings";
    import {requestAPI} from "@/api";

    Vue.use(VueRouter)

    export default {
        components: {
            Settings,
            Status,
            QPage, Urls, QBtn, QToolbarTitle, QToolbar, QPageContainer, QLayoutDrawer, QLayoutHeader, QLayout
        },
        data() {
            return {
                subtitle: '',
                currentTitle: this.subtitle ? '智能空调控制器' + this.subtitle : '智能空调控制器',
                leftDrawerOpen: false,
                logoutStatus: null
            }
        },
        methods: {
            changeDrawer() {
                this.leftDrawerOpen = !this.leftDrawerOpen
            },
            pageStyle() {
                return {
                    width: (4 / 7) * document.body.clientWidth + "px",
                    "min-height": "calc(100vh - 50px)"
                }
            },
            logout() {
                requestAPI("logout", null, json => this.logoutStatus = JSON.parse(json), error => console.error(error))
            }
        },
        watch: {
            logoutStatus() {
                if (this.logoutStatus.status == 200) {
                    this.$router.push({name: 'login'})
                }
            }
        }
    }
</script>

<style>

</style>