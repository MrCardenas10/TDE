<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Persona;
use App\Model\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator, DB, Hash, Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $input = $request->only('id_persona','nombres','apellidos','email','password','telefono','genero','id_tipo_documento','rol');
        $id_persona = $request->id_persona;
        $nombres = $request->nombres;
        $apellidos = $request->apellidos;
        $email = $request->email;
        $password = $request->password;
        $telefono = $request->telefono;
        $genero = $request->genero;
        $id_tipo_documento = $request->id_tipo_documento;
        $rol= $request->rol;
        // $id_acudiente= $request->id_acudiente;

     
        $user = Persona::create([
            'id_persona' => $id_persona,
            'nombres'=>$nombres,
            'apellidos'=>$apellidos,
            'email'=>$email,
            'password' => Hash::make($password),
            'telefono' => $telefono,
            'genero' => $genero,
            'id_tipo_documento'=> $id_tipo_documento,
            'rol'=>$rol,
            // 'id_acudiente'=>$id_acudiente,
            ]);
           

        $verification_code = str_random(30); //Generate verification code

        DB::table('user_verifications')->insert(['id_persona'=>$user->id_persona,'token'=>$verification_code]);

        $subject = "Verificar el registro";

        Mail::send('email.verify', compact('nombres', 'verification_code'),
            function($mail) use ($email, $nombres, $subject){
                $mail->from(getenv('FROM_EMAIL_ADDRESS'), "TDE");
                $mail->to($email, $nombres);
                $mail->subject($subject);
            });

        return response()->json(['ok'=> true, 'message'=> 'Thanks for signing up! Please check your email to complete your registration.']);
    }

    
    public function verifyUser($verification_code)
    {
        $check = DB::table('user_verifications')->where('token',$verification_code)->first();

        if(!is_null($check)){
            $user = User::find($check->id_persona);
            if($user->is_verified == 1){
                return response()->json([
                    'ok'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }
            $user->update(['is_verified' => 1]);
            DB::table('user_verifications')->where('token',$verification_code)->delete();

            return view("verificar", [
                'ok'=> true,
                'message'=> 'You have okfully verified your email address.'
            ]);
        }
        return view("verificar", ['ok'=> false, 'message'=> "Verification code is invalid."]);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['ok'=> false, 'error'=> $validator->messages()], 401);
        }

        // $credentials['is_verified'] = 1;

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['ok' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 404);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['ok' => false, 'error' => 'Failed to login, please try again.'], 500);
        }

        // $rol = Persona::select("tbl_persona.rol")
        // ->join("tbl_rol","tbl_persona.rol","tbl_rol.id_rol")
        // ->where("tbl_persona.email",$request->email)
        // ->first();
        $nombres = User::select("tbl_persona.nombres")
        ->where("tbl_persona.email",$request->email)
        ->first();
        $rol = User::select("tbl_persona.rol")
        ->where("tbl_persona.email",$request->email)
        ->first();
        $genero = User::select("tbl_persona.genero")
        ->where("tbl_persona.email",$request->email)
        ->first();
        $apellidos = User::select("tbl_persona.apellidos")
        ->where("tbl_persona.email",$request->email)
        ->first();
        $id_persona = User::select("tbl_persona.id_persona")
        ->where("tbl_persona.email",$request->email)
        ->first();


        //$token = auth()->setTTL(7200)->attempt($credentials);
        // all good so return the token
        return response()->json(['ok' => true,
         'token' => $token,
         'rol' => $rol, 
         'genero' => $genero, 
         'id_persona' => $id_persona,
         'nombres' => $nombres,
         'apellidos' => $apellidos,
         'password' => $request->password,
         'email' => $request->email],200);
    }
    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request) {
        $token = $request->header('Authorization');

        try {
            JWTAuth::invalidate($token);
            return response()->json(['ok' => true, 'message'=> "Has cerrado sesion exitosamente."]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['ok' => false, 'error' => 'Fallo al cerrar la sesion.', 500]);
        }
    }

    public function recover(Request $request)
    {
        $user = Persona::where('email', $request->email)->first();

        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json(['ok' => false, 'error' => ['email'=> $error_message]], 401);
        }
        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['ok' => false, 'error' => $error_message], 401);
        }
        
        return response()->json([
            'ok' => true, 
            'message'=> 'A reset email has been sent! Please check your email.',
            'user' => $user
        ]);
    }

    public function getUserByEmail(Request $request){
        $user = Persona::where('email', $request->email)->first();
        return response()->json([
            'ok'=>true,
            "user"=>$user
        ]);
    }

    public function reset (Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'newpassword' => 'required|max:45',
            'confirmPassword' => 'required|same:newpassword',
            ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->messages(),
            ]);
        }
        $User = $request->User;
        $newpassword = $request->newpassword;
        $usuario = Persona::select("tbl_persona.id_persona")
        ->where("tbl_persona.email", $User)
        ->first();

        try {
            $userpwd = Persona::find($usuario->id_persona);

            if ($userpwd == false) {
                return response()->json([
                    'success'=> false,
                    'error'=> "Usuario no encontrado."
                ]);
            }

            $userpwd -> update(['password' => Hash::make($newpassword)]);
            return response()->json([
                'success'=> true,
                'mensaje'=> "Actualización de contraseña exitosa."
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                'success'=> false,
                'error'=> $ex->getMessage()
            ]);
        }
    }
}
