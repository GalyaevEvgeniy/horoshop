<template>
	<div class = "add-or-edit-layout">
		<button class = "btn go-back" @click = "goBack">←</button>
		<div class = "add-or-edit-layout__control-btns">
			<button class = "btn btn--cancel" v-if = "is_edit" @click = "onRemoveLayout">Удалить</button>
			<button class = "btn btn--submit" @click = "onSaveLayout">Сохранить и закрыть</button>
		</div>
		<label class = "label layout_id">
			<input class = "input" type = "number" placeholder = "###" v-model = "id">
		</label>
		<label class = "label layout_title">
			<input class = "input" type = "text" placeholder = "Design Title" v-model = "title">
		</label>
		<div class = "upload-img-container">
			<img class = "upload-img-container__item"
			     v-if = "img_list.length"
			     v-for = "src in img_list"
			     :src = "src"
			     alt = "">
			<div class = "upload-img-container__upload-area">
				<input type = "file"
				       accept = ".jpg, .jpeg, .png"
				       multiple
				       class = "upload-img-container__upload-area__input"
				       @change = "onUploadFile">
			</div>
		</div>
		<label class = "label layout_url">
			<input class = "input"
			       type = "url"
			       placeholder = "https://design###.horoshop.ua/"
			       v-model = "url">
		</label>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				id: null,
				title: null,
				url: null,
				img_list: []
			}
		},
		mounted(){
			if (this.is_edit){
				if (this.$store.state.layouts[this.$route.params.id]){
					this.id = this.$store.state.layouts[this.$route.params.id].id;
					this.title = this.$store.state.layouts[this.$route.params.id].title;
					this.url = this.$store.state.layouts[this.$route.params.id].url;
					this.img_list = this.$store.state.layouts[this.$route.params.id].img_list;
				} else{
					this.$router.push("/");
				}
			}
		},
		computed: {
			is_edit(){
				return this.$route.params.id && Number.isInteger(+this.$route.params.id);
			}
		},
		methods: {
			goBack(){
				window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
			},
			onSaveLayout(){
				if (Number.isInteger(+this.id) && +this.id <= 0){
					alert("Нужно указать номер дизайна");
					return;
				}

				if (!this.title){
					alert("Нужно указать название дизайна");
					return;
				}

				if (!this.url){
					alert("Нужно указать ссылку на сайт с реализацией дизайна");
					return;
				}

				if (!this.img_list.length){
					alert("Нужно загрузить изображения дизайна");
					return;
				}

				this.$store.commit("addOrEditLayout", {
					id: this.id,
					title: this.title,
					url: this.url,
					img_list: this.img_list,
				});

				this.$router.push("/");
			},
			onRemoveLayout(){
				if (this.is_edit){
					this.$store.commit("deleteLayout", +this.$route.params.id);
					this.$router.push("/");
				}
			},
			onUploadFile(event){
				let files = event.target.files;

				let _this = this;

				for (let i = 0, file; file = files[i]; i++){

					let reader = new FileReader();

					reader.onload = function (e){
						_this.img_list.push(reader.result);
					};

					reader.readAsDataURL(file);
				}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	@import "@/assets/styles/vars";
	
	$icons_left : -12px;
	
	.add-or-edit-layout{
		padding  : 28px 33px 28px 119px;
		position : relative;
	}
	
	.go-back{
		top       : 16px;
		left      : 21px;
		color     : black;
		border    : none;
		position  : absolute;
		font-size : 1.5em;
	}
	
	.add-or-edit-layout__control-btns{
		float : right;
		
		.btn{
			margin-left : 8px;
		}
	}
	
	label{
		display  : inline-block;
		position : relative;
	}
	
	.input{
		width         : 100%;
		border        : 1px solid $gray;
		padding       : 7px 11px 7px;
		border-radius : $border_radius;
		
		&::placeholder{
			color : $gray;
		}
	}
	
	.layout_id{
		width        : 80px;
		margin-right : 8px;
		
		&:before{
			left      : $icons_left;
			top       : 5px;
			content   : "№";
			display   : inline-block;
			position  : absolute;
			transform : translateX(-100%);
		}
	}
	
	.layout_title{
		width : 512px;
	}
	
	.layout_url{
		width : 600px;
		
		&:before{
			left      : $icons_left;
			top       : 9px;
			content   : url(../../assets/img/icons/link.svg);
			display   : inline-block;
			position  : absolute;
			transform : translateX(-100%);
		}
	}
	
	.upload-img-container{
		$size : 120px;
		$cross_width : 30px;
		$cross_height : 2px;
		$border_size : 2px;
		
		margin      : 27px 0 27px;
		display     : flex;
		flex-wrap   : wrap;
		align-items : end;
		
		&__item{
			max-width    : 123px;
			margin-right : 8px;
			
		}
		
		&__upload-area{
			width    : $size;
			height   : $size;
			border   : 2px dashed $gray;
			display  : inline-block;
			position : relative;
			
			&__input{
				width    : 100%;
				height   : 100%;
				cursor   : pointer;
				opacity  : 0;
				z-index  : 1;
				position : absolute;
			}
			
			&:before, &:after{
				content          : "";
				width            : $cross_width;
				height           : $cross_height;
				position         : absolute;
				background-color : $gray;
				border-radius    : 1px;
				top              : 50%;
				left             : 50%;
				transform        : translate(-50%, -50%);
			}
			
			&:after{
				transform : translate(-50%, -50%) rotateZ(90deg);
			}
		}
	}
</style>
