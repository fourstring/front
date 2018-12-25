<template>
    <div class="q-display-2 text-weight-light">{{formatTime}}</div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "Clock",
        data() {
            return {
                time: new moment()
            }
        },
        mounted() {
            this.timer = setInterval(
                () => this.time = new moment(), 1000
            )
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        computed: {
            formatTime() {
                return this.time.format("YYYY-M-D HH:mm:ss")
            }
        }
    }
</script>

<style scoped>

</style>