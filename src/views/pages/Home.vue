<template>
	<div class = "home">
		<h1>Все дизайны</h1>
		<router-link to = "https://galyaevevgeniy.github.io/horoshop/dist/add-or-edit-layout" class = "btn btn--submit add-layout">Добавить дизайн</router-link>
		<!--<router-link to = "/add-or-edit-layout" class = "btn btn&#45;&#45;submit add-layout">Добавить дизайн</router-link>-->
		<div class = "layouts" v-if = "JSON.stringify($store.state.layouts)[2]">
			<div class = "layouts__item" v-for = "item in $store.state.layouts">
				<swiper ref = "mySwiper">
					<swiper-slide v-for = "src in item.img_list">
						<img :src = "src" alt = "">
					</swiper-slide>
					<div class = "swiper-pagination" slot = "pagination"></div>
				</swiper>
				<div class = "layouts__item__control-btns">
					<button class = "btn btn--submit" @click = "goToEditLayout(item.id)">Редактировать</button>
					<a :href = "item.url" target = "_blank" class = "btn btn--submit">Перейти на сайт</a>
				</div>
				<div class = "layouts__item__info">
					<span class = "layouts__item__info__id">{{ item.id }}</span>
					<span class = "layouts__item__info__title">{{ item.title }}</span>
				</div>
			</div>
		</div>
		<h2 v-else>Пока что нету ничего, добавьте свой первый дизайн</h2>
	</div>
</template>

<script>

	export default {
		components: {},
		computed: {},
		beforeDestroy(){

		},
		methods: {
			goToEditLayout(id){
				this.$router.push("https://galyaevevgeniy.github.io/horoshop/dist/add-or-edit-layout/" + id + "/");
			}
		}
	}
</script>

<style lang = "scss">
	@import "@/assets/styles/vars";
	
	$offset : 20px;
	
	.home{
		color            : white;
		padding          : $offset;
		position         : relative;
		min-height       : 100vh;
		background-color : $black;
	}
	
	h1{
		margin      : 0;
		font-size   : 24px;
		line-height : 40px;
	}
	
	.swiper-container{
		height : 100%;
	}
	
	.add-layout{
		top      : $offset;
		right    : $offset;
		position : absolute;
	}
	
	.layouts{
		display   : flex;
		flex-wrap : wrap;
		margin    : $offset $offset * -1 0;
		
		&__item{
			width    : 300px;
			height   : 400px;
			margin   : 0 $offset $offset * 2;
			cursor   : grab;
			position : relative;
			
			img{
				width      : 100%;
				height     : 100%;
				object-fit : cover;
			}
			
			&__info{
				margin-top : $offset / 2;
				
				&__id{
					color            : black;
					padding          : 0 4px;
					font-size        : 11px;
					line-height      : 18px;
					margin-right     : 8px;
					border-radius    : 8px;
					background-color : white;
				}
				
				&__title{
					color : white;
				}
			}
			
			&__control-btns{
				width           : 100%;
				display         : flex;
				z-index         : 2;
				position        : absolute;
				transform       : scale(0) translateY(-100%);
				transition      : $transition;
				justify-content : space-around;
			}
			
			&:hover{
				.layouts__item__control-btns{
					transform : scale(1) translateY(-100%);
				}
			}
		}
	}
</style>
