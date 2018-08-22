 <template>
    <div>
        <section v-if='!showLoading' class="shop_container">
            <nav class="goback" @click="goback">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:nonestroke:rgb(255,255,255)stroke-width:3"/>
                </svg>
            </nav>
            <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities? '14':'10'}">
                <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img">
                <section class="description_header">
                    <router-link to="/shop/shopDetail" class="description_top">
                        <section class="description_left">
                            <img :src="imgBaseUrl + shopDetailData.image_path">
                        </section>
                        <section class="description_right">
                            <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
                            <p class="description_text">商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
                            <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
                        </section>
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                            <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
                        </svg>
                    </router-link>
                    <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
                        <p class="ellipsis">
                            <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
                            <span>{{shopDetailData.activities[0].description}}（APP专享）</span>
                        </p>
                        <p>{{shopDetailData.activities.length}}个活动</p>
                        <svg class="footer_arrow">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                        </svg>
                    </footer>

                </section>
            </header>
            <transition name="fade">
                <section class="activities_details" v-if="showActivities">
                    <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
                    <h3 class="activities_ratingstar">
                        <rating-star :rating='shopDetailData.rating'></rating-star>
                    </h3>
                    <section class="activities_list">
                        <header class="activities_title_style"><span>优惠信息</span></header>
                        <ul>
                            <li v-for="item in shopDetailData.activities" :key="item.id">
                                <span class="activities_icon" :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                                <span>{{item.description}}（APP专享）</span>
                            </li>
                        </ul>
                    </section>
                    <section class="activities_shopinfo">
                        <header class="activities_title_style"><span>商家公告</span></header>
                        <p>{{promotionInfo}}</p>
                    </section>
                    <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
                        <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
                        <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999stroke-width:2"/>
                        <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999stroke-width:2"/>
                    </svg>
                </section>
            </transition>
            <section class="change_show_type" ref="chooseType">
                <div>
                    <span :class='{activity_show: changeShowType =="food"}' @click="changeShowType='food'">商品</span>
                </div>
                <div>
                    <span :class='{activity_show: changeShowType =="rating"}' @click="changeShowType='rating'">评价</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section v-show="changeShowType =='food'" class="food_container">
                    <section class="menu_container">
                        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                                    <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                                    <span>{{item.name}}</span>
                                    <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                                </li>
                            </ul>
                        </section>
                        <section class="menu_right" ref="menuFoodList">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index">
                                    <header class="menu_detail_header">
                                        <section class="menu_detail_header_left">
                                            <strong class="menu_item_title">{{item.name}}</strong>
                                            <span class="menu_item_description">{{item.description}}</span>
                                        </section>
                                        <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                                        <p class="description_tip" v-if="index == TitleDetailIndex">
                                            <span>{{item.name}}</span>
                                            {{item.description}}
                                        </p>
                                    </header>
                                    <section v-for="(foods,foodindex) in item.foods" :key="foodindex" class="menu_detail_list">
                                        <router-link  :to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" tag="div" class="menu_detail_link">
                                            <section class="menu_food_img">
                                                <img :src="imgBaseUrl + foods.image_path">
                                            </section>
                                            <section class="menu_food_description">
                                                <h3 class="food_description_head">
                                                    <strong class="description_foodname">{{foods.name}}</strong>
                                                    <ul v-if="foods.attributes.length" class="attributes_ul">
                                                        <li v-for="(attribute, foodindex) in foods.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color,borderColor:'#' +attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">
                                                        <p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>
                                                        </li>
                                                    </ul>

                                                </h3>
                                                <p class="food_description_content">{{foods.description}}</p>
                                                <p class="food_description_sale_rating">
                                                    <span>月售{{foods.month_sales}}份</span>
                                                    <span>好评率{{foods.satisfy_rate}}%</span>
                                                </p>
                                                <p v-if="foods.activity" class="food_activity">
                                                <span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                                                </p>
                                            </section>
                                        </router-link>
                                        <footer class="menu_detail_footer">
                                            <section class="food_price">
                                                <span>¥</span>
                                                <span>{{foods.specfoods[0].price}}</span>
                                                <span v-if="foods.specifications.length">起</span>
                                            </section>
                                            <buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></buy-cart>
                                        </footer>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                    <section class="buy_cart_container">
                        <section @click="toggleCartList" class="cart_icon_num">
                            <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
                                <span v-if="totalNum" class="cart_list_length">
                                    {{totalNum}}
                                </span>
                                <svg class="cart_icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                                </svg>
                            </div>
                            <div class="cart_num">
                                <div>¥ {{totalPrice}}</div>
                                <div>配送费¥{{deliveryFee}}</div>
                            </div>
                        </section>
                        <section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">
                            <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
                            <router-link :to="{path:'/confirmOrder', query:{geohash, shopId}}" class="gotopay_button_style" v-else >去结算</router-link>
                        </section>
                    </section>
                    <transition name="toggle-cart">
                        <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
                            <header>
                                <h4>购物车</h4>
                                <div @click="clearCart">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                                    </svg>
                                    <span class="clear_cart">清空</span>
                                </div>
                            </header>
                            <section class="cart_food_details" id="cartFood">
                                <ul>
                                    <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                                        <div class="cart_list_num">
                                            <p class="ellipsis">{{item.name}}</p>
                                            <p class="ellipsis">{{item.specs}}</p>
                                        </div>
                                        <div class="cart_list_price">
                                            <span>¥</span>
                                            <span>{{item.price}}</span>
                                        </div>
                                        <section class="cart_list_control">
                                            <span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                                <svg>
                                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                                </svg>
                                            </span>
                                            <span class="cart_num">{{item.num}}</span>
                                            <svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                                            </svg>
                                        </section>
                                    </li>
                                </ul>
                            </section>
                        </section>
                    </transition>
                    <transition name="fade">
                        <div class="screen_cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>
                    </transition>
                </section>
            </transition>
            <transition name="fade-choose">
                <section class="rating_container" id="ratingContainer" v-show="changeShowType =='rating'">
                    <section v-load-more="loaderMoreRating" type="2">
                        <section>

                            <header class="rating_header">
                                <section class="rating_header_left">
                                    <p>{{shopDetailData.rating}}</p>
                                    <p>综合评价</p>
                                    <p>高于周边商家{{(ratingScoresData.compare_rating*100).toFixed(1)}}%</p>
                                </section>
                                <section class="rating_header_right">
                                    <p>
                                        <span>服务态度</span>
                                        <rating-star :rating='ratingScoresData.service_score'></rating-star>
                                        <span class="rating_num">{{ratingScoresData.service_score.toFixed(1)}}</span>
                                    </p>
                                    <p>
                                        <span>菜品评价</span>
                                        <rating-star :rating='ratingScoresData.food_score'></rating-star>
                                        <span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>
                                    </p>
                                    <p>
                                        <span>送达时间</span>
                                        <span class="delivery_time">{{shopDetailData.order_lead_time}}分钟</span>
                                    </p>
                                </section>
                            </header>
                            <ul class="tag_list_ul">
                                <li v-for="(item, index) in ratingTagsList" :key="index" :class="{unsatisfied: item.unsatisfied, tagActivity: ratingTageIndex == index}" @click="changeTgeIndex(index, item.name)">{{item.name}}({{item.count}})</li>
                            </ul>
                            <ul class="rating_list_ul">
                                <li v-for="(item, index) in ratingList" :key="index" class="rating_list_li">
                                    <img :src="getImgPath(item.avatar)" class="user_avatar">
                                    <section class="rating_list_details">
                                        <header>
                                            <section class="username_star">
                                                <p class="username">{{item.username}}</p>
                                                <p class="star_desc">
                                                    <rating-star :rating='item.rating_star'></rating-star>
                                                    <span class="time_spent_desc">{{item.time_spent_desc}}</span>
                                                </p>
                                            </section>
                                            <time class="rated_at">{{item.rated_at}}</time>
                                        </header>
                                        <ul class="food_img_ul">
                                            <li v-for="(item, index) in item.item_ratings" :key="index">
                                                <img :src="getImgPath(item.image_hash)" v-if="item.image_hash">
                                            </li>
                                        </ul>
                                        <ul class="food_name_ul">
                                            <li v-for="(item, index) in item.item_ratings" :key="index" class="ellipsis">
                                                {{item.food_name}}
                                            </li>
                                        </ul>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
        <section>
            <transition name="fade">
                <div class="specs_cover" @click="showChooseList" v-if="showSpecs"></div>
            </transition>
            <transition name="fadeBounce">
                <div class="specs_list" v-if="showSpecs">
                    <header class="specs_list_header">
                        <h4 class="ellipsis">{{choosedFoods.name}}</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="specs_cancel" @click="showChooseList">
                            <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
                            <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
                        </svg>
                    </header>
                    <section class="specs_details">
                        <h5 class="specs_details_title">{{choosedFoods.specifications[0].name}}</h5>
                        <ul>
                            <li v-for="(item, itemIndex) in choosedFoods.specifications[0].values" :key="itemIndex" :class="{specs_activity: itemIndex == specsIndex}" @click="chooseSpecs(itemIndex)">
                                {{item}}
                            </li>
                        </ul>
                    </section>
                    <footer class="specs_footer">
                        <div class="specs_price">
                            <span>¥ </span>
                            <span>{{choosedFoods.specfoods[specsIndex].price}}</span>
                        </div>
                        <div class="specs_addto_cart" @click="addSpecs(choosedFoods.category_id, choosedFoods.item_id, choosedFoods.specfoods[specsIndex].food_id, choosedFoods.specfoods[specsIndex].name, choosedFoods.specfoods[specsIndex].price, choosedFoods.specifications[0].values[specsIndex], choosedFoods.specfoods[specsIndex].packing_fee, choosedFoods.specfoods[specsIndex].sku_id, choosedFoods.specfoods[specsIndex].stock)">加入购物车</div>
                    </footer>
                </div>
            </transition>
        </section>
        <transition name="fade">
            <p class="show_delete_tip" v-if="showDeleteTip">多规格商品只能去购物车删除哦</p>
        </transition>
        <transition
        appear
        @after-appear = 'afterEnter'
        @before-appear="beforeEnter"
        v-for="(item,index) in showMoveDot" :key="index">
            <span class="move_dot" v-if="item">
                <svg class="move_liner">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
            </span>
        </transition>
       <loading v-show="showLoading || loadRatings"></loading>
       <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
           <img src="../../images/shop_back_svg.svg">
       </section>
       <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import loading from '@/components/common/loading'
import buyCart from '@/components/common/buyCart'
import ratingStar from '@/components/common/ratingStar'
import { loadMore, getImgPath } from '@/components/common/mixin'
import { imgBaseUrl } from '@/config/env'
import BScroll from 'better-scroll'

export default {
  data  () {
    return {
      geohash: '', // geohash位置信息
      shopId: null, // 商店id值
      showLoading: true, // 显示加载动画
      changeShowType: 'food', // 切换显示商品或者评价
      shopDetailData: null, // 商铺详情
      showActivities: false, // 是否显示活动详情
      menuList: [], // 食品列表
      menuIndex: 0, // 已选菜单索引值，默认为0
      menuIndexChange: true, // 解决选中index时，scroll监听事件重复判断设置index的bug
      shopListTop: [], // 商品列表的高度集合
      TitleDetailIndex: null, // 点击展示列表头部详情
      categoryNum: [], // 商品类型右上角已加入购物车的数量
      totalPrice: 0, // 总共价格
      cartFoodList: [], // 购物车商品列表
      showCartList: false, // 显示购物车列表
      receiveInCart: false, // 购物车组件下落的圆点是否到达目标位置
      ratingList: null, // 评价列表
      ratingOffset: 0, // 评价获取数据offset值
      ratingScoresData: null, // 评价总体分数
      ratingTagsList: null, // 评价分类列表
      ratingTageIndex: 0, // 评价分类索引
      preventRepeatRequest: false, //  防止多次触发数据请求
      ratingTagName: '', // 评论的类型
      loadRatings: false, // 加载更多评论是显示加载组件
      foodScroll: null, // 食品列表scroll
      showSpecs: false, // 控制显示食品规格
      specsIndex: 0, // 当前选中的规格索引值
      choosedFoods: null, // 当前选中视频数据
      showDeleteTip: false, // 多规格商品点击减按钮，弹出提示框
      showMoveDot: [], // 控制下落的小圆点显示隐藏
      windowHeight: null, // 屏幕的高度
      elLeft: 0, // 当前点击加按钮在网页中的绝对top值
      elBottom: 0, // 当前点击加按钮在网页中的绝对left值
      ratingScroll: null, // 评论页Scroll
      imgBaseUrl
    }
  },
  created () {
    this.geohash = this.$route.query.geohash
    this.shopId = this.$route.query.id
    this.INIT_BUYCART()
  },
  mounted () {
    this.initData()
    this.windowHeight = window.innerHeight
  },
  beforeDestroy () {
    //  this.foodScroll.removeEventListener('scroll', )
  },
  mixins: [loadMore, getImgPath],
  components: {
    loading,
    ratingStar,
    buyCart
  },
  computed: {
    ...mapState(['latitude', 'longitude', 'cartList']),
    promotionInfo: function () {
      return (
        this.shopDetailData.promotion_info ||
        '欢迎光临，用餐高峰期请提前下单，谢谢。'
      )
    },
    // 配送费
    deliveryFee: function () {
      if (this.shopDetailData) {
        return this.shopDetailData.float_delivery_fee
      } else {
        return null
      }
    },
    // 还差多少元起送，为负数时显示去结算按钮
    minimumOrderAmount: function () {
      if (this.shopDetailData) {
        return this.shopDetailData.float_minimum_order_amount - this.totalPrice
      } else {
        return null
      }
    },
    // 当前商店购物信息
    shopCart: function () {
      return { ...this.cartList[this.shopId] }
    },
    // 购物车中总共商品的数量
    totalNum: function () {
      let num = 0
      this.cartFoodList.forEach(item => {
        num += item.num
      })
      return num
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS',
      'ADD_CART',
      'REDUCE_CART',
      'INIT_BUYCART',
      'CLEAR_CART',
      'RECORD_SHOPDETAIL'
    ]),
    // 初始化时获取基本数据
    initData () {
      if (!this.latitude) {
        // 获取位置信息
        this.$axios.get('/v2/pois/' + this.geohash).then(res => {
          //  记录当前经度纬度进入vuex
          if (res.data) {
            this.RECORD_ADDRESS(res.data)
          }
        })
      }
      // 获取商铺信息
      let query =
        '?shopid=' +
        this.shopId +
        '&latitude=' +
        this.latitude +
        '&longitude=' +
        this.longitude +
        '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
      this.$axios.get('/shopping/restaurant/' + query).then(res => {
        if (res.data) {
          this.shopDetailData = res.data
        }
      })
      // 获取商铺食品列表
      this.$axios.get('/shopping/v2/menu' + '?restaurant_id=' + this.shopId).then(res => {
        if (res.data) {
          this.menuList = res.data
        }
      })
      // 评论列表
      let query2 = '?has_content=true' + '&offset=' + this.ratingOffset + '&limit=10'
      this.$axios.get('/ugc/v2/restaurants/' + this.shopId + '/ratings' + query2).then(res => {
        if (res.data) {
          this.ratingList = res.data
        }
      })
      // 商铺评论详情
      this.$axios.get('/ugc/v2/restaurants/' + this.shopId + '/ratings/scores').then(res => {
        if (res.data) {
          this.ratingList = res.data
        }
      })
      // 评论Tag列表
      this.$axios.get('/ugc/v2/restaurants/' + this.shopId + '/ratings/tags').then(res => {
        if (res.data) {
          this.shopDetailData = res.data
          this.RECORD_SHOPDETAIL(this.shopDetailData)
        }
      })
      // 隐藏加载动画
      this.hideLoading()
    },
    // 获取食品列表的高度，存入shopListTop
    getFoodListHeight () {
      const listContainer = this.$refs.menuFoodList
      const listArr = Array.from(listContainer.children[0].children)
      listArr.forEach((item, index) => {
        this.shopListTop[index] = item.offsetTop
      })
      this.listenScroll(listContainer)
    },
    // 当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
    listenScroll (element) {
      this.foodScroll = new BScroll(element, {
        probeType: 3,
        deceleration: 0.001,
        bounce: false,
        swipeTime: 2000,
        click: true
      })
      const wrapperMenu = new BScroll('#wrapper_menu', {
        click: true
      })

      const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight
      this.foodScroll.on('scroll', pos => {
        if (!this.$refs.wrapperMenu) {
          return
        }
        this.shopListTop.forEach((item, index) => {
          if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
            this.menuIndex = index
            const menuList = this.$refs.wrapperMenu.querySelectorAll(
              '.activity_menu'
            )
            const el = menuList[0]
            wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight / 2 - 50))
          }
        })
      })
    },
    // 控制活动详情页的显示隐藏
    showActivitiesFun () {
      this.showActivities = !this.showActivities
    },
    // 点击左侧食品列表标题，相应列表移动到最顶层
    chooseMenu (index) {
      this.menuIndex = index
      // menuIndexChange解决运动时listenScroll依然监听的bug
      this.menuIndexChange = false
      this.foodScroll.scrollTo(0, -this.shopListTop[index], 400)
      this.foodScroll.on('scrollEnd', () => {
        this.menuIndexChange = true
      })
    },
    showTitleDetail (index) {
      if (this.TitleDetailIndex === index) {
        this.TitleDetailIndex = null
      } else {
        this.TitleDetailIndex = index
      }
    },
    // 加入购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
    addToCart (categoryId, itemId, foodId, name, price, specs) {
      this.ADD_CART({
        shopid: this.shopId,
        category_id: categoryId,
        item_id: itemId,
        food_id: foodId,
        name,
        price,
        specs
      })
    },
    // 移出购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
    removeOutCart (categoryId, itemId, foodId, name, price, specs) {
      this.REDUCE_CART({
        shopid: this.shopId,
        category_id: categoryId,
        item_id: itemId,
        food_id: foodId,
        name,
        price,
        specs
      })
    },
    /**
     * 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
     */
    initCategoryNum () {
      let newArr = []
      let cartFoodNum = 0
      this.totalPrice = 0
      this.cartFoodList = []
      this.menuList.forEach((item, index) => {
        if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
          let num = 0
          Object.keys(this.shopCart[item.foods[0].category_id]).forEach(
            itemid => {
              Object.keys(
                this.shopCart[item.foods[0].category_id][itemid]
              ).forEach(foodid => {
                let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid]
                num += foodItem.num
                if (item.type === 1) {
                  this.totalPrice += foodItem.num * foodItem.price
                  if (foodItem.num > 0) {
                    this.cartFoodList[cartFoodNum] = {}
                    this.cartFoodList[cartFoodNum].category_id =
                      item.foods[0].category_id
                    this.cartFoodList[cartFoodNum].item_id = itemid
                    this.cartFoodList[cartFoodNum].food_id = foodid
                    this.cartFoodList[cartFoodNum].num = foodItem.num
                    this.cartFoodList[cartFoodNum].price = foodItem.price
                    this.cartFoodList[cartFoodNum].name = foodItem.name
                    this.cartFoodList[cartFoodNum].specs = foodItem.specs
                    cartFoodNum++
                  }
                }
              })
            }
          )
          newArr[index] = num
        } else {
          newArr[index] = 0
        }
      })
      this.totalPrice = this.totalPrice.toFixed(2)
      this.categoryNum = [...newArr]
    },
    // 控制购物列表是否显示
    toggleCartList () {
      // this.cartFoodList.length > 0 ? (this.showCartList = !this.showCartList) : true
      if (this.cartFoodList.length) {
        this.showCartList = !this.showCartList
      } else {
        this.showCartList = true
      }
    },
    // 清除购物车
    clearCart () {
      this.toggleCartList()
      this.CLEAR_CART(this.shopId)
    },
    // 监听圆点是否进入购物车
    listenInCart () {
      if (!this.receiveInCart) {
        this.receiveInCart = true
        this.$refs.cartContainer.addEventListener('animationend', () => {
          this.receiveInCart = false
        })
        this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
          this.receiveInCart = false
        })
      }
    },
    // 获取不同类型的评论列表
    async changeTgeIndex (index, name) {
      this.ratingTageIndex = index
      this.ratingOffset = 0
      this.ratingTagName = name
      // let res = await getRatingList(this.shopId, this.ratingOffset, name)
      // 评论列表
      let query2 = '?has_content=true' + '&offset=' + this.ratingOffset + '&limit=10&tag_name=' + name
      this.$axios.get('/ugc/v2/restaurants/' + this.shopId + '/ratings' + query2).then(res => {
        if (res.data) {
          this.ratingList = [...res.data]
          this.$nextTick(() => {
            this.ratingScroll.refresh()
          })
        }
      })
    },
    // 加载更多评论
    async loaderMoreRating () {
      if (this.preventRepeatRequest) {
        return
      }
      this.loadRatings = true
      this.preventRepeatRequest = true
      this.ratingOffset += 10
      // let ratingDate = await getRatingList(
      //   this.shopId,
      //   this.ratingOffset,
      //   this.ratingTagName
      // )
      // 评论列表
      let query2 = '?has_content=true' + '&offset=' + this.ratingOffset + '&limit=10&tag_name=' + this.ratingTagName
      this.$axios.get('/ugc/v2/restaurants/' + this.shopId + '/ratings' + query2).then(res => {
        if (res.data) {
          let ratingDate = res.data
          this.ratingList = [...this.ratingList, ...ratingDate]
          this.loadRatings = false
          if (ratingDate.length >= 10) {
            this.preventRepeatRequest = false
          }
        }
      })
    },
    // 隐藏动画
    hideLoading () {
      this.showLoading = false
    },
    // 显示规格列表
    showChooseList (foods) {
      if (foods) {
        this.choosedFoods = foods
      }
      this.showSpecs = !this.showSpecs
      this.specsIndex = 0
    },
    // 记录当前所选规格的索引值
    chooseSpecs (index) {
      this.specsIndex = index
    },
    // 多规格商品加入购物车
    addSpecs (
      categoryId,
      itemId,
      foodId,
      name,
      price,
      specs,
      packingfee,
      skuId,
      stock
    ) {
      this.ADD_CART({
        shopid: this.shopId,
        category_id: categoryId,
        item_id: itemId,
        food_id: foodId,
        name,
        price,
        specs,
        packing_fee: packingfee,
        sku_id: skuId,
        stock
      })
      this.showChooseList()
    },
    // 显示提示，无法减去商品
    showReduceTip () {
      this.showDeleteTip = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        this.showDeleteTip = false
      }, 3000)
    },
    // 显示下落圆球
    showMoveDotFun (showMoveDot, elLeft, elBottom) {
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot]
      this.elLeft = elLeft
      this.elBottom = elBottom
    },
    beforeEnter (el) {
      el.style.transform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`
      el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`
      el.children[0].style.opacity = 0
    },
    afterEnter (el) {
      el.style.transform = `translate3d(0,0,0)`
      el.children[0].style.transform = `translate3d(0,0,0)`
      el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
      el.children[0].style.transition = 'transform .55s linear'
      this.showMoveDot = this.showMoveDot.map(item => false)
      el.children[0].style.opacity = 1
      el.children[0].addEventListener('transitionend', () => {
        this.listenInCart()
      })
      el.children[0].addEventListener('webkitAnimationEnd', () => {
        this.listenInCart()
      })
    },
    goback () {
      this.$router.go(-1)
    }
  },
  watch: {
    // showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
    showLoading: function (value) {
      if (!value) {
        this.$nextTick(() => {
          this.getFoodListHeight()
          this.initCategoryNum()
        })
      }
    },
    shopCart: function (value) {
      this.initCategoryNum()
    },
    // 购物车列表发生变化，没有商铺时，隐藏
    cartFoodList: function (value) {
      if (!value.length) {
        this.showCartList = false
      }
    },
    // 商品、评论切换状态
    changeShowType: function (value) {
      if (value === 'rating') {
        this.$nextTick(() => {
          this.ratingScroll = new BScroll('#ratingContainer', {
            probeType: 3,
            deceleration: 0.003,
            bounce: false,
            swipeTime: 2000,
            click: true
          })
          this.ratingScroll.on('scroll', pos => {
            if (Math.abs(Math.round(pos.y)) >= Math.abs(Math.round(this.ratingScroll.maxScrollY))) {
              this.loaderMoreRating()
              this.ratingScroll.refresh()
            }
          })
        })
      }
    }
  }
}
</script>
<style lang='scss'>
@import '../../style/shop.scss';
</style>
