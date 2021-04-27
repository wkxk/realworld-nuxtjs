<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link 
                  class="nav-link"
                  :class="{
                    active: !tag && tab === 'your_feed'
                  }" 
                  exact 
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                 class="nav-link" 
                 :class="{
                    active: !tag && tab === 'global_feed'
                  }" 
                  exact
                 :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                 class="nav-link" 
                 :class="{
                    active: tag
                  }" 
                  exact
                 :to="{
                    name: 'home',
                    query: {
                      tag: query.tag
                    }
                  }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="(article, index) in articles"
            :key="index"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.createdAt | date('MMMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="handleClick(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <div v-if="!articles.length" class="article-preview">No articles are here... yet.</div>

          <nav>
            <ul class="pagination">
              <li 
                class="page-item" 
                :class="{
                  active: page === item
                }" 
                v-for="item in totalPage" 
                :key="item"
              >
                <nuxt-link class="page-link ng-binding" :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tab: query.tab,
                    tag: query.tag,
                  }
                }">{{
                  item
                }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link 
                :to="{
                  name: 'home',
                  query: {
                    tag
                  }
                }" 
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { 
  getArticles, 
  getTags, 
  getFeedArticles,
  favoriteArticle,
  unfavoriteArticle 
} from "@/api/article";
export default {
  name: "homePage",
  data() {
    return {
      isClick: false
    }
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(parseInt(this.articlesCount / this.limit));
    },
  },
  async asyncData({ query }) {
    const limit = 20;
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const page = parseInt(query.page) || 1;
    const offset = (page - 1) * limit;
    const articlesFn = tab === 'global_feed' ? getArticles : getFeedArticles
    const [articleRes, tagsRes] = await Promise.all([
      articlesFn({
        limit,
        offset,
        tag
      }),
      getTags()
    ])
    const { data } = articleRes
    const { data: tagsData } = tagsRes
    return {
      query,
      articles: data.articles,
      articlesCount: data.articlesCount,
      limit,
      page,
      tags: tagsData.tags,
      tab,
      tag
    };
  },
  methods: {
    async handleClick (article) {
      const { slug } = article
      if (this.isClick) return
      this.isClick = true
      if (!article.favorited) {
        await favoriteArticle(slug)
        article.favorited = true
        article.favoritesCount ++
      } else {
        await unfavoriteArticle(slug)
        article.favorited = false
        article.favoritesCount --
      }
      this.isClick = false
    }
  },
  watchQuery: ['page', 'tab', 'tag']
};
</script>

<style></style>
