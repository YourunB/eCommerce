import './inputWithNotice.sass';
import { Input } from '../baseInput/baseInput';
import { BaseComponent, TaggedElementProps } from '../baseComponent';

export class InputWithNotice extends Input {
  notice: BaseComponent<HTMLElement>;

  constructor(props: TaggedElementProps) {
    super({ ...props });
    this.notice = new BaseComponent({ tagName: 'div', classNames: ['notice'] });
  }

  public showNotice(messages: string | string[]): void {
    this.notice.getElement().innerHTML = '';
    if (this.isEmptyMessages(messages)) {
      this.notice.destroy();
      return;
    }
    let msg;
    if (typeof messages === 'string') {
      msg = messages === '' ? '' : `<p>${messages}</p>`;
    } else {
      msg = messages.reduce((html, message) => `${html}<li>${message}</li>`, '<ul>');
      msg += '</li>';
    }

    this.notice.getElement().innerHTML = msg;
    this.element.after(this.notice.getElement());
  }

  private isEmptyMessages(messages: string | string[]): boolean {
    if (typeof messages === 'string') return messages === '';
    if (messages.length === 0) return true;
    return messages[0] === '';
  }
}
