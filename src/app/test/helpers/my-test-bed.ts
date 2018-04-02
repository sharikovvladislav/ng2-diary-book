import { TestBed } from '@angular/core/testing';

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
  return 'lalala';
}
