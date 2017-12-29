<template>
    <el-aside :width="asideWidth" class="tree-parent">
        <header class="panel-header">
            <span v-show="show">监测点树面板</span>
            <svg-icon icon-class="arrow-left" :class-name="rotate" @click.native="toggle"></svg-icon>
        </header>
        <transition name="fade">
            <div v-if="show" class="tree-panel">
                <el-date-picker v-if="timeTool" @change="timeSelect" :style="pickerWidth" v-model="value" size="mini" :type="timeTool" :picker-options="options" range-separator="至" start-placeholder="开始时间" end-placeholder="结束日期" align="right"></el-date-picker>
                <m-tree :data="data" style="margin-top: 10px;" @point-select="pointSelect" :multi-select="multiSelect"></m-tree>
            </div>
        </transition>
    </el-aside>
</template>

<script>
    import MTree from './Tree.vue'
    import moment from 'moment'

    export default {
        name: 'gxTree',
        components: {
            MTree
        },
        computed: {
            rotate() {
                return this.show ? 'arrow-icon' : 'arrow-icon rotate';
            },
            pickerWidth() {
                const style = {
                    width: '200px'
                }
                if(this.timeTool === 'datetimerange' || this.timeTool === 'daterange') {
                    style.width = '350px';
                    this.value = [new Date(),new Date()];
                }
                return style;
            }
        },
        props: {
            data: {
                type: Array,
                default: []
            },
            timeTool: {
                type: String,
                default: null
            },
            multiSelect: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                show: true,
                btnText: '收缩',
                asideWidth: '350px',
                value: new Date(),  //缓存时间
                node: null,  //缓存监测点信息
                nodeId: null,  //缓存监测点ID
                options: {
                    shortcuts: [{
                        text: '最近三天'
                    }, {
                        text: '最近一个月'
                    }]
                }
            }
        },
        methods: {
            pointSelect(data, nodeId) {
                this.node = data;
                this.nodeId = nodeId;
                this.bubble(nodeId, data, this.value);
            },
            timeSelect(value) {
                this.bubble(this.nodeId, this.node, value);
            },
            /**
             * @param nodeId 监测点ID或ID组
             * @param node 监测点信息或监测点信息组
             * @param date 所选时间或时间组
             */
            bubble(nodeId, node, date) {
                //判断是否精确选择到时分秒
                if(this.timeTool === 'datetime' || this.timeTool === 'datetimerange') {
                    if(date instanceof Array) {  //为数组则是时间范围
                        date[0] = `${moment(date[0]).format('YYYY-MM-DD HH:mm:ss')}`;  //开始
                        date[1] = `${moment(date[1]).format('YYYY-MM-DD HH:mm:ss')}`;  //结束
                    }else {
                        date = moment(date).format('YYYY-MM-DD');
                    }
                }else {
                    if(date instanceof Array) {  //为数组则是时间范围
                        date[0] = `${moment(date[0]).format('YYYY-MM-DD')} 00:00:00`;
                        date[1] = `${moment(date[1]).format('YYYY-MM-DD')} 23:59:59`;
                    }else {
                        date = moment(date).format('YYYY-MM-DD');
                    }
                }

                this.$emit('select', nodeId, node, date);
            },
            toggle() {
                this.asideWidth = this.show ? '35px' : '350px';
                this.show = !this.show;
                this.btnText = this.show ? '收缩' : '';
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s ease-in-out;
    }
    .fade-enter,
    .fade-leave-to {
        width: 0;
    }
    .tree-parent {
        position: relative;
    }
    .tree-panel {
        position: absolute;
    }
    .panel-header {
        height: 35px;
        padding: 10px;
        margin-bottom: 5px;
        color: #fff;
        border-radius: 5px;
        background-color: #409EFF;
    }
    .rotate {
        transform: rotate(180deg);
    }
    .arrow-icon {
        float: right;
        cursor: pointer;
    }
</style>
