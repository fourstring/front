<template>
    <div class="row full-width gutter-xs">
        <div class="col-6">
            <div class="row full-width">
                <q-input :value="acConfig.name" readonly stack-label="配置名称"/>
            </div>
        </div>
        <div class="col-6 row full-height justify-center">
            <q-btn icon="check_box" label="保存设置" @click="updateAcConfig" outline color="secondary"/>
        </div>
        <div class="col-6" v-for="(val,key) in acConfig.config.arguments" :key="key">
            <div class="full-width" v-if="key=='power'">
                <q-toggle v-model="acConfig.config.arguments.power" :label="acConfig.config.displayText.power"/>
            </div>
            <div class="full-width" v-else-if="key=='workingMode'">
                {{acConfig.config.displayText.workingMode}}
                <div class="row full-width">
                    <q-radio v-model="acConfig.config.arguments.workingMode" label="自动模式" :val="0"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                    <q-radio v-model="acConfig.config.arguments.workingMode" label="制冷模式" :val="1"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                    <q-radio v-model="acConfig.config.arguments.workingMode" label="加湿模式" :val="2"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                    <q-radio v-model="acConfig.config.arguments.workingMode" label="送风模式" :val="3"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                    <q-radio v-model="acConfig.config.arguments.workingMode" label="制热模式" :val="4"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                </div>
            </div>
            <div class="full-width" v-else-if="key=='temperature'">
                {{acConfig.config.displayText.temperature}}<br/>温度单位为℃，范围为0-15℃或16-30℃
                <q-input v-model="acConfig.config.arguments.temperature"/>
            </div>
            <div class="full-width" v-else-if="key=='windSpeed'">
                {{acConfig.config.displayText.windSpeed}}
                <div class="row full-width">
                    <q-radio v-model="acConfig.config.arguments.windSpeed" label="自动" :val="0"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                    <q-radio v-model="acConfig.config.arguments.windSpeed" label="一档" :val="1"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                    <q-radio v-model="acConfig.config.arguments.windSpeed" label="二档" :val="2"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                    <q-radio v-model="acConfig.config.arguments.windSpeed" label="三档" :val="3"
                             checked-icon="radio_button_checked" unchecked-icon="radio_button_unchecked"/>
                </div>
            </div>
            <div class="full-width" v-else-if="key=='sleepMode'">
                <q-toggle v-model="acConfig.config.arguments.sleepMode" :label="acConfig.config.displayText.sleepMode"/>
            </div>
            <div class="full-width" v-else-if="key=='light'">
                <q-toggle v-model="acConfig.config.arguments.light" :label="acConfig.config.displayText.light"/>
            </div>
            <div class="full-width" v-else-if="key=='anion'">
                <q-toggle v-model="acConfig.config.arguments.anion" :label="acConfig.config.displayText.anion"/>
            </div>
            <div class="full-width" v-else-if="key=='desiccation'">
                <q-toggle v-model="acConfig.config.arguments.desiccation"
                          :label="acConfig.config.displayText.desiccation"/>
            </div>
            <div class="full-width" v-else-if="key=='ventilation'">
                <q-toggle v-model="acConfig.config.arguments.ventilation"
                          :label="acConfig.config.displayText.ventilation"/>
            </div>
            <div class="full-width" v-else-if="key=='verticalFlap'">
                <q-toggle v-model="acConfig.config.arguments.verticalFlap"
                          :label="acConfig.config.displayText.verticalFlap"/>
            </div>
            <div class="full-width" v-else-if="key=='horizontalFlap'">
                <q-toggle v-model="acConfig.config.arguments.horizontalFlap"
                          :label="acConfig.config.displayText.horizontalFlap"/>
            </div>
            <div class="full-width" v-else-if="key=='temperatureDisplay'">
                <q-toggle v-model="acConfig.config.arguments.temperatureDisplay"
                          :label="acConfig.config.displayText.temperatureDisplay"/>
            </div>
            <div class="full-width" v-else-if="key=='energySaving'">
                <q-toggle v-model="acConfig.config.arguments.energySaving"
                          :label="acConfig.config.displayText.energySaving"/>
            </div>
            <div class="full-width" v-else-if="key=='windFlap'">
                <q-toggle v-model="acConfig.config.arguments.windFlap" :label="acConfig.config.displayText.windFlap"/>
            </div>
        </div>
    </div>
</template>

<script>
    import QRadio from "quasar-framework/src/components/radio/QRadio";
    import QToggle from "quasar-framework/src/components/toggle/QToggle";
    import QInput from "quasar-framework/src/components/input/QInput";
    import QBtn from "quasar-framework/src/components/btn/QBtn";
    import {requestAPI} from "@/api";

    export default {
        name: "SetAcArguments",
        components: {QBtn, QInput, QToggle, QRadio},
        props: {
            acConfig: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                updateAcConfigResult: null,
            }
        },
        methods: {
            updateAcConfig() {
                requestAPI("updateAcConfig", {
                        id: this.acConfig.id, config: {
                            "power": this.acConfig.config.arguments["power"],
                            "working_mode": this.acConfig.config.arguments["workingMode"],
                            "temperature": this.acConfig.config.arguments["temperature"],
                            "wind_speed": this.acConfig.config.arguments["windSpeed"],
                            "wind_flap": this.acConfig.config.arguments["windFlap"],
                            "sleep_mode": this.acConfig.config.arguments["sleepMode"],
                            "anion": this.acConfig.config.arguments["anion"],
                            "light": this.acConfig.config.arguments["light"],
                            "desiccation": this.acConfig.config.arguments["desiccation"],
                            "ventilation": this.acConfig.config.arguments["ventilation"],
                            "vertical_flap": this.acConfig.config.arguments["verticalFlap"],
                            "horizontal_flap": this.acConfig.config.arguments["horizontalFlap"],
                            "temperature_display": this.acConfig.config.arguments["temperatureDisplay"],
                            "energy_saving": this.acConfig.config.arguments["energySaving"],
                            "season": this.acConfig.config.arguments["season"]
                        }
                    }, json => this.updateAcConfigResult = JSON.parse(json),
                    error => console.error(error))
            }
        },
        watch: {
            updateAcConfigResult() {
                if (this.updateAcConfigResult.status == 200) {
                    this.$q.notify({
                        message: "空调配置更新成功",
                        type: "positive",
                        color: "positive",
                        timeout: 3000
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>