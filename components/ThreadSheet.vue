<template>
  <div>
    <v-sheet height="100px">
      ThreadSheet
      <v-icon @click="closeThread()">mdi-close</v-icon>
    </v-sheet>
  </div>
</template>

<script>
export default {
  methods: {
    closeThread() {
      this.$store.commit('messages/closeThread')
    }
  }
}
</script>
