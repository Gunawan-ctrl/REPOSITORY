<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card
          v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '55%' }
          "
        >
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-5">
              <q-carousel
                animated
                v-model="slide"
                infinite
                height="100%"
                :autoplay="autoplay"
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true"
              >
                <q-carousel-slide :name="1" img-src="icons/banner_1.jpg" />
                <q-carousel-slide :name="2" img-src="icons/banner_2.jpg" />
                <q-carousel-slide :name="3" img-src="icons/banner_3.jpg" />
                <q-carousel-slide :name="4" img-src="icons/banner_4.jpg" />
              </q-carousel>
            </div>
            <div class="row col-12 col-md-7 flex-center flex">
              <div class="col-9 text-center q-mt-lg q-mb-lg">
                <q-img src="icons/main_icon/icon.png" width="60px" />
                <div class="text-h6 q-mt-sm text-indigo-10 text-weight-bold">
                  REPOSITORY APP
                </div>
                <div class="text-caption text-grey-7">
                  Practical course application storage system
                </div>
                <div
                  class="text-subtitle2 q-mt-lg text-left"
                  style="font-size: 20px"
                >
                  Sign In
                </div>
                <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
                  <q-input
                    dense
                    v-model="form.EMAIL"
                    label="Email"
                    type="email"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Lengkapin data email nya',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon size="20px" name="alternate_email" />
                    </template>
                  </q-input>

                  <q-input
                    dense
                    label="Password"
                    v-model="form.password"
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Lengkapin data password nya',
                    ]"
                    counter
                  >
                    <template v-slot:prepend>
                      <q-icon size="20px" name="gpp_good" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>

                  <div class="text-subtitle2 q-mt-lg text-right">
                    <q-btn
                      class="q-mt-md"
                      label="Sign In"
                      type="submit"
                      style="width: 150px; align-content: right"
                      color="indigo-10"
                    />
                  </div>
                </q-form>
              </div>
              <div class="col-9"></div>
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      slide: "first",
      autoplay: true,
      form: {
        EMAIL: null,
        password: null,
        role: 0,
      },
      isPwd: true,
      visible: false,
    };
  },
  methods: {
    onSubmit() {
      this.$q.loading.show();
      this.$axios
        .post("users/login", {
          EMAIL: this.form.EMAIL,
          PASSWORD: this.form.password,
          ROLE: this.form.role,
        })
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            const role = data.user.ROLE;
            this.$q.localStorage.set("data", data);
            if (role === 0) {
              this.$router.push({ name: "dashboard" });
            } else {
              this.$q.localStorage.clear();
              this.$errorNotif("Mohon Maaf Halaman Belum Tersedia");
            }
          }
        })
        .catch((err) => this.$errorServer(err));
    },
    onReset() {
      this.username = null;
      this.password = null;
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
