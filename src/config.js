/**
 * Created by Administrator on 2016/7/11.
 */

/**
 * 创建
 * @param path
 * @returns {function(*=)}
 */
const makeComponent = (path) => {
    return (resolve) => {
        require([path], resolve)
    }
}

let menu = {
    '/dashboard': {
        icon: 'dashboard',
        name: 'dashboard',
        label: '控制台',
        hide: false,
        component: makeComponent('./components/page/Dashboard.vue')
    },
    '/visitIDE': {
        icon: 'fa fa-openid',
        label: '访问IDE',
        name: 'visitide',
        hide: false,
        component: makeComponent('./components/page/ide/Visit.vue')
    },
    '/ide': {
        icon: 'connectdevelop',
        label: 'IDE升级',
        name: 'ide',
        isShowSubMenu: false,
        hide: false,
        component: {
            template: '<router-view></router-view>'
        },
        // component: makeComponent('./components/page/ide/Renew.vue'),
        subRoutes: {
            '/manage': {
                name: 'manageide',
                label: '管理',
                hide: true,
                component: makeComponent('./components/page/ide/Manage.vue')
            },
            '/visit': {
                name: 'visitide',
                label: '访问',
                hide: true,
                component: makeComponent('./components/page/ide/Visit.vue')
            },
            '/renew': {
                name: 'renewide',
                label: '升级',
                hide: false,
                component: makeComponent('./components/page/ide/Renew.vue')
            }

        }
    },
    '/apps': {
        icon: 'laptop',
        label: '应用管理',
        isShowSubMenu: false,
        hide: false,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/new': {
                name: 'newapp',
                label: '快速部署',
                hide: false,
                component: makeComponent('./components/page/apps/NewApp.vue')
            },
            // '/create': {
            //     name: 'create',
            //     label: '创建应用',
            //     hide: true,
            //     component: makeComponent('./components/page/apps/CreateApp.vue')
            // },
            '/list': {
                name: 'applist',
                label: '我的应用',
                hide: false,
                component: makeComponent('./components/page/apps/Applist.vue')
            },
            '/new/:imageId': {
                name: 'newappwithimageid',
                label: '创建应用',
                hide: true,
                component: makeComponent('./components/page/apps/NewApp.vue')
            },
            '/detail/:containerId': {
                name: 'appdetail',
                label: '应用详情',
                hide: true,
                component: makeComponent('./components/page/apps/Details.vue')
            },
            '/detail': {
                name: 'appdetail_without_id',
                label: '应用详情',
                hide: true,
                component: makeComponent('./components/page/apps/Details.vue')
            },
            // '/volumes': {
            //     name: 'volumes',
            //     label: '我的数据卷',
            //     hide: false,
            //     component: makeComponent('./components/page/services/Volumes.vue')
            // },
            '/volumes/:volumeId': {
                name: 'volumesdetails',
                label: '数据卷详情',
                hide: true,
                component: makeComponent('./components/page/services/volumes/VolumesDetails.vue')
            }
        }
    },
    '/services': {
        icon: 'briefcase',
        label: '镜像服务',
        isShowSubMenu: false,
        hide: false,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/list': {
                name: 'serviceslist',
                label: '镜像列表',
                hide: false,
                component: makeComponent('./components/page/services/ServicesList.vue')
            },
            '/volumes/new': {
                name: 'newvolumes',
                label: '创建数据卷',
                hide: true,
                component: makeComponent('./components/page/services/NewVolumes.vue')
            }
        }
    },
    '/accounts': {
        name: 'accounts',
        label: '用户中心',
        icon: 'cog',
        isShowSubMenu: false,
        hide: false,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/account': {
                name: 'account',
                label: '账户信息',
                hide: true,
                component: makeComponent('./components/page/accounts/Account.vue')
            },
            '/profile': {
                name: 'profile',
                label: '个人信息',
                hide: false,
                component: makeComponent('./components/page/accounts/Profile.vue')
            },
            '/orders': {
                name: 'orders',
                label: '交易记录',
                hide: false,
                component: makeComponent('./components/page/accounts/Orders.vue')
            },
            '/messages': {
                name: 'messages',
                label: '我的消息',
                hide: false,
                component: makeComponent('./components/page/accounts/Messages.vue')
            },
            '/teams': {
                name: 'teams',
                label: '我的组织',
                hide: true,
                component: makeComponent('./components/page/accounts/Team.vue')
            },
            '/oauth': {
                name: 'oauth',
                label: '登录授权',
                hide: true,
                component: makeComponent('./components/page/accounts/Oauth.vue')
            },
            '/login': {
                name: 'login',
                label: '登录',
                hide: true,
                component: makeComponent('./components/page/accounts/Login.vue')
            },
            '/signup': {
                name: 'signup',
                label: '注册',
                hide: true,
                component: makeComponent('./components/page/accounts/Signup.vue')
            },
            '/register': {
                name: 'signupa',
                label: '注册',
                hide: true,
                component: makeComponent('./components/page/accounts/Register.vue')
            }
        }
    },
    '/components': {
        icon: 'laptop',
        label: '组件',
        isShowSubMenu: false,
        hide: true,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/buttons': {
                name: 'Buttons',
                label: 'Buttons',
                hide: false,
                component: makeComponent('./components/page/components/Buttons.vue')
            },
            '/icons': {
                name: 'Icons',
                label: 'Icons',
                hide: false,
                component: makeComponent('./components/page/components/Icons.vue')
            },
            '/content': {
                name: 'content',
                label: 'Content',
                hide: false,
                component: makeComponent('./components/page/components/Content.vue')
            },
            '/form': {
                name: 'form',
                label: 'Form',
                hide: false,
                component: makeComponent('./components/page/components/Form.vue')
            },
            '/file-input': {
                name: 'file-input',
                label: 'File input',
                hide: false,
                component: makeComponent('./components/page/components/FileInput.vue')
            },
            '/tab': {
                name: 'tab',
                label: 'Tab',
                hide: false,
                component: makeComponent('./components/page/components/Tabs.vue')
            },
            '/modal': {
                name: 'modal',
                label: 'Modal',
                hide: false,
                component: makeComponent('./components/page/components/Modals.vue')
            }
        }
    },
    '/grid': {
        isShowSubMenu: false,
        icon: 'table',
        name: 'grid',
        label: '布局',
        hide: true,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/columns': {
                name: 'columns',
                label: 'Columns',
                hide: false,
                component: makeComponent('./components/page/grids/Columns.vue')
            },
            '/tile': {
                name: 'tile',
                label: 'Tile',
                hide: false,
                component: makeComponent('./components/page/grids/Tile.vue')
            },
            '/table': {
                name: 'table',
                label: 'Table',
                hide: false,
                component: makeComponent('./components/page/grids/Table.vue')
            },
            '/flex': {
                name: 'flex',
                label: 'Flex',
                hide: false,
                component: makeComponent('./components/page/grids/Flex.vue')
            }
        }
    },
    // '/filters': {
    //     isShowSubMenu: false,
    //     label: 'Filter',
    //     icon: 'briefcase',
    //     component: {
    //         template: '<router-view></router-view>'
    //     },
    //     subRoutes: {
    //         '/filter-by': {
    //             label: 'Filter By',
    //             name: 'filter-by',
    //             component: makeComponent('./components/page/filters/FilterBy.vue')
    //         },
    //         '/order-by': {
    //             label: 'Order By',
    //             name: 'order-by',
    //             component: makeComponent('./components/page/filters/OrderBy.vue')
    //         }
    //     }
    // },
    // '/animation': {
    //     label: 'Animation',
    //     isShowSubMenu: false,
    //     icon: 'cog',
    //     component: {
    //         template: '<router-view></router-view>'
    //     },
    //     subRoutes: {
    //         '/keyframes': {
    //             name: 'keyframes',
    //             label: 'Keyframes',
    //             component: makeComponent('./components/page/animation/Keyframes.vue')
    //         },
    //         '/transition': {
    //             name: 'transition',
    //             label: 'Transition',
    //             component: makeComponent('./components/page/animation/Transition.vue')
    //         }
    //     }
    // },
    '/charts': {
        label: '图表',
        icon: 'bar-chart',
        name: 'charts',
        isShowSubMenu: false,
        hide: true,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/pie': {
                label: 'Pie',
                name: 'pie',
                hide: false,
                component: makeComponent('./components/page/charts/Pie.vue')
            },
            '/bar': {
                label: 'Bar',
                name: 'bar',
                hide: false,
                component: makeComponent('./components/page/charts/Bar.vue')
            },
            '/line': {
                label: 'Line',
                name: 'line',
                hide: false,
                component: makeComponent('./components/page/charts/Line.vue')
            },
            '/radar': {
                label: 'Radar',
                name: 'radar',
                hide: false,
                component: makeComponent('./components/page/charts/Radar.vue')
            },
            '/doughnut': {
                label: 'Doughnut',
                name: 'doughnut',
                hide: false,
                component: makeComponent('./components/page/charts/Doughnut.vue')
            }, '/polar': {
                label: 'Polar Area',
                name: 'polar',
                hide: false,
                component: makeComponent('./components/page/charts/PolarArea.vue')
            }
        }
    }
}
export {menu}
