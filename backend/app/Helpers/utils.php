<?php

if (!function_exists('format_phone')) {
    /**
     * Format phone number for display
     *
     * @param string $phone
     * @return string
     */
    function format_phone($phone)
    {
        // Remove all non-numeric characters
        $digits = preg_replace('/\D/', '', $phone);
        
        // Format based on length
        if (strlen($digits) == 10) {
            return sprintf('(%s) %s-%s', substr($digits, 0, 3), substr($digits, 3, 3), substr($digits, 6));
        } elseif (strlen($digits) == 11 && $digits[0] == '1') {
            return sprintf('%s (%s) %s-%s', substr($digits, 0, 1), substr($digits, 1, 3), substr($digits, 4, 3), substr($digits, 7));
        }
        
        return $phone; // Return original if can't format
    }
}

if (!function_exists('sanitize_filename')) {
    /**
     * Sanitize filename for safe storage
     *
     * @param string $filename
     * @return string
     */
    function sanitize_filename($filename)
    {
        // Remove special characters except dots, hyphens, and underscores
        $filename = preg_replace('/[^a-zA-Z0-9._-]/', '', $filename);
        
        // Replace multiple dots, hyphens, underscores
        $filename = preg_replace('/[\._-]+/', '-', $filename);
        
        return $filename;
    }
}

if (!function_exists('generate_slug')) {
    /**
     * Generate URL slug from string
     *
     * @param string $string
     * @return string
     */
    function generate_slug($string)
    {
        // Convert to lowercase and replace spaces with hyphens
        $slug = strtolower(trim($string));
        $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
        $slug = preg_replace('/[-]+/', '-', $slug);
        $slug = trim($slug, '-');
        
        return $slug;
    }
}

if (!function_exists('calculate_age')) {
    /**
     * Calculate age from date of birth
     *
     * @param string $dateOfBirth
     * @return int
     */
    function calculate_age($dateOfBirth)
    {
        $birthDate = new DateTime($dateOfBirth);
        $today = new DateTime('today');
        $age = $birthDate->diff($today)->y;
        
        return $age;
    }
}

if (!function_exists('truncate_text')) {
    /**
     * Truncate text to specified length with ellipsis
     *
     * @param string $text
     * @param int $length
     * @param string $ending
     * @return string
     */
    function truncate_text($text, $length = 100, $ending = '...')
    {
        if (mb_strlen($text, 'UTF-8') <= $length) {
            return $text;
        }
        
        return mb_substr($text, 0, $length, 'UTF-8') . $ending;
    }
}

if (!function_exists('array_sort_by_column')) {
    /**
     * Sort multi-dimensional array by column
     *
     * @param array $array
     * @param string $column
     * @param string $direction
     * @return array
     */
    function array_sort_by_column($array, $column, $direction = SORT_ASC)
    {
        $sortColumn = array_column($array, $column);
        array_multisort($sortColumn, $direction, $array);
        
        return $array;
    }
}