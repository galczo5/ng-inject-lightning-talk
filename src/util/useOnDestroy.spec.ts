import {TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {useOnDestroy} from "./useOnDestroy";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-test',
  template: ''
})
class TestComponent {
  private readonly onDestroy$ = useOnDestroy();

  stream$ = new Subject()
    .pipe(
      takeUntil(this.onDestroy$)
    );
}

@Component({
  selector: 'app-test',
  template: ''
})
class ShouldNotWorkTestComponent {
  stream$ = new Subject();
}

describe('useOnDestroy', () => {

  it('should close the stream when component is destroyed', done => {

    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestComponent]
      }
    ).compileComponents();

    const fixture = TestBed.createComponent<TestComponent>(TestComponent);

    fixture.componentInstance.stream$
      .subscribe({
        complete: () => {
          expect(true).toBeTrue();
          done();
        }
      })

    fixture.destroy();
  });

  it('should not close the stream when component is destroyed and there is useOnDestroy', done => {

    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ShouldNotWorkTestComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent<ShouldNotWorkTestComponent>(ShouldNotWorkTestComponent);

    fixture.componentInstance.stream$
      .subscribe({
        complete: () => expect(true).toBeFalse()
      });

    fixture.destroy();
    done();
  });

});
