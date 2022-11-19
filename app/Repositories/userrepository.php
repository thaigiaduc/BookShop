<?php

namespace App\Repositories;

use App\models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use function PHPUnit\Framework\throwException;
use Illuminate\Support\Facades\Hash;
class UserRepository
{
    public function editUserProfile(Request $request){
        DB::beginTransaction();
        try {
            $user = User::where('id',$request->user()->id)->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'address' => $request->address
            ]);          
            DB::commit();
            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            return throw new \Exception($e);
        }
    }
    public function editPassword(Request $request){
        DB::beginTransaction();
        try {
            if($request->user()->password!=Hash::make($request->newPassword))
                throw new \Exception("wrong password");
            $user = User::where('id',$request->user()->id)->update([
                'password' => Hash::make($request->newPassword),
            ]);          
            DB::commit();
            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            return throw new \Exception($e);
        }
    }
}