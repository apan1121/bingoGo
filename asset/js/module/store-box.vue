<template>
    <div class="col-4 col-sm-3 store-box">
        <div class="store-scroller">
           <div class="row">
                <template v-for="number in storeDataReverse">
                    <div class="col">
                        <section class="number-board" v-if="!isNaN(number)">
                            <div class="number">
                                {{number}}
                            </div>
                        </section>
                        <section class="string-board" v-else>
                            <div>
                                {{number}}
                            </div>
                        </section>
                    </div>
                </template>
           </div>
<!--            <div class="row">
                <div class="col">
                    <section class="number-ball">
                      <figure class="ball">
                        <span class="shadow"></span>
                        <span class="number" data-val="1"></span>
                      </figure>
                    </section>
                </div>
                <div class="col">
                    <section class="number-ball">
                      <figure class="ball">
                        <span class="shadow"></span>
                        <span class="number" data-val="2"></span>
                      </figure>
                    </section>
                </div>
           </div> -->
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
  // data: function(){
  //   return {
  //   }
  // },
  //
  computed: {
    storeDataReverse: function(){
      let that = this;


      return [].concat(this.storeData).reverse();
    },
  },
  mounted(){
      // console.log(this.storeData);
  },
  props: ['storeData'],
}
</script>

<style>

</style>
