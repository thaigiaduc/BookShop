<?php

namespace App\Http\Controllers;
use App\Models\Author;
use Illuminate\Http\Request;
use App\http\Resources\AuthorResource;
use App\http\Resources\AuthorCollection;
use App\Repositories\authorRepository;
use App\Http\Requests\StoreAuthorRequest;

class AuthorController extends Controller
{
    protected $authorRepo;

    public function __construct(authorRepository $authorRepo)
    {
        $this->authorRepo = $authorRepo;
    }

    public function getAuthor(){
        try {
            $authorres = $this->authorRepo->index();
            return response()->json(new AuthorCollection($authorres),200);
        } catch (\Exception $e) {
            return response()->json(500);
        }
    }

    // admin ---------------------------------------------------------------------------------
    public function getAuthorAdmin()
    {
        try {
            $authors = $this->authorRepo->showAuthor();
            return response()->json($authors,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function insertAuthorAdmin(StoreAuthorRequest $request)
    {
        try {
            $authors = $this->authorRepo->insertAuthor($request);
            return response()->json($authors,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function showDetailAuthor($id)
    {
        try {
            $authors = $this->authorRepo->showDetailAuthor($id);
            return response()->json($authors,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function updateAuthor(StoreAuthorRequest $request, $id)
    {
        try {
            $authors = $this->authorRepo->updateAuthor($request,$id);
            return response()->json($authors,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }
}
