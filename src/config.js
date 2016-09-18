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
        component: makeComponent('./components/page/Dashboard.vue')
    },
    '/ide': {
        icon: 'connectdevelop',
        label: '集成开发环境',
        isShowSubMenu: false,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/visit': {
                name: 'visitide',
                label: '访问',
                component: makeComponent('./components/page/ide/Visit.vue')
            },
            '/renew': {
                name: 'renewide',
                label: '续费',
                component: makeComponent('./components/page/ide/Renew.vue')
            }

        }
    },
    '/apps': {
        icon: 'laptop',
        label: '应用管理',
        isShowSubMenu: false,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/list': {
                name: 'applist',
                label: '应用列表',
                component: makeComponent('./components/page/apps/Applist.vue')
            },
            '/new': {
                name: 'newapp',
                label: '创建应用',
                component: makeComponent('./components/page/apps/NewApp.vue')
            }

        }
    },
    '/services': {
        icon: 'briefcase',
        label: '服务集成',
        isShowSubMenu: false,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/list': {
                name: 'serviceslist',
                label: '服务列表',
                component: makeComponent('./components/page/services/ServicesList.vue')
            },
            '/new': {
                name: 'myservices',
                label: '我的服务',
                component: makeComponent('./components/page/services/MyService.vue')
            }

        }
    },
    '/accounts': {
        name: 'accounts',
        label: '用户中心',
        icon: 'cog',
        isShowSubMenu: false,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/account': {
                name: 'account',
                label: '账户信息',
                component: makeComponent('./components/page/accounts/Account.vue')
            },
            '/profile': {
                name: 'profile',
                label: '个人信息',
                component: makeComponent('./components/page/accounts/Profile.vue')
            },
            '/orders': {
                name: 'orders',
                label: '交易记录',
                component: makeComponent('./components/page/accounts/Orders.vue')
            },
            '/teams': {
                name: 'teams',
                label: '我的组织',
                component: makeComponent('./components/page/accounts/Team.vue')
            },
            '/oauth': {
                name: 'oauth',
                label: '登录绑定',
                component: makeComponent('./components/page/accounts/Oauth.vue')
            }
        }
    },
    '/components': {
        icon: 'laptop',
        label: '组件',
        isShowSubMenu: false,
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/buttons': {
                name: 'Buttons',
                label: 'Buttons',
                component: makeComponent('./components/page/components/Buttons.vue')
            },
            '/icons': {
                name: 'Icons',
                label: 'Icons',
                component: makeComponent('./components/page/components/Icons.vue')
            },
            '/content': {
                name: 'content',
                label: 'Content',
                component: makeComponent('./components/page/components/Content.vue')
            },
            '/form': {
                name: 'form',
                label: 'Form',
                component: makeComponent('./components/page/components/Form.vue')
            },
            '/file-input': {
                name: 'file-input',
                label: 'File input',
                component: makeComponent('./components/page/components/FileInput.vue')
            },
            '/tab': {
                name: 'tab',
                label: 'Tab',
                component: makeComponent('./components/page/components/Tabs.vue')
            },
            '/modal': {
                name: 'modal',
                label: 'Modal',
                component: makeComponent('./components/page/components/Modals.vue')
            }
        }
    },
    '/grid': {
        isShowSubMenu: false,
        icon: 'table',
        name: 'grid',
        label: '布局',
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/columns': {
                name: 'columns',
                label: 'Columns',
                component: makeComponent('./components/page/grids/Columns.vue')
            },
            '/tile': {
                name: 'tile',
                label: 'Tile',
                component: makeComponent('./components/page/grids/Tile.vue')
            },
            '/table': {
                name: 'table',
                label: 'Table',
                component: makeComponent('./components/page/grids/Table.vue')
            },
            '/flex': {
                name: 'flex',
                label: 'Flex',
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
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/pie': {
                label: 'Pie',
                name: 'pie',
                component: makeComponent('./components/page/charts/Pie.vue')
            },
            '/bar': {
                label: 'Bar',
                name: 'bar',
                component: makeComponent('./components/page/charts/Bar.vue')
            },
            '/line': {
                label: 'Line',
                name: 'line',
                component: makeComponent('./components/page/charts/Line.vue')
            },
            '/radar': {
                label: 'Radar',
                name: 'radar',
                component: makeComponent('./components/page/charts/Radar.vue')
            },
            '/doughnut': {
                label: 'Doughnut',
                name: 'doughnut',
                component: makeComponent('./components/page/charts/Doughnut.vue')
            }, '/polar': {
                label: 'Polar Area',
                name: 'polar',
                component: makeComponent('./components/page/charts/PolarArea.vue')
            }
        }
    }
}
export {menu}
