<template>
    <el-container class="app-main-container">
        <p-tree :data="treeData" time-tool="datetimerange" @select="select"></p-tree>
        <el-main>
            <p-header title="顶部标题">
                <el-popover slot="popover" ref="paramsbox" width="400" trigger="hover">
                    <params-checked @param-select="paramSelect" :params="params"></params-checked>
                </el-popover>
                <el-button icon="el-icon-menu" slot="btn" v-popover:paramsbox type="text" class="btn">参量选择</el-button>
            </p-header>
            <el-row :gutter="20">
                <spline-chart ref="demochart" :seriesLength="2" title="测试一" unit="V"></spline-chart>
                <spline-chart ref="demochart2" :seriesLength="3" title="测试2"></spline-chart>
                <column-chart ref="demochart3" :seriesLength="3" title="柱状图"></column-chart>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import PTree from '@/components/Tree/Index.vue'
    import PHeader from '@/components/Header/Index.vue'
    import ParamsChecked from '@/components/ParamsCheck/Params.vue'
    import SplineChart from '@/components/Highcharts/Spline.vue'
    import ColumnChart from '@/components/Highcharts/Column.vue'

    export default {
        components: {
            PTree,
            PHeader,
            ParamsChecked,
            SplineChart,
            ColumnChart
        },
        methods: {
            select(/* data,nodeID,time */) {
                let chart = this.$refs.demochart.chart;
                let chart2 = this.$refs.demochart2.chart;
                let chart3 = this.$refs.demochart3.chart;
                this.$http.get('rest/api/realtime/getRealtimeData', {
                    params: {
                        DeviceId:12001,
                        keys:{
                            electricalcurrent: null,
                            voltage: null,
                            voltageharmonious: null
                        },
                        standarnU:10000
                    }
                }).then(({data}) => {
                    chart.update({
                        series: [{
                            data: data.data.electricalcurrent.A
                        },{
                            data: data.data.electricalcurrent.B
                        }]
                    });
                    chart2.update({
                        series: [{
                            data: data.data.voltage.A
                        },{
                            data: data.data.voltage.B
                        },{
                            data: data.data.voltage.C
                        }]
                    });
                    /* 处理成柱状图 */
                    if(data.data) {
                        let voltageharmonious = data.data.voltageharmonious;
                        const offset = 2;
                        let chartData = {};
                        for(let key in voltageharmonious) {
                            chartData[key] = [];
                            for(let i = 0;i < voltageharmonious[key].length;i ++) {
                                chartData[key].push({
                                    name: `${i + offset}`,
                                    y: voltageharmonious[key][i]
                                })
                            }
                        }
                        chart3.update({
                            series: [{
                                data: chartData.A
                            },{
                                data: chartData.B
                            },{
                                data: chartData.C
                            }]
                        })
                    }


                })

            },
            paramSelect(params) {
                console.info(params);
            }
        },
        created() {
            this.$http.get('rest/api/tree/getNavTree', {
                params: {
                    CompanyId: '5',
                    RoomId: 61,
                    RoomName: '1#变压器',
                    ProdId: 1
                }
            }).then(({data}) => {
                let tree = data.mTree.ALL_TREE_STORE.children;
                this.treeData = tree;
            }).catch(err => {
                console.error(err);
            });


        },
        data() {
            return {
                treeData: null,
                params: ['三相电压', '电压偏差', '电压闪变', '频率'],
                defaultProps: {
                    children: 'children',
                    label: 'text'
                },
                chartData: null
            }
        }
    }
</script>

<style scoped>
.btn {
    color: #fff;
    float: right;
    margin-top: -12px;
}
</style>
