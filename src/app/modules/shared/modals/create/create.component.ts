import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { ProductService } from 'src/app/modules/product/services/product.service'
import { UploadService } from '../../services/upload.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  blobData
  createForm: FormGroup
  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any, private uploadService: UploadService,
              public productService: ProductService, public toast: ToastrService ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      medicine_name: new FormControl('', Validators.required),
      manufacturer: new FormControl('', Validators.required),
      composition: new FormControl('', Validators.required),
      MRP: new FormControl('', Validators.required),
      best_price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      benefits: new FormControl('', Validators.required)
    })
    if (this.data.data.editData) {
      this.prePopulateData(this.data.data.editData)
    }
  }

  selectFile(event): any{
    this.uploadService.selectFile(event)
  }

  submit(): void {
    const formData: FormData = new FormData()
    formData.append('image', this.uploadService.blobData)
    formData.append('medicine_name', this.createForm.value.medicine_name)
    formData.append('manufacturer', this.createForm.value.manufacturer)
    formData.append('composition', this.createForm.value.composition)
    formData.append('MRP', this.createForm.value.MRP)
    formData.append('best_price', this.createForm.value.best_price)
    formData.append('category', this.createForm.value.category)
    formData.append('description', this.createForm.value.description)
    formData.append('benefits', this.createForm.value.benefits)
    this.productService.createProduct(formData).subscribe((data) => {
      console.log('data', data)
      this.dialogRef.close(true)
    }, (error) => {
      console.log(error)
    })
  }

  public prePopulateData(data): void{
    console.log(data)
    this.createForm.patchValue({
         ...data
       })
   }

}
