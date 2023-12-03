<?php // a function to create a copyright logo and current year
function create_copyright(): string
{
    $year = date('Y');
    $message = 'Copyright &copy; ' . $year;    
    return $message;
};