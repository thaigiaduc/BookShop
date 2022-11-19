<?php 

namespace App\Http\Controllers;
use App\Repositories\UserRepository as userRepo;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userRepo;

    public function __construct(userRepo $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    function editUserProfile(Request $request){
        try {
            $res = $this->userRepo->editUserProfile($request);
            return response()->json('success',200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),422);
        }
    }
    function editPassword(Request $request){
        try {
            $res = $this->userRepo->editPassword($request);
            return response()->json('success',200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),422);
        }
    }

    
}