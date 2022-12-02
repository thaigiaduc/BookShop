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
    public function updateStatus(Request $request){
        $user = User::where('id',$request->id)->update([
            'status' => $request->status,
        ]);
        return $user;
    }
    public function index(Request $request){
        $user = User::where('id','!=',$request->user()->id)->orderby('id','asc')->get();
        return $user;
    }
    public function editPassword(Request $request){
        DB::beginTransaction();
        try {
            if(!Hash::check($request->oldPassword,$request->user()->password))
                throw new \Exception($request->oldPassword);
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
    public function store(Request $request){
        DB::beginTransaction();
        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'address' => $request->address,
                'phone' => $request->phone,
                'role' => $request->role ? $request->role : 1,
            ]);          
            DB::commit();
            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            return throw new \Exception($e);
        }
    }
}