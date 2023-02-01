<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-simple-table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>部門名稱</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="department in departments" :key="department.id">
                            <td>{{  department.id  }}</td>
                            <td>{{ department.name }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
            <v-col cols="6">   
                <ValidationObserver v-slot="{ invalid }">
                    部門列表管理
                    <ValidationProvider v-slot="{ errors }" rules="required" name="部門名稱">
                        <v-text-field v-model="department_name" label="部門名稱" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <v-btn :disabled="invalid" @click="uploadData">新增</v-btn><br/>
                </ValidationObserver>
                <ValidationObserver v-slot="{ invalid }">
                    <ValidationProvider v-slot="{ errors }" rules="required" name="ID">
                        <v-select v-model="data_id" :items="departments" label="ID" item-text="id" item-value="id"  :error-messages="errors" @change="showData"/>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="部門名稱">
                        <v-text-field v-model="new_department_name" label="部門名稱" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <v-btn :disabled="invalid" @click="updateData">修改</v-btn> <v-btn :disabled="invalid" @click="deleteData">刪除</v-btn>
                </ValidationObserver>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
    data() {
        return {
            departments: [],
            department_name:"",
            data_id: '',
            new_department_name: "",
        };
    },
    mounted() {
        this.loadDepartments();
    },
    computed: {},
    methods: {
        async loadDepartments() {
            const response = await this.$axios.get("/api/departments");
            this.departments = response.data;
        },
        async uploadData() {
            const userInput = {
                "name": this.department_name,
            };
            const response = await this.$axios.post("/api/departments", userInput);
            console.log(response);
            await this.loadDepartments();
            
        },
        async updateData() {
            const userInput = {
                "name": this.new_department_name
            };
            await this.$axios.patch(`/api/departments/${this.data_id}`, userInput);
            await this.loadDepartments();
        },
        async deleteData() {
            if(confirm(`你確定要刪除ID「${this.data_id}」這筆資料嗎？`)){
                await this.$axios.delete(`/api/departments/${this.data_id}`);
                await this.loadDepartments();
            }
            
        },
        async showData(){
            const response = await this.$axios.get(`/api/departments/${this.data_id}`);
            this.new_department_name = response.data.name
        } 
    },
}
</script>