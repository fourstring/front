<template>
    <q-layout view="hHh lpr lFr">
        <q-layout-header>
            <q-toolbar color="primary">
                <q-btn @click="changeDrawer()" icon="menu" flat round dense>
                </q-btn>
                <q-toolbar-title>{{currentTitle}}</q-toolbar-title>
            </q-toolbar>
        </q-layout-header>
        <q-layout-drawer v-model="leftDrawerOpen" side="left" content-class="bg-grey-3"
                         :content-style="{padding: '3px'}">
            <urls/>
        </q-layout-drawer>
        <q-page-container>

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

    export default {
        components: {Urls, QBtn, QToolbarTitle, QToolbar, QPageContainer, QLayoutDrawer, QLayoutHeader, QLayout},
        data() {
            return {
                subtitle: '',
                currentTitle: this.subtitle ? '智能空调控制器' + this.subtitle : '智能空调控制器',
                leftDrawerOpen: false
            }
        },
        methods: {
            changeDrawer() {
                this.leftDrawerOpen = !this.leftDrawerOpen
            }
        }
    }
</script>

<style>

</style>