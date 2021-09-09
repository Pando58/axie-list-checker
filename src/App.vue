<template>
  <!-- Toggle switch -->
  <div class="flex items-center">
    <label for="toggle" class="flex items-center cursor-pointer">
      <div class="relative">
        <input id="toggle" type="checkbox" class="sr-only" v-model="toggle"/>
        <div class="line w-14 h-8 bg-gray-300 rounded-full shadow-inner transition duration-300"></div>
        <div class="dot absolute w-6 h-6 bg-white rounded-full shadow left-1 top-1 transition duration-300"></div>
      </div>
      <div class="ml-2 text-gray-700 font-bold min-w-3ch text-center"> {{ toggle ? 'ON' : 'OFF' }} </div>
    </label>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const toggle = ref(false);

    return { toggle };
  },
}
</script>

<style scoped>

#toggle:checked ~ .dot {
  @apply transform translate-x-full;
}

#toggle:checked ~ .line {
  @apply bg-green-400;
}

</style>