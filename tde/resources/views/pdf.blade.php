<!DOCTYPE html>


<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">



  <title>TDE</title>

  <center>
  <br/>
  <br/>
    <img style="width:200px" src="{{public_path('images/TDE.png')}}" />


  </center>


  <style>
    body {
      background-color: #ecf0f1;
      font-family: arial;
    }

    #main-container {
      margin: 150px auto;
      width: 600px;
    }

    table {
      background-color: #DCDCDC;
      text-align: left;
      border-collapse: collapse;
      width: 100%;
    }

    td,
    th {

      padding: 10px;
    }

    thead {
      background-color: #D3D3D3;
      color: black;
      border-bottom: solid 5px #bdc3c7;
    }

    tr:nth-child(even) {
      background-color: #ecf0f1;
    }
  </style>

</head>

<body><hr/>


  <hr width="100%" noshade="noshade" style="font-size:15px" />



  <div class="container-fluid">
    <div class="row">
      <table>
        <thead>

        </thead>
        <tbody>
          <tr>


          </tr>
        </tbody>
      </table>
      <label for=""></label>
      <label for=""></label>
      <label for=""></label>
      <label for=""></label>

    </div> <br>

    <div>
      <table>
        <thead>
          <tr>
            <th>ID Recarga</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Cod Tarjeta</th>
          </tr>
        </thead>
        <tbody>
          @foreach($recar as $deta)
          <tr>
            <td>{{$deta->id_recarga}}</td>
            <td>{{$deta->fecha}}</td>
            <td>{{$deta->monto}} </td>
            <td>{{$deta->cod_tarjeta}}</td>
          </tr>
          @endforeach
        </tbody>
      </table>
    </div>

    <div class="row">
      <hr width="100%" noshade="noshade" style="font-size:15px" />
      <div class="col-6">
       </div>
      <div class="col-6 float-right">

      </div>
      <hr width="100%" noshade="noshade" style="font-size:15px" />
    </div>
  </div>

</body>

</html>
