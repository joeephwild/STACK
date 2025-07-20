# Component Library / Design System

Design System Approach:  
For STACK, we will create a custom, lightweight component library. While using a pre-built library can be faster, building our own will give us complete control over the unique, gamified look and feel that is central to our brand. This ensures every button, card, and interaction feels like it belongs to STACK and aligns with the visual direction from the reference images.

## Core Components

### Button

* **Purpose:** To be used for all primary and secondary user actions (e.g., 'Power Up', 'Confirm', 'See All').  
* **Variants:**  
  * **Primary:** High-emphasis actions (lime green background).  
  * **Secondary:** Medium-emphasis actions (e.g., blue background or outlined).  
  * **Text/Link:** Low-emphasis navigation or minor actions.  
* **States:** The button must have clear visual states for Default, Hover, Pressed, Disabled, and Loading.

### Info Card

* **Purpose:** To display distinct, self-contained blocks of information, such as the portfolio balance, individual assets in a list, or active quests.  
* **Variants:**  
  * **Primary Metric Card:** For displaying large, key numbers like the 'Total Value' or 'Available for Withdrawal'.  
  * **List Item Card:** A smaller, horizontal card used for items in a list, like the assets in the 'Your Investments' section.  
  * **Quest Card:** A variant designed to display gamified information, progress, and a 'Claim' button.  
* **States:** Cards will have a 'Default' state and a 'Tappable' state (with visual feedback like a highlight or shadow lift on press) for cards that navigate to a detail view.

### Bottom Tab Bar

* **Purpose:** To provide persistent, top-level navigation, allowing users to switch between the main sections of the app (e.g., Home, Portfolio, Statistics, Settings).  
* **Variants:** N/A. There will be one standard tab bar for the application.  
* **States:** Each tab icon will have two states: **Active** (to indicate the user's current screen) and **Inactive**.  
* **Usage Guidelines:** The tab bar should contain 4-5 items only, corresponding to the primary sections identified in the Information Architecture. It should be visible on all top-level screens.