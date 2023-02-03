<template>
    <v-container>
        <input type="text" v-model="first_name">
        <input type="text" v-model="last_name">
        <h1>{{ full_name  }}</h1>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            first_name: 'Roli',
            last_name: 'Chung',
        }
    },
    computed: {
        full_name() {
            return this.first_name + ' ' + this.last_name 
        }
    }
}
</script>