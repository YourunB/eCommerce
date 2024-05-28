import './search.sass';
import { Input } from '../../../components/baseInput/baseInput';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { ActionsProducts, DispatchProducts } from '../../../modules/products/types';

export class SectionSearch extends BaseComponent {
  input: Input;
  dispatch: DispatchProducts;
  datalist: BaseComponent;

  constructor(dispatch: DispatchProducts) {
    super({ tagName: 'search', classNames: 'search_container' });
    this.dispatch = dispatch;
    const form = new BaseComponent<HTMLFormElement>({ tagName: 'form', classNames: 'search__form' });
    this.input = new Input({ classNames: 'search__input' });
    this.datalist = new BaseComponent<HTMLDataListElement>({ tagName: 'datalist' });
    const button = new Button({ classNames: 'search__button' });

    this.input.setAttribute({ name: 'placeholder', value: 'search' });
    this.input.setAttribute({ name: 'list', value: 'search' });
    this.datalist.setAttribute({ name: 'id', value: 'search' });
    form.getElement().addEventListener('submit', (e) => this.handleSubmit(e));

    form.insertChildren([this.input, this.datalist, button]);
    this.insertChild(form);
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();
    const searchText = this.input.value;
    const action: ActionsProducts = { type: 'search', payload: { prop1: searchText, prop2: '' } };
    this.dispatch(action);
  }

  public setDataList(values: string[]): void {
    this.datalist.getElement().innerHTML = '';
    const options: BaseComponent[] = [];

    values.forEach((value) => {
      const option = new BaseComponent<HTMLOptionElement>({ tagName: 'option' });
      option.getElement().value = value;
      options.push(option);
    });

    this.datalist.insertChildren(options);
  }
}
