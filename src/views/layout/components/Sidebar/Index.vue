<template>
    <scroll-bar>
        <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409eff">
            <sidebar-item :routes="routes"></sidebar-item>
        </el-menu>
    </scroll-bar>
</template>

<script>
    import { mapGetters } from 'vuex'
    import ScrollBar from '@/components/Scrollbar'
    import SidebarItem from './SidebarItem'
    import { constantRouterMap } from '@/router'

    export default {
        data() {
            return {
                routes: constantRouterMap
            }
        },
        components: {SidebarItem, ScrollBar},
        computed: {
            ...mapGetters([
                'sidebar'
            ]),
            isCollapse() {
                console.info(this.sidebar.opened)
                return !this.sidebar.opened
            }
        }
    }
</script>
