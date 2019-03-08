import { Component } from '@angular/core';


declare var jsPDF: any; // Important

(function(API){
API.myText = function(txt, options, x, y) {
    options = options ||{};
    /* Use the options align property to specify desired text alignment
     * Param x will be ignored if desired text alignment is 'center'.
     * Usage of options can easily extend the function to apply different text
     * styles and sizes
    */
    if( options.align == "center" ){
        // Get current font size
        var fontSize = this.internal.getFontSize();

        // Get page width
        var pageWidth = this.internal.pageSize.width;

        // Get the actual text's width
        /* You multiply the unit width of your string by your font size and divide
         * by the internal scale factor. The division is necessary
         * for the case where you use units other than 'pt' in the constructor
         * of jsPDF.
        */
        var txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

        // Calculate text's x coordinate
        x = ( pageWidth - txtWidth ) / 2;
    }

    // Draw text at x,y
    this.text(txt,x,y);
}
})(jsPDF.API);

function stat2col(value) {
  if (value== "Excelente") {
    return [0,123,255];
  }
  else if (value == "Buena") {
    return [40,167,69];
  }
  else if (value == "Regular") {
    return [255,193,7];
  }
  else if (value == "Mala") {
    return [220,53,69];
  }
  else if (value == "Sin Especificar") {
    return [84,91,98];
  }
  else if (value == "Baja") {
    return [84,91,98];
  }
  else if (value == "Alta") {
    return [40,167,69];
  }
  else{
    return [255,255,255];
  }
}

function stat2col_maleza(value) {
  if (value== "Excelente") {
    return [0,123,255];
  }
  else if (value == "Buena") {
    return [40,167,69];
  }
  else if (value == "Regular") {
    return [255,193,7];
  }
  else if (value == "Mala") {
    return [220,53,69];
  }
  else if (value == "Sin Especificar") {
    return [84,91,98];
  }
  else if (value == "Baja") {
    return [40,167,69];
  }
  else if (value == "Alta") {
    return [220,53,69];
  }
  else{
    return [255,255,255];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'libraries-export-app';

  async imprimeJsonInformeVisita(){

    var obj ={
      /** PRIMERA TABLA **/
      /*Columna 1*/
      date: "2018-12-26",
      agricultor: "SOCIEDAD AGROGANADERA FORESTAL  Y FRUTICOLA BUENA VISTA LTDA.",      
      telefono: "42-432266",
      email:"email@miemail.com",
      especie: "Maravilla",
      /*Columna 2*/
      superficie: "300",      
      variedad:"Sumiko",      
      potrero:"Pivote poniente",

      /** SEGUNDA TABLA **/
      /*Columna 1*/
      estado_fenologico:"Pre-floración",
      estado_malezas:"Regular",
      cosecha:"Sin Especificar",

      /*Columna 2*/
      humedad:"Buena",
      estado_crecimiento:"Buena",
      estado_fitosantiario:"Buena",
      estado_general:"Buena",

      /*OBSERVACIONES GENERALES*/
      /*NOTA: Estos dos campos pueden tener mucho texto.
      Pensarles un espacio suficientemente grande*/
      observaciones_generales:"Cultivo  en  pre floración,  se  está  realizando  limpieza  de  sectores "+
      "con mayor carga de  malezas",
      recomendaciones:"1. Programar aplicación  de  urea  por fertirriego en  2 tandas  de  100kg cada  una."+
      "2.  Realizar  aplicación de  Fungicida preventivo  + Boro, se  envía adjunta imagen  con algunos "+
      "productos recomendados, elegir una de  las opciones. Favor confirmarnos  la  fecha de  la  aplicación, "+
      "ya  que ésta  debe  ser previamente informada al  SAG.",

      /*Este es un array de 0 a N imágenes*/
      imgs:[{
        path: "/assets/img_test1.jpg"
      },{
        path: "/assets/img_test2.jpg"
      },{
        path: "/assets/another.jpg"
      },{
        path: "/assets/horizontal.jpg"
      }]

    };

    console.log(obj);

  }

  async imprimeJson(){

    var tablaSegundaPagina = {
      has_contrato : "ha descripcion",
      grower: "nombre_agricultor descripcion",
      parent_lines_male:"lines males",
      parent_lines_female:"lines female",
      male_basic_seed:"male basic seed",
      female_basic_seed:"female basic seed",
      sowing_date_female:"sowing date female ",
      sowing_date_male1:"sowing date male 1",
      sowing_date_male2:"sowing date male 2"
    };

    var arraytablaSegundaPagina = [];
    arraytablaSegundaPagina.push(tablaSegundaPagina); // Primera fila
    arraytablaSegundaPagina.push(tablaSegundaPagina); // Segunda fila
    arraytablaSegundaPagina.push(tablaSegundaPagina); // Tercera fila
    arraytablaSegundaPagina.push(tablaSegundaPagina); // Cuarta fila
    arraytablaSegundaPagina.push(tablaSegundaPagina); // Quinta fila
    arraytablaSegundaPagina.push(tablaSegundaPagina); // Sexta fila
    arraytablaSegundaPagina.push(tablaSegundaPagina); // Enésima fila


    console.log("\nTABLA DE PRIMERA PÁGINA <= No es primordial esta tabla. Enfocarse en el informe más abajo\n");
    for(var i=0;i<arraytablaSegundaPagina.length;i++){
      var arrayIn = arraytablaSegundaPagina[i];
      for (var key in arrayIn){
        if (arrayIn.hasOwnProperty(key)) {
          console.log("Valores: ",key,":",arrayIn[key]);
        }
      }

    }





    var informe = {
      /*Esta es la tabla superior*/
      nombre_variedad: "nombre_variedad descripcion",
      nombre_agricultor:"nombre_agricultor descripcion",
      locality: "locality descripcion",
      ha: "ha descripcion",
      flowering_start_female: "flowering_start_female descripcion",
      flowering_start_male: "flowering_start_male descripcion",
      flowering_end_female: "flowering_end_female descripcion",
      flowering_end_male: "flowering_end_male descripcion",
      crop_story:[/*Este array es de máximo 4 y mínimo zero*/
        {
          year: "2018",
          detail:"Canola"
        },
        {
          year: "2017",
          detail:"Maravilla"
        },
        {
          year: "2016",
          detail:"Maiz"
        },
        {
          year: "2015",
          detail:"Frejol"
        }
      ],
      isolation:"isolation descripcion",
      trimming_female:"trimming_female descripcion",
      trimming_male:"trimming_male descripcion",
      seeding_date_female:"seeding_date_female descripcion",
      seeding_date_male:"seeding_date_male descripcion",
      bee_in_field:"bee_in_field descripcion",
      estimated_yield_potential:"estimated_yield_potential descripcion",
      average_plant:"average_plant descripcion",
      /*Van 2 imágenes*/
      images:[{
        path: "assets/square.jpg"
      },{
        path: "assets/vertical.jpg"
      }],
      /*Tabla final*/
      estado_general: "Buena",
      estado_crecimiento: "Buena",
      estado_malezas: "Regular",
      estado_fitosantiario:"Buena",
      humedad_suelo: "Buena"
    };
    /*Los posibles valores para los estado tienen diferentes colores*/
    /*
      Excelente : Azul
      Buena: Verde
      Regular: Amarillo
      Mala: Rojo
      Sin Especificar: Plomo
      Baja : Plomo  /  Si es estado_malezas y Baja : Verde
      Alta : Verde  /  Si es estado_malezas y Alta : Rojo
    */

    var informe2 = {
      /*Esta es la tabla superior*/
      nombre_variedad: "1022RR",
      nombre_agricultor:"AGRICOLA LAS RAICES",
      locality: "Pivote 1-2",
      ha: "50",
      flowering_start_female: "20-nov",
      flowering_start_male: "01-dic",
      flowering_end_female: "miau",
      flowering_end_male: "miau",
      crop_story:[/*Este array es de máximo 4 y mínimo zero*/
        {
          year: "2018",
          detail:"Canola"
        },
        {
          year: "2017",
          detail:"Maravilla"
        },
        {
          year: "2016",
          detail:"Maiz"
        },
        {
          year: "2015",
          detail:"Frejol"
        }
      ],
      isolation:">1500",
      trimming_female:"27-nov",
      trimming_male:"miau",
      seeding_date_female:"21-sept",
      seeding_date_male:"21-sept",
      bee_in_field:"02-dic",
      estimated_yield_potential:"100",
      average_plant:"38",
      emergence_date_begining:"",
      emergence_50:"",
      /*Van 2 imágenes*/
      images:[{
        path: "/assets/img_test1.jpg"
      },{
        path: "/assets/img_test2.jpg"
      }],
      /*Tabla final*/
      estado_general: "Excelente",
      estado_crecimiento: "Buena",
      estado_malezas: "Mala",
      estado_fitosantiario:"Regular",
      humedad_suelo: "Sin Especificar"
    };

    var frontpage = {
        line1: "Canola",
        line2: "Dow Agroscience",
        season: "2017-2018",
        images: [{
          path: "/assets/front_background.jpg",
        },{
          path: "/assets/logo.jpg"
        }]
    };
    var array = [];
    array.push(informe2); // Primera página | El informe traerá otros datos por cada array
    array.push(informe); // Segunda página | El informe traerá otros datos por cada array
    array.push(informe); // Tercera página | El informe traerá otros datos por cada array
    array.push(informe); // Cuarta página | El informe traerá otros datos por cada array
    array.push(informe); // Quinta página | El informe traerá otros datos por cada array
    array.push(informe); // Sexta página | El informe traerá otros datos por cada array
    array.push(informe); // Enésima página | El informe traerá otros datos por cada array


    var doc = new jsPDF('l', 'pt', 'letter');
    
    
    //*************************//
    //*** BEGIN: Frontpage ****//
    //*************************//
    
    doc.addPage()
    doc.setPage(1)
    var width = 792
    var height = 255
    var img = new Image()
    try{
      await this.loadImage(frontpage.images[0].path, img);
      doc.addImage(img, 'JPEG', 0, 210, width, img.height)
     
    }
    catch(e){
      console.log("Background error:",e)
    } 
    var width = 128
    var height = 128
    var img = new Image()
    try {
      await this.loadImage(frontpage.images[1].path, img);
      doc.addImage(img, 'JPEG', 332, 20, width, height)
    }
    catch(e){
      console.log("Logo error:", e)
    }
    

    doc.setFontSize(40)
    doc.setFontType("bold")
    doc.text(frontpage.line1 + "\n" + frontpage.line2, 396, 300, {align: "center", lineHeightFactor: 2.0})
    doc.setTextColor("#898989")
    doc.text(frontpage.season,396 ,500, {align: "center"})
    

    //***********************//
    //*** END: Frontpage ****//
    //***********************//

    doc.setTextColor("#000000")
    for(var i=0;i<array.length;i++){
      doc.setPage(i+2);
      doc.autoTableSetDefaults({
          headerStyles: {fillColor: [155, 89, 182]}, // Purple
          startY: 10,
          margin: {top: 100, bottom: 0},
          pageBreak: "avoid",
          addPageContent: function(data) {
              doc.setFontSize(20);
          }
      });
      // console.log("\nPágina "+(i+1)+"\n");
      var arrayIn = array[i];
      var crop_cols = [];
      var crop_element = {};
      var crop_row = [];

      for (var j=0;j<arrayIn["crop_story"].length;j++){
        //var col_element = {title: arrayIn["crop_story"][j]["year"], dataKey: j};
        crop_cols.push({title: arrayIn["crop_story"][j]["year"], dataKey: arrayIn["crop_story"][j]["year"]});
        crop_element[arrayIn["crop_story"][j]["year"]] = arrayIn["crop_story"][j]["detail"];

      }
      crop_row.push(crop_element);

      // Título de cada página
      doc.setFontSize(23);
      doc.setFontType("bold");
      doc.text(arrayIn["nombre_variedad"]+" - "+arrayIn["nombre_agricultor"], 30, 40);

      // Tabla

      doc.setFontSize(10);
      doc.setFontType("normal");
      //var top = doc.autoTable.previous.finalY;

      var cols = [{
        title: "Details",
        dataKey: 'details'
      }, {
        title: "Values",
        dataKey: 'values'
       }];

      var item2 = {
        "Locality" : arrayIn["locality"],
        "ha" : arrayIn["ha"],
        "Crop story" : "",
        "" : "",
        "Isolation" : arrayIn["isolation"],
        "Seeding date Female" : arrayIn["seeding_date_female"],
        "Seeding date male" : arrayIn["seeding_date_male"],
        "Emergence date begining" : arrayIn["emergence_date_begining"],
        "Emergence 50%" : arrayIn["emergence_50"],
        "Average plants/m2" : arrayIn["average_plant"]
      };
      var rows2 = Object.keys(item2).map((key) => {
        return { 'details': key, 'values': item2[key] };
      });



     doc.autoTable(cols, rows2, {
      drawHeaderRow: () => false,
          startY: 60,
          margin: {horizontal: 60},
          styles: {
            columnWidth: 'wrap',
            fontSize: 10},
          columnStyles: {
            //text: {columnWidth: '300'},
            values: {columnWidth: 195},
            details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'normal'}
          }

      });

      var item3 = {
         "Flowering Begin Female" : arrayIn["flowering_start_female"],
         "Flowering Begin Male" : arrayIn["flowering_start_male"],
         "Flowering End Female" : arrayIn["flowering_end_female"],
         "Flowering End Male" : arrayIn["flowering_end_male"],
         "Trimming Female" : arrayIn["trimming_female"],
         "Trimming Male" : arrayIn["trimming_male"],
         "Bee in field" : arrayIn["bee_in_field"],
         "Estimated yield Potencial %": arrayIn["estimated_yield_potential"]
       };
       var rows3 = Object.keys(item3).map((key) => {
         return { 'details': key, 'values': item3[key] };
       });

      doc.autoTable(cols, rows3, {
       drawHeaderRow: () => false,
           startY: 60,
           margin: {horizontal: 410},
           styles: {columnWidth: 'wrap',
             fontSize: 10},
           columnStyles: {
             //text: {columnWidth: 'auto'},
             values: {columnWidth: 150},
             details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'normal'}
           }

       });

      doc.autoTable(crop_cols, crop_row, {
        drawHeaderRow: () => true,
            startY: 105,
            headerStyles: {fillColor: [41, 128, 185]},
            margin: {horizontal: 185},
            styles: {columnWidth: 48,
              fontSize: 8},
            columnStyles: {
              //text: {columnWidth: 'auto'},
              values: {columnWidth: 150},
              details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'normal'}
            }

        });



      //**************************//
      //**** BEGIN: Imagenes *****//
      //**************************//

      //**** Primera Imagen  *****//
      var width = 350;
      var height = 180;
      var img = new Image();
      try{
        await this.loadImage(arrayIn["images"][0]["path"],img);
        // console.log(img.width,img.height);
        if (height*img.width/img.height>width) {
          doc.addImage(img, 'JPEG', 40, 280 + (height - (width*img.height/img.width))/2, width, width*img.height/img.width);
        } else {
          doc.addImage(img, 'JPEG', 40 + (width - (height*img.width/img.height))/2, 280, height*img.width/img.height, height);
        }
      }
      catch(e){
        try{
          await this.loadImage('assets/noimage.jpg',img);
          // console.log(img.width,img.height);
          if (height*img.width/img.height>width) {
            doc.addImage(img, 'JPEG', 40, 280 + (height - (width*img.height/img.width))/2, width, width*img.height/img.width);
          } else {
            doc.addImage(img, 'JPEG', 40 + (width - (height*img.width/img.height))/2, 280, height*img.width/img.height, height);
          }
        }
        catch(e2){
          /*Aquí caerá si no puede cargar tampoco noimage.jpg. No se muestra ninguna imagen*/
          // console.log("nada que hacer");
        }
      }
      //**** Segunda Imagen *****//
      var width2 = 350;
      var height2 = 180;
      var img2 = new Image();
      try{
        await this.loadImage(arrayIn["images"][1]["path"],img2);
        // console.log(img2.width,img2.height);
        //doc.addImage(img2, 'JPEG', 450, 380, width2, width2*img2.height/img2.width);
        if (height2*img2.width/img2.height>width2) {
          doc.addImage(img2, 'JPEG', 400, 280 + (height - (width2*img2.height/img.width))/2, width2, width2*img2.height/img2.width);
        } else {
          doc.addImage(img2, 'JPEG', 400 + (width - (height2*img2.width/img2.height))/2, 280, height2*img2.width/img2.height, height2);
        }
      }

      catch(e){
        try{
          await this.loadImage('assets/noimage.jpg',img2);
          // console.log(img2.width,img2.height);
          if (height2*img2.width/img2.height>width2) {
            doc.addImage(img2, 'JPEG', 400, 280 + (height - (width2*img2.height/img.width))/2, width2, width2*img2.height/img2.width);
          } else {
            doc.addImage(img2, 'JPEG', 400 + (width - (height2*img2.width/img2.height))/2, 280, height2*img2.width/img2.height, height2);
          }
        }
        catch(e2){
          /*Aquí caerá si no puede cargar tampoco noimage.jpg. No se muestra ninguna imagen*/
          // console.log("nada que hacer 2");
        }
      }

      //**************************//
      //***** END: Imagenes ******//
      //**************************//


      //**************************//
      //**** BEGIN: Resumen *****//
      //**************************//


      var statuses_cols = [{
          title: "Estado General",
          dataKey: "estado_general"
        },
        {
          title: "Estado de Crecimiento",
          dataKey: "estado_crecimiento"
        },
        {
          title: "Estado de Malezas",
          dataKey: "estado_malezas"
        },
        {
          title: "Estado Fitosanitario",
          dataKey: "estado_fitosantiario"
        },
        {
          title: "Humedad del Suelo",
          dataKey: "humedad_suelo"
        }
      ]

      var statuses_obj = [{
        estado_general: {
          "code": arrayIn["estado_general"],
          "color": stat2col(arrayIn["estado_general"])
        },
        estado_crecimiento: {
          "code": arrayIn["estado_crecimiento"],
          "color": stat2col(arrayIn["estado_crecimiento"])
        },
        estado_malezas: {
          "code": arrayIn["estado_malezas"],
          "color": stat2col_maleza(arrayIn["estado_malezas"])
        },
        estado_fitosantiario: {
          "code": arrayIn["estado_fitosantiario"],
          "color": stat2col(arrayIn["estado_fitosantiario"])
        },
        humedad_suelo: {
          "code": arrayIn["humedad_suelo"],
          "color": stat2col(arrayIn["humedad_suelo"])
        }
      }];
/*
      doc.autoTable(crop_cols, crop_row, {
        drawHeaderRow: () => true,
            startY: 145,
            headerStyles: {fillColor: [41, 128, 185]},
            margin: {horizontal: 185},
            styles: {columnWidth: 48,
              fontSize: 8},
            columnStyles: {
              //text: {columnWidth: 'auto'},
              values: {columnWidth: 150},
              details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'normal'}
            }

        }); */

      doc.setFontSize(20);
      doc.myText("Resumen",{align: "center"},0,490);
      doc.setFontSize(10);
      doc.autoTable(statuses_cols, statuses_obj, {
        startY: 500,
        headerStyles: {
          fillColor: [41, 128, 185],
          halign:'center'
        },
        createdCell: function(cell, data) {
          let rgb = cell.raw.color
          if (rgb) {
            cell.styles.fillColor = rgb;
            if ((rgb[0]==255&&rgb[1]==255&&rgb[2]==255)||(rgb[0]==255&&rgb[1]==193&&rgb[2]==7)) {
              cell.styles.textColor = [0,0,0];
            } else {
              cell.styles.textColor = [255,255,255];
            }
            cell.styles.halign = 'center';
            cell.text = cell.raw.code
          }
        }
      });

      //**************************//
      //***** END: Resumen ******//
      //**************************//


      for (var key in arrayIn){
        if (arrayIn.hasOwnProperty(key)) {
          // console.log("Valores: ",key,":",arrayIn[key]);
        }
      }
      doc.setFontSize(10);
      doc.setFontType("normal");
      doc.myText('Página ' + (i+1),{align: "center"},0,580);

      if (i!=(array.length-1)){
        doc.addPage();
      }


    }

    // Comentado temporalmente para revisar log
    doc.save('imprimeJson.pdf');


  }


  loadImage(url,img) {
    return new Promise((resolve, reject) => {
      //const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', reject); // don't forget this one
      img.src = url;
    });
  }


  downloadPDFHTML(){


  //variedadr html = "<html><head><meta charset='utf8'><title>SuitArt Business Card</title><style>#bg {            position: fixed;            z-index: -1;            top: 0;            left: 0;            width: 100%;                opacity: 0.5;                filter: alpha(opacity=50); /* For IE8 and earlier */            }            #bgicon {              position: fixed;              z-index: -1;              top: -0;              left: 0;              width: 10%;              }            .page {          text-align: center;          top: 320px;          padding-top: 100px;        }        td{            padding-top: 5px;            padding-left: 5px;            font-size: 10px;            font-family: Arial;        }        .imgClass{          width: 90%;        }        body{          font-size: 10px;          font-family: Arial;        }        </style>      </head>      <body >      <img id="bg" src="/home/ignacio/Escritorio/Proyectos Independientes/Curimapu/curimapu-api/resources/fondo.jpg" alt="Fondo" />      <img id="bgIcon" src="/home/ignacio/Escritorio/Proyectos Independientes/Curimapu/curimapu-api/resources/icon.jpg" alt="Fondo" />        <div class="page">        <h1>INFORME VISITA CULTIVO</h1>        <table border="1px solid" width="100%">        <tbody>        <tr>        <td width="50%">        <p><strong>Fecha:</strong> ${fec}</p>        <p>&nbsp;</p>        <p><strong>Agricultor:</strong>${contrato.id_agricultor.razon_social ? fnFormatoTexto(contrato.id_agricultor.razon_social) : '' } </p>        <p><strong>Telefono:</strong> ${contrato.id_agricultor.telefono[0] ? contrato.id_agricultor.telefono[0] : '' }</p>        <p><strong>E-Mail:&nbsp; </strong>${contrato.id_agricultor.email ? contrato.id_agricultor.email : '' }</p>        <p><strong>Especie:</strong> ${contrato.id_especie.nombre ? fnFormatoTexto(contrato.id_especie.nombre) : '' }</p>        </td>        <td width="50%">        <p><strong>Superficie:</strong> ${contrato.superficie ? fnFormatoTexto(contrato.superficie) : ''}</p>        <p><strong>Variedad:&nbsp; </strong>${variedad ? fnFormatoTexto(variedad) : '' }</p>        <p><strong>Potrero:</strong>${contrato.id_ficha.potrero ? fnFormatoTexto(contrato.id_ficha.potrero) : ''}</p>        </td>        </tr>        </tbody>        </table>        <p>&nbsp;</p>        <table border="1px" width="100%">        <tbody>        <tr>        <td width="50%">        <p><strong>Estado Fenol&oacute;gico:</strong>${visita.estado_fenologico}</p>        <p><strong>Estado malezas:</strong>${visita.estado_maleza}</p>        <p><strong>Cosecha: </strong>${visita.cosecha}</p>        </td>        <td width="50%">        <p><strong>Humedad:</strong> ${visita.humedad_suelo}</p>        <p><strong>Estado de crecimiento:</strong>${visita.estado_crecimiento}</p>            <p><strong>Estado fitosanitario:</strong> ${visita.estado_fitosantiario}</p>        <p><strong>Estado general del cultivo:</strong> ${visita.estado_general}</p>        </td>        </tr>        </tbody>        </table>        </div>        <br />        <h3>OBSERVACIONES GENERALES:</h3>       <p>        ${fnFormatoTexto(visita.observacion)}       </p>       <h3>RECOMENDACIONES:</h3>       <p>        ${fnFormatoTexto(visita.recomendaciones)}       </p>       ${img}      </body>    </html>";
    var html = '<table><tr><td rowspan="2"> columna de 2 </td><td colspan="2"> fila de 2 </td></tr><tr><td> celda sola 1 </td><td> celda sola 2 </td></tr></table>';
    let doc = new jsPDF();
    doc.fromHTML(html, 10, 10, {'width': 180});
    doc.save('FichaPreContratoHTML.pdf');
  }

  downloadPDF(){

    let doc = new jsPDF();
    doc.setFontSize(18);
    //doc.text(7, 15, "Ficha Pre-Contrato");
    doc.autoTableSetDefaults({
        headerStyles: {fillColor: [155, 89, 182]}, // Purple
        startY: 25,
        margin: {top: 45},
        addPageContent: function(data) {
            doc.setFontSize(20);
            doc.text("Prueba", 17, 20);
        }
    });
    doc.setFontSize(12);


    var cols = [{
      title: "Details",
      dataKey: 'details'
    }, {
      title: "Values",
      dataKey: 'values'
     }];


    var  item = {
      "Fieldman" :  "Artiko",
      "Especie" : "Maravilla"
    };
    let rows1 = Object.keys(item).map((key) => {
      return { 'details': key, 'values': item[key] };
    });

    var optionsContainer = {
      horizontal: {
        startY: 30,
        styles: {
          fontSize: 7
        },
        margin: {horizontal: 17},
        drawHeaderRow: () => false,
        columnStyles: {
          text: {columnlumnWidth: 'auto'},
            details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold'}
        }
      }
    };
    doc.autoTable(cols, rows1, optionsContainer['horizontal']);

    top = doc.autoTable.previous.finalY;

    doc.text(17, top + 15, "Detalles del agricultor");

    var top = doc.autoTable.previous.finalY;
    var item2 = {
      "Razón Social" : "razon social",
      "Dirección" : "direccion",
      "Región" : "region",
      "Representante Legal" : "representante_legal",
      "Email" : "email"
    };
    var rows2 = Object.keys(item2).map((key) => {
      return { 'details': key, 'values': item2[key] };
    });


   doc.autoTable(cols, rows2, {
    drawHeaderRow: () => false,
        startY: top + 19,
        margin: {horizontal: 17},
        styles: {
          columnWidth: 'wrap',
          fontSize: 7},
        columnStyles: {
          text: {columnlumnWidth: 'auto'},
          details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold'}
        }

    });

   var item3 = {
      "Rut" : "rut",
      "Comuna" : "comuna",
      "Telefono" : "telefono",
      "Rut Representante Legal" : "rut representante_legal",
      "Giro" : "Agrícola"
    };
    var rows3 = Object.keys(item3).map((key) => {
      return { 'details': key, 'values': item3[key] };
    });

   doc.autoTable(cols, rows3, {
    drawHeaderRow: () => false,
        startY: top + 19,
        margin: {horizontal: 110},
        styles: {columnWidth: 'wrap',
          fontSize: 7},
        columnStyles: {
          text: {columnlumnWidth: 'auto'},
          details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold'}
        }

    });

    top = doc.autoTable.previous.finalY;

    doc.text(17, top + 15, "Datos del Predio");

    top = doc.autoTable.previous.finalY;

    var item4 = {
      "Nombre del Predio" : "Nombre Predio",
      "Comuna" : "comuna"
    };
    var rows4 = Object.keys(item4).map((key) => {
      return { 'details': key, 'values': item4[key] };
    });

    doc.autoTable(cols, rows4, {
    drawHeaderRow: () => false,
        startY: top + 19,
        margin: {horizontal: 17},
        styles: {columnWidth: 'wrap',
          fontSize: 7},
        columnStyles: {
          text: {columnlumnWidth: 'auto'},
          details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold'}
        }

    });

    var item5 = {
      "Región" : "region",
      "Localidad" : "Localidad"
    };
    var rows5 = Object.keys(item5).map((key) => {
      return { 'details': key, 'values': item5[key] };
    });

    doc.autoTable(cols, rows5, {
    drawHeaderRow: () => false,
        startY: top + 19,
        margin: {horizontal: 110},
        styles: {columnWidth: 'wrap',
          fontSize: 7},
        columnStyles: {
          text: {columnlumnWidth: 'auto'},
          details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold'}
        }

    });

    top = doc.autoTable.previous.finalY;

    doc.text(17, top + 15, "Datos del Potrero");

    top = doc.autoTable.previous.finalY;

    var titles = [
        {title: "Nombre\nPotrero", dataKey: "potrero"},
        {title: "HAS", dataKey: "has"},
        {title: "Cultivo\nAnterior 1", dataKey: "ultimos_cultivos1"},
        {title: "Cultivo\nAnterior 2", dataKey: "ultimos_cultivos2"},
        {title: "Cultivo\nAnterior 3", dataKey: "ultimos_cultivos3"},
        {title: "Cultivo\nAnterior 4", dataKey: "ultimos_cultivos4"}
    ];

    var values = [{
         potrero: "potrero",
         has: "has",
         ultimos_cultivos1: "ultimos cultivos 1",
         ultimos_cultivos2: "ultimos cultivos 2",
         ultimos_cultivos3: "ultimos cultivos 3",
         ultimos_cultivos4: "ultimos cultivos 4"
    }];

    doc.autoTable(titles, values, {
        startY: top + 19,
        headerStyles: {fillColor: [41, 128, 185]},
        margin: {horizontal: 17},
        styles: {columnWidth: 'auto',
          fontSize: 7},
        columnStyles: {
          text: {columnWidth: 'auto'}
        }
    });

    top = doc.autoTable.previous.finalY;

    var titles1 = [
        {title: "Riego", dataKey: "tipo_riego"},
        {title: "Suelo", dataKey: "tipo_suelo"},
        {title: "Coordenadas", dataKey: "norting"},
        {title: "Coordenadas", dataKey: "easting"},
    ];

    var values1 = [{
         tipo_riego: "tipo_riego",
         tipo_suelo: "tipo_suelo",
         norting: "norting",
         easting: "easting",
    }];

    doc.autoTable(titles1, values1, {
        startY: top + 3,
        headerStyles: {fillColor: [41, 128, 185]},
        margin: {horizontal: 17},
        styles: {columnWidth: 'auto',
          fontSize: 7},
        columnStyles: {
          text: {columnWidth: 'auto'}
        }
    });

    top = doc.autoTable.previous.finalY;

    doc.text(17, top + 15, "Observaciones");

    top = doc.autoTable.previous.finalY;

    var titles2 = [
        {title: "Observaciones", dataKey: "observaciones"}
    ];

    var values2 = [{
         observaciones: "observaciones"
    }];

    doc.autoTable(titles2, values2, {
        startY: top + 19  ,
        headerStyles: {fillColor: [41, 128, 185]},
        margin: {horizontal: 17},
        styles: {columnWidth: 'auto',
          fontSize: 7},
        columnStyles: {
          text: {columnWidth: 'auto'}
        }
    });



    doc.save('FichaPreContrato.pdf');



  }
}
