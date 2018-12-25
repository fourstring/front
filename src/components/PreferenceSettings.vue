<template>
    <q-list dense class="text-tertiary shadow-1 fit">
        <q-list-header>
            <q-icon class="q-mr-md" name="build"/>
            {{title}}
        </q-list-header>
        <q-item>
            <div class="row justify-between full-width">
                <q-item-main class="col-6" label="季节设置" sublabel="设置当前处于夏季还是冬季"/>
                <div class="col-6 row justify-end">
                    <q-radio v-model="season" label="夏季" :val="1" checked-icon="radio_button_checked"
                             unchecked-icon="radio_button_unchecked"/>
                    <q-radio v-model="season" label="冬季" :val="2" checked-icon="radio_button_checked"
                             unchecked-icon="radio_button_unchecked"/>
                </div>
            </div>
        </q-item>
        <q-item-separator/>
        <q-item>
            <div class="row justify-between full-width">
                <q-item-main class="col-6" label="准备时间" sublabel="存在下一个任务时提前多久设置空调"/>
                <q-item-side right class="col-2">
                    <q-field>
                        <q-input v-model="prepare" type="number"/>
                    </q-field>
                    分钟
                </q-item-side>
            </div>
        </q-item>
        <q-item-separator/>
        <q-item>
            <div class="row justify-between full-width">
                <q-item-main class="col-6" label="关机延迟" sublabel="室内持续多少分钟无人后关闭空调"/>
                <q-item-side right class="col-2">
                    <q-field>
                        <q-input v-model="delay" type="number"/>
                    </q-field>
                    分钟
                </q-item-side>
            </div>
        </q-item>
        <q-item-separator/>
        <q-item>
            <q-item-main class="fit row justify-center">
                <q-btn @click="setPreference" color="secondary" label="保存以上三项设置" outline/>
            </q-item-main>
        </q-item>
        <q-item-separator/>
        <q-item>
            <q-item-main class="col-6" label="睡眠时段" sublabel="设置每天有人睡眠的时间段"/>
        </q-item>
        <q-table
                :data="sleepTimes"
                :columns="columns"
                row-key="id"
                class="q-ma-sm"
                hide-bottom
                selection="multiple"
                :selected.sync="selectedSleepTime"
                :pagination.sync="pageControl"
        >
            <div slot="top-left" slot-scope="props" class="row">
                <q-btn color="secondary" outline label="增加睡眠时段" @click="addSleepDialog=!addSleepDialog"
                       class="q-mr-sm"/>
            </div>
            <div slot="top-right" slot-scope="props" class="row">
                <q-btn color="negative" label="删除选中时段" @click="deleteSleepTime" icon="delete_forever"/>
            </div>
            <q-tr slot="header" slot-scope="props" :props="props">
                <q-th auto-width>
                    <q-checkbox
                            v-model="props.selected"
                            indeterminate-value="some"
                            color="secondary"
                    />
                </q-th>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.label }}
                </q-th>
            </q-tr>
            <q-tr slot="body" slot-scope="props" :props="props">
                <q-td auto-width>
                    <q-checkbox color="secondary" v-model="props.selected"/>
                </q-td>
                <q-td key="id" :props="props">
                    {{props.row.id}}
                </q-td>
                <q-td key="start" :props="props">
                    {{props.row.start.format("HH:mm")}}
                </q-td>
                <q-td key="end" :props="props">
                    {{(props.row.end.isBefore(props.row.start)?"(次日)":"") + props.row.end.format("HH:mm")}}
                </q-td>
            </q-tr>
        </q-table>
        <q-item-separator/>
        <q-item>
            <q-item-main class="col-6" label="定时开机" sublabel="设置定时开机时间点"/>
        </q-item>
        <q-table
                :data="bootTimes"
                :columns="bootTimeColumns"
                row-key="id"
                class="q-ma-sm"
                hide-bottom
                selection="multiple"
                :selected.sync="selectedBootTime"
                :pagination.sync="pageControl"
        >
            <div slot="top-left" slot-scope="props" class="row">
                <q-btn color="secondary" outline label="增加时间点" @click="addBootTimeDialog=!addBootTimeDialog"
                       class="q-mr-sm"/>
            </div>
            <div slot="top-right" slot-scope="props" class="row">
                <q-btn color="negative" label="删除选中时间点" @click="deleteBootTime" icon="delete_forever"/>
            </div>
            <q-tr slot="header" slot-scope="props" :props="props">
                <q-th auto-width>
                    <q-checkbox
                            v-model="props.selected"
                            indeterminate-value="some"
                            color="secondary"
                    />
                </q-th>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.label }}
                </q-th>
            </q-tr>
            <q-tr slot="body" slot-scope="props" :props="props">
                <q-td auto-width>
                    <q-checkbox color="secondary" v-model="props.selected"/>
                </q-td>
                <q-td key="id" :props="props">
                    {{props.row.id}}
                </q-td>
                <q-td key="start" :props="props">
                    {{props.row.start.format("HH:mm")}}
                </q-td>
            </q-tr>
        </q-table>
        <q-item-separator/>
        <q-item>
            <div class="row justify-between full-width">
                <q-item-main class="col-6" label="空调选项设置" sublabel="设置开启空调时空调的各项功能参数"/>
            </div>
        </q-item>
        <q-collapsible v-for="config in configs" :key="config.name" icon="build" :label="config.name">
            <q-item>
                <q-item-main>
                    <set-ac-arguments :ac-config="config"/>
                </q-item-main>
            </q-item>

        </q-collapsible>
        <q-dialog
                v-model="addSleepDialog"
                stack-buttons
                title="增加睡眠时间段"
                @ok="addSleep"
        >
            <span slot="message">
                时间为24小时制，若结束时间早于开始时间，则表示在第二天结束。睡眠时间段内空调不会被关闭。
                <br/>
                点按对话框外区域取消添加操作。
            </span>
            <div slot="body" class="row fit">
                <div class="col-12">
                    请输入开始时间
                </div>
                <div class="col-6">
                    <q-input v-model="newSleep.start.hour" stack-label="小时"/>
                </div>
                <div class="col-6">
                    <q-input v-model="newSleep.start.minute" stack-label="分钟"/>
                </div>
                <div class="col-12">
                    请输入结束时间
                </div>
                <div class="col-6">
                    <q-input v-model="newSleep.end.hour" stack-label="小时"/>
                </div>
                <div class="col-6">
                    <q-input v-model="newSleep.end.minute" stack-label="分钟"/>
                </div>
            </div>
            <template slot="buttons" slot-scope="props">
                <q-btn color="primary" label="确定" @click="addSleep()"/>
            </template>
        </q-dialog>
        <q-dialog
                v-model="addBootTimeDialog"
                stack-buttons
                title="增加定时开机时间点"
                @ok="addBootTime"
        >
            <span slot="message">
                时间为24小时制，设备会早于每个时间点开启空调，提早时间请在准备时间中设置。
                <br/>
                点按对话框外区域取消添加操作。
            </span>
            <div slot="body" class="row fit">
                <div class="col-12">
                    请输入开机时间点
                </div>
                <div class="col-6">
                    <q-input v-model="newBootTime.start.hour" stack-label="小时"/>
                </div>
                <div class="col-6">
                    <q-input v-model="newBootTime.start.minute" stack-label="分钟"/>
                </div>
            </div>
            <template slot="buttons" slot-scope="props">
                <q-btn color="primary" label="确定" @click="addBootTime()"/>
            </template>
        </q-dialog>

    </q-list>
</template>

<script>
    import QList from "quasar-framework/src/components/list/QList";
    import QListHeader from "quasar-framework/src/components/list/QListHeader";
    import QIcon from "quasar-framework/src/components/icon/QIcon";
    import QItem from "quasar-framework/src/components/list/QItem";
    import QItemTile from "quasar-framework/src/components/list/QItemTile";
    import QItemMain from "quasar-framework/src/components/list/QItemMain";
    import QItemSide from "quasar-framework/src/components/list/QItemSide";
    import QField from "quasar-framework/src/components/field/QField";
    import QInput from "quasar-framework/src/components/input/QInput";
    import QItemSeparator from "quasar-framework/src/components/list/QItemSeparator";
    import QTable from "quasar-framework/src/components/table/QTable";
    import moment from "moment"
    import QBtn from "quasar-framework/src/components/btn/QBtn";
    import acArgument from "@/ac-argument"
    import QSelect from "quasar-framework/src/components/select/QSelect";
    import QCollapsible from "quasar-framework/src/components/collapsible/QCollapsible";
    import SetAcArguments from "@/components/SetAcArguments";
    import QRadio from "quasar-framework/src/components/radio/QRadio";
    import {requestAPI} from "@/api"
    import QDialog from "quasar-framework/src/components/dialog/QDialog";


    export default {
        name: "PreferenceSettings",
        components: {
            QDialog,
            QRadio,
            SetAcArguments,
            QCollapsible,
            QSelect,
            QBtn,
            QTable,
            QItemSeparator, QInput, QField, QItemSide, QItemMain, QItemTile, QItem, QIcon, QListHeader, QList
        },
        data() {
            return {
                pageControl: {
                    rowsPerPage: 0,
                    page: 1
                },
                prepare: null,
                delay: null,
                configs: [],
                selectedConfig: '',
                sleepTimes: [],
                selectedSleepTime: [],
                season: null,
                title: "偏好设置",
                columns: [
                    {
                        name: 'id',
                        label: '序号',
                        field: row => row.id,
                        sortable: true,
                        alignment: 'left'
                    },
                    {
                        name: 'start',
                        label: '开始时间',
                        field: row => row.start,
                        sortable: true,
                    },
                    {
                        name: 'end',
                        label: '结束时间',
                        field: row => row.end,
                        sortable: false
                    }
                ],
                bootTimeColumns: [
                    {
                        name: 'id',
                        label: '序号',
                        field: row => row.id,
                        sortable: true,
                        alignment: 'left'
                    },
                    {
                        name: 'start',
                        label: '开始时间',
                        field: row => row.start,
                        sortable: true,
                    }
                ],
                selectedBootTime: [],
                bootTimes: [],
                addSleepDialog: false,
                addBootTimeDialog: false,
                newSleep: {
                    start: {hour: null, minute: null},
                    end: {hour: null, minute: null}
                },
                newBootTime: {
                    start: {hour: null, minute: null}
                },
                preferenceResult: null,
                setPreferenceResult: null,
                getBootTimeResult: null,
                getSleepResult: null,
                addBootTimeResult: null,
                addSleepResult: null,
                deleteSleepResult: null,
                deleteBootTimeResult: null,
                getAcConfigResult: null,
                updateAcConfigResult: null
            };
        },
        computed: {},
        mounted() {
            requestAPI("getPreference", null, json => this.preferenceResult = JSON.parse(json), error => console.error(error));
            requestAPI("getSleepTimes", null, json => this.getSleepResult = JSON.parse(json), error => console.error(error));
            requestAPI("getBootTimes", null, json => this.getBootTimeResult = JSON.parse(json), error => console.error(error));
            requestAPI("getAcConfigs", null, json => this.getAcConfigResult = JSON.parse(json), error => console.error(error));
        },
        watch: {
            preferenceResult() {
                if (this.preferenceResult.status == 200) {
                    this.prepare = this.preferenceResult.data[0].prepare;
                    this.delay = this.preferenceResult.data[0].delay;
                    this.season = this.preferenceResult.data[0].season
                } else {
                    this.$q.notify({
                        message: "请登录后访问",
                        type: "negative",
                        color: "negative",
                        timeout: 3000
                    });
                    this.$router.push({name: 'login'})
                }
            },
            getSleepResult() {
                if (this.getSleepResult.status == 200) {
                    this.sleepTimes = [];
                    for (let time of this.getSleepResult.data) {
                        let [startHour, startMinute] = time.start.split(":");
                        let [endHour, endMinute] = time.end.split(":");
                        this.sleepTimes.push({
                            id: time.id,
                            start: new moment().set({
                                "hour": parseInt(startHour, 10),
                                "minute": parseInt(startMinute, 10)
                            }),
                            end: new moment().set({"hour": parseInt(endHour, 10), "minute": parseInt(endMinute, 10)})
                        })
                    }
                }
            },
            getBootTimeResult() {
                if (this.getBootTimeResult.status == 200) {
                    this.bootTimes = [];
                    for (let time of this.getBootTimeResult.data) {
                        let [startHour, startMinute] = time.start.split(":");
                        this.bootTimes.push({
                            id: time.id,
                            start: new moment().set({
                                "hour": parseInt(startHour, 10),
                                "minute": parseInt(startMinute, 10)
                            })
                        })
                    }
                }
            },
            getAcConfigResult() {
                if (this.getAcConfigResult.status == 200) {
                    for (let config of this.getAcConfigResult.data) {
                        this.configs.push({
                            name: config["season"] == 2 ? "冬天制热" : "夏天制冷",
                            id: config["id"],
                            config: new acArgument(config["power"], config["working_mode"], config["temperature"], config["wind_speed"]
                                , config["wind_flap"], config["sleep_mode"], config["light"], config["anion"], config["desiccation"],
                                config["ventilation"], config["vertical_flap"], config["horizontal_flap"], config["temperature_display"],
                                config["energy_saving"])
                        });
                    }
                }
            },
            addSleepResult() {
                this.addSleepDialog = false;
                if (this.addSleepResult.status == 200) {
                    requestAPI("getSleepTimes", null, json => this.getSleepResult = JSON.parse(json), error => console.error(error));
                }
            },
            addBootTimeResult() {
                this.addBootTimeDialog = false;
                if (this.addBootTimeResult.status == 200) {
                    requestAPI("getBootTimes", null, json => this.getBootTimeResult = JSON.parse(json), error => console.error(error));
                }
            },
            updateAcConfigResult() {
                if (this.updateAcConfigResult.status == 200) {
                    requestAPI("getAcConfigs", null, json => this.getAcConfigResult = JSON.parse(json), error => console.error(error));
                }
            },
            setPreferenceResult() {
                if (this.setPreferenceResult.status == 200) {
                    requestAPI("getPreference", null, json => this.preferenceResult = JSON.parse(json), error => console.error(error));
                    this.$q.notify({
                        message: "设置更新成功",
                        type: "positive",
                        color: "positive",
                        timeout: 3000
                    });
                }
            },
            deleteSleepResult() {
                if (this.deleteSleepResult.status == 200) {
                    this.sleepTimes = [];
                    requestAPI("getSleepTimes", null, json => this.getSleepResult = JSON.parse(json), error => console.error(error));
                }
            },
            deleteBootTimeResult() {
                if (this.deleteBootTimeResult.status == 200) {
                    this.bootTimes = [];
                    requestAPI("getBootTimes", null, json => this.getBootTimeResult = JSON.parse(json), error => console.error(error));
                }
            }
        },
        methods: {
            addSleep() {
                if ((parseInt(this.newSleep.start.hour) > 23 || parseInt(this.newSleep.start.hour) < 0 || this.newSleep.start.hour.indexOf('.') >= 0) ||
                    (parseInt(this.newSleep.start.minute) > 59 || parseInt(this.newSleep.start.minute) < 0 || this.newSleep.start.hour.indexOf('.') >= 0) ||
                    (parseInt(this.newSleep.end.hour) > 23 || parseInt(this.newSleep.end.hour) < 0 || this.newSleep.start.hour.indexOf('.') >= 0) ||
                    (parseInt(this.newSleep.end.minute) > 59 || parseInt(this.newSleep.end.minute || this.newSleep.start.hour.indexOf('.') >= 0) < 0)
                ) {
                    this.$q.notify({
                        message: "时间非法！请重新设置。",
                        type: "negative",
                        color: "negative",
                        timeout: 3000
                    });
                    return;
                }
                requestAPI("addSleepTime", {
                    start: String(this.newSleep.start.hour) + ':' + String(this.newSleep.start.minute),
                    end: String(this.newSleep.end.hour) + ':' + String(this.newSleep.end.minute)
                }, json => this.addSleepResult = JSON.parse(json), error => console.error(error))
                this.newSleep.start.hour = '';
                this.newSleep.start.minute = '';
                this.newSleep.end.hour = '';
                this.newSleep.end.minute = '';
            },
            addBootTime() {
                if ((parseInt(this.newBootTime.start.hour) > 23 || parseInt(this.newBootTime.start.hour) < 0 || this.newBootTime.start.hour.indexOf('.') >= 0) ||
                    (parseInt(this.newBootTime.start.minute) > 59 || parseInt(this.newBootTime.start.minute || this.newBootTime.start.hour.indexOf('.') >= 0) < 0)
                ) {
                    this.$q.notify({
                        message: "时间非法！请重新设置。",
                        type: "negative",
                        color: "negative",
                        timeout: 3000
                    });
                    return;
                }
                requestAPI("addBootTime", {
                    start: String(this.newBootTime.start.hour) + ':' + String(this.newBootTime.start.minute)
                }, json => this.addBootTimeResult = JSON.parse(json), error => console.error(error))
                this.newBootTime.start.hour = '';
                this.newBootTime.start.minute = '';
            },
            setPreference() {
                requestAPI("setPreference", {
                    prepare: this.prepare,
                    delay: this.delay,
                    season: this.season
                }, json => this.setPreferenceResult = JSON.parse(json), error => console.error(error))
            },
            deleteSleepTime() {
                for (let time of this.selectedSleepTime) {
                    console.log(time);
                    requestAPI("deleteSleepTime", {id: time.id}, json => this.deleteSleepResult = JSON.parse(json), error => console.error(error))
                }
            },
            deleteBootTime() {
                for (let time of this.selectedBootTime) {
                    requestAPI("deleteBootTime", {id: String(time.id)}, json => this.deleteBootTimeResult = JSON.parse(json), error => console.error(error))
                }
            }
        }
    }
</script>

<style scoped>

</style>