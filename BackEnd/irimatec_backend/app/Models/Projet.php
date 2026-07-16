<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    // Spécifie le nom exact de la table
    protected $table = 'projet';

    protected $fillable = [
        'title',
        'description',
        'location',
        'status',
        'image'
    ];
}
