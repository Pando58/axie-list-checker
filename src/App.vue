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

  <!-- Timer -->
  <div class="w-20">
    <div class="relative">
      <select v-model="timerSelect" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 text-sm py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        <option value="1000">1s</option>
        <option value="2000">2s</option>
        <option value="3000">3s</option>
        <option value="4000">4s</option>
        <option value="5000">5s</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const toggle = ref(false);
    const timer = computed(() => parseInt(timerSelect.value));
    const timerSelect = ref('2000');

    return { toggle, timer, timerSelect };
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