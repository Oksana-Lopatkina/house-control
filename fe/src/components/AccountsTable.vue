<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';
import { computed, onMounted, ref } from 'vue';

interface IAccFilter {
  roomNumber: string;
  cadastralNumber: string;
  porch: number|null;
  floor: number|null;
  owner: string;
}

const filter = ref<IAccFilter>({
  roomNumber: '',
  cadastralNumber: '',
  porch: null,
  floor: null,
  owner: '',
});

const accountsStore = useAccountsStore();

const filteredAccounts = computed(() => {
  return accountsStore.accounts.filter((acc) => {
    return filter.value.roomNumber ? acc.room_number === filter.value.roomNumber : acc;
  });
})

onMounted(async () => {
  console.log('[AccountsTable.vue - onMounted]');
  await accountsStore.getAccounts();
});
</script>

<template>
  <h1>Accounts table</h1>
  <table class="account-table">
    <thead>
      <tr>
        <th></th>
        <th>#</th>
        <th>Кадастровый номер</th>
        <th>Подъезд</th>
        <th>Этаж</th>
        <th>Площадь</th>
        <th>Собственник</th>
      </tr>
      <tr>
        <td></td>
        <td><input class="filter-control" v-model="filter.roomNumber" /></td>
        <td><input class="filter-control" v-model="filter.cadastralNumber" /></td>
        <td><input class="filter-control" v-model="filter.porch" type="number" /></td>
        <td><input class="filter-control" v-model="filter.floor" type="number" /></td>
        <td></td>
        <td><input class="filter-control" v-model="filter.owner" /></td>
      </tr>
    </thead>
    <tbody>
      <tr
          v-for="acc in filteredAccounts"
          :key="acc.cadastral_number"
      >
        <td><input class="filter-control" type="checkbox" v-model="acc.voted" /></td>
        <td>{{ acc.room_number }}</td>
        <td>{{ acc.cadastral_number }}</td>
        <td>{{ acc.porch }}</td>
        <td>{{ acc.floor }}</td>
        <td>{{ acc.space }}</td>
        <td>{{ acc.owner }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.account-table {
  thead {
    position: sticky;
    top: 0;

    th {
      border-bottom: 1px solid;
      background: #FFF;
      text-align: left;
      font-weight: bold;
    }
  }
}
</style>
