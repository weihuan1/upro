<template>
	<u-navbar title="修改昵称">
		<template v-slot:right>
			<view class="save-btn" @click="saveNickname">保存</view>
		</template>
	</u-navbar>
	<view class="content">
		<u-input v-model="nickname" placeholder="请输入昵称"></u-input>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const nickname = ref('');
const saveNickname = () => {
	if (!nickname.value.trim()) {
		uni.$u.toast('昵称不能为空');
		return;
	}
	uni.$u.toast('昵称修改成功');
	uni.navigateBack();
};	
	
</script>

<style lang="scss" scoped>
.content {
	width: 80%;
	padding: 4px 16px;
	margin: 0 auto;
	border-bottom: 1px solid #444459;
}
.save-btn {
	padding-right: 16px;
}
</style>
