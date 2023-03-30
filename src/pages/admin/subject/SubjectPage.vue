<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" icon="dashboard" />
          <q-breadcrumbs-el label="Suject" icon="apps" />
          <q-breadcrumbs-el class="text-grey-7" label="All Subject" icon="apps" />
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
                Suject Data
              </div>
              <p class="text-caption">
                All data active suject record system
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
              <q-td key="SUBJECT_CODE" :props="props"><q-badge color="primary">SBJ{{ props.row.SUBJECT_CODE }}</q-badge></q-td>
              <q-td key="SUBJECT" :props="props">{{ props.row.SUBJECT }}</q-td>
              <q-td key="STUDY_PROGRAM" :props="props"><q-badge color="primary"> {{ props.row.STUDY_PROGRAM }}</q-badge></q-td>
              <q-td key="CREATED_AT" :props="props">{{this.$parseDate(props.row.CREATED_AT).fullDate}}</q-td>
              <q-td key="action" :props="props">
                <q-btn round flat  color="indigo-10" @click="this.editData(props.row)" size="sm" icon="edit" no-caps class="q-ml-sm" />
                <q-btn round flat @click="this.delete(props.row.GUID)" color="indigo-10" size="sm" icon="delete" no-caps class="q-ml-sm" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        </q-card>

        <q-dialog v-model="subject">
          <q-card class="my-card" flat bordered style="width: 600px; max-width: 60vw;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="description" size="40px" color="indigo-10" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Subject Data</q-item-label>
                <q-item-label caption>
                  Edit data subject
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
                  <q-input dense outlined v-model="form.SUBJECT_CODE" label="Subject Code" readonly/>
                  <q-select color="orange" outlined dense v-model="form.STUDY_PROGRAM" :options="studyprogramoptions" label="Study Program" />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input dense outlined v-model="form.SUBJECT" label="Subject"/>
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
    SUBJECT_CODE: null,
    SUBJECT: null,
    STUDY_PROGRAM: null
  }
}

export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      columns: [
        { name: 'SUBJECT_CODE', align: 'left', label: 'Subject Code', field: 'SUBJECT_CODE', sortable: true },
        { name: 'SUBJECT', align: 'left', label: 'Subject', field: 'SUBJECT', sortable: true },
        { name: 'STUDY_PROGRAM', align: 'left', label: 'Study Program', field: 'STUDY_PROGRAM', sortable: true },
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
      subject: false,
      form: model(),
      GUID: null,
      studyprogramoptions: [
        'Informatic', 'Informatic System'
      ]
    }
  },
  created () {
    this.getSubject()
  },
  methods: {
    onSubmit () {
      this.onUpdate()
    },
    getSubject: async function () {
      this.$q.loading.show()
      await this.$axios.get('/subject/getAll')
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    editData (data) {
      this.subject = true
      this.GUID = data.GUID
      this.form.SUBJECT_CODE = data.SUBJECT_CODE
      this.form.SUBJECT = data.SUBJECT
      this.form.STUDY_PROGRAM = data.STUDY_PROGRAM
    },
    onUpdate () {
      console.log(this.form)
      this.$q.loading.show()
      this.$axios
        .put(`subject/update/${this.GUID}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif('Berhasil Memuat Permintaan')
            this.subject = false
            this.getSubject()
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
            .delete(`subject/${id}`)
            .finally(() => this.$q.loading.hide())
            .then((res) => {
              if (!this.$parseResponse(res.data)) {
                this.$successNotif(res.data.message)
                this.getSubject()
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
