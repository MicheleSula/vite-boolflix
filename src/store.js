import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
    apiURL: "https://api.themoviedb.org/3",
    apiKey: "2d112f349d964f96acc15bf8f7088577",
    movies: [],
});

export async function searchMovies(query) {
    try {
        const response = await axios.get(`${store.apiURL}/search/movie`, {
            params: {
                api_key: store.apiKey,
                query: query
            }
        });
        store.movies = response.data.results;
    } catch (error) {
        console.error(error);
    }
}

export async function getPopularMovies() {
    try {
        const response = await axios.get(`${store.apiURL}/movie/popular`, {
            params: {
                api_key: store.apiKey
            }
        });
        store.movies = response.data.results.slice(0, 10);
    } catch (error) {
        console.error(error);
    }
}