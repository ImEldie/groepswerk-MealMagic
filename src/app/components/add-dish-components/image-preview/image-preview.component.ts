import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { check } from 'prettier';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.css'
})
export class ImagePreviewComponent {
  hidePreviewState = true;
  @Input({required: true}) imageUrl: string = '';

  showPreview(){
    if (!this.checkImageInvalid()){
      this.hidePreviewState = false;
    }
  }
  hidePreview(){
    this.hidePreviewState = true;
  }
  checkImageInvalid(){
    const imageInvalid = (this.imageUrl === '');
    return imageInvalid;
  }
}
