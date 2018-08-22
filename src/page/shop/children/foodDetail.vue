 <template>
  <div class="rating_page">
    <head-top :head-title="name" go-back='true'></head-top>
    <section class="header_img">
      <img :src="imgBaseUrl + image_path" class="food_img">
      <div class="cover"></div>
    </section>
    <p class="description">{{description}}</p>
    <section class="detail_container">
      <section class="detail_left">
        <p>{{name}}</p>
        <div class="rating_sale">
          <span>评分</span>
          <rating-star :rating='rating'></rating-star>
          <span>{{rating.toFixed(1)}}</span>
        </div>
        <p>
          <span>月售 {{month_sales}}单</span>
          <span>售价 ¥{{foods.specfoods[0].price}}</span>
          <span v-if="foods.specfoods.length">起</span>
        </p>
        <p>
          <span>评论数 {{rating_count}}</span>
          <span>好评率 {{satisfy_rate}}%</span>
        </p>
      </section>
    <!-- <buy-cart :shopId='shopId'  :foods='foods' @moveInCart="$emit('moveInCart')"></buy-cart> -->
    </section>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import { getImgPath } from '@/components/common/mixin'
import ratingStar from '@/components/common/ratingStar'
import buyCart from '@/components/common/buyCart'
import { imgBaseUrl } from '@/config/env'

export default {
  data () {
    return {
      image_path: null,
      description: null,
      month_sales: null,
      name: null,
      rating: null,
      rating_count: null,
      satisfy_rate: null,
      foods: null,
      shopId: null,
      imgBaseUrl
    }
  },
  created () {
    this.image_path = this.$route.query.image_path
    this.description = this.$route.query.description
    this.month_sales = this.$route.query.month_sales
    this.name = this.$route.query.name
    this.rating = this.$route.query.rating
    this.rating_count = this.$route.query.rating_count
    this.satisfy_rate = this.$route.query.satisfy_rate
    this.foods = this.$route.query.foods
    this.shopId = this.$route.query.shopId
  },
  mixins: [getImgPath],
  components: {
    headTop,
    ratingStar,
    buyCart
  }
}
</script>
<style lang='scss'>
@import "../../../style/fooddetail.scss";
</style>
