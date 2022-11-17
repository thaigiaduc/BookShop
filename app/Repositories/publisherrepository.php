<?php

namespace App\Repositories;

use App\models\Publisher;
use App\Http\Requests\PublisherRequest;

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
    // thêm nhà cung cấp
    public function insertPublisher(PublisherRequest $request)
    {
        $publisher = Publisher::create([
            'publisher_name' => $request->publisher_name,
            'publisher_desc' => $request->publisher_desc
        ]);

        return $publisher;
    }

    // sửa thông tin nhà cung cấp
    public function updatePublisher(PublisherRequest $request, $id)
    {
        $publisher = Publisher::where('id',$id)->update([
            'publisher_name' => $request->publisher_name,
            'publisher_bio' => $request->publisher_bio
        ]);

        return $publisher;
    }

    // xóa nhà cung cấp
    public function deletePublisher($id)
    {
        $publisher = Publisher::where('id',$id)->delete();
        return $publisher;
    }
}
