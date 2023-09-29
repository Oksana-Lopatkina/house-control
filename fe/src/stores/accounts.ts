import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface IAccount {
  room_number: string;
  porch: number;
  floor: number;
  space: number;
  cadastral_number: string;
  date_statement: string;
  owner: string;
  date_ownership: string;
  is_property_common: boolean;
  note: string;
  telegram_account: string;
  phone_number: number;
}

export const useAccountsStore = defineStore('accountsStore', () => {
  const accounts = ref<IAccount[]>([]);
  async function getAccounts() {
    const response = await fetch('http://localhost:3000/v1/api/accounts');
    if (response.ok) { // if HTTP-status is 200-299
                       // get the response body (the method explained below)
      accounts.value = await response.json();
      console.log('[getAccounts] accounts: ', accounts.value);
    }
  }

  return { accounts, getAccounts }
})
