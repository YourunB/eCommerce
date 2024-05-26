import './pageProfile.sass';
import { BaseComponent } from '../../components/baseComponent';
import { PageProfilePropsType } from '../../modules/profil/helpers/types';
import { ProfileForm } from './profileForm/profileForm';

export class PageProfile extends BaseComponent {
  public registrationForm: ProfileForm;
  public registrationHeader: BaseComponent;

  constructor(props: PageProfilePropsType) {
    super({ tagName: 'div', classNames: 'page-profile-container', ...props });
    this.registrationHeader = new BaseComponent({
      tagName: 'div',
      classNames: 'profile-header',
      textContent: 'Profile information',
      parentNode: this.element,
    });
    this.registrationForm = new ProfileForm({ parentNode: this.element });
  }
}
