<template>
    <el-col class="chart-panel">
        <header class="panel-header">
            <span>{{title}}</span>
            <svg-icon icon-class="fullscreen" class-name="header-icon" @click.native="Maximize = true"></svg-icon>
        </header>
        <div :style="{height: chartHeight}" class="charts-container" ref="chart"></div>

        <el-dialog title="图表标题" :visible.sync="Maximize" @open="dialogOpen" width="80%">
            <div ref="maxChart" class="charts-container"></div>
        </el-dialog>
    </el-col>

</template>

<script>
    import highcharts from 'highcharts'
    import { syncExtremes } from './index'
    import moment from 'moment'

    const yTitleMargin9 = 9;
    const yTitleMargin50 = 50;
    const yLabelMargin15 = 15;
    const yLabelMargin9 = 9;
    const yLabelMargin35 = -35;

    export default {
        name: 'splineChart',
        props: {
            //图表高度
            chartHeight: {
                type: String,
                default: '300px'
            },
            //日期类型，决定时间轴显示的单位
            datetype: {
                type: String,
                default: 'day'
            },
            //图表名称
            title: {
                type: String,
                default: ''
            },
            //单位
            unit: {
                type: String,
                default: ''
            },
            //图表y轴数值的位数。如果是负数的话，负号占1位
            valueLength: {
                type: Number,
                default: 5
            },
            //小数点
            decimals: {
                type: Number,
                default: 2
            },
            seriesLength: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                chart: null,
                maxChart: null,
                Maximize: false
            }
        },
        mounted() {
            this.initChart();
        },
        methods: {
            /* Maximize() {
                const chart = this.chart;
                console.info(chart)
            }, */
            dialogOpen() {
                let series = this.chart.userOptions.series;
                let options = this.getOptions();
                console.info(series);
                console.info(options);
                console.info(this.$refs.maxChart)
                options.series = series;
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
                let me = this;
                let series = [];
                let unit = me.unit ? `（${this.unit}）` : '';
                for(let i = 0;i < this.seriesLength;i ++) {
                    series.push({});
                }
                return {
                    chart: {
                        showAxes: true,
                        type: 'spline',
                        marginTop: 5,
                        marginBottom: 60,
                        zoomType: 'x',
                        animation: {
                            duration: 1000,
                            easing: 'swing'
                        }
                    },
                    title: {
                        useHTML: true,
                        text: null,
                        floating: false,
                        style: {
                            fontSize: '18px',
                            fontFamily: 'Arial 黑体'
                        },
                        y: 5
                    },
                    legend: {
                        borderWidth: 0,
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        enabled: true,
                        y: 10,
                        floating: true
                    },
                    xAxis: [{
                        events: {
                            setExtremes: syncExtremes
                        },
                        title: {
                            margin: 3,
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
                            enabled: true,
                            rotation: -10,
                            y: 15,
                            style: {
                                fontFamily: 'Arial 黑体',
                                fontSize: '12px',
                                color: '#757575',
                            },
                            formatter: function() {
                                // const zoneOffset = -8;
                                if (me.datetype == 'day') {
                                    return moment(this.value).format('MM-DD HH:mm');
                                } else {
                                    return moment(this.value).format('HH:mm:ss')
                                }
                            }
                        }
                    }],
                    yAxis: {
                        title: {
                            text: `${me.title}${unit}`,
                            margin: me.valueLength ? me.valueLength* yTitleMargin9 : yTitleMargin50,
                            style: {
                                fontFamily: 'Arial 黑体',
                                fontSize: '14px',
                                color: '#757575',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            align: 'left',
                            x: me.valueLength ? yLabelMargin15 - (me.valueLength * yLabelMargin9) : yLabelMargin35,
                            // format: '{value}',
                            formatter: function() {
                                let intValueLength = this.value.toFixed(0).length;
                                let result;
                                if (intValueLength > 0 && intValueLength <= me.valueLength) {
                                    result = this.value.toFixed(me.valueLength - intValueLength);
                                } else {
                                    result = this.value;
                                }
                                return result;
                            },
                            style: {
                                fontFamily: 'Arial 黑体',
                                fontSize: '12px',
                                color: '#757575',
                            }
                        }
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                radius: 0
                            }
                        }
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true,
                        valueDecimals: me.decimals,
                        useHTML: true,
                        xDateFormat: '%Y-%m-%d %H:%m:%S',
                        pointFormat: `<span style="color:{series.color}">{series.name}:</span>  <b>{point.y}</b>${me.unit}<br/>`,
                    },
                    credits: {
                        enabled: false
                    },
                    series: series
                }
            }
        }
    }
</script>
