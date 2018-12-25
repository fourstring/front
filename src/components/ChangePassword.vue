<template>
    <div class="row fit justify-center gutter-md">
        <div class="col-12">
            <q-input v-model="originalPassword" stack-label="输入原密码" type="password"/>
        </div>
        <div class="col-12">
            <q-input v-model="password" stack-label="输入新密码" type="password"/>
        </div>
        <q-btn color="secondary" class="q-my-md col-4" outline label="修改密码" @click="changePassword"/>
    </div>
</template>

<script>
    import QInput from "quasar-framework/src/components/input/QInput";
    import QBtn from "quasar-framework/src/components/btn/QBtn";
    import {requestAPI} from "@/api";
    import {Notify} from 'quasar';
    import hash from 'js-sha256'

    export default {
        name: "ChangePassword",
        components: {QBtn, QInput},
        data() {
            return {
                originalPassword: '',
                password: '',
                changeResult: null
            }
        },
        methods: {
            changePassword() {
                requestAPI("changePassword", {
                    "original_password": hash.sha256(this.originalPassword),
                    "password": hash.sha256(this.password)
                }, json => {
                    this.changeResult = JSON.parse(json)
                }, error => console.log(error))
            }
        },
        watch: {
            changeResult() {
                if (this.changeResult.status == 200) {
                    Notify.create({
                        message: "修改成功。原登录已注销，请重新登录。",
                        type: "positive",
                        color: "positive",
                        timeout: 5000
                    });
                    this.$router.push({name: 'login'})
                } else if (this.changeResult.status == 400) {
                    Notify.create({
                        message: "修改失败，请确认原密码是否正确",
                        type: "negative",
                        color: "negative",
                        timeout: 5000
                    });
                } else {
                    Notify.create({
                        message: "修改失败，请登录后访问",
                        type: "negative",
                        color: "negative",
                        timeout: 5000
                    });
                    this.$router.push({name: 'login'})
                }
            }
        }
    }
</script>

<style scoped>

</style>