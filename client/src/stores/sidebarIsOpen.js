import { ref } from 'vue'

export const sidebar = ref({
  isOpened: false,
  setIsOpened(value) {
    this.isOpened = value
  }
})
