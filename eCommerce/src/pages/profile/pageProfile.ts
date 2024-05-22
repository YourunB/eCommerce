import './pageProfile.sass';
import state from '../../state/state';

function getUserData() {
  console.log(state.customer);
}

export { getUserData };
