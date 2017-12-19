<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <breadcrumb class="breadcrumb-container"></breadcrumb>
        <div class="right-menu">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <i class="right-menu-item">
                    <svg-icon icon-class="fullscreen" @click.native="fullScreen"></svg-icon>
                </i>
            </el-tooltip>
            <el-tooltip effect="dark" content="中英文切换" placement="bottom">
                <i class="right-menu-item">
                    <svg-icon icon-class="language" @click.native="handleSetLanguage"></svg-icon>
                </i>
            </el-tooltip>
            <el-tooltip effect="dark" content="退出登录" placement="bottom">
                <i class="right-menu-item">
                    <svg-icon icon-class="logout"></svg-icon>
                </i>
            </el-tooltip>
        </div>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import screenfull from 'screenfull'

    export default {
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'name',
                'language'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            handleSetLanguage() {
                let lang = this.$i18n.locale;
                this.$i18n.locale = lang === 'zh' ? 'en' : 'zh';
                this.$store.dispatch('setLanguage', lang);
                this.$message({
                    message: '切换成功！',
                    type: 'success'
                })
            },
            logout() {
                console.info('登出')
            },
            fullScreen() {
                if(! screenfull.enabled) {
                    this.$message({
                        message: '当前浏览器不支持该操作！',
                        type: 'warning'
                    });
                    return false;
                }
                screenfull.toggle()
            }
        }
    }
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .breadcrumb-container {
        float: left;
    }
    .right-menu {
        float: right;
        height: 100%;
        &:focus {
            outline: none;
        }
        .right-menu-item {
            display: inline;
            margin: 0 8px;
        }
        .screenfull {
            height: 20px;
        }
        .international {
            vertical-align: top;
            .international-icon {
                font-size: 20px;
                cursor: pointer;
                vertical-align: -5px;
            }
        }
    }
}
</style>
