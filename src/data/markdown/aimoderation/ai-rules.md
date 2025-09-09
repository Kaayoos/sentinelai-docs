# AI Rules

AI Rules are a way to give additional context and guidance to the moderation AI.  
They allow you to customize how the AI interprets messages, going beyond the default filters.  
This is especially useful for unique communities, niche topics, or servers that require stricter or looser control in certain areas.

---

## How AI Rules Work

AI Rules act as **extra instructions** for the moderation system.  
When a user sends a message, the bot not only applies the selected filters but also checks against your defined rules.  

For example:  
- If your server is about **gaming**, you might want to add rules, that explain to NOT flag words that in gaming are normal, like "kill"


## Best Methods for Writing AI Rules

To make AI Rules effective, follow these methods:

### 1. **Be Clear and Specific**
The AI performs best when instructions are precise.  
✅ Example: *"Block any messages that contain racial slurs."*  
❌ Avoid: *"Don’t allow bad stuff."*  

---

### 2. **Make a numbered list**
AI works best, if rules are presented as a numbered list. 

✅ Example: 
```
1. Rule 1
2. Rule 2
3. Rule 3
```

---

### 3. **Create Rules That Complement Filters**
Filters already handle broad categories (hate speech, sexual content, etc.).  
✅ Example: *"Do not allow political campaign slogans."*  
✅ Example: *"Block roleplay messages that include gore or self-harm."*  

---

### 4. **Allow Exceptions Where Needed**
If your community uses terms that might be falsely flagged, clarify it.  
✅ Example: *"Allow the word 'kill' when it is used in gaming context (e.g., 'I got 5 kills in Fortnite')."*  

---

## Example AI Rules Setup

Here’s a sample configuration for a **family-friendly gaming server**:
```
Rules:
 1. Allow mild swearing, but block any direct insults aimed at users.
 2. Block political discussions, including references to elections, parties, or politicians.
 3. Block any sexual references, even in jokes.
 4. Allow words like 'kill' or 'attack' only when used in the context of gaming.
```

---


## ⚠️ Filters are always above rules
What does this mean?

This means, that if messages are flagged, they are always flagged with specific topics.
Filters are above rules, so if you want to flag something that you do not have set in filters, **it will not be flagged**.


## Summary
Rules are **best used** as a way to **tweak selected filters**, or stop the AI moderation from flagging unwanted content.