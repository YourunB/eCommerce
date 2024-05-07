import { BaseComponent } from '../../components/baseComponent';
import { PageRegistrationPropsType } from '../../modules/registration/helpers/types';
import './pageRegistration.sass';
import { RegistrationForm } from './registrationForm/registrationForm';

export class PageRegistration extends BaseComponent {
  public registrationForm: RegistrationForm;

  constructor(props: PageRegistrationPropsType) {
    super({ tagName: 'div', classNames: 'page-login-container', ...props });
    this.registrationForm = new RegistrationForm({ parentNode: this.element });
  }
}
