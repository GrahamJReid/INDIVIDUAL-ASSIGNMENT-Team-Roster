import { deleteMembers } from './memberData';
import { deleteTeams, getSingleTeam, getTeamMembers } from './teamsData';

const deleteTeamsAndMembers = (authorId) => new Promise((resolve, reject) => {
  getTeamMembers(authorId).then((booksArray) => {
    console.warn(booksArray, 'Author Books');
    const deleteBookPromises = booksArray.map((book) => deleteMembers(book.team_id));

    Promise.all(deleteBookPromises).then(() => {
      deleteTeams(authorId).then(resolve);
    });
  }).catch((error) => reject(error));
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
  deleteTeamsAndMembers,
  getTeamsAndMembers,
};
