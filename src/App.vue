<template>
	<div id = "app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		created(){
			this.$store.commit("loadLayoutsFromLocalStorage");
		}
	}
</script>

<style lang = "scss">
	@import "@/assets/styles/vars";
	@import "@/assets/styles/normalize";
	
	*{ box-sizing : border-box; }
	
	body{
		min-height : 100vh;
	}
	
	#app{
		font-family : Roboto, sans-serif;
		font-style  : normal;
		font-weight : normal;
		font-size   : 14px;
		line-height : 18px;
	}
	
	.btn{
		color            : white;
		border           : 1px solid $gray;
		cursor           : pointer;
		padding          : 7px 13px 7px;
		border-radius    : $border_radius;
		text-decoration  : none;
		background-color : transparent;
		
		&--submit{
			background-color : $blue;
		}
		
		&--cancel{
			color : $red;
		}
		
		&:visited, &:active{
			color: white;
		}
	}

</style>
