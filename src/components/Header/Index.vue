<template>
    <header class="panel-header">
        <span v-text="title"></span>
        <slot name="popover"></slot>
        <slot name="btn"></slot>
    </header>
</template>

<script>
    export default {
        name: 'pHeader',
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
.panel-header {
    height: 35px;
    padding: 10px;
    margin-bottom: 5px;
    color: #fff;
    border-radius: 5px;
    background-color: #409EFF;
    margin-top: -20px;
}
</style>
