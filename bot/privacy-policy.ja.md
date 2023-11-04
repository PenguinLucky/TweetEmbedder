<div align="center">
  <h1>PRIVACY POLICY</h1>
  
  [English](privacy-policy.md)
</div>

## 収集,保存するデータ
当サービスは、お客様のデータを永久的に収集や保存することはありません。<br />
メッセージ内容によって一時的に保存される場合があります。<br />
ですが保存期間は1秒にも満たないでしょう。

## メッセージ内容の使用方法について
当サービスは、送られたメッセージ内容をすべて取得します。<br />
ですが、特定のURL※が含まれているメッセージを除き、メッセージ内容が保存されることはありません。<br />


※ 特定のURLとは以下のパターンに当てはまるものです。<br />
UserIdとTweetIdはTwitterのURLの一部です。<br />
- https://x.com/{UserId}/status/{TweetId}
- https://twitter.com/{UserId}/status/{TweetId}
- https://x.com/{UserId}
- https://twitter.com/{UserId}

## 特定のURLを含むメッセージの使用方法について
特定のURLを含むメッセージは、当サービスの機能を提供するために使用されます。<br />
具体的な使用方法は、URLからUserIdとTweetIdを取得し、FxTwitterAPIに送信されます。<br />
このAPIからは、ツイートの内容やユーザーの情報が取得されます。※<br />
取得された情報を元に、メッセージが送信されます。<br />
FxTwitterのプライバシーポリシーは[こちら](https://github.com/FixTweet/FixTweet#built-with-privacy-in-mind)です。<br />


※鍵アカウントのツイートの情報は取得できません。