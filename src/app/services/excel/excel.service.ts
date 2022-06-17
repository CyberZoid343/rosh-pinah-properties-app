import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { save, SaveDialogOptions } from '@tauri-apps/api/dialog';
import { writeBinaryFile } from '@tauri-apps/api/fs';
import { MessageModalService } from '../message-modal/message-modal.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(
    private messageModalService: MessageModalService,
  ) { }

  public exportAsExcelFile(json: any[], headers: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.sheet_add_aoa(worksheet, [headers]);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  async saveAsExcelFile(buffer: any, fileName: string) {

    const data: Uint8Array = new Uint8Array(buffer.buffer);

    let savedFiledPath = '';

    const options: SaveDialogOptions = {
      defaultPath: fileName + '.xlsx',
    }

    save(options).then(
      filePath => {
        savedFiledPath = filePath;
        writeBinaryFile(filePath, data).then(
          success => {
            this.messageModalService.showSuccessMessage('Excel file successfuly created at "' + savedFiledPath + '"');
          },
          error => {
            this.messageModalService.showErrorMessage('Failed to save excel file at "' + savedFiledPath + '"');
          }
        );
      }
    );
    
  }
}


