<script>
	import {
		version
	} from './package.json'

	export default {
		onLaunch: function() {
			// #ifdef H5
			console.log(
				`%c hello uniapp %c v${version} `,
				'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
				'background:#007aff ;padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-weight: bold;'
			)
			// #endif
			// 线上示例使用
			// console.log('%c uni-app官方团队诚邀优秀前 端工程师加盟，一起打造更卓越的uni-app & uniCloud，欢迎投递简历到 hr2013@dcloud.io', 'color: red');
			console.log('App Launch');
			// #ifdef APP-PLUS

			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			test: ''
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import '@/static/customicons.css';
	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}


	/* #endif */
	/* 基础样式 - 三个平台都生效 */
	page {
		background: linear-gradient(180deg,#383848,#22222c);
		height: 100%;
		font-size: 28rpx;
		color: #ffffff;
		/* line-height: 1.8; */
	}
	
	/* 1. uni.showModal 弹窗适配 */
	/* #ifdef H5 */
	/* H5 平台的弹窗样式 */
	.uni-modal {
	  background-color: #1e1e1e !important;
	  border-radius: 8px !important;
	}
	
	.uni-modal__hd {
	  color: #ffffff !important;
	  font-size: 16px !important;
	  font-weight: 600 !important;
	  padding: 20px 20px 0 20px !important;
	}
	
	.uni-modal__bd {
	  color: #cccccc !important;
	  font-size: 14px !important;
	  padding: 20px !important;
	  line-height: 1.6 !important;
	  min-height: 60px !important;
	}
	
	.uni-modal__ft {
	  border-top: 1px solid #333 !important;
	  display: flex !important;
	  height: 50px !important;
	  line-height: 50px !important;
	}
	
	.uni-modal__btn {
	  flex: 1 !important;
	  color: #0a84ff !important;
	  font-size: 16px !important;
	  border: none !important;
	  border-radius: 0 !important;
	  background: transparent !important;
	}
	
	.uni-modal__btn_default {
	  color: #999999 !important;
	  border-right: 1px solid #333 !important;
	}
	
	.uni-modal__btn_primary {
	  color: #0a84ff !important;
	}
	
	.uni-mask {
	  background-color: rgba(0, 0, 0, 0.7) !important;
	  backdrop-filter: blur(10px) !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	/* Android 和 iOS 平台的弹窗样式 */
	/* iOS 样式 */
	uni-modal,
	uni-modal .uni-modal,
	.uni-modal {
	  background-color: #1e1e1e !important;
	}
	
	.uni-modal .uni-modal__title {
	  color: #ffffff !important;
	  font-size: 17px !important;
	  font-weight: 600 !important;
	}
	
	.uni-modal .uni-modal__content {
	  color: #cccccc !important;
	  font-size: 14px !important;
	  line-height: 1.4 !important;
	}
	
	.uni-modal .uni-modal__btn {
	  color: #0a84ff !important;
	  font-size: 17px !important;
	}
	
	.uni-modal .uni-modal__btn--default {
	  color: #999999 !important;
	}
	
	.uni-mask {
	  background-color: rgba(0, 0, 0, 0.6) !important;
	}
	
	/* Android 可能需要额外的覆盖 */
	/* #ifdef ANDROID */
	.uni-modal {
	  border-radius: 12px !important;
	}
	/* #endif */
	/* #endif */
	
	/* 2. uni.showToast 适配 */
	/* #ifdef H5 */
	.uni-toast {
	  background-color: #2c2c2c !important;
	  color: #ffffff !important;
	  border-radius: 6px !important;
	  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
	}
	
	.uni-toast__icon {
	  filter: invert(1) brightness(2) !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.uni-toast {
	  background-color: rgba(44, 44, 44, 0.9) !important;
	  color: #ffffff !important;
	}
	/* #endif */
	
	/* 3. uni.showLoading 适配 */
	/* #ifdef H5 */
	.uni-loading {
	  background-color: rgba(30, 30, 30, 0.9) !important;
	  border-radius: 8px !important;
	}
	
	.uni-loading__content {
	  color: #ffffff !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.uni-loading {
	  background-color: rgba(30, 30, 30, 0.9) !important;
	}
	/* #endif */
	
	/* 4. uni.showActionSheet 适配 */
	/* #ifdef H5 */
	.uni-actionsheet {
	  background-color: #1e1e1e !important;
	  border-radius: 12px 12px 0 0 !important;
	}
	
	.uni-actionsheet__title,
	.uni-actionsheet__menu,
	.uni-actionsheet__cell {
	  color: #ffffff !important;
	  background-color: #1e1e1e !important;
	  border-bottom: 1px solid #333 !important;
	}
	
	.uni-actionsheet__cell:active {
	  background-color: #2c2c2c !important;
	}
	
	.uni-actionsheet__action {
	  color: #ff3b30 !important;
	  background-color: #1e1e1e !important;
	  border-top: 4px solid #121212 !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.uni-actionsheet {
	  background-color: #1e1e1e !important;
	}
	
	.uni-actionsheet__cell {
	  color: #ffffff !important;
	  background-color: #1e1e1e !important;
	  border-bottom: 1px solid #333 !important;
	}
	/* #endif */
	
	/* 5. 表单元素适配 */
	/* #ifdef H5 */
	uni-input,
	uni-textarea {
	  background-color: #2c2c2c !important;
	  color: #ffffff !important;
	  border: 1px solid #444 !important;
	  border-radius: 4px !important;
	}
	
	.uni-input-placeholder,
	.uni-textarea-placeholder {
	  color: #666 !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	uni-input,
	uni-textarea {
	  background-color: #2c2c2c !important;
	  color: #ffffff !important;
	  border-color: #444 !important;
	}
	/* #endif */
	
	/* 6. Button 组件适配 */
	/* #ifdef H5 */
	uni-button {
	  color: #ffffff !important;
	  border-radius: 4px !important;
	}
	
	uni-button[type="primary"] {
	  background-color: #0a84ff !important;
	  border-color: #0a84ff !important;
	}
	
	uni-button[type="default"] {
	  background-color: #2c2c2c !important;
	  border-color: #444 !important;
	  color: #cccccc !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	uni-button[type="primary"] {
	  background-color: #0a84ff !important;
	  border-color: #0a84ff !important;
	  color: #ffffff !important;
	}
	
	uni-button[type="default"] {
	  background-color: #2c2c2c !important;
	  border-color: #444 !important;
	  color: #ffffff !important;
	}
	/* #endif */
	
	/* 7. Switch 组件适配 */
	/* #ifdef H5 */
	uni-switch .uni-switch-input {
	  background-color: #444 !important;
	  border-color: #444 !important;
	}
	
	uni-switch .uni-switch-input.uni-switch-input-checked {
	  background-color: #0a84ff !important;
	  border-color: #0a84ff !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	uni-switch .uni-switch-input {
	  background-color: #444 !important;
	}
	
	uni-switch .uni-switch-input.uni-switch-input-checked {
	  background-color: #0a84ff !important;
	}
	/* #endif */
	
	/* 8. Radio/Checkbox 适配 */
	/* #ifdef H5 */
	uni-radio .uni-radio-input,
	uni-checkbox .uni-checkbox-input {
	  background-color: #2c2c2c !important;
	  border-color: #666 !important;
	}
	
	uni-radio .uni-radio-input.uni-radio-input-checked,
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	  background-color: #0a84ff !important;
	  border-color: #0a84ff !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	uni-radio .uni-radio-input,
	uni-checkbox .uni-checkbox-input {
	  background-color: #2c2c2c !important;
	  border-color: #666 !important;
	}
	
	uni-radio .uni-radio-input.uni-radio-input-checked,
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	  background-color: #0a84ff !important;
	}
	/* #endif */
	
	/* 9. Tabbar 适配 */
	/* #ifdef H5 */
	.uni-tabbar {
	  background-color: #1e1e1e !important;
	  border-color: #333 !important;
	}
	
	.uni-tabbar__icon,
	.uni-tabbar__label {
	  color: #666 !important;
	}
	
	.uni-tabbar__icon.uni-tabbar__icon--active,
	.uni-tabbar__label.uni-tabbar__label--active {
	  color: #0a84ff !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.uni-tabbar {
	  background-color: #1e1e1e !important;
	}
	
	.uni-tabbar__icon {
	  color: #666 !important;
	}
	
	.uni-tabbar__icon.uni-tabbar__icon--active {
	  color: #0a84ff !important;
	}
	/* #endif */
	
	/* 10. Navigation Bar 适配 */
	/* #ifdef H5 */
	.uni-page-head {
	  background-color: #1e1e1e !important;
	  border-color: #333 !important;
	}
	
	.uni-page-head__title {
	  color: #ffffff !important;
	}
	
	.uni-page-head-btn {
	  color: #0a84ff !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.uni-page-head {
	  background-color: #1e1e1e !important;
	}
	
	.uni-page-head .uni-navbar__header {
	  background-color: #1e1e1e !important;
	}
	
	.uni-navbar__title {
	  color: #ffffff !important;
	}
	
	.uni-navbar__left,
	.uni-navbar__right {
	  color: #0a84ff !important;
	}
	/* #endif */
	
	/* 11. 滚动条适配 */
	/* #ifdef H5 */
	::-webkit-scrollbar {
	  width: 6px;
	  background-color: transparent;
	}
	
	::-webkit-scrollbar-thumb {
	  background-color: #444;
	  border-radius: 3px;
	}
	
	::-webkit-scrollbar-thumb:hover {
	  background-color: #666;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	/* App 平台可能需要使用原生滚动条样式 */
	/* 可以添加 App 特定的滚动条样式 */
	/* #endif */
	
	/* 12. Picker 组件适配 */
	/* #ifdef H5 */
	.uni-picker,
	.uni-picker__wrapper,
	.uni-picker__mask,
	.uni-picker__hd {
	  background-color: #1e1e1e !important;
	  color: #ffffff !important;
	}
	
	.uni-picker__action {
	  color: #0a84ff !important;
	}
	
	.uni-picker__item {
	  color: #ffffff !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	/* App 平台的 Picker 可能需要特殊处理 */
	.uni-picker {
	  background-color: #1e1e1e !important;
	}
	/* #endif */
	
	/* 13. Slider 组件适配 */
	/* #ifdef H5 */
	uni-slider .uni-slider-track,
	uni-slider .uni-slider-value {
	  background-color: #444 !important;
	}
	
	uni-slider .uni-slider-handle {
	  background-color: #0a84ff !important;
	  border-color: #0a84ff !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	uni-slider .uni-slider-track {
	  background-color: #444 !important;
	}
	
	uni-slider .uni-slider-handle {
	  background-color: #0a84ff !important;
	}
	/* #endif */
</style>
