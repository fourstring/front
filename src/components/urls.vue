<template>
    <q-list separator link>
        <q-list-header>
            <q-icon name="apps" class="q-mx-md"/>
            {{title}}
        </q-list-header>
        <q-collapsible :icon="url.icon" v-for="url in topUrlList" :key="url.name" :label="url.name">
            <q-item v-for="sub in url.subUrl" :key="sub.name">
                <q-item-side :icon="sub.icon"></q-item-side>
                <q-item-main @click="openURL('/'+url.link+'/'+sub.link)">
                    {{sub.name}}
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
    import {openURL} from 'quasar'

    class Url {
        constructor(name, link, icon = '', subs = []) {
            this.name = name;
            this.link = link;
            this.icon = icon;
            this.subUrl = subs;
        }

        isTop() {
            return !this.subUrl == [];
        }
    }

    export default {
        name: "urls",
        components: {QItemMain, QItemSide, QIcon, QItem, QCollapsible, QListHeader, QList},
        data() {
            return {
                title: '控制面板导航',
                urls: [
                    new Url('主页', 'index', 'home'),
                    new Url('设置', 'setttings', 'settings', [
                        new Url('偏好设置', 'preferance', 'settings'),
                        new Url('任务设置', 'tasks', 'settings')
                    ])
                ]
            }
        },
        computed: {
            topUrlList() {
                let res = [];
                for (let url of this.urls) {
                    if (url.isTop()) {
                        res.push(url)
                    }
                }
                return res
            }
        },
        methods: {
            openURL
        }
    }
</script>

<style scoped>

</style>