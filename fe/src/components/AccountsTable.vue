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
    return filter.value.roomNumber ? acc.roomNumber === filter.value.roomNumber : acc;
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
        <th class="account-table__col_room-number">#</th>
        <th class="account-table__col_cadastral-number">Кадастровый номер</th>
        <th class="account-table__col_porch">Подъезд</th>
        <th class="account-table__col_floor">Этаж</th>
        <th class="account-table__col_space">S, м2</th>
        <th class="account-table__col_owner">Собственник</th>
        <th class="account-table__col_owner">Telegram</th>
        <th class="account-table__col_owner">Тел.</th>
      </tr>
      <tr>
        <td><input class="filter-control" v-model="filter.roomNumber" /></td>
        <td><input class="filter-control" v-model="filter.cadastralNumber" /></td>
        <td><input class="filter-control" v-model="filter.porch" type="number" /></td>
        <td><input class="filter-control" v-model="filter.floor" type="number" /></td>
        <td></td>
        <td><input class="filter-control" v-model="filter.owner" /></td>
        <td></td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <tr
          v-for="acc in filteredAccounts"
          :key="acc.cadastralNumber"
      >
        <td>{{ acc.roomNumber }}</td>
        <td>{{ acc.cadastralNumber }}</td>
        <td>{{ acc.porch }}</td>
        <td>{{ acc.floor }}</td>
        <td>{{ acc.space }}</td>
        <td>{{ acc.owners[0]?.owner }}</td>
        <td>{{ acc.owners[0]?.telegram }}</td>
        <td>{{ acc.owners[0]?.phoneNumber }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Total</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss" scoped>
.account-table {
  width: 100%;
  table-layout: fixed;

  thead {
    position: sticky;
    top: 0;
    z-index: 5;
    background: var(--color-background);

    th {
      border-bottom: 1px solid var(--color-border);
      text-align: left;
      font-weight: bold;
    }
  }

  tfoot {
    position: sticky;
    bottom: 0;
    z-index: 5;
    background: var(--color-background);

    td {
      border-top: 1px solid var(--color-border);
    }
  }

  &__col {
    &_room-number { width: 50px; }
    &_cadastral-number { width: 150px; }
    &_porch { width: 50px; }
    &_floor { width: 50px; }
    &_space { width: 50px; }
  }
}
</style>
