<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <authorDetail :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <authorDetail :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleBySlug } from "@/api/article";
import MarkdownIt from "markdown-it";
import authorDetail from './components/author-detail'
import comments from './components/comments'
export default {
  name: "articlePage",
  middleware: 'authenticated',
  components: {
    authorDetail,
    comments
  },
  async asyncData ({ params }) {
    const { slug } = params
    const { data } = await getArticleBySlug(slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return data;
  },
  head () {
    return {
      title: this.article.title,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ],
    }
  }
};
</script>

<style></style>
