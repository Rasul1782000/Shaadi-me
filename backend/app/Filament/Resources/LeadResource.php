<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeadResource\Pages;
use App\Models\Lead;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-user-group';

    protected static \UnitEnum|string|null $navigationGroup = 'CRM';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'bride_name';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                \Filament\Schemas\Components\Section::make('Couple Information')
                    ->icon('heroicon-o-heart')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('bride_name')
                            ->label('Bride\'s Name')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('groom_name')
                            ->label('Groom\'s Name')
                            ->maxLength(255),
                    ]),

                \Filament\Schemas\Components\Section::make('Contact Details')
                    ->icon('heroicon-o-phone')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->maxLength(50),
                        Forms\Components\TextInput::make('community')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('city')
                            ->maxLength(255),
                    ]),

                \Filament\Schemas\Components\Section::make('Event Details')
                    ->icon('heroicon-o-calendar-days')
                    ->columns(2)
                    ->schema([
                        Forms\Components\DatePicker::make('wedding_date')
                            ->label('Wedding Date'),
                        Forms\Components\TextInput::make('guests')
                            ->label('Expected Guests')
                            ->maxLength(255),
                        Forms\Components\Select::make('venue_type')
                            ->options([
                                'palace' => 'Palace & Heritage',
                                'hotel' => 'Five Star Hotel',
                                'resort' => 'Beach Resort',
                                'farmhouse' => 'Farmhouse',
                                'banquet' => 'Banquet Hall',
                                'destination' => 'Destination Wedding',
                            ]),
                        Forms\Components\TextInput::make('budget')
                            ->numeric()
                            ->prefix('₹'),
                    ]),

                \Filament\Schemas\Components\Section::make('Preferences')
                    ->icon('heroicon-o-sparkles')
                    ->columns(3)
                    ->schema([
                        Forms\Components\TagsInput::make('styles')
                            ->label('Wedding Styles')
                            ->placeholder('Add a style'),
                        Forms\Components\TagsInput::make('services')
                            ->label('Services Needed')
                            ->placeholder('Add a service'),
                        Forms\Components\TagsInput::make('events')
                            ->label('Events Planned')
                            ->placeholder('Add an event'),
                    ]),

                \Filament\Schemas\Components\Section::make('Status & Notes')
                    ->icon('heroicon-o-clipboard-document-list')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options([
                                'new' => 'New',
                                'contacted' => 'Contacted',
                                'qualified' => 'Qualified',
                                'converted' => 'Converted',
                                'lost' => 'Lost',
                            ])
                            ->default('new')
                            ->required(),
                        Forms\Components\TextInput::make('referral')
                            ->label('Referral Source')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('notes')
                            ->columnSpanFull()
                            ->rows(4),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                Tables\Columns\TextColumn::make('bride_name')
                    ->label('Bride')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('groom_name')
                    ->label('Groom')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('city')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'info',
                        'contacted' => 'warning',
                        'qualified' => 'primary',
                        'converted' => 'success',
                        'lost' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('budget')
                    ->money('INR')
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('wedding_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'new' => 'New',
                        'contacted' => 'Contacted',
                        'qualified' => 'Qualified',
                        'converted' => 'Converted',
                        'lost' => 'Lost',
                    ]),
                Tables\Filters\SelectFilter::make('venue_type')
                    ->label('Venue Type')
                    ->options([
                        'palace' => 'Palace & Heritage',
                        'hotel' => 'Five Star Hotel',
                        'resort' => 'Beach Resort',
                        'farmhouse' => 'Farmhouse',
                        'banquet' => 'Banquet Hall',
                        'destination' => 'Destination Wedding',
                    ]),
                Tables\Filters\SelectFilter::make('city')
                    ->options(fn () => Lead::query()->distinct()->whereNotNull('city')->pluck('city', 'city')->toArray()),
            ])
            ->actions([
                \Filament\Actions\ViewAction::make(),
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLeads::route('/'),
            'create' => Pages\CreateLead::route('/create'),
            'edit' => Pages\EditLead::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['bride_name', 'groom_name', 'email', 'phone', 'city'];
    }
}
