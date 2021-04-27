<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; {{ $route.params.username === user.username ? ' Edit Profile Settings' : `Follow ${$route.params.username}` }} 
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link 
                class="nav-link active" 
                :to="{
                  name: 'profile',
                  query: {
                    tag: 'author'
                  }
                }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{
                  name: 'profile',
                  query: {
                    tag: 'favorites'
                  }
                }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link 
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
                <img :src="article.author.image"/>
              </nuxt-link>
              <div class="info">
                <nuxt-link 
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date("MMMM DD, YYYY") }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p{{ title.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "profilePage",
  middleware: "authenticated",
  computed: {
    ...mapState(["user"]),
    tag () {
      return this.$route.query.tag
    },
    username () {
      return this.$route.params.username
    }
  },
  data () {
    return {
      articles: []
    }
  },
  async mounted () {
    const key = this.tag === 'favorites' ? 'favorites' : 'author'
    const { data } = await getArticles({
      [key]: this.username,
      limit: 5,
      offset: 0,
    });
    this.articles = data.articles
  },
  watchQuery: ['tag']
};
</script>

<style></style>
