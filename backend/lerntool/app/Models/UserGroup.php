<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Notifications\Notifiable;

class UserGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin',
        'user_id',
        'group_id'
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'id');
    }
}
