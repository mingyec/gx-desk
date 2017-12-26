<template>
    <div>
        <div v-for="item in data" :key="item.id">
            <div class="node" @click="select(item)">
                <svg-icon v-if="!item.leaf" icon-class="caret-right" class-name="expand-icon" :class-name="isActived(item)" @click.native.stop="expand(item)"></svg-icon>
                <div v-else class="space-null"></div>
                <label v-if="item.checked != null" role="checkbox" class="el-checkbox" :class="{'is-checked': item.checked}">
                    <span class="el-checkbox__input" :class="{'is-checked': item.checked}" aria-checked="mixed">
                        <span @click="select(item)" class="el-checkbox__inner"></span>
                        <input type="checkbox" class="el-checkbox__original" />
                    </span>
                </label>
                <svg-icon :icon-class="getIcon(item)" style="color: #409EFF;"></svg-icon>
                <span>{{item.text}}</span>
            </div>
            <el-collapse-transition>
                <m-tree @point-select="pointSelect" class="tree" v-if="item.children && item.children.length > 0" :data="item.children" :multi-select="multiSelect"></m-tree>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
    import { debounce } from '@/utils'

    export default {
        name: 'MTree',
        data() {
            return {
                lastSelect: null,  //最后一次选择的点
                nodes: [],  //缓存选择过的节点
                nodeIds: []  //缓存选择过的节点ID
            }
        },
        destroyed() {
            //为了触发highcharts的自适应
            window.dispatchEvent(new Event('resize'));
        },
        mounted() {
            let data = this.data;
            let lastSelect = this.lastSelect;
            //默认勾选第一个
            if(data && data.length > 0) {
                for(let i = 0;i < data.length; i ++) {
                    if(data[i].leaf && i === 0 && !lastSelect) {
                        data[i].checked = true;
                        this.lastSelect = data[i];
                        //多选状态格式匹配
                        if(this.multiSelect) {
                            this.$emit('point-select',[data[i]], [data[i].id]);
                        }else {
                            this.$emit('point-select',data[i], data[i].id);
                        }
                    }
                }
            }
            window.dispatchEvent(new Event('resize'));
        },
        props: {
            data: {
                type: Array,
                default: []
            },
            multiSelect: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            isActived(item) {
                return item.expanded ? 'active' : '';
            },
            getIcon(item) {
                let isLeaf = item.leaf;
                if(! isLeaf) {
                    return item.expanded ? 'folder-open-o' : 'folder-o';
                }
                return 'file-o';
            },
            select(item) {
                //缓存选择的点
                if(this.lastSelect && item.leaf && !this.multiSelect) {
                    this.lastSelect.checked = false;
                }
                this.lastSelect = item;

                //有checked属性表示有复选框
                if(item.hasOwnProperty('checked')) {
                    item.checked = !item.checked;
                }else {
                    //若没有[checked]属性且不是[多选状态]则点击可展开/收缩节点
                    item.expanded = !item.expanded;
                }

                //多选状态下调用去抖动函数
                if(this.multiSelect) {
                    const delay = 2000;
                    this.nodes.push(item);
                    this.nodeIds.push(item.id);
                    debounce(this.debounceFn, delay)();
                }else {  //单选时直接传递值
                    this.pointSelect(item, item.id)
                }
            },
            debounceFn() {
                this.pointSelect(this.nodes, this.nodeIds);
                this.nodes = [];
                this.nodeIds = [];
            },
            pointSelect(item, itemId) {
                //非多选状态
                if(!this.multiSelect && item.leaf) {
                    this.$emit('point-select',item, itemId);
                }
                if(this.multiSelect) {
                    this.$emit('point-select',item, itemId);
                }
            },
            expand(item) {
                item.expanded = item.expanded ? false : true;
            }
        }
    }
</script>

<style lang="scss" scoped>
.tree {
    padding-left: 20px;
    /* height: 100%; */
}
.node {
    cursor: pointer;
    // margin-left: 10px;
    padding: 5px 0;
}
.space-null {
    display: inline-block;
    width: 1em;
    height: 1em;
}
.expand-icon {
    cursor: pointer;
}
.active {
    transform: rotate(90deg);
    transition: transform .3s ease-in-out;
}
.no-active {
    overflow: hidden;
    height: 0;
    transition:.3s all;
}
</style>

