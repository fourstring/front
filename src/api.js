import cookies from "js-cookie"

const requestAPI = (apiType, data, func_then, func_catch) => {
    let prefix = "https://zby.io";
    let fetchConfig = {
        mode: "cors",
        method: apiRouter[apiType].method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow"
    };
    if (apiRouter[apiType].method == 'POST') {
        fetchConfig.body = JSON.stringify(data)
    }
    fetch(prefix + apiRouter[apiType].path, fetchConfig)
        .then(res => res.json()).then(func_then).then(func_catch)
};

async function sleep(ms) {
    function s(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    await s(ms);
}

export default class API {
    constructor(apiType) {
        this.type = apiType;
        this.apiUrl = apiRouter[apiType].path;
        this.apiMethod = apiRouter[apiType].method;
        this.apiResult = [];
        this.apiError = {};
        this.csrfToken = cookies.get("csrftoken");
        this.prefix = 'http://localhost:8000'
    }

    toLine(str) {
        str.replace(/([A-Z])/g, "_$1").toLowerCase();
    }

    send(resolve = response => {
        this.apiResult = JSON.parse(response.json()).data;
    }, reject = error => {
        this.apiError = error;
    }, data = {}) {
        fetch(this.prefix + "/api/auth?format=json", {
            mode: "no-cors",
            method: "POST",
            credentials: "include",
            body: JSON.stringify({password: "7c61be27eec3fa7cef2e0d44d3145ea37648b0842d5574c0163b92c0bed54924"}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        fetch(this.prefix + this.apiUrl, {
            method: this.apiMethod,
            mode: "no-cors",
            credentials: "include",
            cache: "no-cache",
            headers: {
                "X-CSRF-Token": this.csrfToken,
                "Content-Type": "application/json"
            },
            body: this.toLine(JSON.stringify(data))
        }).then(resolve)
            .catch(reject);
    }

}

const apiRouter = {
    auth: {
        path: '/api/auth.json',
        method: 'POST'
    },
    logout: {
        path: '/api/logout.json',
        method: 'GET'
    },
    changePassword: {
        path: '/api/changePassword.json',
        method: 'POST'
    },
    setPassword: {
        path: '/api/setPassword.json',
        method: 'POST'
    },
    setPreference: {
        path: '/api/setPreference.json',
        method: 'POST'
    },
    getPreference: {
        path: '/api/getPreference.json',
        method: 'GET'
    },
    updateAcConfig: {
        path: '/api/updateAcConfig.json',
        method: 'POST'
    },
    getAcConfigs: {
        path: '/api/getAcConfigs.json',
        method: 'GET'
    },
    getAct: {
        path: '/api/getAct.json',
        method: 'GET'
    },
    getCurrentAcConfig: {
        path: '/api/getCurrentAcConfig.json',
        method: 'GET'
    },
    getSleepTimes: {
        path: '/api/getSleepTimes.json',
        method: 'GET'
    },
    addSleepTime: {
        path: '/api/addSleepTime.json',
        method: 'POST'
    },
    deleteSleepTime: {
        path: '/api/deleteSleepTime.json',
        method: 'POST'
    },
    getBootTimes: {
        path: '/api/getBootTimes.json',
        method: 'GET'
    },
    addBootTime: {
        path: '/api/addBootTime.json',
        method: 'POST'
    },
    deleteBootTime: {
        path: '/api/deleteBootTime.json',
        method: 'POST'
    }
};

export {apiRouter, requestAPI, sleep};