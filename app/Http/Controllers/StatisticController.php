<?php 

namespace App\Http\Controllers;

use App\Http\Resources\BookStatisticCollection;
use App\Http\Resources\UserStatisticCollection;
use App\Repositories\statisticRepository;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    protected $userRepo;

    public function __construct(statisticRepository $statisticRepository)
    {
        $this->statisticRepository = $statisticRepository;
    }

    function index(Request $request){
        if($request->statistic=='user'){
        $res = $this->statisticRepository->index($request);
        return response()->json(new UserStatisticCollection($res),200);
        }
        else if($request->statistic=='book'){
            $res = $this->statisticRepository->index($request);
            return response()->json(new BookStatisticCollection($res),200);
        }
    }
    
}