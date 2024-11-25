# Soundify UI Project

## Overview

**Soundify UI** is a modern and responsive user interface for the **Soundify** music streaming service, built using **React**, **Zustand**, **Axios**, and **Joy UI**. The UI provides an intuitive and seamless experience for discovering, listening to, and managing music content, inspired by popular music streaming platforms like **Spotify**.

Key features include:

- **User Authentication**: Sign-up, login, and user profile management using JWT for stateless authentication.
- **Music Discovery**: Search and browse music by tracks, albums, and artists with advanced filtering and sorting capabilities.
- **Track and Album Details**: View detailed information about individual tracks, albums, and artists.
- **Music Playback**: Listen to music with integrated audio controls.
- **User Profiles**: Users can manage their profiles, playlists, and subscriptions.
- **Publisher & Admin Management**: Special pages for publishers and admins to manage the system, including music content, user accounts, and permissions.

**Soundify UI** integrates seamlessly with the backend services for a complete music streaming experience, including registration, music management, email notifications, and more.

---

## Features

### Authentication

- **JWT Authentication**:
    - Users can sign up, log in, and manage their profiles.
    - JWT tokens are used for secure, stateless authentication.
    - Integration with the **IdentityCore** service for handling authentication and registration.

### Music Discovery and Playback

- **Search & Browse**:
    - Search for tracks, albums, and artists.
    - Use advanced filters to find music by genre, release year, and more.
- **Track/Album/Artist Details**:
    - View detailed pages for tracks, albums, and artists with metadata such as release dates, ratings, and track lists.
- **Playback Controls**:
    - Stream music with controls for play, pause, skip, and volume adjustments.
    - Integrated with the **Music Service** to retrieve music data and metadata.

### User Profile Management

- **Profile Page**:
    - Users can view and update their profiles, including their playlists, listening history, and account settings.
    - Subscription management through the **Payment Service** for premium users.

### Admin & Publisher Management

- **Admin Panel**:
    - Special administrative interface for managing users, music content, and system settings.
    - Admins have full control over user permissions and content moderation.
- **Publisher Management**:
    - Publishers can manage their own music content, including adding new tracks, albums, and other metadata.

### Notifications

- **Email Notifications**:
    - The UI is integrated with the **NotificationService** to send confirmation emails for actions such as registration, password resets, and account updates.

---

## Technology Stack

- **Frontend**: React
- **State Management**: Zustand
- **HTTP Client**: Axios
- **UI Components**: Joy UI
- **Authentication**: JWT (Access Tokens)
- **Styling**: CSS, Styled Components
- **Backend Integration**: Axios calls to backend services for music, authentication, and user management.

---

## Dependencies

Before starting the **Soundify UI** project, make sure you have the following services running:

1. **IdentityCore**: Handles user registration and authentication.
    - Repository: [IdentityCore](https://github.com/Isukaza/IdentityCore)
2. **NotificationService**: Sends email notifications for actions requiring confirmation.
    - Repository: [NotificationService](https://github.com/Isukaza/NotificationService)
3. **MusicService**: Provides music metadata, search functionality, and music streaming.
    - Repository: [Soundify MusicService](https://github.com/Isukaza/Soundify)
4. **PaymentService**: Manages user subscriptions and premium access.
    - Repository: [PaymentService](#)
5. **StorageService**: Handles music streams, album artwork, and other large media files.
    - Repository: [StorageService](#)

These services are essential for providing full functionality within the **Soundify UI**. Ensure each service is up and running before starting the UI.

---

## Getting Started

### Installing Dependencies

To get started, clone the repository and install the necessary dependencies:

1. Clone the repository:
    ```
    git clone https://github.com/Isukaza/soundify_ui.git
    ```

2. Navigate into the project directory:
    ```
    cd soundify_ui
    ```

3. Install the required packages:
    ```
    npm install
    ```

### Running the Application

1. Start the development server:
    ```
    npm start
    ```

This will start the application locally on [http://localhost:3000](http://localhost:3000).

---

## Pages and Features

### Registration and Login

- **Registration**: New users can sign up using their email or Google authentication.
- **Login**: Existing users can log in using their credentials or Google account.

### Music Search & Discovery

- **Search**: Search for music by track, album, or artist.
- **Filters**: Apply filters based on genre, year, popularity, and more.
- **Track Details**: View detailed information about each track, including duration, album, and artist info.

### User Profile

- **View Profile**: Users can view their profile and update personal details.
- **Manage Playlists**: Users can create, update, and manage playlists.
- **Subscription**: Users can manage their premium subscription through the **Payment Service**.

### Admin Panel

- **Manage Users**: Admins can view and manage user accounts, permissions, and roles.
- **Content Management**: Admins can manage music content, including adding/removing tracks, albums, and artists.

---

## Future Enhancements

For information on the project's future plans and enhancements, please refer to the [Roadmap](https://github.com/Isukaza/Soundify_UI/blob/develop/ROADMAP.md).

---

**Soundify UI** is constantly evolving to provide users with a modern and dynamic music streaming experience. Stay tuned for future updates and features!
