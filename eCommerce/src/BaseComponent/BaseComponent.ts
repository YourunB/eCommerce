export interface BaseComponentProps {
  tagName: string;
  classNames?: string | string[];
  textContent?: string | null;
  parentNode?: HTMLElement;
  attribute?: AttributeElement;
}

export type TaggedElementProps = Omit<BaseComponentProps, 'tagName'>;

interface AttributeElement {
  name: string;
  value: string;
}

interface RemovedAttribute {
  name: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected element: T;

  constructor(props: BaseComponentProps) {
    this.element = document.createElement(props.tagName) as T;
    this.setClassName(props.classNames ?? '');
    this.setTextContent(props.textContent ?? '');
    if (props.parentNode) {
      this.render(props.parentNode);
    }
    if (props.attribute) {
      this.setAttribute(props.attribute);
    }
  }

  getElement() {
    return this.element;
  }

  render(parent: HTMLElement | BaseComponent): void {
    if (parent instanceof HTMLElement) {
      parent.append(this.element);
    } else parent.insertChild(this.getElement());
  }

  setClassName(classNames: string[] | string) {
    if (!classNames) return;
    if (typeof classNames === 'string') {
      this.element.classList.add(classNames);
    } else {
      this.element.classList.add(...classNames);
    }
  }

  removeClassName(className: string) {
    this.element.classList.remove(className);
  }

  getTextContent() {
    return this.element.textContent;
  }

  setTextContent(text: string) {
    this.element.innerText = text;
  }

  insertChild(child: HTMLElement | BaseComponent): void {
    if (child instanceof HTMLElement || child instanceof SVGSVGElement) {
      this.element.append(child);
    } else this.element.append(child.getElement());
  }

  insertChildren(children: BaseComponent[]): void {
    children.forEach((el) => this.insertChild(el.getElement()));
  }

  setAttribute(attribute: AttributeElement) {
    if (attribute) {
      this.element.setAttribute(attribute.name, attribute.value);
    }
  }

  removeAttribute(attribute: RemovedAttribute) {
    if (attribute) {
      this.element.removeAttribute(attribute.name);
    }
  }

  getChildren(): HTMLElement[] {
    return Array.from(this.element.children) as HTMLElement[];
  }

  destroy() {
    this.element.remove();
  }

  setOnclick(onclick: (() => void) | null) {
    this.getElement().onclick = onclick;
  }
}
