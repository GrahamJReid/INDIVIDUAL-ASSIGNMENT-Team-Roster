import { deleteMembers } from './memberData';
import { deleteTeams, getSingleTeam, getTeamMembers } from './teamsData';

const deleteTeamsAndMembers = (firebaseKey) => new Promise((resolve, reject) => {
  getTeamMembers(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteMembers(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteTeams(firebaseKey).then(resolve);
    });
  }).catch(reject);
});
const getTeamsAndMembers = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(firebaseKey).then((authorObject) => {
    getTeamMembers(authorObject.firebaseKey).then((booksArray) => {
      const authorAndBooks = {
        ...authorObject, booksArray,
      };
      resolve(Object.values(authorAndBooks));
    });
  }).catch(reject);
});

export {
  deleteTeamsAndMembers,
  getTeamsAndMembers,
};
