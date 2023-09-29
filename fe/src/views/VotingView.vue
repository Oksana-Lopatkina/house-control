<script setup lang="ts">
import { ref } from 'vue';
import VotingTable from "@/components/VotingTable.vue";

type Vote = {
  id: string,
  name: string,
};

const voting = ref<Vote[]>([
  {
    id: 'vote1e',
    name: 'ОСС 1-Э',
  },
  {
    id: 'vote2e',
    name: 'ОСС 2-Э',
  },
  {
    id: 'vote3e',
    name: 'ОСС 3-Э',
  }
]);
const selectedVote = ref<string|null>(voting.value[voting.value.length - 1].id);
</script>

<template>
  <div class="page-voting">
    <select v-model="selectedVote">
      <option
          v-for="vote in voting"
          :key="vote.id"
          :value="vote.id"
      >
        {{ vote.name }}
      </option>
    </select>
    <VotingTable :vote-id="selectedVote"/>
  </div>
</template>

<style lang="scss" scoped>
</style>
