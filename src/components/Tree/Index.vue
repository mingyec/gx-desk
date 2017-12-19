<template>
    <div>
        <el-date-picker @change="timeSelect" :style="pickerWidth" v-model="value" size="mini" :type="timeTool" :picker-options="options" range-separator="至" start-placeholder="开始时间" end-placeholder="结束日期" align="right"></el-date-picker>
        <m-tree :data="data" style="margin-top: 10px;" @point-select="pointSelect" :multi-select="multiSelect"></m-tree>
    </div>
</template>

<script>
    import MTree from './Tree.vue'

    export default {
        name: 'gxTree',
        components: {
            MTree
        },
        computed: {
            pickerWidth() {
                const style = {
                    width: '150px',
                    'margin-left': '10px'
                }
                if(this.timeTool === 'datetimerange' || this.timeTool === 'daterange') {
                    style.width = '300px';
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
                default: 'date'
            },
            multiSelect: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                value: [new Date(),new Date()],  //缓存时间
                node: null,  //缓存监测点信息
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
            pointSelect(data) {
                this.node = data;
                this.$emit('select', data, this.value);
            },
            timeSelect(value) {
                this.$emit('select', this.node, value)
            }
        }
    }
</script>
