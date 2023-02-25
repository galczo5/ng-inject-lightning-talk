import {Component} from "@angular/core";
import {TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {take} from "rxjs";
import {useZonelessHostListen} from "./useZonelessHostListen";

@Component({
  selector: 'app-test',
  template: ''
})
class TestComponent {
  hostClick$ = useZonelessHostListen('click');
}

describe('useZonelessHostListen', () => {

  it('should listen for events on host element', done => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent<TestComponent>(TestComponent);

    fixture.componentInstance.hostClick$
      .pipe(
        take(1)
      )
      .subscribe(event => {
        expect(event).toBeDefined();
        done();
      });

    (fixture.nativeElement as HTMLElement).click();
  });

});
