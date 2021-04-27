<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: user.username,
            },
          }"
          class="comment-author"
        >
          <img :src="user.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: user.username,
            },
          }"
          class="comment-author"
          >{{ user.username }}</nuxt-link
        >
        <span class="date-posted">Dec 29th</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "commentsPage",
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async mounted() {
    const { slug } = this.article;
    const { data } = await getComments(slug);
    this.comments = data.comments;
  },
};
</script>

<style></style>
