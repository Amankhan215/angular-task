import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class ChildComponent {
  @Input() primitiveData!: number;
  @Input() nonPrimitiveData!: { value: number };

  childPrimitiveData: number = 10;
  childNonPrimitiveData: { value: number } = { value: 20 };

  updateChildPrimitive() {
    this.childPrimitiveData += 1;
  }

  updateChildNonPrimitive() {
    this.childNonPrimitiveData.value += 1;
  }
}
