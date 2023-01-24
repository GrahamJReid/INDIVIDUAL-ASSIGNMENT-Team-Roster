import { deleteMembers } from './memberData';
import { deleteTeams, getSingleTeam, getTeamMembers } from './teamsData';

const deleteTeamAndMembers = (firebaseKey) => new Promise((resolve, reject) => {
  getTeamMembers(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteMembers(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteTeams(firebaseKey).then(resolve);
    });
  }).catch(reject);
});
const getTeamsAndMembers = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(firebaseKey).then((teamObject) => {
    getTeamMembers(teamObject.firebaseKey).then((membersArray) => {
      const teamAndMembers = {
        ...teamObject, membersArray,
      };
      resolve(Object.values(teamAndMembers));
    });
  }).catch(reject);
});

export {
  deleteTeamAndMembers,
  getTeamsAndMembers,
};
