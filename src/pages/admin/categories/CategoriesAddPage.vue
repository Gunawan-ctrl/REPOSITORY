<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" icon="dashboard" />
          <q-breadcrumbs-el label="Categories" icon="apps" />
          <q-breadcrumbs-el class="text-grey-7" label="Add Categories" icon="add_circle_outline" />
        </q-breadcrumbs>
    </q-card>
    <div class="row q-col-gutter-md q-ma-xs">
      <div class="col-12 col-md-9">
        <q-form
          @submit="onSubmit" @reset="onReset"
          class="q-gutter-md"
        >
          <q-card class="my-card" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar color="indigo-10" text-color="white" icon="add_circle_outline" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Add Categories Data</q-item-label>
                <q-item-label caption>
                  This is the form used to enter categories data
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section horizontal class="q-mt-md q-mb-md">
              <q-card-section class="col-6 q-gutter-lg">
                <q-input color="orange" filled dense readonly v-model="form.CATEGORIES_CODE" label="Categories Code">
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="qr_code" />
                  </template>
                </q-input>

                <q-input color="orange" dense filled type="textarea" v-model="form.DESC" label="Description">
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="subject" />
                  </template>
                </q-input>
              </q-card-section>

              <q-separator vertical />

              <q-card-section class="col-6 q-gutter-lg">
                <q-input color="orange" dense filled v-model="form.TITLE" label="Title">
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="subject" />
                  </template>
                </q-input>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions class="q-ma-sm">
              <q-btn outline color="primary" type="submit" icon-right="done_all" label="Submit Data" />
              <q-btn outline color="warning" type="reset" icon-right="restart_alt" label="Reset Data" />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>

      <div class="col-12 col-md-3 q-gutter-md">
        <div class="col-12 col-md-3">
          <q-card>
            <q-list bordered class="rounded-borders">
              <q-expansion-item
                expand-separator
                icon="info"
                label="Information"
                class="text-grey-8"
                header-class="text-indigo-10"
                default-opened
              >
                <q-card>
                  <q-card-section>
                    Data kategori akan dijadikan sebagai filtering data sesuai dengan kategori yang diberikan.
                  </q-card-section>
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

var rand = Math.floor(Math.random() * 10000);

const model = () => {
  return {
    CATEGORIES_CODE: rand,
    TITLE: null,
    DESC: null
  }
}

export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      form: model(),
    }
  },
  methods: {
    onSubmit () {
      this.onCreate()
    },
    onCreate () {
      this.$q.loading.show()
      this.$axios
        .post('categories/create', this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$router.push({ name: 'categories' })
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    onReset () {
      this.form = model()
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
