import { BaseComponent } from '../../components/baseComponent';
import { PageRegistrationPropsType } from '../../modules/registration/helpers/types';
import './pageRegistration.sass';
import { RegistrationForm } from './registrationForm/registrationForm';

export class PageRegistration extends BaseComponent {
  public registrationForm: RegistrationForm;
  public registrationHeader: BaseComponent;

  constructor(props: PageRegistrationPropsType) {
    super({ tagName: 'div', classNames: 'page-registration-container', ...props });
    this.registrationHeader = new BaseComponent({
      tagName: 'div',
      classNames: 'registration-header',
      textContent: 'Registration',
      parentNode: this.element,
    });
    this.registrationForm = new RegistrationForm({ parentNode: this.element });
  }
}
