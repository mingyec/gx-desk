<template>
    <div>
        <h1>时间选择控件demo</h1>
        <p-tree :data="treeData" time-tool="daterange" @select="select" multi-select></p-tree>
    </div>
</template>

<script>
    import PTree from '@/components/Tree/Index.vue'

    export default {
        components: {
            PTree
        },
        methods: {
            select(data,value) {
                console.info(data);
                console.info(value);
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
