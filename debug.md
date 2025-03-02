# Debug Features

This document outlines the temporary debug features added to the Tally Calorie Tracker MVP to demonstrate functionality. These features should be removed before the final release.

## Debug Button

A purple debug button has been added to the top-right corner of the application. This button serves two purposes:

1. Dynamically changes the color of the progress bar in the onboarding flow between blue and purple
2. Cycles through 6 different calorie consumption values (0, 360, 720, 1080, 1440, 1800 kcal) to demonstrate the app's functionality

### Implementation Details

1. Added a `color` prop to the `ProgressBar` component to make it customizable
2. Added state variables in the `App` component:
   - `progressBarColor` to track the current color
   - `debugConsumptionStep` to track the current step in the consumption cycle
3. Created an array of consumption values (`consumptionSteps`) representing the 6 steps from 0 to 1800 kcal
4. Added a debug button that:
   - Toggles the progress bar color between blue and purple
   - Cycles through the calorie consumption values (only changes the consumed value, the budget remains fixed at 1800)
   - Updates the user data with the new consumption value
5. Modified the `OnboardingFlow` component to accept and pass the color prop
6. Completely redesigned the calorie progress bar in the Dashboard:
   - Fixed total calorie budget at 1800 kcal for testing purposes
   - Smooth gradient background from green to yellow to red
   - Semi-transparent glass circle indicator precisely positioned at the consumed calorie amount
   - Calorie value markers for better readability (0, 900, and 1800 kcal)
   - Fixed logic to cap progress at 100% for edge cases
   - Updated the display to show consumed and remaining calories

### How to Use

1. The debug button displays the current consumed calories and fixed total (e.g., "720 / 1800 kcal")
2. Click the button to cycle through the different calorie consumption values (0 → 360 → 720 → 1080 → 1440 → 1800 → back to 0)
3. In the onboarding flow, the progress bar color will toggle between blue and purple
4. In the dashboard, the consumed calories and remaining calories will update as you click the debug button
5. The calorie progress bar shows a smooth gradient with a glass indicator positioned exactly at the consumed calorie amount
6. The glass circle indicator moves along the progress bar from 0 to 1800 kcal as you cycle through the consumption values

### Removal Instructions

To remove this debug feature before final release:

1. Remove the debug button, `progressBarColor` state, `debugConsumptionStep` state, and `consumptionSteps` array from `App.tsx`
2. Remove the `progressBarColor` prop from `OnboardingFlow.tsx`
3. You can keep the `color` prop in `ProgressBar.tsx` for future customization if desired
4. Consider keeping the improved progress bar in Dashboard.tsx as it provides a better user experience
5. Delete this debug.md file

## Friendly Assistant Chat

A friendly AI assistant chat has been added to the Dashboard to simulate an interactive assistant that provides meal tracking reminders and weight logging prompts.

### Implementation Details

1. Added a floating chat bubble UI that appears after the Dashboard loads
2. Created a collection of sample assistant messages related to meal tracking and weight logging
3. Implemented random message selection to simulate a real assistant
4. Added simple animation to make the chat bubble appear naturally
5. Added buttons to respond to or dismiss the assistant

### How to Use

1. The assistant will automatically appear a few seconds after loading the Dashboard
2. The assistant will ask random questions about:
   - Meal logging reminders (e.g., "Have you had any snacks today that you haven't logged yet?")
   - Weight logging prompts (e.g., "Don't forget to log your weight today!")
   - General wellness tips (e.g., "You're doing great! Remember to stay hydrated throughout the day.")
3. You can click "Respond" or "Dismiss" to close the assistant bubble
4. The assistant will show different messages on each page refresh

### Removal Instructions

To remove this feature before final release:

1. Remove the assistant-related state variables, functions, and JSX from the Dashboard component
2. Remove the animation CSS from globals.css and the Tailwind configuration
3. Remove this documentation section from debug.md

## Other Debug Features

Add any other debug features here as they are implemented.
