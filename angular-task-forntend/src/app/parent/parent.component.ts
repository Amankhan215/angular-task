import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  changeDetection: ChangeDetectionStrategy.Default, 
})
export class ParentComponent {
  primitiveData: number = 0;
  nonPrimitiveData: { value: number } = { value: 0 };

  constructor(private dataService: DataService) {
    this.fetchData();
  }

  fetchData() {
    this.dataService.getData().subscribe((data) => {
      this.primitiveData = data.primitiveData;
      this.nonPrimitiveData = data.nonPrimitiveData;
    });
  }

  updatePrimitive() {
    this.primitiveData += 1;
  }

  updateNonPrimitive() {
    this.nonPrimitiveData.value += 1;
  }

  saveData() {
    this.dataService.updateData({
      primitiveData: this.primitiveData,
      nonPrimitiveData: this.nonPrimitiveData,
    }).subscribe();
  }
}
