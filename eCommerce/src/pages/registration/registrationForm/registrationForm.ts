import { BaseComponent } from '../../../components/baseComponent';
import { PageRegistrationPropsType } from '../../../modules/registration/helpers/types';

import './registrationForm.sass';

export class RegistrationForm extends BaseComponent {
  constructor(props: PageRegistrationPropsType) {
    super({ tagName: 'div', classNames: 'registration-form-container', ...props });
  }
}
