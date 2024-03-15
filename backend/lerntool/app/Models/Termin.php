<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Termin extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'termin',
        'group_id',
        'thema',
        'duration',
        'street',
        'postcode',
        'location',
    ];
    protected $table = 'termins';

    public function parent(): BelongsTo
    {
        return $this->belongsTo(UserGroup::class, 'id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'id');
    }

}
