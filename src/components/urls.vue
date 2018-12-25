<template>
    <q-list separator link>
        <q-list-header>
            <q-icon name="apps" class="q-mr-md"/>
            {{title}}
        </q-list-header>
        <q-item v-for="route in singleRoutesList" :key="route.name">
            <q-item-side :icon="route.meta.displayIcon"></q-item-side>
            <q-item-main>
                <router-link :to="{name: route.name}" class="drawer-link">{{route.meta.displayText}}</router-link>
            </q-item-main>
        </q-item>
        <q-collapsible v-for="route in topRoutesList" :key="route.name" :label="route.meta.displayText"
                       :icon="route.meta.displayIcon">
            <q-item v-for="child in route.children" :key="child.name">
                <q-item-side :icon="child.meta.displayIcon"></q-item-side>
                <q-item-main>
                    <router-link :to="{name: child.name}" class="drawer-link">{{child.meta.displayText}}</router-link>
                </q-item-main>
            </q-item>
        </q-collapsible>
    </q-list>
</template>

<script>
    import QList from "quasar-framework/src/components/list/QList";
    import QListHeader from "quasar-framework/src/components/list/QListHeader";
    import QCollapsible from "quasar-framework/src/components/collapsible/QCollapsible";
    import QItem from "quasar-framework/src/components/list/QItem";
    import QIcon from "quasar-framework/src/components/icon/QIcon";
    import QItemSide from "quasar-framework/src/components/list/QItemSide";
    import QItemMain from "quasar-framework/src/components/list/QItemMain";
    import {routes} from "@/router";


    export default {
        name: "urls",
        components: {QItemMain, QItemSide, QIcon, QItem, QCollapsible, QListHeader, QList},
        data() {
            return {
                title: '控制面板导航',
                routes
            }
        },
        computed: {
            topRoutesList() {
                return this.routes.filter(function (route) {
                    return Boolean(route.children) && route.meta.sideDisplay
                })
            },
            singleRoutesList() {
                return this.routes.filter(function (route) {
                    return !route.children && route.meta.sideDisplay
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .drawer-link {
        text-decoration: none;
        outline: 0;
        cursor: pointer;
    }

    a:link, a:visited {
        color black
    }
</style>