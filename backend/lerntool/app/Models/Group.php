<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Group extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'groupdatestart',
        'groupdateend',
        'maxmembers',
        'description',
        'topic',
        'thisyearonly',
    ];

    protected $table = 'groups';

    public function parent(): BelongsTo
    {
        return $this->belongsTo(UserGroup::class, 'id');
    }

    public function termin(): HasMany
    {
        return $this->hasMany(Termin::class);
    }

}
