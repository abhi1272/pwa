import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NgxImageCompressService } from 'ngx-image-compress'
import { ToastrService } from 'ngx-toastr'
import { ProductService } from '../../../product/services/product.service'

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  file: any
  localUrl: any
  localCompressedURl: any
  sizeOfOriginalImage: number
  sizeOFCompressedImage: number
  imgResultBeforeCompress: string
  imgResultAfterCompress: string
  blobData

  @Input() accept = '.xlsx, .xls'

  @ViewChild('fileInput', { static: true }) myInputVariable: ElementRef

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any, private imageCompress: NgxImageCompressService,
              public productService: ProductService, public toast: ToastrService ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  selectFile(event: any): void {
    let fileName: any
    this.file = event.target.files[0]
    fileName = this.file.name
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        this.localUrl = event.target.result
        this.compressFile(this.localUrl, fileName)
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  compressFile(image, fileName): void {
    const orientation = -1
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024)
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage)
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result
        this.localCompressedURl = result
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        console.warn('Size in bytes after compression:', this.sizeOFCompressedImage)
        // create file from byte
        const imageName = fileName
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1])
        // imageFile created below is the new compressed file which can be send to API in form data
        const imageFile = new File([result], imageName, { type: 'image/jpeg' })
      })
  }
  dataURItoBlob(dataURI): any {
    const byteString = window.atob(dataURI)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const int8Array = new Uint8Array(arrayBuffer)
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' })
    this.blobData = blob
    return blob
  }

  addPrescription(): void {
    const formData: FormData = new FormData()
    formData.append('prescription', this.blobData)
    this.productService.addPrescription(formData).subscribe((data) => {
      console.log('success')
      this.toast.success('File Uploaded successfully')
    }, (error) => {
      this.toast.error(error)
    })
  }
}
