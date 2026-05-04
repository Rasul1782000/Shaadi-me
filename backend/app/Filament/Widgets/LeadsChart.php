<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class LeadsChart extends ChartWidget
{
    protected ?string $heading = 'Leads Over Time';

    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $weeks = collect();
        $labels = collect();

        for ($i = 11; $i >= 0; $i--) {
            $start = Carbon::now()->subWeeks($i)->startOfWeek();
            $end = Carbon::now()->subWeeks($i)->endOfWeek();

            $count = Lead::whereBetween('created_at', [$start, $end])->count();
            $weeks->push($count);
            $labels->push($start->format('M j'));
        }

        return [
            'datasets' => [
                [
                    'label' => 'Leads',
                    'data' => $weeks->toArray(),
                    'borderColor' => '#8B0000',
                    'backgroundColor' => 'rgba(139, 0, 0, 0.1)',
                    'fill' => true,
                    'tension' => 0.4,
                ],
            ],
            'labels' => $labels->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
