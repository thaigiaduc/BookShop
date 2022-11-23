<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Order extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'order';
    protected $fillable = [
        'user_id',
        'order_date',
        'order_amount',
        'order_status',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class,'order_id','id');
    }
    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function orderStatus()
    {
        return $this->belongsTo(OrderStatus::class,'order_status','id');
    }
}
