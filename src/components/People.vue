<template>
    <div :class="blockStyle">
        {{peopleActivity}}
    </div>
</template>

<script>
    export default {
        name: "People",
        created() {

        },
        data() {
            return {
                activity: false
            }
        },
        computed: {
            blockStyle() {
                return ['text-white', 'q-pa-xs', 'shadow-1', (this.activity ? 'bg-secondary' : 'bg-negative')].join(' ')
            },
            peopleActivity() {
                return this.activity ? '有人' : '无人'
            }
        }
    }
</script>

<style scoped>

</style>