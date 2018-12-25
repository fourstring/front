<template>
    <q-list dense class="text-tertiary fit shadow-1">
        <q-list-header>
            <q-icon class="q-mr-md" name="home"/>
            {{title}}
        </q-list-header>
        <q-item>
            <q-icon name="alarm" class="q-mr-md"/>
            当前时间
        </q-item>
        <q-item class="justify-center">
            <clock/>
        </q-item>
        <q-item-separator/>
        <q-item>
            <q-icon name="graphic_eq" class="q-mr-md"/>
            当前空调状态
        </q-item>
        <q-item class="q-ml-md">
            <a-c-arguments/>
        </q-item>
    </q-list>
</template>

<script>
    //import API from '@/api'
    import Clock from "@/components/Clock";
    import QList from "quasar-framework/src/components/list/QList";
    import QListHeader from "quasar-framework/src/components/list/QListHeader";
    import QIcon from "quasar-framework/src/components/icon/QIcon";
    import QItem from "quasar-framework/src/components/list/QItem";
    import QItemSide from "quasar-framework/src/components/list/QItemSide";
    import QItemSeparator from "quasar-framework/src/components/list/QItemSeparator";
    import People from "@/components/People";
    import ACArguments from "@/components/AcArgumentsDisplay";

    export default {
        name: "Status",
        components: {ACArguments, People, QItemSeparator, QItemSide, QItem, QIcon, QListHeader, QList, Clock},
        data() {
            return {
                title: "主页",
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>