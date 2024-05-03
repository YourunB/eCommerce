import './inputWithNotice.sass';
import { BaseComponent, TaggedElementProps } from '../../../BaseComponent/BaseComponent';
import { Input } from '../../../components/input/input';

export class InputWithNotice extends Input {
  notice: BaseComponent<HTMLElement>;

  constructor(props: TaggedElementProps) {
    super({ ...props });
    this.notice = new BaseComponent({ tagName: 'div', classNames: ['notice'] });
  }

  public showNotice(messages: string | string[]): void {
    this.notice.getElement().innerHTML = '';
    let msg;
    if (typeof messages === 'string') {
      msg = `<p>${messages}</p>`;
    } else {
      msg = messages.reduce((html, message) => `${html}<li>${message}</li>`, '<ul>');
      msg += '</li>';
    }

    this.notice.getElement().innerHTML = msg;
    this.element.after(this.notice.getElement());
  }
}
