import './button.sass';
import { BaseComponent, TaggedElementProps } from '../../BaseComponent/BaseComponent';

export class Button extends BaseComponent<HTMLButtonElement> {
  constructor(props: TaggedElementProps) {
    super({
      tagName: 'button',
      attribute: props.attribute,
      classNames: props.classNames,
      parentNode: props.parentNode,
      textContent: props.textContent,
    });
    this.setClassName('button-base');
  }
}
