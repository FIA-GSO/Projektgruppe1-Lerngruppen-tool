<?php

namespace Database\Factories;

use App\Models\Group;
use App\Models\Termin;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends Factory<Termin>
 */
class TerminFactory extends Factory
{
    public function definition(): array
    {
        return [

            'strasse' => fake()->streetAddress(),
            'plz' => fake()->postcode(),
            'ort' => fake()->city(),
            'termin' => fake()->dateTime(),
            'thema' => fake()->text(),
            'duration' => fake()->numberBetween(1, 12),
            'street' => fake()->streetAddress(),
            'postcode' => fake()->postcode(),
            'location' => fake()->city(),
        ];
    }
}
