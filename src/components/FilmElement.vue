<script>
import { getName } from 'i18n-iso-countries';

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
    computed: {
        countryCode() {
            // Convert language code to country code
            const lang = this.details.original_language;
            let countryCode = getName(lang);

            if (lang === 'en') {
                countryCode = 'gb';
            }
            if (lang === 'it') {
                countryCode = 'it';
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
            <!-- Movie poster -->
            <img v-if="isVisible" :src="`https://image.tmdb.org/t/p/w500${details.poster_path}`">

            <!-- Movie details -->
            <div class="details">
                <!-- Movie title -->
                <h2>{{ details.title }}</h2>
                <!-- Original Movie title -->
                <h3>{{ details.original_title }}</h3>
                <!-- Movie language -->
                <p>Language: <span :class="['flag-icon', `flag-icon-${countryCode}`]"></span></p>
                <!-- Movie vote average -->
                <p>Vote Average:
                    <span v-for="star in stars" :key="star">
                        <i class="bi bi-star-fill"></i>
                    </span>
                    <span v-for="star in 5 - stars" :key="star">
                        <i class="bi bi-star"></i>
                    </span>
                </p>
                <!-- Movie overview -->
                <p>
                    Overview: {{ details.overview }}
                </p>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../node_modules/flag-icon-css/css/flag-icons.css';
@import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';

.bi-star {
    color: #ccc;
}

#movies-container {
    height: calc(100vh - 150px);
    background-color: olive;
}

#movie {
    margin: 20px;
    background-color: #212529;
    border: 3px groove #6f7881;
    height: 450px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 35px;
        text-align: center;
        margin-bottom: 20px;
        color: white;
    }

    h3 {
        color: rgb(226, 190, 70);
        margin-bottom: 10px;
    }

    p {
        color: rgb(226, 190, 70);
        margin-bottom: 10px;
    }

    img {
        height: 100%;
        width: 100%;
    }

    .details {
        display: none;
    }

    &:hover img {
        display: none;
    }

    &:hover .details {
        display: block;
    }
}
</style>