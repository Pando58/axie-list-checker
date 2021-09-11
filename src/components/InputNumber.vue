<template>
  <div class="mb-4">
    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
      {{ label }}
    </label>
    <div class="relative w-24">
      <input
        type="number"
        class="block w-full bg-gray-200 border border-gray-200 text-gray-700 text-sm py-2 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        :min="min" 
        :max="max"
        :step="step"
        v-model="val"
        @change="$emit('onChange', $event, val)"
      >
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: [
    'label',
    'min',
    'max',
    'step',
    'val'
  ],
}
</script>