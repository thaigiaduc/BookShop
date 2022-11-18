<?php

namespace App\Repositories;

use App\models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;

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
    public function insertCategory(Request $request)
    {
        $category = Category::create([
            'category_name' => $request->category_name,
            'category_desc' => $request->category_desc
        ]);

        return $category;
    }

    // sửa danh mục sản phẩm
    public function updateCategory(CategoryRequest $request, $id)
    {
        $category = Category::where('id',$id)->update([
            'category_name' => $request->category_name,
            'category_desc' => $request->category_desc
        ]);

        return $category;
    }

    // xóa danh mục sản phẩm
    public function deleteCategory($id)
    {
        $category = Category::where('id',$id)->delete();
        return $category;
    }
}
