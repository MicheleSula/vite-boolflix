<script>
import { store, searchMovies, getPopularMovies } from '../src/store.js';
import FilmList from '../src/components/FilmList.vue';
import FilmElement from './components/FilmElement.vue';
import Search from './components/Search.vue';

export default (await import('vue')).defineComponent({
  components: {
    FilmList,
    FilmElement,
    Search
  },
  data() {
    return {
      store,
      isLoading: false,
    }
  },
  methods: {
    searchMovies(query) {
      this.isLoading = true;
      searchMovies(query).then(() => {
        this.isLoading = false;
      }).catch(error => {
        console.log(error);
        this.isLoading = false;
      });
    }
  },
  mounted() {
    getPopularMovies();
  }
});
</script>

<template>
  <Loader v-if="isLoading" />
  <div v-else>
    <header>
      <h1 id="page-title">Movie Search</h1>
    </header>

    <Search></Search>

    <main>
      <div id="movies-container">
        <FilmList></FilmList>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@use './styles/general.scss' as *;

header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7d3e12 !important;
  border-bottom: #b4642a 4px solid;

  #page-title {
    color: white;
    font-size: 50px;
    font-weight: bold;
  }
}

main {
  height: calc(100vh - 180px);

  #movies-container {
    overflow: auto;
    background-color: rgb(165, 76, 76);
    margin: auto;
    border: #7d3e12 2px ridge;
  }
}
</style>

