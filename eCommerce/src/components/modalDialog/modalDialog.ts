import './modalDialog.sass';
import { BaseComponent } from '../baseComponent';
import { Button } from '../basebutton/baseButton';

type TypeMessage = 'warning' | 'info';

export class Dialog extends BaseComponent {
  private static instance: unknown;
  private dialogContent: BaseComponent;
  private dialog: HTMLDialogElement;
  private queue: string[];

  private constructor() {
    super({ tagName: 'dialog', classNames: 'dialog' });
    this.queue = [];
    const dialogWrapper = new BaseComponent({ tagName: 'div', classNames: 'dialog__wrapper' });
    this.dialogContent = new BaseComponent({ tagName: 'p', classNames: 'dialog__content' });
    this.dialog = this.element as HTMLDialogElement;
    const buttonOK = new Button({ textContent: 'OK', classNames: 'dialog_btn-OK' });
    dialogWrapper.insertChildren([this.dialogContent, buttonOK]);
    this.insertChild(dialogWrapper);

    document.addEventListener('keyup', this.close);
    buttonOK.getElement().addEventListener('click', (e) => this.close(e));
  }

  public static getInstance() {
    if (!Dialog.instance) Dialog.instance = new Dialog();
    return Dialog.instance as Dialog;
  }

  public show(text: string, type: TypeMessage = 'info') {
    if (text) this.queue.push(text);
    if (this.dialog.open) return;
    this.dialogContent.setTextContent(this.queue.shift() || '');
    if (type === 'warning') this.dialogContent.setClassName('dialog__content_warning');
    document.body.append(this.element);
    this.dialog.showModal();
  }

  private close = (e: Event): void => {
    e.preventDefault();
    if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
    this.dialog.close();
    this.element.remove();
    if (this.queue.length > 0) this.show('');
  };
}
