<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <template>
                    <v-data-table
                        :headers="headers"
                        :items="files"
                        :single-expand="singleExpand"
                        :expanded.sync="expanded"
                        item-key="id"
                        show-expand
                        class="elevation-1"
                        :search="search"
                        :page.sync="page"
                        hide-default-footer
                    >
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>資料表</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field> 
                            </v-toolbar>
                        </template>
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length">
                                文件連結：{{item.file_url}}<br>
                                內容描述：{{item.description}}
                            </td>
                        </template>
                    </v-data-table>
                    <div class="text-center pt-2">
                        <v-pagination
                            v-model="page"
                            :length="pageCount"
                            total-visible="10"
                        ></v-pagination>
                    </div>
                </template>
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
            headers:[
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id'
                },
                { text: '文件標題', value: 'title' },
                { text: '所屬部門', value: 'department.name' },
            ],
            search : "" ,
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
            singleExpand : true,
            expanded: [],
            page: '',
            pageCount: '',
        };
    },
    mounted() {
        this.loadFiles();
        this.loadDepartment();
    },
    watch: {
        page (newVal, oldVal) {
            console.log(oldVal);
            this.loadFiles(newVal);
        }
    },
    computed: {
    },
    updated() {

    },
    methods: {
        // 載入資料
        async loadFiles(pageNumber) {
            const response = await this.$axios.get("/api/files?page="+pageNumber);
            this.files = response.data.data;
            this.page = response.data.current_page;
            this.pageCount = response.data.last_page;
        },
        // 上傳資料
        async uploadData() {
            const userInput = {
                "title": this.title,
                "description": this.description,
                "file_url": this.file_url,
                "department_id": this.department_id,
            };
            await this.$axios.post("/api/files", userInput);
            await this.loadFiles(this.page);
        },
        // 載部門資料
        async loadDepartment() {
            const response = await this.$axios.get("/api/departments");
            this.departments = response.data;
        },
        // 更新資料
        async updateData() {
            const userInput = {
                "title": this.new_title,
                "description": this.new_description,
                "file_url": this.new_file_url,
                "department_id": this.new_department_id,
            };
            await this.$axios.patch(`/api/files/${this.data_id}`, userInput);
            await this.loadFiles(this.page);
        },
        // 刪除資料
        async deleteData() {
            if(confirm(`你確定要刪除ID「${this.data_id}」這筆資料嗎？`)){
                await this.$axios.delete(`/api/files/${this.data_id}`);
                await this.loadFiles(this.page);
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