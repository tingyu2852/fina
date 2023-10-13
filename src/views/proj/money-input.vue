<template>
  <div>
    <el-input :value="displayValue" v-bind="$attrs" :placeholder="placeholder" @input="handleChange"></el-input>
  </div>
</template>

<script>
//准备封装一个用于实现金额格式化的组件（开发中）

export default {
    name:'monet-input',
    props:['value'],
    data(){
        return {
            // displayValue:null,
            placeholder:''
        }
    },
    
    watch:{
        moneyInput(nv,ov){
            console.log(nv);
        },
       
    },
    computed:{
        displayValue(){
            return this.$format.formatInput(this.value)
        }
    },
    methods:{
        handleChange(event){
            //console.log(this.moneyInput);
            this.$emit('change',1)
            
            console.log(event);
            //console.log(this.value);
        //     formObj.rep_sum = parseFloat(
        //     this.rep_form.rep_sum
        //   );
          let number = 0
          if(!event){
            number=0
          }
          number = parseFloat(event.substring(1).replace(/,/g, ""))
          console.log(number,'---');
          
            this.$emit('input',number)
        }
    }
}
</script>

<style>

</style>