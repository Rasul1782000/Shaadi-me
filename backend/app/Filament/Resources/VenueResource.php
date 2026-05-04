<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VenueResource\Pages;
use App\Models\Venue;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class VenueResource extends Resource
{
    protected static ?string $model = Venue::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-building-office-2';

    protected static \UnitEnum|string|null $navigationGroup = 'Catalogue';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                \Filament\Schemas\Components\Section::make('Venue Details')
                    ->icon('heroicon-o-building-office-2')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('type')
                            ->options([
                                'palace' => 'Palace & Heritage',
                                'hotel' => 'Five Star Hotel',
                                'resort' => 'Beach Resort',
                                'farmhouse' => 'Farmhouse',
                                'banquet' => 'Banquet Hall',
                            ])
                            ->required(),
                        Forms\Components\Textarea::make('description')
                            ->columnSpanFull()
                            ->rows(3),
                    ]),

                \Filament\Schemas\Components\Section::make('Location')
                    ->icon('heroicon-o-map-pin')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('city')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('address')
                            ->rows(2),
                    ]),

                \Filament\Schemas\Components\Section::make('Capacity & Pricing')
                    ->icon('heroicon-o-currency-rupee')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('capacity')
                            ->numeric()
                            ->suffix('guests'),
                        Forms\Components\TextInput::make('price_per_day')
                            ->numeric()
                            ->prefix('₹')
                            ->label('Price per Day'),
                    ]),

                \Filament\Schemas\Components\Section::make('Contact & Status')
                    ->icon('heroicon-o-phone')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('contact_phone')
                            ->tel()
                            ->maxLength(50),
                        Forms\Components\TextInput::make('contact_email')
                            ->email()
                            ->maxLength(255),
                        Forms\Components\TagsInput::make('amenities')
                            ->placeholder('Add amenity')
                            ->columnSpanFull(),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color('primary')
                    ->sortable(),
                Tables\Columns\TextColumn::make('city')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('capacity')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price_per_day')
                    ->money('INR')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('name')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'palace' => 'Palace & Heritage',
                        'hotel' => 'Five Star Hotel',
                        'resort' => 'Beach Resort',
                        'farmhouse' => 'Farmhouse',
                        'banquet' => 'Banquet Hall',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active'),
            ])
            ->actions([
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
            'index' => Pages\ListVenues::route('/'),
            'create' => Pages\CreateVenue::route('/create'),
            'edit' => Pages\EditVenue::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'city', 'type'];
    }
}
