<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';

    protected $fillable = [
        'name',
        'size',
        'price',
        'image',
        'category_id'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function cart()
    {
        return $this->belongsToMany(Cart::class);
    }
    public function order()
    {
        return $this->belongsToMany(Order::class);
    }
    public function review()
    {
        return $this->belongsToMany(Review::class);
    }
}
