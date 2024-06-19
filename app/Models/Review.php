<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $table = 'reviews';

    protected $fillable = [
        'name',
        'email',
        'review',
        'rating',
        'product_id'
    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
