<template>
  <backBtn></backBtn>

    <div class="total">
        <div class="box" :class="{ 'box-animaToR': isAnimating, 'box-animaToL': !isAnimating }" @click="startAnimation">
            <div v-if="!isTextAnimating">
                <span class="title" :class="{ 'title-animaT': isAnimating }">管理员登录</span>
                <el-icon class="right" :class="{ 'arrow-anima': !isAnimating, 'title-animaT': isAnimating }">
                    <Right />
                </el-icon>
            </div>

            <div v-else>
                <span class="title" :class="{ 'title-animaT': !isAnimating }">用户登录</span>
                <el-icon class="left" :class="{ 'arrow-anima': isAnimating, 'title-animaT': !isAnimating }">
                    <Back />
                </el-icon>
            </div>
        </div>

        <div class="login user">
            <div class="loginTitle">用户登录</div>
            <el-form :model="userInfo" label-width="auto" style="max-width: 600px">
                <el-form-item label="账号">
                    <el-input v-model="userInfo.username" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="userInfo.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="success" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login admin">
            <div class="loginTitle">管理员登录</div>
            <el-form :model="userInfo" label-width="auto" style="max-width: 600px">
                <el-form-item label="账号">
                    <el-input v-model="userInfo.username" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="userInfo.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="success" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import backBtn from '../commponent/backBtn.vue'

const firstAnimating=ref(false);
const isAnimating = ref(false);
const isTextAnimating = ref(false);
const startAnimation = () => {
    isAnimating.value = !isAnimating.value;
    setTimeout(() => {
        isTextAnimating.value = !isTextAnimating.value;
    }, 400);
}

const userInfo = ref({
    username: '',
    password: '',
});


</script>

<style scoped>
.login {
    position: absolute;
    z-index: 1;
    width: 30%;
}

.loginTitle {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.user{
    top: 30%;
    left: 10%;
}

.admin{
    top: 30%;
    left: 55%;
}


.total {
    width: 100%;
    height: 100%;
    display: flex;
}

.title {
    position: absolute;
    font-size: 48px;
    font-weight: bold;
    top: 40%;
    left: 30%;
    z-index: 2;
}

.title-animaT {
    animation: textAnimaT 0.7s forwards;
}

.title-animaF {
    animation: textAnimaF 0.7s forwards;
}

@keyframes textAnimaF {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

@keyframes textAnimaT {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

.box {
    width: 50%;
    height: 100%;
    margin: 0;
    background: linear-gradient(90deg, #ffae00, #ffffff);
    border-radius: 5%;
    z-index: 99;
}

.box-animaToR {
    animation: animaToR 1s forwards;
}

.box-animaToL {
    animation: animaToL 1s forwards;
}

@keyframes animaToR {
    0% {
        transform: translateX(0) scaleX(1);
        background: linear-gradient(90deg, #ffffff, #29e6ff);
    }

    /* 50% {
        transform: translateX(50%) scaleX(2);
    } */

    100% {
        transform: translateX(100%) scaleX(1);
        background: linear-gradient(90deg, #ffffff, #29e6ff);
    }
}

@keyframes animaToL {
    0% {
        transform: translateX(100%) scaleX(1);
    }

    /* 50% {
        transform: translateX(50%) scaleX(2);
    } */

    100% {
        transform: translateX(0%) scaleX(1);
        background: linear-gradient(90deg, #ffae00, #ffffff);
    }
}

.right {
    position: absolute;
    right: 10%;
    top: 40%;
    font-size: 72px;
}

.left {
    position: absolute;
    left: 10%;
    top: 40%;
    font-size: 72px;
    z-index: 2;
}

.arrow-anima {
    animation: arrowAnima 1s infinite;
}

@keyframes arrowAnima {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(10px);
    }

    100% {
        transform: translateX(0);
    }
}
</style>
