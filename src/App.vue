<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */

    @import "comm/colorui/main.css";
    @import "comm/colorui/icon.css";

    /*解决组件与colorui的冲突*/
    uni-checkbox .uni-checkbox-input {
        border-radius: 3px !important;
        color: #ffffff !important;
    }

    uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
        color: #fff;
        border-color: rgb(0, 122, 255);
        background: rgb(0, 122, 255);
    }

    uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:after {
        font-size: 18px;
    }


</style>
