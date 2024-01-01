<?php
require __DIR__ . '/../../vendor/autoload.php';
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$client = new Client([
    'base_uri' => 'https://api.giphy.com/v1/gifs/',
    'timeout' => 2.0,
    'headers' => [
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
    ],
]);


define('GIPHY_KEY', 'your-api-key');

$giphyKey = $_ENV['GIPHY_KEY'];
if(isset($_POST['search'])) {
    $search = $_POST['search'];
    $response = $client->request('GET', 'search', [
        'query' => [
            'api_key' => $giphyKey,
            'q' => $search,
            'limit' => 5,
        ],
    ]);
    $body = $response->getBody()->getContents();
    $data = json_decode($body, true);
    $gifs = $data['data'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>giffy-portal</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.5/spectre.min.css">
</head>

<body>
    <div class="container grid-sm">
        <form class="columns my-2" action="index-gif.php" method="post">
            <div class="column col-9">
                <input type="search" name="search" placeholder="Search gifs..." class="form-input">
            </div>
            <div class="column col-3">
                <button type="submit" class="btn btn-primary btn-block">Search</button>
            </div>
        </form>
        <div class="columns my-2">            
            <?php if(isset($gifs)): ?>
            <?php foreach($gifs as $gif): ?>
            <div class="column col-12 my-1">
                <img src="<?= $gif['images']['fixed_height']['url'] ?>" width="100%">
            </div>
            <?php endforeach; ?>
            <?php else: ?>
            <div class="column col-12 my-1">
                <img src="https://media1.giphy.com/media/gw3IWyGkC0rsazTi/giphy.gif" width="100%">
            </div>
            <?php endif; ?>
        </div>
    </div>
</body>

</html>