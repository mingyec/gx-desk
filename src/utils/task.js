import Vue from 'vue'
//轮询间隔（ms）
const delay = 10000;

class TaskRunner {

    /**
     * 线程启动
     */
    static start() {
        this.timer = setInterval(() => {
            let tasks = this.tasks;
            for(let task in tasks) {
                let thread = tasks[task];
                thread();
            }
        }, delay);
    }

    /**
     * 退订
     * @param {string} name 订阅者
     */
    static remove(name) {
        if(this.tasks.hasOwnProperty(name)) {
            delete this.tasks[name];
        }
    }
}

TaskRunner.timer = null;  //线程标志
TaskRunner.tasks = {};  //订阅列表
TaskRunner.start();
Vue.prototype.$taskRunner = TaskRunner;

export default TaskRunner
