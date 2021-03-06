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
      :selected="timer"
      @onChange="changeRefreshRate"
    ></Select>

    <!-- Sort -->
    <Select 
      label="Sort by"
      :options="[
        { value: 'latest', name: 'Latest' },
        { value: 'lowestPrice', name: 'Lowest price' },
      ]"
      :selected="sort"
      @onChange="changeSort"
    ></Select>

    <!-- Notification price -->
    <InputNumber
      label="Alert max price (USD)"
      :min="0"
      :max="200"
      :step="5"
      :val="price"
      @onChange="changePrice"
    ></InputNumber>

    <!-- Spin loader -->
    <div class="flex justify-center">
      <SpinLoader ref="spinLoader"></SpinLoader>
    </div>

    <!-- Table -->
    <ul class="mt-2 rounded-lg shadow overflow-hidden border-b border-gray-200 divide-y divide-gray-200">
      <li class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 uppercase flex">
        <div class="flex-none w-1/12">-</div>
        <div class="flex-1">ID</div>
        <div class="flex-none w-2/12">ETH</div>
        <div class="flex-none w-2/12">USD</div>
      </li>
      <li
        class="px-4 py-3 text-sm font-medium text-gray-500 flex h-20"
        v-for="(axie, index) in axies"
        v-bind:key="axie.id"
      >
        <div class="flex-none w-1/12">
          <div class="flex items-center">
            <input type="checkbox" class="mr-2" v-model="axie.viewed" @change="setViewedAxie($event, axie.id)">
            <span>{{ index + 1 }}</span>
          </div>
        </div>
        <div class="flex-1">
          <a
            class="hover:text-green-500 transition"
            :href="`https://marketplace.axieinfinity.com/axie/${ axie.id }`"
            target="_blank"
          >
            #{{ axie.id }}
          </a>
        </div>
        <div class="flex-none w-2/12">
          <img
            class="w-full h-full object-cover"
            :src="axie.image"
            :alt="`#${axie.id}`"
          >
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
import InputNumber from '@/components/InputNumber.vue'
import SpinLoader from '@/components/SpinLoader.vue'

export default {
  components: {
    Switch,
    Select,
    InputNumber,
    SpinLoader
  },
  setup() {
    const toggle = ref(false);
    const timer = ref(2000);
    const sort = ref('latest');
    const price = ref(localStorage.getItem('price') || 30);
    const interval = ref(null);
    const axies = ref(null);

    const spinLoader = ref(null);

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
      spinLoader.value.show();

      getData(sort.value, (data) => {
        data.forEach(axie => {
          if (Number(axie.auction.currentPriceUSD) <= price.value) {
            if (!localStorage.getItem(`#${axie.id}`)) {
              alert(`#${axie.id} on $${axie.auction.currentPriceUSD} USD`);
              localStorage.setItem(`#${axie.id}`, true);
            }

            axie.viewed = true;
          }
        });
        
        axies.value = data;
        spinLoader.value.hide();
      });
    }

    const setViewedAxie = (e, axieID) => {
      if (e.target.checked) {
        localStorage.setItem(`#${axieID}`, true);
      } else {
        localStorage.removeItem(`#${axieID}`);
      }
    }

    const changeToggle = (e, val) => {
      toggle.value = val;
      toggleTimer();
    }

    const changeRefreshRate = (e, val) => {
      timer.value = val;
      resetTimer();
    }

    const changeSort = (e, val) => {
      sort.value = val;
      resetTimer();
    }

    const changePrice = (e, val) => {
      price.value = val;
      localStorage.setItem('price', val);
      resetTimer();
    }

    onMounted(() => {
      updateList();
    });

    return {
      toggle,
      timer,
      sort,
      price,
      interval,
      axies,
      spinLoader,
      startTimer,
      stopTimer,
      toggleTimer,
      resetTimer,
      getETH,
      updateList,
      setViewedAxie,
      changeToggle,
      changeRefreshRate,
      changeSort,
      changePrice,
    };
  },
}
</script>