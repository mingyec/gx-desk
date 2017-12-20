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
        </el-main>
    </el-container>
</template>

<script>
    import PTree from '@/components/Tree/Index.vue'
    import PHeader from '@/components/Header/Index.vue'
    import ParamsChecked from '@/components/ParamsCheck/Params.vue'

    export default {
        components: {
            PTree,
            PHeader,
            ParamsChecked
        },
        methods: {
            select(data,nodeID,time) {
                console.log(data,nodeID,time);
            },
            paramSelect(params) {
                console.info(params);
            }
        },
        created() {
            this.$http.get('rest/api/tree/getNavTree', {
                params: {
                    CompanyId: '5',
                    RoomId: 56,
                    RoomName: '1#变压器',
                    ProdId: 1
                }
            }).then(({data}) => {
                let tree = data.mTree.ALL_TREE_STORE.children;
                this.treeData = tree;
            }).catch(err => {
                console.error(err);
            })
        },
        data() {
            return {
                treeData: null,
                params: ['三相电压', '电压偏差', '电压闪变', '频率'],
                defaultProps: {
                    children: 'children',
                    label: 'text'
                }
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
