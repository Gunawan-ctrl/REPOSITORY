<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" icon="dashboard" />
          <q-breadcrumbs-el label="Repository" icon="apps" />
          <q-breadcrumbs-el class="text-grey-7" label="All Repository" icon="apps" />
        </q-breadcrumbs>
    </q-card>
    <div class="row q-ma-md">
      <div class="col-12">
        <q-card>
          <q-table
          title="Data repositori"
          :rows="rows"
          class="text-grey-8"
          :columns="columns"
          row-key="name"
          :pagination="pagination"
          :filter="filter"
        >
          <template v-slot:top>
            <div class="col">
              <div class="col-2 q-table__title">
                Repository system
              </div>
              <p class="text-caption">
                Practical course application storage system
              </p>
            </div>

            <q-space />

            <q-btn
              flat
              icon-right="document_scanner"
              text-color="indigo-10"
              @click="exportTable"
            >
              <q-tooltip>
                Export Data
              </q-tooltip>
            </q-btn>

            <q-btn
              flat
              color="indigo-10"
              icon="search"
              @click="visibles = !visibles"
              size="md"
              class="q-mr-sm"
            />
            <q-slide-transition>
              <div v-show="visibles">
                <q-input
                  outlined
                  debounce="300"
                  placeholder="Pencarian"
                  style="width: 300px"
                  color="primary"
                  v-model="filter"
                  dense
                />
              </div>
            </q-slide-transition>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="REPOSITORY_CODE" :props="props"><q-badge color="primary">RPS{{ props.row.REPOSITORY_CODE }}</q-badge></q-td>
              <q-td key="TITLE" :props="props">{{ props.row.CATEGORIES_DATA.TITLE }}</q-td>
              <q-td key="SUBJECT" :props="props">{{ props.row.SUBJECT_DATA.SUBJECT }}</q-td>
              <q-td key="AUTHOR" :props="props">{{ props.row.AUTHOR_DATA.AUTHOR }}</q-td>
              <q-td key="SEMESTER" :props="props">{{ props.row.SEMESTER }}</q-td>
              <q-td key="URL" :props="props"><a target="_blank" :href="props.row.URL" style="text-decoration:none">{{ props.row.URL }}</a><q-tooltip>{{ props.row.DESC }}</q-tooltip></q-td>
              <q-td key="CREATED_AT" :props="props">{{this.$parseDate(props.row.CREATED_AT).fullDate}}</q-td>
              <q-td key="action" :props="props">
                <q-btn round flat  color="indigo-10" @click="this.editData(props.row)" size="sm" icon="edit" no-caps class="q-ml-sm" />
                <q-btn round flat @click="this.delete(props.row.GUID)" color="indigo-10" size="sm" icon="delete" no-caps class="q-ml-sm" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        </q-card>

        <q-dialog v-model="repositories">
          <q-card class="my-card" flat bordered style="width: 600px; max-width: 60vw;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="dashboard" size="40px" color="indigo-10" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Repositories Data</q-item-label>
                <q-item-label caption>
                  Edit data repositories
                </q-item-label>
              </q-item-section>

              <q-item-section class="col-1">
                <q-btn flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-form @submit="onSubmit">

              <q-card-section horizontal>
                <q-card-section class="q-gutter-md fit">
                  <q-input dense outlined v-model="form.REPOSITORY_CODE" label="Repositories Code" readonly/>
                  <q-select color="orange" outlined dense v-model="SUBJECT" :options="options.subjectoptions" label="Subject" option-label="SUBJECT" key="SUBJECT">
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{scope.opt.SUBJECT}}</q-item-label>
                          <q-item-label caption>{{scope.opt.STUDY_PROGRAM}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <q-input dense outlined v-model="form.SEMESTER" label="Semester"/>
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-select color="orange" outlined dense v-model="CATEGORIES" :options="options.categoriesoptions" label="Categories" option-label="TITLE" key="TITLE">
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{scope.opt.TITLE}}</q-item-label>
                          <q-item-label caption>{{scope.opt.DESC}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <q-select color="orange" outlined dense v-model="AUTHOR" :options="options.authoroptions" label="Author" option-label="AUTHOR" key="AUTHOR">
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{scope.opt.AUTHOR}}</q-item-label>
                          <q-item-label caption>{{scope.opt.PHONE}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <q-input dense outlined v-model="form.URL" label="URL"/>
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat color="indigo-10" type="submit">
                  Update
                </q-btn>
              </q-card-actions>

            </q-form>

          </q-card>
        </q-dialog>

      </div>
    </div>
  </q-page>
</template>

<script>

import { ListService } from '../../../helper/services/ListService'

const model = () => {
  return {
    REPOSITORY_CODE: null,
    CATEGORIES: null,
    SUBJECT: null,
    AUTHOR: null,
    SEMESTER: null,
    URL: null,
    DESC: null
  }
}

export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      columns: [
        { name: 'REPOSITORY_CODE', align: 'left', label: 'Repository Code', field: 'REPOSITORY_CODE', sortable: true },
        { name: 'TITLE', align: 'left', label: 'Categories', field: 'TITLE', sortable: true },
        { name: 'SUBJECT', align: 'left', label: 'Subject', field: 'SUBJECT', sortable: true },
        { name: 'AUTHOR', align: 'left', label: 'Author', field: 'AUTHOR', sortable: true },
        { name: 'SEMESTER', align: 'left', label: 'Semester', field: 'SEMESTER', sortable: true },
        { name: 'URL', align: 'left', label: 'URL', field: 'URL' },
        { name: 'CREATED_AT', align: 'left', label: 'Created', field: 'CREATED_AT' },
        { name: 'action', align: 'left', label: '', field: 'action' }
      ],
      pagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 8
      },
      filter: '',
      visibles: false,
      rows: [],
      form: model(),
      CATEGORIES: null,
      SUBJECT: null,
      AUTHOR: null,
      options: {
        categoriesoptions: [],
        subjectoptions: [],
        authoroptions: []
      },
      repositories: false,
      GUID: null
    }
  },
  created () {
    this.getRepositories()
    this.getList()
  },
  methods: {
    onSubmit () {
      this.onUpdate()
    },
    getRepositories: async function () {
      this.$q.loading.show()
      await this.$axios.get('/repositories/getAll')
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    editData (data) {
      console.log(data)
      this.repositories = true
      this.GUID = data.GUID
      this.form.REPOSITORY_CODE = data.REPOSITORY_CODE
      this.form.SEMESTER = data.SEMESTER
      this.form.URL = data.URL
      this.AUTHOR = data.AUTHOR_DATA.AUTHOR
      this.CATEGORIES = data.CATEGORIES_DATA.TITLE
      this.SUBJECT = data.SUBJECT_DATA.SUBJECT
    },
    onUpdate () {
      this.form.SUBJECT = this.SUBJECT.GUID
      this.form.CATEGORIES = this.CATEGORIES.GUID
      this.form.AUTHOR = this.AUTHOR.GUID
      this.$q.loading.show()
      this.$axios
        .put(`repositories/update/${this.GUID}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif('Berhasil Memuat Permintaan')
            this.repositories = false
            this.getRepositories()
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getList () {
      ListService.getListCategories()
        .then((res) => {
          this.options.categoriesoptions = res.data.data
        })
        .catch(() => this.$commonErrorNotif())

      ListService.getListSubject()
        .then((res) => {
          this.options.subjectoptions = res.data.data
        })
        .catch(() => this.$commonErrorNotif())

      ListService.getListAuthor()
        .then((res) => {
          this.options.authoroptions = res.data.data
        })
        .catch(() => this.$commonErrorNotif())
    },
    delete (id) {
      this.$q
        .dialog({
          title: 'Peringatan',
          message: 'Apakah anda yakin menghapus data ini ?',
          cancel: true,
          color: 'indigo-10',
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete(`repositories/${id}`)
            .finally(() => this.$q.loading.hide())
            .then((res) => {
              if (!this.$parseResponse(res.data)) {
                this.$successNotif(res.data.message)
                this.getRepositories()
              }
            })
            .catch(() => this.$commonErrorNotif())
        })
    }
  }
}

</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
