<template>
    <ul>
        <template v-for="(key,item) in model">
            <li v-show="!item.hide">
                <a v-link ="{name: item.name, exact: true }" :title="item.label" @click="toggleShowSubMenu(item,$event)">
                    <i :class="['icon','fa','fa-' + item.icon]" v-if="item.icon">
                    </i><span class="label">{{item.label}}</span>
                    <i :class="['collapse','fa', 'fa-angle-left','f-right',{'expanded':item.isShowSubMenu}]"
                       v-if="item.subRoutes"
                    ></i>
                </a>
            </li>
            <template v-if="item.subRoutes">
                <li class="sub-menu" v-show="item.isShowSubMenu"
                    transition = "slide">
                    <navi :model="item.subRoutes" :collapsed.sync="collapsed"></navi>
                </li>
            </template>
        </template>
    </ul>
</template>
<style lang="scss">
    $fa-font-path: "~font-awesome/fonts/";
    @import "~font-awesome/scss/font-awesome";
    .slide-transition {
        position: relative;
        transition: all .5s;
    }

    .slide-enter, .slide-leave {
        opacity: 0;
        height: 0;
    }

</style>
<script>
    export default{
        name: 'navi',
        props: {
            model: {
                type: Object,
                required: true,
                default: function () {
                    return {
                    }
                }
            },
            collapsed: {
                type: Boolean,
                required: true
            }
        },
        data () {
            return {}
        },
        methods: {
            toggleShowSubMenu (item, $event) {
                if (item.subRoutes) {
                    item.isShowSubMenu = !item.isShowSubMenu;
                    this.collapsed = !this.collapsed;
                    $event.preventDefault()
                    $event.stopPropagation()
                }

                if (item.subRoutes && this.collapsed) {
                    this.collapsed = !this.collapsed;
                }
            }
        }
    }
</script>
