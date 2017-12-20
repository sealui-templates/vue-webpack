<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your SealUI App'
    }
  },
  directives: {

  },
  filters:{

  },
  created(){
  	{{#request}}
		this.$nextTick(function(){
			this.getData();
		})
		{{/request}}
	},
	mounted (){

	},
	computed: {

	},
	methods: {
		{{#request}}
		async getData(){
			await this.$request({
				//method:'POST',
				url:'//api.github.com/users/sealui',
			 }).then((res) => {
				console.log(res)
			 })
		}
		{{/request}}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-weight: normal;
}
</style>
