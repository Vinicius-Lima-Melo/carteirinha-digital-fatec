import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class NewStudentComponent  implements OnInit {
  @ViewChild('csvReader') csvReader: any;
  novosAlunos: any = []
  constructor() { }

  ngOnInit() {}

  uploadListener($event: any): void {
    let files = $event.srcElement.files;

    // // enviar arquivo
    // this.empresasSvc.uploadFile(files).subscribe((result: any) => {

    // })

    //enviar dados separados
    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = async () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeader(csvRecordsArray);



        await this.csv2Array(csvRecordsArray, headersRow).then(alunos => {
          console.table(alunos);
          this.novosAlunos = alunos;
        }).catch(err => {
          console.log("Erro", err);
        });
      };

      reader.onerror = function () {
        console.log('Não foi possível realizar a leitura do arquivo!');
      };

    } else {
      alert("Extensão inválida.");
      this.fileReset();
    }
  }

  getHeader(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[3]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }

    return headerArray;
  }

  async csv2Array(colaboradores: any, header: any) {
    return new Promise((resolve, reject) => {

      header = header[0].split(';');
      let headerLength = header.length;
      // if (headerLength < 4 || headerLength > 5) {
      //   this.uiService.showSwal("Erro", `Número de colunas incompatível com o esperado`, false, 'error');
      //   return reject();
      // }
      let headerPadrao = ['od', 'name', 'cpf', 'rg'];

      let csvArr = [];
      for (let i = 4; i < colaboradores.length; i++) {
        let row = colaboradores[i].split(';');
        if (headerLength === 5) {
          row.pop(); // tirando ultima coluna do array para caso de arquivo com 5 colunas (; no final de cada linha no csv)
        }
        if (row.length == headerPadrao.length) {

          if (i > 1 && (row[1] == '' && row[2] == '' && row[3] == '')) { //Finalizar ao passar pela primeira linha em branco
            resolve(csvArr);
            break;
          }
          row.shift(); //tirando coluna de numeração da planilha
          let arr:any;
          if (!/^[A-zÀ-ú]+\s.+/.test(row[0])) { //Validação do Nome

            // this.uiService.showSwal("Upload Cancelado", "", false, 'error', true, `
            // <div>
            //     <br>
            //   <small style="color: #F22C44; font-size: 14px">Verifique se o nome está completo e se não possui caracteres especiais</small>
            //   <br>
            //   <br>
            //   <small style="white-space: nowrap; color: #262626; font-size:14px; padding: 6px; background: #e2e2e2; border-radius: 4px">
            //     <b>${(i - 2)}° linha: </b>
            //     <span style="color: #F22C44">"${row[0]}"</span>,
            //     "${row[1]}",
            //     ...
            //   </small>
            //   <br>
            //   <br>
            // </div>
            // `);
            return reject();
          }

          // row[1] = Utils.RemoveSpecialCharacters(row[1]); //CPF
          // row[2] = Utils.RemoveSpecialCharacters(row[2]); //RG

          for (let r = 0; r < row.length; r++) {
            arr = { ...arr, [headerPadrao[r + 1]]: row[r] === "" ? (r == 10 ? 0 : 'Não definido') : row[r] };
          }

          console.log(arr);
          csvArr.push(arr);
        }
        else {
          // this.uiService.showSwal("Upload Cancelado!", `Dados inválidos na linha ${i}.`, false, 'error');
          console.log("Row " + i + " data is not valid, please check.");
          reject();
          break;
        }
      }
      return resolve(csvArr);
    });
  }


  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  fileReset() {
    this.csvReader.nativeElement.value = null;
  }

  downloadPlanilha() {
    //open the file in new tab
    window.open('./../../../assets/PLANILHA.csv', '_blank');

  }
}
