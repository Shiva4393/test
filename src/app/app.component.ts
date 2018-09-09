import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

const data = [
  {key: 'store_id', label: 'Store Id', mandatory: true, type: 'textbox'},
  {key: 'store_type', label: 'Store Type', mandatory: false, type: 'textbox'},
  {key: 'dma', label: 'DMA', mandatory: false, type: 'textbox'},
  {key: 'city', label: 'City', mandatory: true, type: 'textbox'}
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';

  form: FormGroup;
  isLoading: boolean = true;
  data = data;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
    this.createAttributeControllers();
    this.isLoading = false;
  }

  createForm() {
    this.form = this.fb.group({
      attributes: this.fb.array([])
    });
  }

  
  public get attributes() {
    return this.form.get('attributes') as FormArray;
  }
  

  createAttributeControllers() {
    data.map(attr => {
      this.attributes.push(this.createAttributeGroup(attr))
    });
  }

  createAttributeGroup(data) {
    return this.fb.group({
      key: data.key,
      [data.key]: false,
      value: data.value || '',
      mandatory: data.mandatory || false,
      display_in_grid: data.display_in_grid || false
    })
  }
}
