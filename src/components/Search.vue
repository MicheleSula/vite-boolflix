<script>
export default {
    data() {
        return {
            query: ''
        }
    },
    methods: {
        search() {
            this.$root.$options.methods.searchMovies.call(this.$root, this.query);
        }
    }
}
</script>

<template>
    <div>
        <input type="text" v-model="query" placeholder="Search for movies...">
        <button @click="search">Search</button>
    </div>
</template>