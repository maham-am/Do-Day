# Do-Day - Task Management App

**Developer:** Maham Maryam  
**Version:** 1.0.0

A beautiful and intuitive React Native task management application built with Expo, designed to help users stay organized and productive. The app features a modern UI with dark mode support, comprehensive task management, habit tracking, and calendar integration.

## 📸 Screenshots
<div align="center">

### Main App Screens
<img src="https://github.com/maham-am/Do-Day/blob/main/SS/Tasks.png" width="200" alt="Students Screen">
<img src="https://github.com/maham-am/Do-Day/blob/main/SS/subtasks.png" width="200" alt="Courses Screen">
<img src="https://github.com/maham-am/Do-Day/blob/main/SS/calender.png" width="200" alt="Attendance Screen">

*Main tasks screen | Task Steps | Monthly calendar*

### Additional Features
<img src="https://github.com/maham-am/Do-Day/blob/main/SS/profile.png" width="200" alt="Profile Screen">

*- | Profile Page*

</div>


## 🚀 Features

### Core Functionality
- **Task Management**: Create, edit, delete, and organize tasks with categories
- **Habit Tracking**: Build and maintain healthy habits with dedicated tracking
- **Calendar Integration**: View tasks and habits in a monthly calendar view
- **Progress Tracking**: Visual progress indicators and completion statistics
- **Subtasks Support**: Break down complex tasks into manageable subtasks
- **Category Filtering**: Organize tasks by Personal, Work, Education, Health, and Fitness
- **Priority Levels**: Set high, medium, and low priority for tasks
- **Time Management**: Add specific times to tasks for better scheduling

### User Interface
- **Modern Design**: Clean, intuitive interface with beautiful animations
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Layout**: Optimized for various screen sizes
- **Floating Action Button**: Quick access to add new tasks
- **Visual Indicators**: Color-coded categories and progress rings
- **Smooth Navigation**: Bottom tab navigation with stack navigation

### Data Management
- **Local Storage**: AsyncStorage for persistent data storage
- **Context API**: Centralized state management for tasks and habits
- **Real-time Updates**: Instant UI updates when data changes
- **Data Persistence**: Tasks and habits are saved automatically

## 🛠️ How to Run the App

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI
- iOS Simulator (for iOS) or Android Studio (for Android)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Do-Day
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

### Alternative Commands
```bash
# Run on specific platforms
npm run android    # Android
npm run ios        # iOS
npm run web        # Web browser
```

## 📱 App Functionality

### Task Management
- **Add Tasks**: Create new tasks with title, description, category, priority, and time
- **Edit Tasks**: Modify existing tasks and their properties
- **Complete Tasks**: Mark tasks as done with visual feedback
- **Delete Tasks**: Remove tasks you no longer need
- **Subtasks**: Add multiple subtasks to break down complex tasks
- **Categories**: Organize tasks by Personal, Work, Education, Health, Fitness

### Habit Tracking
- **Create Habits**: Set up daily habits with custom icons and colors
- **Habit Categories**: Organize habits by Mindfulness, Health, Fitness
- **Progress Tracking**: Visual progress indicators for habit completion
- **Habit Tasks**: Create specific tasks related to each habit

### Calendar View
- **Monthly Calendar**: Navigate through months to view tasks
- **Date Selection**: Tap on dates to see tasks for that day
- **Task Indicators**: Visual dots show days with tasks
- **Today Highlighting**: Current date is highlighted
- **Task List**: View all tasks for selected date

### Profile & Settings
- **User Profile**: Personal information and app statistics
- **Dark Mode Toggle**: Switch between light and dark themes
- **Settings**: Notification and language preferences
- **App Information**: Version details and developer information

## 📁 Folder Structure

```
Do-Day/
├── App.js                          # Main app component with navigation
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── babel.config.js                 # Babel configuration
├── index.js                        # App entry point
├── assets/                         # App assets
│   ├── icon.png                   # App icon
│   ├── splash-icon.png           # Splash screen icon
│   ├── adaptive-icon.png         # Android adaptive icon
│   └── favicon.png                # Web favicon
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── AddHabitModal.js       # Modal for adding habits
│   │   ├── AddHabitTaskModal.js  # Modal for habit tasks
│   │   ├── AddTaskModal.js        # Modal for adding tasks
│   │   ├── CategoryFilter.js      # Category filtering component
│   │   ├── FloatingActionButton.js # FAB for adding tasks
│   │   ├── HabitCard.js           # Individual habit display
│   │   ├── HabitCategoryCard.js   # Habit category grouping
│   │   ├── HabitDetailModal.js    # Detailed habit view
│   │   ├── HabitTaskItem.js       # Individual habit task
│   │   ├── ProgressIndicator.js   # Progress visualization
│   │   ├── ProgressRing.js        # Circular progress ring
│   │   ├── TaskInsights.js        # Task statistics
│   │   ├── TaskItem.js            # Individual task display
│   │   └── WeeklyCalendar.js      # Weekly calendar component
│   ├── context/                   # React Context for state management
│   │   ├── HabitsContext.js       # Habit state management
│   │   ├── TaskContext.js         # Task state management
│   │   └── ThemeContext.js        # Theme and dark mode
│   └── screens/                   # Main app screens
│       ├── CalendarScreen.js      # Calendar view with monthly grid
│       ├── HabitDetailScreen.js   # Detailed habit management
│       ├── HabitsScreen.js        # Habits overview and management
│       ├── ProfileScreen.js       # User profile and settings
│       └── TasksScreen.js         # Main tasks list view
└── SS/                           # Screenshots and demo files
    ├── calender.png              # Calendar screenshot
    ├── Demo.mp4                  # App demo video
    ├── profile.png               # Profile screenshot
    ├── subtasks.png              # Subtasks screenshot
    └── Tasks.png                 # Tasks screenshot
```

## 🎨 Design System

### Color Palette
- **Primary**: #4A7C59 (Green)
- **Secondary**: #FDFCEF (Light cream)
- **Accent**: #06B6D4 (Cyan)
- **Text**: Dynamic based on theme
- **Background**: Light/Dark theme support

### Typography
- **Headers**: Bold, 18-24px
- **Body**: Regular, 14-16px
- **Captions**: Light, 12-14px

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Rounded with primary color
- **Inputs**: Clean, minimal design
- **Icons**: Ionicons for consistency

## 🔧 Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: StyleSheet with theme support
- **Animations**: React Native Reanimated

## 📊 Sample Data

The app comes with pre-loaded sample data including:
- **Sample Tasks**: Work projects, education assignments, personal tasks
- **Sample Habits**: Meditation, hydration, sleep, fitness routines
- **Sample Subtasks**: Detailed breakdown of complex tasks
- **Progress Tracking**: Visual completion indicators

## 🚀 Getting Started

1. Install Expo CLI globally: `npm install -g expo-cli`
2. Clone the repository
3. Install dependencies: `npm install`
4. Start the development server: `expo start`
5. Scan QR code with Expo Go app on your device

## 📱 Platform Support

- **iOS**: Full support with native features
- **Android**: Full support with adaptive icons
- **Web**: Basic support for testing

## 🔮 Future Enhancements

- Push notifications for task reminders
- Data synchronization across devices
- Advanced analytics and insights
- Team collaboration features
- Integration with external calendars
- Voice-to-text task creation

## 👨‍💻 Developer

**Maham Maryam**  
App Developer & UI/UX Designer

---

*Built with ❤️ using React Native and Expo*
