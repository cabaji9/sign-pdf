import {Component} from '@angular/core';
import {PDFDocument} from 'pdf-lib';
import download from 'downloadjs';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdf-example';
  pngUrl = 'http://localhost:4200/assets/signature.png';

  relativeY: any;
  relativeX: any;



  async print() {

    const pdfUrl = 'http://localhost:4200/assets/token.pdf';
    const pngImageBytes = await fetch(this.pngUrl).then((res) => res.arrayBuffer());
    const pdfImageBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());

    const intePageDiffSize = 15;
    const currentPage = 1;

    const pdfDoc = await PDFDocument.load(pdfImageBytes);
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    const page = pdfDoc.getPage(currentPage - 1);
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    const textLayer = $('.textLayer').first();
    const width = textLayer.width();
    const height = textLayer.height();

    const positionYScroll = this.relativeY > height ? this.relativeY - height - (intePageDiffSize * currentPage) : this.relativeY;

    const pageX = (this.relativeX * pageWidth) / width;
    const pageY = (positionYScroll * pageHeight) / height;

    console.log('page x: ' + pageX + ', page Y: ' + pageY);

    const imageRelativeWidth = (pngImage.width * pageWidth)/ width;
    const imageRelativeHeight = (pngImage.height * pageHeight)/ height;



    page.drawImage(pngImage, {
      x: pageX ,
      y: pageHeight - pageY - imageRelativeHeight,
      width: imageRelativeWidth,
      height: imageRelativeHeight
    });

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, 'pdf-lib_image_embedding_example.pdf', 'application/pdf');

  }

  drop(event) {
    const x = event.x;
    const y = event.y;
    console.log('x: ' + x + 'y:' + y);

    const dropzone = $('.textLayer').first();
    const offset = dropzone.offset();

    this.relativeY = event.clientY - offset.top;
    this.relativeX = event.clientX - offset.left;

    console.log('relative x: ' + this.relativeX + 'y:' + this.relativeY);

    $('#imgSignature').remove();
    const imgAppend = `<div id="imgSignature"  cdkDrag  style="position: absolute; z-index: 2; transform: translate3d(${this.relativeX}px, ${this.relativeY}px, 0px);"><img  src="${this.pngUrl}"></div>`;
    $('.removePageBorders').prepend(imgAppend);





  }
}
