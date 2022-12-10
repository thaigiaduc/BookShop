<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Repositories\importRepository;
use App\Http\Requests\StoreImportRequest;

class ImportController extends Controller
{
    protected $importRepo;

    public function __construct(importRepository $importRepo)
    {
        $this->importRepo = $importRepo;
    }

    public function store(StoreImportRequest $request){
        return response()->json($this->importRepo->store($request),200);
    }

}
