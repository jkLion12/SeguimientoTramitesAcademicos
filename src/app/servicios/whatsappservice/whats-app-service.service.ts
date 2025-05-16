import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WhatsappModel } from '../../modelos/whatsappmodel.interface';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppServiceService {

  constructor(private http:HttpClient) { }


  enviarMensaje(mensaje:WhatsappModel){

    return this.http.post('http://localhost:3001/lead', mensaje);

  }

  // botId = '131179000088834';
  // // phoneNbr = '51961141967';
  // beaderToken = 'EAALE524bZCQ0BO3qvxIdsdEZClZC6XBnj7Um2KZBJZAPSixPtSqJ2FN2GX7EbltF3mhIT3tguGJgiJUm4ZCWyMvPxk7FVLlV7ePj8TjGSVBnOQtATV3vYaGmky6t4g5XZArySJmOU7ZCod4rdqTKY7pWkyWnDYEMgysDjzHfW19PlLzy1uWttZCsv7Sf1s01kvZBusnzAPuKcZBFsPvh7jmblQZD';

  // url = 'https://graph.facebook.com/v17.0/'+this.botId+'/messages'
  // constructor(private http: HttpClient) {}

  // sendMessage() {
  //   const url = this.url;
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer '+ this.beaderToken,
  //     'Content-Type': 'application/json'
  //   });

  //   const body = {
  //     messaging_product: 'whatsapp',
  //     to: '+51929308418',
  //     type: 'template',
  //     template: {
  //       name: 'hello_world',
  //       language: { code: 'en_US' }
  //     }

  //   };

  //   this.http.post(url, body, { headers: headers }).subscribe(
  //     (response) => {
  //       console.log('Response:', response);
  //       // Aquí puedes manejar la respuesta si es necesario
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //       // Manejo de errores
  //     }
  //   );
  // }

}


