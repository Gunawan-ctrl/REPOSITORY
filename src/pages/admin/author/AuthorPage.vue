<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" icon="dashboard" />
          <q-breadcrumbs-el label="Author" icon="apps" />
          <q-breadcrumbs-el class="text-grey-7" label="All Author" icon="apps" />
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
                Author Data
              </div>
              <p class="text-caption">
                All data active author record system
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
              <q-td key="AUTHOR_CODE" :props="props"><q-badge color="primary">AUT{{ props.row.AUTHOR_CODE }}</q-badge></q-td>
              <q-td key="AUTHOR" :props="props">{{ props.row.AUTHOR }}</q-td>
              <q-td key="GENDER" :props="props"><q-badge color="primary"> {{ props.row.GENDER }}</q-badge></q-td>
              <q-td key="PHONE" :props="props">{{ props.row.PHONE }}</q-td>
              <q-td key="CREATED_AT" :props="props">{{this.$parseDate(props.row.CREATED_AT).fullDate}}</q-td>
              <q-td key="action" :props="props">
                <q-btn round flat  color="indigo-10" @click="this.editData(props.row)" size="sm" icon="edit" no-caps class="q-ml-sm" />
                <q-btn round flat @click="this.delete(props.row.GUID)" color="indigo-10" size="sm" icon="delete" no-caps class="q-ml-sm" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        </q-card>

        <q-dialog v-model="author">
          <q-card class="my-card" flat bordered style="width: 600px; max-width: 60vw;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="school" size="40px" color="indigo-10" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Author Data</q-item-label>
                <q-item-label caption>
                  Edit data author
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
                  <q-input dense outlined v-model="form.AUTHOR_CODE" label="Author Code" readonly/>
                  <q-select color="orange" outlined dense v-model="form.GENDER" :options="genderoptions" label="Gender" />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input dense outlined v-model="form.AUTHOR" label="Author"/>
                  <q-input dense outlined v-model="form.PHONE" label="Phone"/>
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

const model = () => {
  return {
    AUTHOR_CODE: null,
    GENDER: null,
    AUTHOR: null,
    PHONE: null
  }
}

export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      columns: [
        { name: 'AUTHOR_CODE', required: true, align: 'left', label: 'Author Code', field: 'AUTHOR_CODE', sortable: true },
        { name: 'AUTHOR', required: true, align: 'left', label: 'Author', field: 'AUTHOR', sortable: true },
        { name: 'GENDER', required: true, align: 'left', label: 'Gender', field: 'GENDER', sortable: true },
        { name: 'PHONE', required: true, align: 'left', label: 'Phone', field: 'PHONE', sortable: true },
        { name: 'CREATED_AT', required: true, align: 'left', label: 'Created', field: 'CREATED_AT' },
        { name: 'action', required: true, align: 'left', label: '', field: 'action' }
      ],
      pagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 8
      },
      filter: '',
      visibles: false,
      rows: [],
      author: false,
      form: model(),
      GUID: null,
      genderoptions: [
        'Male', 'Female'
      ]
    }
  },
  created () {
    this.getAuthor()
  },
  methods: {
    onSubmit () {
      this.onUpdate()
    },
    getAuthor: async function () {
      this.$q.loading.show()
      await this.$axios.get('/author/getAll')
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    editData (data) {
      this.author = true
      this.GUID = data.GUID
      this.form.AUTHOR_CODE = data.AUTHOR_CODE
      this.form.GENDER = data.GENDER
      this.form.AUTHOR = data.AUTHOR
      this.form.PHONE = data.PHONE
    },
    onUpdate () {
      console.log(this.form)
      this.$q.loading.show()
      this.$axios
        .put(`author/update/${this.GUID}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif('Berhasil Memuat Permintaan')
            this.author = false
            this.getAuthor()
          }
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
            .delete(`author/${id}`)
            .finally(() => this.$q.loading.hide())
            .then((res) => {
              if (!this.$parseResponse(res.data)) {
                this.$successNotif(res.data.message)
                this.getAuthor()
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
