<template>
    <el-col class="chart-panel">
        <header class="panel-header">
            <span>{{title}}</span>
            <svg-icon icon-class="fullscreen" class-name="header-icon" @click.native="Maximize = true"></svg-icon>
        </header>
        <div :style="{height: chartHeight}" class="charts-container" ref="chart"></div>

        <el-dialog :title="title" :visible.sync="Maximize" @open="dialogOpen" width="80%">
            <div ref="maxChart" class="charts-container"></div>
        </el-dialog>
    </el-col>
</template>

<script>
    import highcharts from 'highcharts'
    import { syncExtremes } from './index'
    import moment from 'moment'

    export default {
        name: 'powerFactor',
        data() {
            return {
                chart: null,
                maxChart: null,
                Maximize: false
            }
        },
        props: {
            //图表名称
            title: {
                type: String,
                default: ''
            },
            //图表高度
            chartHeight: {
                type: String,
                default: '300px'
            },
            legend: {
                type: Object,
                default: null
            }
        },
        mounted() {
            this.initChart();
        },
        methods: {
            dialogOpen() {
                let series = this.chart.series;
                let options = this.getOptions();
                let chartData = [];
                for(let item of series) {
                    chartData.push({
                        data: item.options.data,
                        name: item.options.name
                    });
                }
                options.series = chartData;
                options.xAxis[0].events = null;
                setTimeout(() => {
                    this.maxChart = new highcharts.chart(this.$refs.maxChart, options);
                },0);

            },
            initChart() {
                let options = this.getOptions();
                this.chart = new highcharts.chart(this.$refs.chart, options);
            },
            getOptions() {
                return {
                    chart: {
                        showAxes: true,
                        type: 'spline',
                        marginTop: 5,
                        marginBottom : 60,
                        plotBorderWidth: 1,
                        zoomType: 'x',
                        animation: {
                            duration: 1000,
                            easing: 'swing'
                        }
                    },
                    legend: {
                        y:12,
                        style: {
                            fontFamily: 'Arial 黑体',
                            color: '#757575',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    },
                    title: {
                        useHTML: true,
                        text: '<font color="red"><b>感性:0.9 </b></font><font color="green"><b>感性:0.95 </b></font><font color="blue"><b>容性:0.95 </b></font><font color="black"><b>容性:0.9 </b></font>',
                        style: {
                            fontSize: '12px'
                        },
                        y: 5
                    },
                    xAxis: [{
                        events: {
                            setExtremes: syncExtremes
                        },
                        title: {
                            text: '时间',
                            align: 'high',
                            style: {
                                fontFamily: 'Arial 黑体',
                                fontSize: '14px',
                                color: '#757575',
                                fontWeight: 'bold'
                            }
                        },
                        type: 'datetime',
                        labels: {
                            rotation: 8,
                            y: 15,
                            formatter: function () {
                                return moment(this.value).format('HH:mm:ss')
                            },
                            style: {
                                fontFamily: 'Arial 黑体',
                                color: '#757575',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }
                        }
                    }],
                    yAxis: {
                        title: {
                            text: '总功率因数',
                            style: {
                                fontFamily: 'Arial 黑体',
                                fontSize: '14px',
                                color: '#757575',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            formatter: function () {
                                let value;
                                const decimal = 3;
                                if (this.value >= 0) {
                                    value = (1 - this.value).toFixed(decimal);
                                } else {
                                    value = (-(0 - this.value - 1)).toFixed(decimal);
                                }
                                return value !== 'undefined' ? value : this.value;
                            },
                            style: {
                                fontFamily: 'Arial 黑体',
                                color: '#757575',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }
                        },
                        plotLines: [{
                            color: 'red',
                            value: 0.1,
                            width: 2,
                            dashStyle: 'dash',
                        }, {
                            color: 'green',
                            value: 0.05,
                            width: 2,
                            dashStyle: 'dash',
                        }, {
                            color: 'black',
                            value: -0.1,
                            width: 2,
                            dashStyle: 'dash',
                        }, {
                            color: 'blue',
                            value: -0.05,
                            width: 2,
                            dashStyle: 'dash',
                        }],
                        maxPadding: 0.25
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                radius: 0
                            },
                            lineWidth: 1.5
                        }
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true,
                        formatter: function () {
                            const decimal = 3;
                            let s = `<b>时间：${highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}</b>`;
                            this.points.forEach((point) => {
                                if(point.y >= 0) {
                                    s += `<br/><b>感性功率因数</b>：${(1 - point.y).toFixed(decimal)}`;
                                }else if(point.y < 0) {
                                    s += `<br/><b>容性功率因数</b>：${(-(0 - point.y - 1)).toFixed(decimal)}`;
                                }
                            });
                            return s;
                        },
                        style: {
                            fontFamily: 'Arial 黑体',
                            fontSize: '14px'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{}]
                }
            }
        }
    }
</script>
