import { Actions } from './types';
import { PageLogin } from '../../pages/login/pageLogin';

export const dispatch = (action: Actions) => {
  const { type } = action;
  switch (type) {
    case 'login':
      alert('не реализовано');
      break;
  }
};

export class Login {
  public getPage() {
    // ---
    //   здесь должна быть проверка, может быть пользователь уже авторизован,
    //   - авторизован: редирект на main page
    //   - не авторизован: отдаем страницу логина
    // ---
    const pageLogin = new PageLogin(dispatch);
    return pageLogin.getElement();
  }
}
