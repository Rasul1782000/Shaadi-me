<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Widgets\ChartWidget;

class LeadsByStatusChart extends ChartWidget
{
    protected ?string $heading = 'Leads by Status';

    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
        $counts = [];
        $colors = [
            '#3b82f6', // new - blue
            '#f59e0b', // contacted - amber
            '#8B0000', // qualified - primary red
            '#22c55e', // converted - green
            '#ef4444', // lost - red
        ];

        foreach ($statuses as $status) {
            $counts[] = Lead::where('status', $status)->count();
        }

        return [
            'datasets' => [
                [
                    'data' => $counts,
                    'backgroundColor' => $colors,
                ],
            ],
            'labels' => array_map('ucfirst', $statuses),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
