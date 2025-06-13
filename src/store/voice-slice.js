import { createSlice, current } from "@reduxjs/toolkit";


const currentVoter = JSON.parse(localStorage.getItem("currentUser"))
const initialState = {selectedVoteCandidate: "", currentVoter, selectedElection: "", idOfElectionToUpdate: "", 
  addCandidateElectionId: ""
};

const voteSlice = createSlice({
    name: "vote",
    initialState,
    reducers:{
        changeSelectedVoteCandidate(state, action){
            state.selectedVoteCandidate = action.payload;
        },
        changeCurrentVoter(state, action){
            state.currentVoter = action.payload;
        },
        changeSelectedElection(state, action){
            state.selectedElection = action.payload;
        },
        changeIdOfCandidateElectionId(state, action){
            state.idOfCandidateElectionId = action.payload;
        },
        changeAddCandidateElectionId(state, action){
            state.addCandidateElectionId = action.payload;
        }
    }
})

export const voteActions = voteSlice.actions;

export default voteSlice