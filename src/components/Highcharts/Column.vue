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

    export default {
        name: 'columnChart',
        props: {
            title: {
                type: String,
                default: ''
            },
            //单位
            unit: {
                type: String,
                default: ''
            },
            //X轴名称
            xText: {
                type: String,
                default: '次数'
            },
            //图表高度，默认为300
            chartHeight: {
                type: String,
                default: '300px'
            },
            //数据列长度
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
            dialogOpen() {
                let series = this.chart.userOptions.series;
                let options = this.getOptions();
                options.series = series;
                setTimeout(() => {
                    this.maxChart = new highcharts.chart(this.$refs.maxChart, options);
                },0);

            },
            initChart() {
                let options = this.getOptions();
                this.chart = new highcharts.chart(this.$refs.chart, options)
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
                        marginTop: 5,
                        showAxes: true,
                        marginBottom: 75,
                        // plotBorderWidth: 1,
                        zoomType: 'x',
                        animation: {
                            duration: 1500,
                            easing: 'swing'
                        },
                        type: 'column'
                    },
                    title: {
                        text: null,
                        style: {
                            fontFamily: 'Arial 黑体',
                            fontSize: '16px',
                            color: '#757575',
                            fontWeight: 'bold'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: me.xText,
                            align: 'high',
                            style: {
                                fontFamily: 'Arial 黑体',
                                fontSize: '14px',
                                color: '#757575',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            enabled: true,  //是否显示x轴单位
                            style: {
                                fontFamily: 'Arial 黑体',
                                color: '#757575',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    yAxis: {
                        min:0,
                        title: {
                            text: `${me.title}${unit}`,
                            style: {
                                fontFamily: 'Arial 黑体',
                                fontSize: '14px',
                                color: '#757575',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            textalign: 'left',
                            x: -5,
                            overflow: 'justify',
                            format: '{value}',
                            style: {
                                fontFamily: 'Arial 黑体',
                                color: '#757575',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        },
                        series: {
                            dataLabels: {
                                allowOverlap: false,
                                enabled: false,  //是否显示数据标签
                                format: `{y}${unit}`,
                                style: {
                                    fontFamily: 'Arial 黑体',
                                    color: '#757575',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            const decimals = 2;
                            if(me.xText == '次数') {
                                return `<b>${this.point.name}次${name}</b><br/>
                                ${this.series.name}: ${this.y.toFixed(decimals)}${unit}`;
                            } else {
                                return `<b>${this.point.name}${name}</b><br/>
                                ${this.series.name}: ${this.y.toFixed(decimals)}${unit}`;
                            }
                        },
                        style: {
                            fontFamily: 'Arial 黑体',
                            color: '#757575',
                            fontSize: '14px'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        y:12,
                        align: 'center',
                        style: {
                            fontFamily: 'Arial 黑体',
                            color: '#757575',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    },
                    series: series
                }
            }
        }
    }
</script>
