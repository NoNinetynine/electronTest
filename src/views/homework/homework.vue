<template>
    <backBtn></backBtn> 

    <div class="total">
        <el-card class="card">
            <div class="title">作业</div>
            <div class="btnGroup">
                <el-button type="primary" plain size="large" @click="danxun">单选题</el-button>
                <el-button type="primary" plain size="large" @click="duoxuan">多选题</el-button>
                <el-button type="primary" plain size="large" @click="jianda">简答题</el-button>
            </div>
            <div class="qLists">
                <div class="qList" v-for="(item, index) in qLists" :key="index">
                    <div v-if="item.type === '1'">
                        <div>{{ index + 1 }}.作业题目（单选）
                            <el-button type="danger" text @click="delQ(item,index)">删除</el-button>
                        </div>
                        <div>
                            <el-input v-model="item.qTitle" show-word-limit maxlength="200"></el-input>
                        </div>
                        <div>
                            设置选项：<el-button type="primary" text @click="addOption(item)">添加</el-button>
                        </div>
                        <div class="options" v-for="(option, index) in item.options" :key="index">
                            <el-input v-model="option.optionContent"></el-input>
                            <el-button type="danger" text @click="delOption(item, option)">删除</el-button>
                        </div>
                    </div>
                    <div v-else-if="item.type === '2'">
                        <div>{{ index + 1 }}.作业题目（多选）</div>
                        <div>
                            <el-input v-model="item.qTitle" show-word-limit maxlength="200"></el-input>
                        </div>
                        <div>
                            设置选项：<el-button type="primary" text @click="addOption(item)">添加</el-button>
                        </div>
                        <div class="options" v-for="(option, index) in item.options" :key="index">
                            <el-input v-model="option.optionContent"></el-input>
                            <el-button type="danger" text @click="delOption(item, option)">删除</el-button>
                        </div>
                    </div>
                    <div v-else>
                        <div>{{ index + 1 }}.作业题目（简答）</div>
                        <el-input v-model="item.qTitle" show-word-limit maxlength="200"></el-input>
                    </div>
                </div>
            </div>
            <div class="footer">
                <el-button type="success" size="large" @click="submit">提交</el-button>
            </div>
        </el-card>
        <el-card class="card">
            <div class="title">展示</div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import backBtn from '../commponent/backBtn.vue'

const qLists = ref([]);
const qIndex = ref(0)
const danxun = () => {
    const qTitle = '';
    const type = '1';
    const options = [];
    const optionIndex = 0;
    const question = {
        qTitle,
        type,
        options,
        optionIndex
    }
    qLists.value.push(question);
}

const duoxuan = () => {
    const qTitle = '';
    const type = '2';
    const options = [];
    const optionIndex = 0;
    const question = {
        qTitle,
        type,
        options,
        optionIndex
    }
    qLists.value.push(question);
}

const jianda = () => {
    const qTitle = '';
    const type = '3';
    const options = [];
    const optionIndex = 0;
    const question = {
        qTitle,
        type,
        options,
        optionIndex
    }
    qLists.value.push(question);
}

const delQ = (item, index) => {
    // console.log(index);
    qLists.value.splice(index, 1);
}

const addOption = (item) => {
    console.log(item);
    const optionContent = '';
    item.optionIndex++;
    const index = item.optionIndex;
    const option = {
        optionContent,
        index
    }

    item.options.push(option);
}

const delOption = (item, option) => {
    console.log(item, option);
    for (let i = 0; i < item.options.length; i++) {
        if (item.options[i].index === option.index) {
            item.options.splice(i, 1)
        }
    }

}

const submit = () => {
    console.log(qLists.value);
}


</script>

<style scoped>
.total {
    width: 100%;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
}

.card {
    width: 48%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}

.title {
    width: 100%;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    margin-top: 20px
}

.btnGroup {
    width: 100%;
    text-align: center;
    margin-top: 20px
}

.qLists {
    width: 500px;
    min-height: 200px;
    max-height: 600px;
    overflow: auto;
    margin-top: 20px;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
}

.qList {
    width: 80%;
    margin: 10px;
}

.options {
    display: flex;
    margin: 10px;
}

.footer{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

</style>