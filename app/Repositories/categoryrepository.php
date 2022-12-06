<?php

namespace App\Repositories;

use App\models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\StoreCategoryRequest;

class CategoryRepository
{
    public function index()
    {
        return Category::orderby('category_name','asc')->get();
    }

    public function getCategoryByBook($id)
    {
        return Category::find($id);
    }

    // admin ----------------------------------------------------------
    public function showCategory()
    {
        $category = Category::orderBy('id','asc')->get();
        return $category;
    }
    // thêm danh mục sản phẩm
    public function insertCategory(StoreCategoryRequest $request)
    {
        $category = Category::create([
            'category_name' => $request->category_name,
            'category_desc' => $request->category_desc
        ]);

        return $category;
    }

    // sửa danh mục sản phẩm
    public function updateCategory($request, $id)
    {
        $category = Category::where('id',$id)->update([
            'category_name' => $request->category_name,
            'category_desc' => $request->category_desc
        ]);

        return $category;
    }

    // show chi tiết danh mục sản phẩm
    public function showDetailCategory($id) 
    {
        $category = Category::where('id',$id)->get();
        return $category;
    }

    // xóa danh mục sản phẩm
    public function deleteCategory($id)
    {
        $category = Category::where('id',$id)->delete();
        return $category;
    }
}
