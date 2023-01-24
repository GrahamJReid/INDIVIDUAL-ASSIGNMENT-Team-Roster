import { deleteMembers } from './memberData';
import { deleteTeams, getTeamMembers } from './teamsData';

const deleteTeamsAndMembers = (firebaseKey) => new Promise((resolve, reject) => {
  getTeamMembers(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteMembers(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteTeams(firebaseKey).then(resolve);
    });
  }).catch(reject);
});
export default deleteTeamsAndMembers;
