import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface IVote {
  _id: string,
  roomNumber: string;
  porch: number;
  floor: number;
  space: number;
  cadastralNumber: string;
  owner: string;
  dateOwnership: string;
  isPropertyCommon: boolean;
  telegram: string;
  phoneNumber: number;
  hasVoted: boolean;
  isPaper: boolean;
}
export interface IVoteUpdated {
  roomNumber?: string;
  porch?: number;
  floor?: number;
  space?: number;
  cadastralNumber?: string;
  owner?: string;
  dateOwnership?: string;
  isPropertyCommon?: boolean;
  telegram?: string;
  phoneNumber?: number;
  hasVoted?: boolean;
  isPaper?: boolean;
}

export const useVotingStore = defineStore('accountsStore', () => {
  const voting = ref<IVote[]>([]);
  async function getVoteData(voteId: string|null) {
    if (voteId) {
      const response = await fetch(`http://localhost:3000/v1/api/voting/${voteId}`);
      if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        voting.value = await response.json();
        console.log('[getVoteData] voting: ', voting.value);
      }
    }
  }

  async function changeVoteStatus(voteId: string|null, vote: IVote) {
    console.log('[votingStore - changeVoteStatus] vote: ', vote);
    const reqOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...vote, voteId}),
    };
    console.log('[votingStore - changeVoteStatus] reqOptions: ', reqOptions);
    const response = await fetch(`http://localhost:3000/v1/api/voting/votestatus`, reqOptions);
    console.log('[votingStore - changeVoteStatus] response: ', response);

  }

  async function updateVoting(votingId: string|null, _id: string, updated: IVoteUpdated) {
    console.log('[votingStore - changeVoteStatus] updated: ', updated);
    const reqOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id, votingId, updated}),
    };
    console.log('[votingStore - changeVoteStatus] reqOptions: ', reqOptions);
    const response = await fetch(`http://localhost:3000/v1/api/voting/`, reqOptions);
    console.log('[votingStore - changeVoteStatus] response: ', response);

  }

  return { voting, getVoteData, changeVoteStatus, updateVoting }
})
