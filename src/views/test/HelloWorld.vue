<template>
  <div class="hello">
    <h1><svg-icon icon-class="example"></svg-icon>{{ msg }}</h1>
    <el-button type="primary" @click="change">切换中英文</el-button>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
// import {storage} from '../utils/storage'
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: this.$t('login')
        }
    },
    methods: {
        change() {
            //TODO 当前切换中英文只能重载页面？
            this.$i18n.locale = 'zh';
            this.$store.dispatch('setLanguage', 'zh')
            // storage.set('lang', 'en');
            console.info(this.$i18n);
            // this.$i18n.setLanguage('zh');
            // location.reload();
        }
    },
    created() {
        /* this.$http.get('rest/api/realtime/getMonitorData', {
            params: {
                DeviceId: '5001',
                StandarnU: '220'
            }
        }).then(function(res) {
            console.info(res);
        }).catch(function(err) {
            console.warn(err);
        }) */
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
