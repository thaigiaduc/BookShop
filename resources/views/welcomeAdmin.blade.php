<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to Admin</title>
    </head>
    <body class="antialiased">
        <div id="root"></div>
        <script src="{{mix('/js/appAdmin.js')}}"></script>
    </body>
</html>