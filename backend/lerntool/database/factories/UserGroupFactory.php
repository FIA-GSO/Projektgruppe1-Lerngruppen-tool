<?php

namespace Database\Factories;

use App\Models\UserGroup;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends Factory<UserGroup>
 */
class UserGroupFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1, 100000),
            'group_id' => fake()->numberBetween(1, 100000),
            'admin' =>fake()->boolean(),
        ];
    }
}

