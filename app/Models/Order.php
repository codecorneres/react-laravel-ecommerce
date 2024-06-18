<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'products',
        'status',
        'payment_method'
    ];
    protected $casts = [
        'products' => 'array', // Cast the 'products' attribute to array
    ];
    public function productdetail()
    {
        return $this->belongsTo(Product::class);
    }
}
