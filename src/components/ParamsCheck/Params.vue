<template>
    <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="toggleChangeAll">全选</el-checkbox>
        <div style="margin: 10px 0;border: 1px solid #eee;"></div>
        <el-checkbox-group v-model="checkedParams" @change="checkedBox">
            <el-checkbox class="panel-main" v-for="param in params" :label="param" :key="param">{{param}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>

    export default {
        name: 'paramsPanel',
        props: {
            params: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                checkAll: false,
                checkedParams: ['三相电压'],
                isIndeterminate: true
            }
        },
        methods: {
            toggleChangeAll(val) {
                this.checkedParams = val ? this.params : [];
                this.isIndeterminate = false;
                if(val) {  //全选
                    this.$emit('param-select', this.params);
                }else {
                    this.$emit('param-select', []);
                }
            },
            checkedBox(val) {
                let checkedCount = val.length;
                this.checkAll = checkedCount === this.params.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.params.length;
                this.$emit('param-select', val);
            }
        }
    }
</script>

<style scoped>
.panel-main {
    margin-bottom: 10px;
}
</style>

