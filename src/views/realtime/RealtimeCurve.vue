<template>
    <el-container class="app-main-container">
        <p-tree :data="treeData" time-tool="datetimerange" @select="select"></p-tree>
        <el-main>
            <!-- <p-header title="顶部标题"></p-header> -->
            <el-tabs v-model="activeTab" @tab-click="handleClick">
                <el-tab-pane label="常用参量" name="common">
                    <el-row :gutter="20">
                        <spline-chart ref="voltage" :legend="{A: 'A相电压',B: 'B相电压', C: 'C相电压'}" :seriesLength="3" title="三相电压" unit="V"></spline-chart>
                        <spline-chart ref="electricalcurrent" :legend="{A: 'A相电流',B: 'B相电流', C: 'C相电流'}" :seriesLength="3" title="三相电流" unit="A"></spline-chart>
                        <spline-chart ref="power" :legend="{A: 'A相功率',B: 'B相功率', C: 'C相功率', P0: '三相功率'}" :seriesLength="4" title="有功功率" unit="KW"></spline-chart>
                        <spline-chart ref="inductivepower" :legend="{A: 'A相无功功率',B: 'B相无功功率', C: 'C相无功功率', Q0: '三相无功功率'}" :seriesLength="4" title="无功功率" unit="KVar"></spline-chart>
                        <spline-chart ref="powerfactor" :legend="{PFT: '功率因数'}" :seriesLength="1" title="功率因数"></spline-chart>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="电能质量" name="power">
                    <el-row :gutter="20">
                        <spline-chart ref="frequency" :legend="{f: '频率'}" :seriesLength="1" title="频率" unit="Hz"></spline-chart>
                        <spline-chart ref="voltageOffset" :legend="{A: 'A相电压偏差',B: 'B相电压偏差', C: 'C相电压偏差'}" :seriesLength="3" title="电压偏差" unit="%"></spline-chart>
                        <spline-chart ref="imbalancyU" :legend="{NBPHu: '负序电压不平衡度',ZBPHu: '零序电压不平衡度'}" :seriesLength="2" title="电压不平衡度" unit="%"></spline-chart>
                        <spline-chart ref="imbalancyI" :legend="{NBPHi: '负序电流不平衡度',ZBPHi: '零序电流不平衡度'}" :seriesLength="2" title="电流不平衡度" unit="%"></spline-chart>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
    import PTree from '@/components/Tree/Index.vue'
    import PHeader from '@/components/Header/Index.vue'
    import SplineChart from '@/components/Highcharts/Spline.vue'

    export default {
        components: {
            PTree,
            PHeader,
            SplineChart
        },
        mounted() {
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
        methods: {
            select(nodeId, node) {
                this.tabChange = false;
                let reqCurves = {
                    electricalcurrent: null,
                    voltage: null,
                    inductivepower: null,
                    power: null,
                    powerfactor: null
                }
                if(this.activeTab === 'power') {
                    reqCurves = {
                        frequency: null,
                        voltageOffset: null,
                        imbalancy: null
                    }
                }
                this.requestParams = {
                    DeviceId: nodeId,
                    keys: reqCurves,
                    standarnU: node.standarnU
                }
                this.renderChart();
            },
            handleClick() {
                //不切换监测点的情况下触发一次
                if(!this.tabChange) {
                    this.tabChange = true;
                    if(this.activeTab === 'power') {
                        this.requestParams.keys = {
                            frequency: null,
                            voltageOffset: null,
                            imbalancy: null
                        }
                    }else {
                        this.requestParams.keys = {
                            electricalcurrent: null,
                            voltage: null,
                            inductivepower: null,
                            power: null,
                            powerfactor: null
                        }
                    }

                    this.renderChart();
                }
            },
            renderChart() {
                let params = this.requestParams;
                this.$http.get('rest/api/realtime/getRealtimeData', {
                    params: params
                }).then(({data}) => {
                    const refs = this.$refs;
                    let reqParams = params.keys;
                    for(let ref in reqParams) {
                        //特殊处理不平衡度
                        if(ref === 'imbalancy') {
                            this.renderImbalancy(data.data[ref]);
                            continue;
                        }
                        let chart = refs[ref].chart;
                        let chartData = data.data[ref];
                        let series = [];
                        let legend = refs[ref].legend;
                        for(let key in legend) {
                            series.push({
                                name: legend[key],
                                data: chartData[key]
                            })
                        }
                        chart.update({
                            series: series
                        })
                    }
                })
            },
            renderImbalancy(data) {
                let chartU = this.$refs.imbalancyU;
                let chartI = this.$refs.imbalancyI;
                chartU.chart.update({
                    series: [{
                        name: chartU.legend.NBPHu,
                        data: data.NBPHu
                    },{
                        name: chartU.legend.ZBPHu,
                        data: data.ZBPHu
                    }]
                });
                chartI.chart.update({
                    series: [{
                        name: chartI.legend.NBPHi,
                        data: data.NBPHi
                    },{
                        name: chartI.legend.ZBPHi,
                        data: data.ZBPHi
                    }]
                });
            }
        },
        data() {
            return {
                treeData: null,
                activeTab: 'common',
                requestParams: null,
                tabChange: false,
                defaultProps: {
                    children: 'children',
                    label: 'text'
                }
            }
        }
    }
</script>
