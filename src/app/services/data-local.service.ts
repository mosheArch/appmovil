import { Injectable } from '@angular/core';
import {Registro} from '../models/registro.models';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {File} from '@ionic-native/file/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardado: Registro [] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private storage: Storage, private navCtrl: NavController, private inAppBrowser: InAppBrowser, private file: File, private emailComposer: EmailComposer) {
    this.cargarStorage();
  }

  async cargarStorage() {
    this.guardado = await this.storage.get('registros') || [];
  }

  // cargar data

  async guardarRegistro(format: string, text: string) {
    await this.cargarStorage();
    const nuevoRegistro = new Registro(format, text);
    this.guardado.unshift(nuevoRegistro);
    console.log(this.guardado);
    await this.storage.set('registros', this.guardado);

    this.abrirRegistros(nuevoRegistro);
  }

  abrirRegistros(registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');

    if (registro.type === 'http') {
      this.inAppBrowser.create(registro.text, '_system');
    } else {
      this.navCtrl.navigateForward(`/tabs/tab2/mapa/${ registro.text}`);
    }

  }
  enviarCorreo() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Fecha de Creación, Texto\n';

    arrTemp.push(titulos);

    this.guardado.forEach(registro => {
      const  linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`;
      arrTemp.push(linea);
    });
    console.log(arrTemp.join(''));

    this.crearArchivoFisico(arrTemp.join(''));
  }


  crearArchivoFisico(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'registros.csv')
        .then(existe => {
          console.log('Existe archivo?', existe);
          return this.escribirEnArchivo(text);
        })
        .catch(err => {
          return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
              .then(creado => this.escribirEnArchivo(text))
              .catch(err2 => console.log('No se pudo crear el archivo', err2));
        });
  }
  async escribirEnArchivo(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    const archivo = `${this.file.dataDirectory}/registros.csv`;
    // console.log(this.file.dataDirectory + 'registros.csv');

    const email = {
      to: 'nombre@email.com',
      cc: 'nombre@email.com',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
          archivo,
      ],
      subject: 'Data shet de scans',
      body: 'Envio de registros de scans',
      isHtml: true
    };
    // Send a text message using default options
    this.emailComposer.open(email);
  }
}
