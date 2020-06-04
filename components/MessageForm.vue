<template>
  <v-form ref="form" @submit.prevent="submitMessage()">
    <v-textarea
      v-model="messageContent"
      outlined
      rows="1"
      auto-grow
      row-height="1"
      hide-details
      class="mb-1"
      @keydown.ctrl.enter.tab="submitMessage()"
    />
    <div class="d-flex flex-row-reverse">
      <v-btn :disabled="!disabled" type="submit" color="primary" depressed>
        送信
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      messageContent: ''
    }
  },
  computed: {
    disabled() {
      return !!this.messageContent
    }
  },
  methods: {
    submitMessage() {
      if (this.messageContent === '') {
        return
      }
      console.log('submitMessage:', this.messageContent)
      this.$refs.form.reset()
    }
  }
}
</script>
