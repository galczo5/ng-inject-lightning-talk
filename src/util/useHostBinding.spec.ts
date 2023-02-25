import {Component, ElementRef, inject} from "@angular/core";
import {useHostBinding} from "./useHostBinding";
import {TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";

const cssClass = 'test-css-class';

@Component({
  selector: 'app-test',
  template: ''
})
class TestComponent {
  testClasses = useHostBinding(cssClass, true);
  classList = (inject(ElementRef).nativeElement as HTMLElement).classList;
}

@Component({
  selector: 'app-test',
  template: ''
})
class TestComponent2 {
  testClasses = useHostBinding(cssClass, false);
  classList = (inject(ElementRef).nativeElement as HTMLElement).classList;
}

describe('useHostBinding', () => {

  it('should add class on init', () => {

    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    expect(fixture.componentInstance.classList.contains(cssClass)).toBeTrue();

  });

  it('should NOT add class on init', () => {

    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent2]
    }).compileComponents();

    const fixture = TestBed.createComponent<TestComponent2>(TestComponent2);
    expect(fixture.componentInstance.classList.contains(cssClass)).toBeFalse();

  });

  it('should remove/add class on set call', () => {

    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent<TestComponent>(TestComponent);

    fixture.componentInstance.testClasses.set(false);
    expect(fixture.componentInstance.classList.contains(cssClass)).toBeFalse();

    fixture.componentInstance.testClasses.set(true);
    expect(fixture.componentInstance.classList.contains(cssClass)).toBeTrue();

  });

});
