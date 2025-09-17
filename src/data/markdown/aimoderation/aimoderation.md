# Introduction to AI Moderation

AI Moderation is a system which uses advanced, yet quick AI models to quickly scan all messages sent to your server.

> There are a few exceptions where messages are not scanned:
> - If channel is whitelisted
> - If channel is set as as **NSFW**
> - If the user who sent a message has an **Admin Role** set in **General Settings**
> - If the user has **administrator permissions** and **Ignore Administrators** in **General Settings** is enabled

## Chat Filters

Chat Filters help you decide what content you wish to keep and what not to keep on the server, below are all filters (almost)explained.

1. **Offensive Filter** - This filter is really general, and includes many of the other filters like: Hate Speech, Sexual content, Discrimination and Violence. However it does not contain profanity filter trying to fit perfectly for servers which do not want to block all toxicity, and allow light swearing or allow jokes.
2. **Sexual Content Filter** - This filter is designed to block messages containing explicit sexual language or references. It helps maintain a safe and appropriate environment by preventing the sharing of sexually explicit or suggestive content.
3. **Political Content Filter** - This filter blocks anything related to politics. **However**, the AI is **not up to date** with daily political events, so it may not catch all politics-related content. To add additional political context for the AI, please use [custom rules](/docs/AI%20Moderation/ai-rules).
4. **Swearing Filter** - This filter will block **every** word that is a slur or might have been used as one in a message. This filter is **not recommended** unless you are creating a truly **family-friendly** server.
5. **Hate Speech Filter** - Blocks messages containing hate speech or abusive language.
6. **Self Harm Filter** - Detects and blocks messages promoting or mentioning self-harm.
7. **Discrimination Filter** - Prevents messages that discriminate based on race, gender, or other attributes.
8. **Violence Filter** - Blocks messages that promote or describe violent acts.

## AI Rules
AI rules are mentioned on [this page](/docs/AI%20Moderation/ai-rules)

## AI Model

The AI Moderation system offers different model options depending on your needs.  
By default, the standard **Fast Model** is used, but [premium](/docs/Getting%20Started/premium) users can select advanced models.

- ⚡ **Fast (Basic AI)** - Lightweight and optimized for speed. Recommended for larger servers where quick response is important.  
- 🧠 **Accurate (Smarter AI)** *(Premium only)* - A balance between performance and precision, offering better detection rates than the Fast model.  
- 👑 **Highly Accurate (Advanced AI)** *(Premium only)* - Provides the highest detection accuracy, reducing false positives while maintaining strict moderation.





## Punishment Options

When a user sends a message that violates rules, you can decide how the bot should respond.  
Available punishment actions include:

- **Timeout** - Temporarily mutes the user for a set amount of time.  
- **Kick** - Removes the user from the server.  
- **Ban** - Temporary bans the user from the server.  
- **None** - Simply logs the incident without taking direct action.  




## Punishment Time

For actions such as **timeouts** or **temporary bans**, you can set a custom punishment duration IN MINUTES.
Examples:  
- 10 - 10 minutes
- 60 - 1 hour
- 1440 - 1 day  


## Warning System

The AI moderation system also integrates a **warning system**, giving users a chance to fix their behavior before receiving stronger punishments.

- **Warning Message** - Customizable message that is sent on the channel when a user's message is flagged.
- **Warning Amount** - Defines how many warnings a user can receive before the configured punishment (timeout, kick, ban) is used on user. 
- **Warns Reset Time** - Determines how long warnings last before being reset. For example, a user may be allowed 3 warnings within 24 hours before further action is taken.  




