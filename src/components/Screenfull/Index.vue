<template>
    <div>
        <svg-icon icon-class="fullscreen" @click.native="click"></svg-icon>
    </div>
</template>

<script>
    import screenfull from 'screenfull'

    export default {
        name: 'screenfull',
        props: {
            width: {
                type: Number,
                default: 22
            },
            height: {
                type: Number,
                default: 22
            },
            fill: {
                type: String,
                default: '#48576a'
            }
        },
        data() {
            return {
                isFullscreen: false
            }
        },
        methods: {
            click() {
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
<style scoped>
.screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
}
</style>
