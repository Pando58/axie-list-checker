<template>
  <div class="flex items-center mb-4">
      <label class="flex items-center cursor-pointer">
        <div class="relative">
          <input
            class="sr-only"
            type="checkbox"
            v-model="value"
            @change="$emit('onChange', $event, value)"
          />
          <div class="line w-14 h-8 bg-gray-300 rounded-full shadow-inner transition duration-300"></div>
          <div class="dot absolute w-6 h-6 bg-white rounded-full shadow left-1 top-1 transition duration-300"></div>
        </div>
        <div class="ml-2 text-sm font-medium text-gray-500 min-w-3ch"> {{ value ? 'ON' : 'OFF' }} </div>
      </label>
    </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  }
}
</script>

<style scoped>

input:checked ~ .dot {
  @apply transform translate-x-full;
}

input:checked ~ .line {
  @apply bg-green-400;
}

</style>