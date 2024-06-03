import './annual.sass';
import { BaseComponent } from '../../../../../components/baseComponent';
import { DispatchProducts } from '../../../../../modules/products/types';

class Radio extends BaseComponent {
  private checkbox: BaseComponent<HTMLInputElement>;

  constructor(label: string) {
    super({ tagName: 'label', textContent: label, classNames: 'radio-element' });
    this.checkbox = new BaseComponent<HTMLInputElement>({
      tagName: 'input',
      attribute: { name: 'type', value: 'radio' },
    });
    this.insertChild(this.checkbox);
  }

  get checked() {
    return this.checkbox.getElement().checked;
  }

  set checked(value: boolean) {
    this.checkbox.getElement().checked = value;
  }
}

export class FilterAnnuals extends BaseComponent {
  dispatch: DispatchProducts;
  private annualCheckbox: Radio;
  private perennialCheckbox: Radio;

  constructor(dispatch: DispatchProducts) {
    super({ tagName: 'fieldset', classNames: 'filters_annual' });
    this.dispatch = dispatch;
    const legend = new BaseComponent({ tagName: 'legend', textContent: 'Life Cycle' });
    this.annualCheckbox = new Radio('annual');
    this.perennialCheckbox = new Radio('perennial');

    this.annualCheckbox.getElement().addEventListener('change', () => this.handleChangeAnnual());
    this.perennialCheckbox.getElement().addEventListener('change', () => this.handleChangePerennial());

    this.insertChildren([legend, this.annualCheckbox, this.perennialCheckbox]);
  }

  public resetAnnualInput(): void {
    this.annualCheckbox.checked = false;
  }

  public resetPerennialInput(): void {
    this.perennialCheckbox.checked = false;
  }

  private handleChangeAnnual(): void {
    const action = {
      type: 'change-annual',
      payload: { prop1: `${this.annualCheckbox.checked}`, prop2: '' },
    } as const;
    this.dispatch(action);
  }

  private handleChangePerennial(): void {
    const action = {
      type: 'change-perennial',
      payload: { prop1: `${this.perennialCheckbox.checked}`, prop2: '' },
    } as const;
    this.dispatch(action);
  }
}
