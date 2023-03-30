<template>
  <q-page>
    <div class="row q-col-gutter-md q-ma-xs">
      <div class="col-12 col-md-9">
        <q-card class="q-pa-md q-mb-md">
          <q-breadcrumbs>
            <q-breadcrumbs-el
              class="text-blue-7 text-weight-bold"
              icon="qr_code"
            >
              &nbsp;&nbsp;RPS{{
                this.dataX !== null ? this.dataX.REPOSITORY_CODE : ""
              }}</q-breadcrumbs-el
            >
          </q-breadcrumbs>
        </q-card>
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img class="col-5" src="icons/banner_3.jpg" />

            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="dashboard" color="primary" size="24px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Categories</q-item-label>
                  <q-item-label caption>
                    {{
                      this.dataX !== null
                        ? this.dataX.CATEGORIES_DATA.TITLE
                        : ""
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="subject" color="primary" size="24px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Subject</q-item-label>
                  <q-item-label caption>
                    {{
                      this.dataX !== null ? this.dataX.SUBJECT_DATA.SUBJECT : ""
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="account_circle" color="primary" size="24px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Author</q-item-label>
                  <q-item-label caption>
                    {{
                      this.dataX !== null ? this.dataX.AUTHOR_DATA.AUTHOR : ""
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="pin" color="primary" size="24px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Semester</q-item-label>
                  <q-item-label caption>
                    {{ this.dataX !== null ? this.dataX.SEMESTER : "" }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="link" color="primary" size="24px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>URL</q-item-label>
                  <q-item-label caption>
                    <a
                      target="_blank"
                      style="text-decoration: none"
                      :href="this.dataX !== null ? this.dataX.URL : ''"
                      >{{ this.dataX !== null ? this.dataX.URL : "" }}</a
                    >
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card-section>
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
                          <q-badge color="indigo-10"
                            >CTR{{ d.CATEGORIES_CODE }}</q-badge
                          >
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
                          <q-item-label caption>{{
                            d.STUDY_PROGRAM
                          }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                          <q-badge color="indigo-10"
                            >SBJ{{ d.SUBJECT_CODE }}</q-badge
                          >
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
                          <q-badge color="indigo-10"
                            >AUT{{ d.AUTHOR_CODE }}</q-badge
                          >
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
import { Loading } from "quasar";
export default {
  name: "PageIndex",
  components: {},
  data() {
    return {
      columns: [
        {
          name: "code",
          align: "left",
          label: "Repository Code",
          field: "code",
        },
        {
          name: "categories",
          align: "left",
          label: "Categories",
          field: "categories",
          sortable: true,
        },
        {
          name: "subject",
          align: "left",
          label: "Subject",
          field: "subject",
          sortable: true,
        },
        {
          name: "author",
          align: "left",
          label: "Author",
          field: "author",
          sortable: true,
        },
        {
          name: "semester",
          align: "left",
          label: "Semester",
          field: "semester",
          sortable: true,
        },
        { name: "url", align: "left", label: "URL", field: "url" },
        { name: "created", align: "left", label: "Created", field: "created" },
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 8,
      },
      filter: "",
      visibles: false,
      dataX: null,
      rows: [],
      dataAuthor: [],
      dataSubject: [],
      dataCategories: [],
      dataRepositories: [],
      listCategories: [],
      listSubject: [],
      listAuthor: [],
    };
  },
  created() {
    this.$q.loading.show();
    this.getRepositories();
    this.getCategories();
    this.getSubject();
    this.getAuthor();
  },
  methods: {
    getCategories: async function () {
      this.$q.loading.show();
      await this.$axios
        .get("/categories/getlimit")
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.listCategories = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getSubject: async function () {
      this.$q.loading.show();
      await this.$axios
        .get("/subject/getlimit")
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.listSubject = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getAuthor: async function () {
      this.$q.loading.show();
      await this.$axios
        .get("/author/getlimit")
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.listAuthor = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    async getRepositories() {
      this.$q.loading.show();
      await this.$axios
        .get(`/repositories/getById/${this.$route.params.code}`)
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.dataX = response.data.data[0];
            console.log(this.dataX);
          }
          this.$q.loading.hide();
        })
        .catch(() => this.$commonErrorNotif());
    },
  },
};
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
