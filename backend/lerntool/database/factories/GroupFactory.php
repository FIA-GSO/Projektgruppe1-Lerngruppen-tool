<?php

namespace Database\Factories;

use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends Factory<Group>
 */
class GroupFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'groupdatestart' => fake()->date(),
            'groupdateend' => fake()->date(),
            'maxmembers' => fake()->numberBetween(1, 25),
            'description' => fake()->text(),
            'topic' => fake()->text(),
            'thisyearonly' => fake()->boolean(),
        ];
    }
}
