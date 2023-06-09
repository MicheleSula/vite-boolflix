<script>
export default (await import('vue')).defineComponent({
    name: "FilmElement",
    props: {
        details: Object
    },
    data() {
        return {
            isVisible: false,
            observer: null
        }
    },
    mounted() {
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    this.observer.disconnect();
                }
            });
        });
        this.observer.observe(this.$el);
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
});
</script>

<template>
    <div id="movie">
        <div>
            <!-- Movie title -->
            <h2>{{ details.title }}</h2>
            <!-- Movie poster -->
            <img v-if="isVisible" :src="`https://image.tmdb.org/t/p/w500${details.poster_path}`">
            <!-- Movie release date -->
            <p>Release date: {{ details.release_date }}</p>
            <!-- Movie overview -->
            <p>{{ details.overview }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
#movies-container {
    height: calc(100vh - 150px);
    background-color: olive;
}

#movie {
    margin: 20px;
    padding: 20px;
    background-color: #212529;
    border: 3px groove #6f7881;

    h2 {
        font-size: 20px;
        text-align: center;
        margin-bottom: 10px;
        color: white;
    }

    img {
        width: 300px;
        height: 500px;
    }
}
</style>