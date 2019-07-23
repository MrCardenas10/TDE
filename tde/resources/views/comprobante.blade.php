<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">



  <title>TDE</title>

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

<body>
<center>
  <br/>
  <br/>
    <img style="width:200px" src="{{public_path('images/TDE.png')}}" />


  </center>


  <hr width="100%" noshade="noshade" style="font-size:15px" />


<div class="row">
<div class="col-6 ">
    <span>Fecha:  {{$venta[0]->fecha}}</span>

</div>
</div>
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

    </div> <br>
    <!-- tabla detalle -->
    <div>
      <table>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Producto</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          @foreach($detalle as $deta)
          <tr>
            <td>{{$deta->cantidad}}</td>
            <td>{{$deta->total}}</td>
            <td>{{$deta->id_producto}} </td>
            <td>{{$deta->producto}}</td>
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
