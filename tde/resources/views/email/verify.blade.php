<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>

<div>
    Hola ,
    <br>
    Gracias por crear una cuenta con nosotros. ¡ No olvide completar su registro!
    <br>
    Por favor, haga clic en el siguiente enlace o cópielo en la barra de direcciones de su navegador para confirmar su dirección de correo electrónico:
    <br>

    <a href="{{ url('user/verify', $verification_code)}}">Confirmar mi dirección de correo electrónico </a>

    <br/>
</div>

</body>
</html>
