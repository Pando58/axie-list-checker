<template>
  <div class="container max-w-3xl p-4 mx-auto">

    <h1 class="font-bold text-xl text-center mb-4 opacity-0">-</h1>

    <!-- Toggle switch -->
    <Switch :value="toggle" @onChange="changeToggle"></Switch>

    <!-- Timer -->
    <Select 
      label="Refresh rate"
      :options="[
        { value: 1000, name: '1s' },
        { value: 2000, name: '2s' },
        { value: 3000, name: '3s' },
        { value: 4000, name: '4s' },
        { value: 5000, name: '5s' },
      ]"
      :selected="2000"
      @onChange="changeRefreshRate"
    ></Select>

    <!-- Sort -->
    <div class="mb-4">
      <label
        class="block uppercase text-gray-700 text-xs font-bold mb-2"
        for="sort-select"
      >
        Sort by
      </label>
      <div class="relative w-28">
        <select
          id="sort-select"
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 text-sm py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          v-model="sort"
          @change="resetTimer"
        >
          <option value="newest">Newest</option>
          <option value="lowPrice">Low price</option>
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

    <!-- Table -->
    <ul class="mt-12 rounded-lg shadow overflow-hidden border-b border-gray-200 divide-y divide-gray-200">
      <li class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 uppercase flex">
        <div class="flex-none w-1/12">-</div>
        <div class="flex-1">ID</div>
        <div class="flex-none w-2/12">ETH</div>
        <div class="flex-none w-2/12">USD</div>
      </li>
      <li
        class="px-4 py-3 text-sm font-medium text-gray-500 flex"
        v-for="(axie, index) in axies"
        v-bind:key="axie.id"
      >
        <div class="flex-none w-1/12">{{ index + 1 }}</div>
        <div class="flex-1">
          <a
            class="hover:text-green-500 transition"
            :href="`https://marketplace.axieinfinity.com/axie/${ axie.id }`"
            target="_blank"
          >
            #{{ axie.id }}
          </a>
        </div>
        <div class="flex-none w-2/12">{{ getETH(axie.auction.currentPrice) }}</div>
        <div class="flex-none w-2/12">${{ axie.auction.currentPriceUSD }}</div>
      </li>
    </ul>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getData } from '@/scripts/apiCheck.js'
import Switch from '@/components/Switch.vue'
import Select from '@/components/Select.vue'

export default {
  components: {
    Switch,
    Select
  },
  setup() {
    const toggle = ref(false);
    const timer = ref(2000);
    const sort = ref('newest');
    const interval = ref(null);
    const axies = ref(null);

    const startTimer = () => {
      interval.value = setInterval(updateList, timer.value);
    }

    const stopTimer = () => {
      if (interval.value !== null) {
        clearInterval(interval.value);
      }
    }

    const toggleTimer = () => {
      if (toggle.value) {
        startTimer();
      } else {
        stopTimer();
      }
    }

    const resetTimer = () => {
      if (!toggle.value) return;

      stopTimer();
      startTimer();
    }

    const getETH = (eth) => {
      return (eth / Math.pow(10, 18)).toFixed(3);
    }

    const updateList = () => {
      getData((data) => {
        axies.value = data;
      });
    }

    const changeToggle = (e, val) => {
      toggle.value = val;
      toggleTimer();
    }

    const changeRefreshRate = (e, val) => {
      timer.value = val;
      resetTimer();
    }

    onMounted(() => {
      updateList();
    });

    return {
      toggle,
      timer,
      sort,
      interval,
      axies,
      startTimer,
      stopTimer,
      toggleTimer,
      resetTimer,
      getETH,
      updateList,
      changeToggle,
      changeRefreshRate
    };
  },
}
</script>