<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-indigo-10">
      <q-toolbar>

        <q-toolbar-title class="text-subtitle2">
          <q-avatar class="q-mr-md">
            <img src="icons/repo-ico.png">
          </q-avatar>
          REPOSITORY APP
        </q-toolbar-title>

        <q-btn class="text-capitalize text-subtitle2" stretch flat :to="{ name: 'home' }" label="Home" />
        <q-btn class="text-capitalize text-subtitle2" stretch flat :to="{ name: 'signin' }" label="Sign In" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup () {
    return {
    }
  }
})
</script>
