<template>
  <q-page>
    <div class="row q-pa-lg q-gutter-md">
      <div class="col">
        <q-card flat class="bg-teal-1">
          <q-img
            style="height: 90px"
            src="icons/banner_4.jpg"
          />

          <q-card-section>
            <div class="text-caption text-grey">
              Repository
            </div>
            <div class="text-h4 text-weight-bold">{{ this.dataRepositories }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat class="bg-teal-1">
          <q-img
            style="height: 90px"
            src="icons/banner_2.jpg"
          />

          <q-card-section>
            <div class="text-caption text-grey">
              Categories
            </div>
            <div class="text-h4 text-weight-bold">{{ this.dataCategories }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat class="bg-teal-1">
          <q-img
            style="height: 90px"
            src="icons/banner_1.jpg"
          />

          <q-card-section>
            <div class="text-caption text-grey">
              Subjects
            </div>
            <div class="text-h4 text-weight-bold">{{ this.dataSubject }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat class="bg-teal-1">
          <q-img
            style="height: 90px"
            src="icons/banner_3.jpg"
          />

          <q-card-section>
            <div class="text-caption text-grey">
              Authors
            </div>
            <div class="text-h4 text-weight-bold">{{ this.dataAuthor }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-md q-ma-xs">
      <div class="col-12 col-md-9">
        <q-card>
          <q-table
          title="Data repositori"
          aria-label="Text"
          :rows="rows"
          class="text-grey-8"
          :columns="columns"
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
              <q-td key="URL" :props="props">{{ props.row.URL }}<q-tooltip>{{ props.row.DESC }}</q-tooltip></q-td>
              <q-td key="CREATED_AT" :props="props">{{this.$parseDate(props.row.CREATED_AT).fullDate}}</q-td>
              <q-td key="action" :props="props">
                <q-btn round flat  color="indigo-10" @click="this.update(props.row.REPOSITORY_CODE)" size="md" icon="swipe_right_alt" no-caps class="q-ml-sm" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        </q-card>
      </div>

      <div class="col-12 col-md-3 q-gutter-md">
        <div class="col-12 col-md-3">
          <q-card>
            <q-list bordered class="rounded-borders">
              <q-expansion-item
                expand-separator
                icon="dashboard"
                label="Categories"
                class="text-grey-8"
                header-class="text-indigo-10"
                default-opened
              >
                <q-card>
                  <q-list>
                    <div v-for="(d, i) in listCategories" :key="i">
                      <q-item>
                        <q-item-section>
                          <q-item-label>{{ d.TITLE }}</q-item-label>
                          <q-item-label caption>{{ d.DESC }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                          <q-badge color="indigo-10">CTR{{ d.CATEGORIES_CODE }}</q-badge>
                        </q-item-section>
                      </q-item>
                      <q-separator spaced inset />
                    </div>
                  </q-list>
                </q-card>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="description"
                class="text-grey-8"
                header-class="text-indigo-10"
                label="Subjects"
              >
                <q-card>
                  <q-list>
                    <div v-for="(d, i) in listSubject" :key="i">
                      <q-item>
                        <q-item-section>
                          <q-item-label>{{ d.SUBJECT }}</q-item-label>
                          <q-item-label caption>{{ d.STUDY_PROGRAM }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                          <q-badge color="indigo-10">SBJ{{ d.SUBJECT_CODE }}</q-badge>
                        </q-item-section>
                      </q-item>
                      <q-separator spaced inset />
                    </div>
                  </q-list>
                </q-card>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="school"
                class="text-grey-8"
                header-class="text-indigo-10"
                label="Authors"
              >
                <q-card>
                  <q-list>
                    <div v-for="(d, i) in listAuthor" :key="i">
                      <q-item>
                        <q-item-section>
                          <q-item-label>{{ d.AUTHOR }}</q-item-label>
                          <q-item-label caption>{{ d.PHONE }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                          <q-badge color="indigo-10">AUT{{ d.AUTHOR_CODE }}</q-badge>
                        </q-item-section>
                      </q-item>
                      <q-separator spaced inset />
                    </div>
                  </q-list>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      columns: [
        { name: 'REPOSITORY_CODE', align: 'left', label: 'Repository Code', field: 'REPOSITORY_CODE' },
        { name: 'TITLE', align: 'left', label: 'Categories', field: 'TITLE'},
        { name: 'SUBJECT', align: 'left', label: 'Subject', field: 'SUBJECT', sortable: true },
        { name: 'AUTHOR', align: 'left', label: 'Author', field: 'AUTHOR' },
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
      dataAuthor: [],
      dataSubject: [],
      dataCategories: [],
      dataRepositories: [],
      listCategories: [],
      listSubject: [],
      listAuthor: [],
      listReporitories: []
    }
  },
  created () {
    this.getRepositories()
    this.getDataCountAuthor()
    this.getDataCountSubject()
    this.getDataCountCategories()
    this.getDataCountRepositories()
    this.getCategories()
    this.getSubject()
    this.getAuthor()
    // this.selectionShort()
  },
  methods: {
    // selectionShort: function (data) {
    //   let n = data.length;

    //   for(let i = 0; i < n; i++) {
    //       // Finding the smallest number in the subarray
    //       let min = i;
    //       for(let j = i+1; j < n; j++){
    //           if(data[j] < data[min]) {
    //               min=j;
    //           }
    //       }
    //       if (min != i) {
    //           // Swapping the elements
    //           let tmp = data[i];
    //           data[i] = data[min];
    //           data[min] = tmp;
    //       }
    //   }

    //   return data;
    // },
    getCategories: async function () {
      this.$q.loading.show()
      await this.$axios.get('/categories/getlimit')
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.listCategories = response.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getSubject: async function () {
      this.$q.loading.show()
      await this.$axios.get('/subject/getlimit')
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.listSubject = response.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getAuthor: async function () {
      this.$q.loading.show()
      await this.$axios.get(`/author/getlimit`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.listAuthor = response.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    async getDataCountAuthor () {
      this.$q.loading.show()
      this.$axios.get('author/getCount')
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data
            this.dataAuthor = data > 0 ? data : this.dataAuthor
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    async getDataCountSubject () {
      this.$q.loading.show()
      this.$axios.get('subject/getCount')
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data
            this.dataSubject = data > 0 ? data : this.dataSubject
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    async getDataCountCategories () {
      this.$q.loading.show()
      this.$axios.get('categories/getCount')
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data
            this.dataCategories = data > 0 ? data : this.dataCategories
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    async getDataCountRepositories () {
      this.$q.loading.show()
      this.$axios.get('repositories/getCount')
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data
            this.dataRepositories = data > 0 ? data : this.dataRepositories
          }
        })
        .catch(() => this.$commonErrorNotif())
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
    update (code) {
      this.$router.push(`detail/${code}`)
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
