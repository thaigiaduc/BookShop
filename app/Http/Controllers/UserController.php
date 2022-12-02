<?php 

namespace App\Http\Controllers;
use App\Repositories\UserRepository as userRepo;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;

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
    function updateStatus(Request $request){
       try {
        $res = $this->userRepo->updateStatus($request);
        return response()->json($res,200);
       } catch (\Exception $e) {
            return response()->json($e->getMessage(),422);
       }
    }
    function index(Request $request){
        $res = $this->userRepo->index($request);
        return $res;
    }
    function getUserDetail(Request $request){
        return response()->json($request->user(),200);
    }

    function store(StoreUserRequest $request){
        try {
            
            $userResult = $this->userRepo->store($request);
            return response()->json($request->address,200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }
    
}