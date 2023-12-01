<?php
function create_copyright(): string
{
    $year = date('Y');
    $message = 'Copyright &copy; ' . $year;    
    return $message;
};