<template>
    <el-popover ref="paramsbox" width="400" trigger="hover">
        <params-panel :params="params"></params-panel>
    </el-popover>
</template>

<script>
    import ParamsPanel from './Params'

    export default {
        name: 'paramsCheck',
        components: {
            ParamsPanel
        },
        props: {
            params: {
                type: Array,
                default: []
            }
        }
    }
</script>
