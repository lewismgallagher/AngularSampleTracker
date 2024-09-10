import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sample } from '../../interfaces/sample';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-sample-textbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sample-textbox.component.html',
  styleUrl: './sample-textbox.component.css',
})
export class SampleTextboxComponent {
  @Input() sample!: Sample;
  @Output() edited = new EventEmitter<Sample>();

  originalValue!: string;

  sampleTypeVisible!: boolean;

  public setOriginalValue() {
    // todo add logic
  }

  public sampleEdit(sample: Sample) {
    this.edited.emit(sample);
  }

  // TODO create tooltip for samples and add logic for visibility here
  public showSampleType() {}

  public hideSampleType() {}
}
