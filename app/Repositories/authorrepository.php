<?php

namespace App\Repositories;

use App\models\Author;
use Illuminate\Http\Request;
use App\Http\Requests\AuthorRequest;

class AuthorRepository
{
    public function index()
    {
        return Author::orderby('author_name','asc')->get();
    }

    public function getAuthorByBook($id)
    {
        return Author::find($id);
    }

    // admin ---------------------------------------------------------
    // thêm tác giả
    public function showAuthor()
    {
        $author = Author::orderBy('id','asc')->get();
        return $author;
    }

    public function insertAuthor(Request $request)
    {
        $author = Author::create([
            'author_name' => $request->author_name,
            'author_bio' => $request->author_bio
        ]);

        return $author;
    }

    // sửa thông tin tác giả
    public function updateAuthor($request, $id)
    {
        $author = Author::where('id',$id)->update([
            'author_name' => $request->author_name,
            'author_bio' => $request->author_bio
        ]);
        return $author;
    }

    // chi tiết tác giả
    public function showDetailAuthor($id) 
    {
        $author = Author::where('id',$id)->get();
        return $author;
    }
    // xóa tác giả
    public function deleteAuthor($id)
    {
        $author = Author::where('id',$id)->delete();
        return $author;
    }
}
