<template>
  <div class="mb-4">
    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
      {{ label }}
    </label>
    <div class="relative w-20">
      <select
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 text-sm py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="selected"
        @change="$emit('onChange', $event, selected)"
      >
        <option v-for="opt in options" :key="opt" :value="opt.value">{{ opt.name }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    options: Array,
    selected: Number
  }
}
</script>