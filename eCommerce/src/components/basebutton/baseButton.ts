import './baseButton.sass';
import { BaseComponent, TaggedElementProps } from '../baseComponent';

export class Button extends BaseComponent<HTMLButtonElement> {
  constructor(props: TaggedElementProps) {
    super({ tagName: 'button', ...props });
    this.setClassName('button-base');
  }
}
