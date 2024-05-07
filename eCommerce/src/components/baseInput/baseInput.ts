import { BaseComponent, TaggedElementProps } from '../baseComponent';
import './baseInput.sass';

export class Input extends BaseComponent<HTMLInputElement> {
  constructor(props: TaggedElementProps) {
    super({ tagName: 'input', ...props });
    this.setClassName('input-base');
  }

  get value() {
    return this.element.value;
  }

  set value(val: string) {
    this.element.value = val;
  }

  get type() {
    return this.element.getAttribute('type') || '';
  }

  set type(value: string) {
    this.setAttribute({ name: 'type', value });
  }
}
