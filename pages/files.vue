<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-simple-table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>標題</th>
                            <th>敘述</th>
                            <th>檔案連結</th>
                            <th>所屬部門</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="file in files" :key="file.id">
                            <td>{{  file.id  }}</td>
                            <td>{{ file.title }}</td>
                            <td>{{ file.description }}</td>
                            <td>{{ file.file_url }}</td>
                            <td>{{ file.department.name }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
            <v-col cols="6">   
                <ValidationObserver v-slot="{ invalid }">
                    檔案表單管理
                    <ValidationProvider v-slot="{ errors }" rules="required" name="檔案標題">
                        <v-text-field v-model="title" label="檔案標題" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="檔案敘述">
                        <v-text-field v-model="description" label="檔案敘述" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="檔案連結">
                        <v-text-field v-model="file_url" label="檔案連結" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="管理檔案的部門">
                        <v-select v-model="department_id" :items="departments" label="管理檔案的部門" item-text="name" item-value="id"  :error-messages="errors" />
                    </ValidationProvider>
                    <v-btn :disabled="invalid" @click="uploadData">新增</v-btn><br/>
                </ValidationObserver>
                <ValidationObserver v-slot="{ invalid }">
                    <ValidationProvider v-slot="{ errors }" rules="required" name="ID">
                        <v-select v-model="data_id" :items="files" label="ID" item-text="id" item-value="id"  :error-messages="errors" @change="showData"/>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="檔案標題">
                        <v-text-field v-model="new_title" label="檔案標題" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="檔案敘述">
                        <v-text-field v-model="new_description" label="檔案敘述" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="檔案連結">
                        <v-text-field v-model="new_file_url" label="檔案連結" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="管理檔案的部門">
                        <v-select v-model="new_department_id" :items="departments" label="管理檔案的部門" item-text="name" item-value="id"  :error-messages="errors" />
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
            files: [],
            title: "",
            description: "",
            file_url: "",
            department_id: "",
            departments: [],
            data_id: '',
            new_title: "",
            new_description: "",
            new_file_url: "",
            new_department_id: "",
        };
    },
    mounted() {
        this.loadFiles();
        this.loadDepartment();
    },
    computed: {},
    methods: {
        async loadFiles() {
            const response = await this.$axios.get("/api/files");
            this.files = response.data;
        },
        async uploadData() {
            const userInput = {
                "title": this.title,
                "description": this.description,
                "file_url": this.file_url,
                "department_id": this.department_id,
            };
            await this.$axios.post("/api/files", userInput);
            await this.loadFiles();
        },
        async loadDepartment() {
            const response = await this.$axios.get("/api/departments");
            this.departments = response.data;
        },
        async updateData() {
            const userInput = {
                "title": this.new_title,
                "description": this.new_description,
                "file_url": this.new_file_url,
                "department_id": this.new_department_id,
            };
            await this.$axios.patch(`/api/files/${this.data_id}`, userInput);
            await this.loadFiles();
        },
        async deleteData() {
            if(confirm(`你確定要刪除ID「${this.data_id}」這筆資料嗎？`)){
                await this.$axios.delete(`/api/files/${this.data_id}`);
                await this.loadFiles();
            }
            
        },
        async showData(){
            const response = await this.$axios.get(`/api/files/${this.data_id}`);
            this.new_title = response.data.title
            this.new_description = response.data.description
            this.new_file_url = response.data.title
            this.new_department_id = response.data.department_id
        } 
    },
}
</script>