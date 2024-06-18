import './filterPrice.sass';
import noUiSlider, { API } from 'nouislider';
import { Input } from '../../../../components/baseInput/baseInput';
import { BaseComponent } from '../../../../components/baseComponent';
import { DispatchProducts } from '../../../../modules/products/types';
import { Button } from '../../../../components/basebutton/baseButton';

interface TargetElement extends HTMLElement {
  noUiSlider?: API;
}

const MAX_FILTER = 1000;

export class FilterPrice extends BaseComponent {
  private min: Input;
  private max: Input;
  private sliderObj: API | undefined;
  private btnFilter: Button;

  constructor(dispatch: DispatchProducts) {
    super({ tagName: 'div', classNames: 'filters_price' });
    this.min = new Input({ attribute: { name: 'type', value: 'number' } });
    this.max = new Input({ attribute: { name: 'type', value: 'number' } });
    const header = new BaseComponent({ tagName: 'p', classNames: 'filter-price__header', textContent: 'Price Range' });
    const slider = new BaseComponent({ tagName: 'div', attribute: { name: 'id', value: 'price-slider' } });
    this.btnFilter = new Button({ textContent: 'Filter' });
    const inputContainer = new BaseComponent({ tagName: 'div', classNames: 'filter-price__inputs-container' });

    this.min.setAttribute({ name: 'name', value: 'min' });
    this.max.setAttribute({ name: 'name', value: 'max' });
    const inputs = [this.min.getElement(), this.max.getElement()];

    noUiSlider.create(slider.getElement(), {
      connect: true,
      start: [0, MAX_FILTER],
      margin: 1,
      range: { min: 0, max: MAX_FILTER },
      format: {
        to: (value) => `${value.toFixed(0)}`,
        from: (value) => Number(value.replace(',-', '')),
      },
    });

    this.sliderObj = (slider.getElement() as unknown as TargetElement).noUiSlider;
    this.sliderObj?.on('update', (values, handle) => {
      this.btnFilter.on();
      inputs[handle].value = `${values[handle]}`;
    });
    this.btnFilter.setOnclick(() => {
      const result = this.sliderObj?.get() || [0, MAX_FILTER];
      if (Array.isArray(result)) {
        this.btnFilter.off();
        dispatch({ type: 'change-price-filter', payload: { prop1: `${result[0]}`, prop2: `${result[1]}` } });
      }
    });
    this.min.getElement().addEventListener('change', () => this.handleChangeInput());
    this.max.getElement().addEventListener('change', () => this.handleChangeInput());

    inputContainer.insertChildren([this.min, this.max]);
    this.insertChildren([header, slider, inputContainer, this.btnFilter]);
    this.btnFilter.off();
  }

  public resetPriceInputs(): void {
    this.min.value = '0';
    this.max.value = `${MAX_FILTER}`;
    this.sliderObj?.set([this.min.value, this.max.value]);
  }

  private handleChangeInput(): void {
    this.btnFilter.on();
    this.sliderObj?.set([this.min.value, this.max.value]);
  }
}
