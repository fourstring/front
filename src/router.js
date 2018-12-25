import VueRouter from 'vue-router'
import Status from '@/components/Status'
import Settings from '@/components/Settings'
import PreferenceSettings from '@/components/PreferenceSettings'
import Login from '@/components/Login'
import ChangePassword from '@/components/ChangePassword'

const routes = [
    {
        name: 'home',
        path: '/',
        component: Status,
        meta: {
            requireAuth: true,
            displayText: '主页',
            displayIcon: 'home',
            sideDisplay: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            requireAuth: false,
            displayText: '登录',
            displayIcon: '',
            sideDisplay: false
        }
    },
    {
        name: 'changePassword',
        path: '/changePassword',
        component: ChangePassword,
        meta: {
            requireAuth: true,
            displayText: '修改密码',
            displayIcon: 'lock_open',
            sideDisplay: true
        }
    }
    ,
    {
        name: 'settings',
        path: '/settings',
        component: Settings,
        meta: {
            requireAuth: true,
            displayText: '设置',
            displayIcon: 'settings_applications',
            sideDisplay: true
        },
        children: [
            {
                name: 'preference',
                path: '/settings/preference',
                component: PreferenceSettings,
                meta: {
                    requireAuth: true,
                    displayText: '偏好设置',
                    displayIcon: 'settings',
                    sideDisplay: true
                },
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
export {routes};