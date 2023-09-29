<script setup lang="ts">
import { useVotingStore } from '@/stores/voting';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import type { IVote } from '@/stores/voting';

/** TS types/interfaces */
interface IVotingTableProps {
  voteId: string|null;
}
interface IVoteFilter {
  roomNumber: string;
  cadastralNumber: string;
  porch: number|null;
  floor: number|null;
  owner: string;
  hasVoted: boolean;
}

interface IVotingSummary {
  space: number;
  totalAcc: number;
  quorum?: number;
}

/** defineProps */
const INIT_FILTER = {
  roomNumber: '',
  cadastralNumber: '',
  porch: null,
  floor: null,
  owner: '',
  hasVoted: false,
};

const totalSpace = 32000;

const props = defineProps<IVotingTableProps>();

const filter = ref<IVoteFilter>(INIT_FILTER);
const filteredV = ref<IVote[]>([]);

const votingStore = useVotingStore();

const selectedFilter = computed<string>(() => {
  const filterWithValue = Object.entries(filter.value).find((filter) => {
    return filter[0] !== 'hasVoted' && filter[1];
  });
  return filterWithValue?.[0];
});
const filteredVoting = computed(() => {
  return votingStore.voting.filter((vote) => {
    const hasVotedFilterValue = filter.value.hasVoted ? vote.hasVoted === filter.value.hasVoted : true;
    return hasVotedFilterValue && (filter.value.roomNumber ? vote.roomNumber === filter.value.roomNumber : vote);
  });
})

const filteredVotingSummary = computed<IVotingSummary>((): IVotingSummary => {
  const votingSum: IVotingSummary = votingStore.voting.reduce((accVote, vote): IVotingSummary => {
    if (vote.hasVoted) {
      accVote.space = +(accVote.space + (vote.space || 0)).toFixed(2);
      accVote.totalAcc += 1;
    }
    return accVote;
  }, {
    space: 0,
    totalAcc: 0,
  });
  votingSum.quorum = +(votingSum.space/totalSpace * 100).toFixed(2);
  return votingSum;
})

onMounted(async () => {
  await votingStore.getVoteData(props.voteId);
});

watchEffect(async () => {
  // filteredV.value = votingStore.voting.filter((vote) => {
  //   return filter.value.hasVoted ? vote.hasVoted === filter.value.hasVoted : vote;
  // });
  if (filter.value.roomNumber) {
    console.log('[watchEffect] filter.value.roomNumber: ', filter.value.roomNumber);
  }
  if (filter.value.cadastralNumber) {
    console.log('[watchEffect] filter.value.cadastralNumber: ', filter.value.cadastralNumber);
  }
  if (filter.value.owner) {
    console.log('[watchEffect] filter.value.owner: ', filter.value.owner);
  }
  if (filter.value.hasVoted) {
    console.log('[watchEffect] filter.value.hasVoted: ', filter.value.hasVoted);
  }
})
watch(() => filter.value, (newFilter, oldFilter) => {
  console.log('[watch filter] newFilter: ', newFilter);
  console.log('[watch filter] oldFilter: ', oldFilter);
});
const onVotedStatusChanged = (vote: IVote) => {
  console.log('[onVotedStatusChanged] vote: ', vote);
  votingStore.updateVoting(props.voteId, vote._id, {hasVoted: vote.hasVoted});
}
const onPaperStatusChanged = (vote: IVote) => {
  console.log('[onVotedStatusChanged] vote: ', vote);
  votingStore.updateVoting(props.voteId, vote._id, {isPaper: vote.isPaper});
}
const onResetFilter = () => {
  filter.value.roomNumber = '';
  filter.value.owner = '';
}
const onVoteEditStart = () => {
}

const onFilterInput = (filterParamName: string): void => {
  console.log('[onFilterInput] filterParamName: ', filterParamName);
  console.log('[onFilterInput] filter.value[filterParamName]: ', filter.value[filterParamName]);
  filteredV.value = votingStore.voting.filter((vote) => {
    return filter.value.hasVoted ? vote.hasVoted === filter.value.hasVoted : vote
        && (filter.value[filterParamName as keyof IVoteFilter] ? filter.value[filterParamName as keyof IVoteFilter] === vote[filterParamName  as keyof IVote] : vote);
  });
}
</script>

<template>
  <h1>Voting table</h1>
  <table class="voting-table">
    <thead>
      <tr>
        <th width="40"></th>
        <th>#</th>
        <th>Площадь</th>
        <th>Собственник</th>
        <th>Бумажное</th>
        <th>Telegram</th>
        <th>№ телефона</th>
        <th></th>
      </tr>
      <tr>
        <td><input class="filter-control_checkbox" v-model="filter.hasVoted" type="checkbox"/></td>
        <td><input class="filter-control" v-model="filter.roomNumber" :disabled="!!selectedFilter && selectedFilter !== 'roomNumber'"/></td>
        <td></td>
        <td><input class="filter-control" v-model="filter.owner" :disabled="!!selectedFilter && selectedFilter !== 'owner'"/></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button @click="onResetFilter()">╳</button></td>
      </tr>
    </thead>
    <tbody>
      <tr
          v-for="vote in filteredVoting"
          :key="vote._id"
          :class="{'selected': vote.hasVoted}"
      >
        <td><input class="filter-control_checkbox" type="checkbox" v-model="vote.hasVoted" @change="onVotedStatusChanged(vote)" /></td>
        <td>{{ vote.roomNumber }}</td>
        <td>{{ vote.space }}</td>
        <td>{{ vote.owner }}</td>
        <td><input class="filter-control_checkbox" type="checkbox" v-model="vote.isPaper" @change="onPaperStatusChanged(vote)" /></td>
        <td>{{ vote.telegram }}</td>
        <td>{{ vote.phoneNumber }}</td>
        <td><button @click="onVoteEditStart()">✎</button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>{{ filteredVotingSummary.totalAcc }}</td>
        <td></td>
        <td>{{ filteredVotingSummary.space }}</td>
        <td>{{ filteredVotingSummary.quorum }}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss" scoped>
@use '@/styles/base.css' as vars;

.voting-table {
  width: 100%;

  thead {
    position: sticky;
    top: 0;
    z-index: 5;

    th {
      border-bottom: 1px solid;
      background: var(--color-background);
      text-align: left;
      font-weight: bold;
    }

    td {
      border-bottom: 1px solid;
      background: var(--color-background);
      text-align: left;
    }
  }
  tbody {
    tr {
      &.selected {
        --voting-table-body-color: var(--vt-c-black-soft);
      }
    }
    td {
      border-bottom: 1px solid #EEE;
      color: var(--voting-table-body-color, var(--vt-c-text-light-2));
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
}
</style>
