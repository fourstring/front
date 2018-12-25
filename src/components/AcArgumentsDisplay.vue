<template>
    <div class="row overflow-wrap text-weight-light">
        <div :class="argu.arguments.power ? 'col-6': 'col-12'" v-for="(itemValue,itemKey) of argu.arguments"
             :key="itemKey">
            <div class="row" v-if="argu.arguments.power || itemKey=='power'">
                <div class="col-12"> {{argu.displayText[itemKey]}}：</div>
                <div :class="'col-auto'+' '+'q-pa-xs'+' '+'text-white'+' '+(itemValue ? 'bg-secondary':'bg-negative')+' '+'shadow-2'"
                >{{argu.valueDisplay()[itemKey]}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QList from "quasar-framework/src/components/list/QList";
    import QItemMain from "quasar-framework/src/components/list/QItemMain";
    import QIcon from "quasar-framework/src/components/icon/QIcon";
    import {requestAPI} from "@/api";
    import acArgument from "@/ac-argument";

    export default {
        name: "ACArgumentsDisplay",
        components: {QIcon, QItemMain, QList},
        mounted() {
            this.interval = setInterval(requestAPI("getCurrentAcConfig", null, json => this.arguResult = JSON.parse(json), error => console.error(error)), 1000)
        },
        data() {
            return {
                argu: null,
                arguResult: null
            }
        },
        computed: {},
        watch: {
            arguResult() {
                if (this.arguResult.status == 200) {
                    let data = this.arguResult.data[0]
                    this.argu = new acArgument(data["power"], data["working_mode"], data["temperature"], data["wind_speed"]
                        , data["wind_flap"], data["sleep_mode"], data["light"], data["anion"], data["desiccation"],
                        data["ventilation"], data["vertical_flap"], data["horizontal_flap"], data["temperature_display"],
                        data["energy_saving"])
                } else {
                    this.$q.notify({
                        message: "请登录后访问",
                        type: "negative",
                        color: "negative",
                        timeout: 3000
                    });
                    this.$router.push({name: 'login'})
                }
            }
        },
        beforeDestroy() {
            clearInterval(this.interval)
        }
    }
</script>

<style scoped>
    .overflow-wrap {
        overflow-wrap: break-word;
    }
</style>