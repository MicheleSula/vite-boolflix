<script>
import { getName } from 'i18n-iso-countries';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

export default (await import('vue')).defineComponent({
    name: "FilmElement",
    components: {
        FontAwesomeIcon
    },
    props: {
        details: Object
    },
    data() {
        return {
            isVisible: false,
            observer: null
        }
    },
    computed: {
        countryCode() {
            // Convert language code to country code
            const lang = this.details.original_language;
            let countryCode = getName(lang, 'en');
            // Handle special cases
            if (lang === 'en') {
                countryCode = 'gb';
            }
            console.log('countryCode:', countryCode);
            return countryCode;
        },
        stars() {
            // Calculate number of full and half stars
            const voteAverage = this.details.vote_average;
            const stars = Math.round(voteAverage / 2);
            return stars;
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
            <!-- Original Movie title -->
            <h3>{{ details.original_title }}</h3>
            <!-- Movie language -->
            <p>Language: <span :class="['flag-icon', `flag-icon-${countryCode}`]"></span></p>
            <!-- Movie vote average -->
            <p>Vote Average:
                <span v-for="star in stars" :key="star">
                    <font-awesome-icon icon="star"></font-awesome-icon>
                </span>
                <span v-for="star in 5 - stars" :key="star">
                    <font-awesome-icon icon="star" class="empty-star"></font-awesome-icon>
                </span>
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../node_modules/flag-icon-css/css/flag-icons.css';
@import '../../node_modules/@fortawesome/fontawesome-svg-core/styles.css';


.empty-star {
    color: #ccc;
}

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