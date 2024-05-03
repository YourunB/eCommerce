import { BaseComponent, TaggedElementProps } from '../../BaseComponent/BaseComponent';
import './input.sass';

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
}
