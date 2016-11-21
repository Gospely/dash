<template lang="html">

 <div class="columns is-mobile">     
    <div class="column is-8 is-offset-4">
        <div class="page-bar">
            <ul class="page-ul">
                <li style="margin-right: -4px;"><a v-on:click="last">上一页</a></li>
                <li v-for="index in indexs"  v-bind:class="{ active: cur == index}">
                    <a v-on:click="btnClick(index)">{{ index }}</a>
                </li>
                <li style="margin-left: -4px;"><a v-on:click="next">下一页</a></li>
                <li style="margin-left: -4px;"><a>共<i>{{all}}</i>页</a></li>
            </ul>
        </div>
    </div>
 </div>

</template>

<script>
export default {
    props: ['cur', 'all'],
    data(){
      return {}
    },
    computed: {
        indexs: function(){
          var left = 1
          var right = this.all
          var ar = []
          if(this.all>= 11){
            if(this.cur > 5 && this.cur < this.all-4){
                    left = this.cur - 5
                    right = this.cur + 4
            }else{
                if(this.cur<=5){
                    left = 1
                    right = 10
                }else{
                    right = this.all
                    left = this.all -9
                }
            }
         }
        while (left <= right){
            ar.push(left)
            left ++
        }
        return ar
       }
    },
    methods: {
        btnClick(data){
            if(data != this.cur){
                this.cur = data
                this.$dispatch('btn-click',data)

            }
        },
        next: function() {
            var next = this.cur + 1;

            if(next > this.all) {
                return false;
            }

            this.cur++;
            this.$dispatch('btn-click',this.cur);
        },
        last: function() {

            var prev = this.cur - 1;

            if(prev <= 0) {
                return false;
            }

            this.cur--;
            this.$dispatch('btn-click',this.cur);
        }
    }
}
</script>

<style lang="css">
ul,li{
    margin: 0px;
    padding: 0px;
}

.page-ul {
    display: block!important;
    text-align: right;
    border-bottom: none!important;
}

.page-bar li{
    list-style: none;
    display: inline-block;
    border: 1px solid #ddd;
    margin-left: -1px;
}
.page-bar li:first-child>a {
   margin-left: 0px;
}
.page-bar a{
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
}
.page-bar a:hover{
    background-color: #eee;
}
.page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}
.page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}
</style>
