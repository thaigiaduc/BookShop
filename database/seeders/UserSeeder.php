<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\OrderStatus;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(10)->create();
        OrderStatus::create([
            'status_name'=> 'awaiting accept',
        ]);
        OrderStatus::create([
            'status_name'=> 'accepted',
        ]);
        OrderStatus::create([
            'status_name'=> 'shipped',
        ]);
        OrderStatus::create([
            'status_name'=> 'cancelled',
        ]);
    }
}
