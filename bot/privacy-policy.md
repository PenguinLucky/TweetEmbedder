<div align="center">
  <h1>PRIVACY POLICY</h1>
  
  [日本語](privacy-policy.ja.md)
</div>

## Data Collection and Storage
The Service does not permanently collect or store any of your data.<br />
Data may be stored temporarily depending on the message content.<br />
However, the storage period will not exceed one second.

## How Message Content is Utilized
The service retrieves all message contents that are sent.<br />
Nevertheless, unless a message contains a specific URL*, the message content will not be retained.

Specific URLs are those that adhere to the following patterns:
- https://x.com/{UserId}/status/{TweetId}
- https://twitter.com/{UserId}/status/{TweetId}
- https://x.com/{UserId}
- https://twitter.com/{UserId}

## Utilization of Messages with Specific URLs
Messages containing specific URLs are employed to provide the functionality of this service.

For specific use cases, the UserId and TweetId are extracted from the URL and then forwarded to FxTwitterAPI.<br />
Using this API, the content of the tweet and information about the user are retrieved. *<br />
The message is subsequently sent to FxTwitterAPI.<br />
Messages are dispatched based on the acquired information.

FxTwitter's privacy policy can be found [here](https://github.com/FixTweet/FixTweet#built-with-privacy-in-mind).

Please note that information from tweets originating from private accounts cannot be acquired.