<template>
  <div class="ip-subnet-tool">
    <h2>Расчёт подсети</h2>

    <div class="input-group">
      <label for="ip">IPv4-адрес:</label>
      <input
        id="ip"
        v-model="ipInput"
        type="text"
        placeholder="192.168.1.150"
        @keyup.enter="calculate"
        :class="{ invalid: !isValid && ipInput.trim() !== '' }"
      />
    </div>

    <div class="input-group">
      <label for="mask">Сетевая маска:</label>
      <select id="mask" v-model="selectedMask">
        <option v-for="opt in maskOptions" :key="opt.mask" :value="opt.mask">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <button
      class="action-btn"
      :disabled="!isValid"
      @click="calculate"
    >
      Вычислить
    </button>

    <div v-if="result" class="output-box">
      <p><span>Текущий IP адрес:</span> {{ result.ip }}</p>
      <p><span>Текущая маска:</span> {{ result.mask }}</p>
      <p><span>Адрес сети:</span> {{ result.network }}</p>
      <p><span>Количество возможных адресов:</span> {{ result.addressesCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { maskOptions } from '../constants/maskOptions';
import { isIpValid } from '../utils/ipValidation';
import { getNetworkAddress } from '../utils/networkAddress';
import { getAddressesCount } from '../utils/addressesCount';

const ipInput = ref('');
const selectedMask = ref(maskOptions[24].mask);
const isValid = computed(() => {
  const ip = ipInput.value.trim();
  return ip !== '' && isIpValid(ip);
});

const result = ref<null | {
  ip: string;
  mask: string;
  network: string;
  addressesCount: number;
}>(null);

function calculate() {
  const ip = ipInput.value.trim();
  if (!ip || !isIpValid(ip)) return;

  result.value = {
    ip,
    mask: selectedMask.value,
    network: getNetworkAddress(ip, selectedMask.value),
    addressesCount: getAddressesCount(selectedMask.value),
  };
}
</script>

<style scoped>
.ip-subnet-tool {
  max-width: 520px;
  margin: 2rem auto;
  padding: 1.8rem;
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 108, 187, 0.12);
  font-family: 'base', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.ip-subnet-tool h2 {
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 1.2rem;
  font-weight: 700;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.input-group label {
  font-weight: 700;
  color: var(--color-black);
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-gray);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.25s;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--color-primary);
}

input.invalid {
  border-color: var(--color-error);
}

.action-btn {
  padding: 0.8rem;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.25s;
  margin-top: 0.8rem;
}

.action-btn:hover:not(:disabled) {
  background: #005a99;
}

.action-btn:disabled {
  background: var(--color-gray);
  cursor: not-allowed;
}

.output-box {
  margin-top: 1.4rem;
  padding: 1.2rem;
  background: #f5f5f5;
  border-radius: 10px;
  border-left: 4px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.output-box p {
  margin: 0;
  font-size: 1rem;
}

.output-box span {
  font-weight: 700;
  color: var(--color-primary);
}
</style>