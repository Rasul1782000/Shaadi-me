<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Carbon;

class LeadStatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalLeads = Lead::count();
        $newThisWeek = Lead::where('created_at', '>=', Carbon::now()->startOfWeek())->count();
        $converted = Lead::where('status', 'converted')->count();
        $conversionRate = $totalLeads > 0 ? round(($converted / $totalLeads) * 100, 1) : 0;
        $pipeline = Lead::whereIn('status', ['new', 'contacted', 'qualified'])
            ->whereNotNull('budget')
            ->sum('budget');

        return [
            Stat::make('Total Leads', $totalLeads)
                ->description('All time')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('primary'),

            Stat::make('New This Week', $newThisWeek)
                ->description('Since ' . Carbon::now()->startOfWeek()->format('M j'))
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('info'),

            Stat::make('Conversion Rate', $conversionRate . '%')
                ->description($converted . ' converted')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Revenue Pipeline', '₹' . number_format($pipeline))
                ->description('Active leads')
                ->descriptionIcon('heroicon-m-currency-rupee')
                ->color('warning'),
        ];
    }
}
