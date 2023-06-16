<html lang="ja">
<head>
    <title>パスワードリセット</title>
</head>
<body>
        <div>
            <a href="{{ env('APP_URL') }}/passwordInput?code={{ $token }}">パスワード設定画面に進む</a>
        </div>
</body>
</html>
