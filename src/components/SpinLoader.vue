<template>
  <div class="w-6 h-6">
    <div ref="wrapper" class="wrapper opacity-0 transform translate-y-full transition duration-500">
      <svg ref="spinLoader" class="animate-spin w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const wrapper = ref(null);
    
    const show = () => {
      wrapper.value.classList.add('visible');
    }

    const hide = () => {
      wrapper.value.classList.remove('visible');
    }

    return { wrapper, show, hide };
  }
}
</script>

<style scoped>
.wrapper.visible {
  @apply opacity-100 translate-y-0;
}
</style>