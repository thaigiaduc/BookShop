<?php

namespace App\Repositories;

use App\models\Publisher;
use App\Http\Requests\PublisherRequest;
use App\Http\Requests\StorePublisherRequest;

class PublisherRepository
{
    public function index()
    {
        return Publisher::orderby('publisher_name','asc')->get();
    }

    public function getpublisherByBook($id)
    {
        return Publisher::find($id);
    }

    // admin ---------------------------------------------------------
    public function showPublisherAdmin()
    {
        $publisher = Publisher::orderBy('id','asc');
        return $publisher->get();
    }
    // thêm nhà cung cấp
    public function insertPublisher(StorePublisherRequest $request)
    {
        $publisher = Publisher::create([
            'publisher_name' => $request->publisher_name,
            'publisher_desc' => $request->publisher_desc
        ]);

        return $publisher;
    }

    // sửa thông tin nhà cung cấp
    public function updatePublisher($request, $id)
    {
        $publisher = Publisher::where('id',$id)->update([
            'publisher_name' => $request->publisher_name,
            'publisher_desc' => $request->publisher_desc
        ]);

        return $publisher;
    }

    // show chi tiết nhà cung cấp
    public function showDetailPublisher($id) 
    {
        $pb = Publisher::where('id',$id)->get();
        return $pb;
    }

    // xóa nhà cung cấp
    public function deletePublisher($id)
    {
        $publisher = Publisher::where('id',$id)->delete();
        return $publisher;
    }
}
