import {Component, Input, OnChanges, SimpleChanges, ViewChild} from "@angular/core";
import {useOnChanges} from "./useOnChanges";
import {TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {map, take} from "rxjs";

@Component({
  selector: 'app-child',
  template: '{{ input }}'
})
class ChildComponent implements OnChanges {
  @Input() input = '';
  @Input() secondInput = '';

  onInputChange = useOnChanges(this, "input")
    .pipe(
      map(() => this.input)
    );

  onInputsChange = useOnChanges(this, "input", "secondInput");

  ngOnChanges(changes: SimpleChanges): void {}
}

@Component({
  selector: 'app-test',
  template: '<app-child #child [input]="value" [secondInput]="secondValue"></app-child>'
})
class TestComponent {

  @ViewChild('child', {read: ChildComponent, static: true})
  child!: ChildComponent;

  value: string = ''
  secondValue: string = ''
}

describe('useOnChanges', () => {

  it('should react on single input change', done => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent, ChildComponent]
    }).compileComponents();

    const newValue = 'new value';
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);

    fixture.componentInstance.child.onInputChange
      .pipe(
        take(1)
      )
      .subscribe(data => {
        expect(data).toEqual(newValue);
        done();
      });

    fixture.componentInstance.value = newValue;
    fixture.detectChanges();
  });

  it('should react on any input change', done => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent, ChildComponent]
    }).compileComponents();

    const newValue = 'new value';
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);

    fixture.componentInstance.child.onInputsChange
      .pipe(take(1))
      .subscribe(() => {

        fixture.componentInstance.child.onInputsChange
          .pipe(take(1))
          .subscribe(() => {
            done();
          });

        fixture.componentInstance.secondValue = newValue;
        fixture.detectChanges();

      });

    fixture.componentInstance.value = newValue;
    fixture.detectChanges();
  });

});
