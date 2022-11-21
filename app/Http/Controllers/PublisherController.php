<?php

namespace App\Http\Controllers;
use App\Models\Publisher;
use Illuminate\Http\Request;
use App\http\Resources\publisherResource;
use App\http\Resources\publisherCollection;
use App\Repositories\publisherRepository;
use App\Http\Requests\StorePublisherRequest;

class publisherController extends Controller
{
    protected $publisherRepo;

    public function __construct(PublisherRepository $publisherRepo)
    {
        $this->publisherRepo = $publisherRepo;
    }


    // public function getpublisherByBook($book_id){
    //     try {
    //         $publisherres = $this->publisherRepo->getpublisherByBook($book_id);
    //         return response()->json(new publisherResource($publisherres),200);
    //     } catch (\Exception $e) {
    //         return response()->json('Uncessfully',500);
    //     }
        
    // }


    public function getPublisher(){
        try {
            $publisherres = $this->publisherRepo->index();
            return response()->json(new PublisherCollection($publisherres),200);
        } catch (\Exception $e) {
            return response()->json(500);
        }
    }

    // admin ---------------------------------------------------------------------------------------
    public function showPublisher()
    {
        try {
            $publisherres = $this->publisherRepo->showPublisherAdmin();
            return response()->json($publisherres,200);
        } catch(\Exception $e) {
            return response()->json(500);
        }
    }

    public function insertPubliserAdmin(StorePublisherRequest $request)
    {
        try {
            $publisherres = $this->publisherRepo->insertPublisher($request);
            return response()->json($publisherres,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),500);
        }
    }

    public function showDetailPublisher($id)
    {
        try {
            $cate = $this->publisherRepo->showDetailPublisher($id);
            return response()->json($cate,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function updatePublisher(StorePublisherRequest $request, $id)
    {
        try {
            $cate = $this->publisherRepo->updatePublisher($request,$id);
            return response()->json($cate,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }
}
