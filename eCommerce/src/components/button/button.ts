import './button.sass';
import { BaseComponent, TaggedElementProps } from '../../BaseComponent/BaseComponent';

export class Button extends BaseComponent<HTMLButtonElement> {
  constructor(props: TaggedElementProps) {
    super({ tagName: 'button', ...props });
    this.setClassName('button-base');
  }
}
