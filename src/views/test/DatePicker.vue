<template>
    <el-container class="app-main-container">
        <p-tree :data="treeData" time-tool="datetimerange" @select="select"></p-tree>
        <el-main>
            <p-header title="顶部标题"></p-header>
            <h1>时间选择控件demo</h1>
        </el-main>
    </el-container>
</template>

<script>
    import PTree from '@/components/Tree/Index.vue'
    import PHeader from '@/components/Header/Index.vue'

    export default {
        components: {
            PTree,
            PHeader
        },
        methods: {
            select(data,nodeID,time) {
                console.log(data,nodeID,time);
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
                defaultProps: {
                    children: 'children',
                    label: 'text'
                }
            }
        }
    }
</script>
