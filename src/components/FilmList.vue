<script>
import { store } from '../store';
import FilmElement from './FilmElement.vue';

export default (await import('vue')).defineComponent({
    name: "FilmList",
    components: {
        FilmElement
    },
    data() {
        return {
            store
        }
    }
})
</script>

<template>
    <section id="movies-container">
        <div v-for="movie in store.movies" :key="movie.id">
            <FilmElement :details="movie"></FilmElement>
        </div>
    </section>
</template>

<style scoped>
#movies-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
