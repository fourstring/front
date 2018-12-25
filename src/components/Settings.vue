<template>
    <router-view></router-view>
</template>

<script>
    import QList from "quasar-framework/src/components/list/QList";
    import PreferenceSettings from "@/components/PreferenceSettings";

    export default {
        name: "Settings",
        components: {PreferenceSettings, QList}
    }
</script>

<style scoped>

</style>