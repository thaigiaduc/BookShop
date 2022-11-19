<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'author';
    protected $fillable = [
        'author_name',
        'author_bio',
    ];

    public function book()
    {
        return $this->hasMany(Book::class);
    }
}
