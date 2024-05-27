import './pagination.sass';
import { DispatchMain } from '../../../modules/products/types';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';

const START_PAGE = 1;
const COUNT_BUTTONS = 4;

export class Pagination extends BaseComponent {
  private dispatch: DispatchMain;
  private _countPages: number;
  private _currentPage: number;

  constructor(countPages: number, dispatch: DispatchMain) {
    super({ tagName: 'div', classNames: 'pagination__container' });
    this.dispatch = dispatch;
    this._currentPage = START_PAGE;
    this._countPages = countPages;
    this.update();
  }

  set buttons(status: 'enabled' | 'disabled') {
    if (status === 'disabled') {
      this.setClassName('pagination_disabled');
    } else {
      this.removeClassName('pagination_disabled');
    }
  }

  set currentPage(page: number) {
    this._currentPage = page;
    this.update();
  }

  set countPages(count: number) {
    this._countPages = count;
    this.update();
  }

  private createPaginationBtn(textContent: string): BaseComponent {
    const btn = new Button({ textContent, classNames: 'pagination__button' });
    if (textContent === `${this._currentPage}`) btn.setClassName('pagination__current-button');
    btn.setOnclick(() => {
      this._currentPage = +textContent;
      this.dispatch({ type: 'change-offset', payload: { prop1: textContent, prop2: '' } });
    });
    return btn;
  }

  private createCtrlBtn(textContent: string, direction: 'prev' | 'next'): BaseComponent {
    const icon = direction === 'next' ? '>' : '<';
    const btn = new Button({ textContent: icon, classNames: 'pagination__button' });
    btn.setOnclick(() => {
      this._currentPage = +textContent;
      this.dispatch({ type: 'change-offset', payload: { prop1: textContent, prop2: '' } });
    });
    return btn;
  }

  private update(): void {
    const btns: BaseComponent[] = [];
    const frame = Math.ceil(this._currentPage / COUNT_BUTTONS);
    const stop = frame * COUNT_BUTTONS <= this._countPages ? frame * COUNT_BUTTONS : this._countPages;
    const start = stop - COUNT_BUTTONS + 1 > 0 ? stop - COUNT_BUTTONS + 1 : 1;

    if (start > 1) {
      btns.push(this.createCtrlBtn(`${start - 1}`, 'prev')); // Prev button
    }
    for (let i = start; i <= stop; i += 1) {
      btns.push(this.createPaginationBtn(`${i}`));
    }
    if (stop < this._countPages) {
      btns.push(this.createCtrlBtn(`${stop + 1}`, 'next')); // Next button
    }

    this.element.innerHTML = '';
    this.insertChildren(btns);
  }
}
