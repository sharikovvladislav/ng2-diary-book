import { TestBed } from '@angular/core/testing';
import {} from 'reflect-metadata';

export class MyTestBed extends TestBed {
  static configureTestingModule(moduleConf) {
    super.configureTestingModule(moduleConf);
    return this;
  }
  static shallowRenderComponent(component) {
    this.overrideComponent(component, {
      set: { template: `${getSelector(component)} component stub` },
    });
    return this;
  }
}

function getSelector(componentClass) {
  const annotations = Reflect.getMetadata('annotations', componentClass);
  const componentMetadata = annotations[0] || {};
  return componentMetadata.selector;
}
