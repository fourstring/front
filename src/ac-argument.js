export default class acArguments {
    constructor(power = true, workingMode = 0, temperature = 15, windSpeed = 0, windFlap = false, sleepMode = false, light = true,
                anion = true, desiccation = false, ventilation = true, verticalFlap = true, horizontalFlap = true,
                temperatureDisplay = 1, energySaving = true) {
        this.arguments = {
            power,
            workingMode,
            temperature,
            windSpeed,
            windFlap,
            sleepMode,
            light,
            anion,
            desiccation,
            ventilation,
            verticalFlap,
            horizontalFlap,
            temperatureDisplay,
            energySaving
        };
        this.displayText = {
            power: "电源状态",
            workingMode: "工作模式",
            temperature: "设定温度",
            windSpeed: "设定风速",
            windFlap: "扫风",
            sleepMode: "睡眠模式",
            light: "空调面板显示",
            anion: "健康功能",
            desiccation: "干燥功能",
            ventilation: "换气功能",
            verticalFlap: "上下扫风",
            horizontalFlap: "左右扫风",
            temperatureDisplay: "温度显示",
            energySaving: "节能模式"
        };
    }

    valueDisplay() {
        return {
            power: this.arguments.power ? "开机" : "关机",
            workingMode: ["自动模式", "制冷模式", "加湿模式", "送风模式", "制热模式"][this.arguments.workingMode],
            temperature: String(this.arguments.temperature) + "℃",
            windSpeed: ["自动", "一档", "二档", "三档"][this.arguments.windSpeed],
            windFlap: this.arguments.windFlap ? "开启" : "关闭",
            sleepMode: this.arguments.sleepMode ? "开启" : "关闭",
            light: this.arguments.light ? "开启" : "关闭",
            anion: this.arguments.anion ? "开启" : "关闭",
            desiccation: this.arguments.desiccation ? "开启" : "关闭",
            ventilation: this.arguments.ventilation ? "开启" : "关闭",
            verticalFlap: this.arguments.verticalFlap ? "开启" : "关闭",
            horizontalFlap: this.arguments.horizontalFlap ? "开启" : "关闭",
            temperatureDisplay: this.arguments.temperatureDisplay ? "开启" : "关闭",
            energySaving: this.arguments.energySaving ? "开启" : "关闭"
        };
    }
}
