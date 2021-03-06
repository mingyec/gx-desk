import highcharts from 'highcharts'
import boost from 'highcharts/modules/boost'
import nodata from 'highcharts/modules/no-data-to-display'

nodata(highcharts)
boost(highcharts);

highcharts.setOptions({
    global: {
        useUTC: false
    },
    lang: {
        noData: '暂无数据'
    },
    colors: ['#E6A23C', '#67C23A', '#F56C6C', '#409EFF', '#409EFF', '#409EFF']
})

/**
 * 同步缩放效果
 */
function syncExtremes(e) {
    let thisChart = this.chart;
    if(e.trigger !== 'syncExtremes') {
        highcharts.each(highcharts.charts, chart => {
            if(chart && chart.options.chart.type === 'spline' && chart !== thisChart) {
                if(chart.xAxis[0].setExtremes) {
                    chart.xAxis[0].setExtremes(e.min,e.max, undefined, false, {
                        trigger: 'syncExtremes'
                    })
                }
            }
        })
    }
}

export default {}
export { syncExtremes }
