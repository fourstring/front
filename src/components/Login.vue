<template>
    <div class="row fit justify-center">
        <div class="col-12">
            <q-input v-model="password" stack-label="输入密码" type="password"/>
        </div>
        <q-btn color="secondary" class="q-my-md col-4" outline label="登录" @click="login"/>
    </div>
</template>

<script>
    import QInput from "quasar-framework/src/components/input/QInput";
    import QBtn from "quasar-framework/src/components/btn/QBtn";
    import hash from "js-sha256"
    import {requestAPI} from "@/api";

    export default {
        name: "Login",
        components: {QBtn, QInput},
        data() {
            return {
                password: '',
                apiResult: null,
                apiError: null
            }
        },
        methods: {
            login() {
                requestAPI("auth", {password: hash.sha256(this.password)}, json => {
                    this.apiResult = JSON.parse(json);
                }, error => {
                    this.apiError = error
                })
            }
        },
        watch: {
            apiResult() {
                if (this.apiResult.status == 200) {
                    this.$router.push({name: 'home'})
                } else {
                    this.$q.notify({
                        message: "登录失败，请检查密码是否正确。",
                        type: "negative",
                        color: "negative",
                        timeout: 3000
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>